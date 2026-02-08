/**
 * API endpoint to fetch and parse Airbnb iCal feed
 * Returns reserved/booked date ranges as JSON
 *
 * Uses fetch() and manual iCal parsing for Cloudflare Workers compatibility
 */
import type { APIRoute } from "astro";

// Disable prerendering - this route is server-rendered on each request
export const prerender = false;

interface ReservedDateRange {
  startDate: string;
  endDate: string;
}

interface CacheEntry {
  data: ReservedDateRange[];
  timestamp: number;
}

// In-memory cache (persists across requests in the same worker instance)
let cache: CacheEntry | null = null;
const CACHE_DURATION_MS = 3600000; // 1 hour

/**
 * Parse iCal date string to ISO format
 * Handles both DATE (YYYYMMDD) and DATE-TIME (YYYYMMDDTHHMMSSZ) formats
 */
function parseICalDate(dateStr: string): string | null {
  if (!dateStr) return null;

  // Remove any VALUE=DATE: or similar prefixes
  const cleanDate = dateStr.replace(/^[^:]*:/, "").trim();

  // DATE-TIME format: YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS
  if (cleanDate.includes("T")) {
    const match = cleanDate.match(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/
    );
    if (match) {
      const [, year, month, day, hour, min, sec] = match;
      return new Date(
        Date.UTC(+year, +month - 1, +day, +hour, +min, +sec)
      ).toISOString();
    }
  }

  // DATE format: YYYYMMDD
  const match = cleanDate.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(Date.UTC(+year, +month - 1, +day)).toISOString();
  }

  return null;
}

/**
 * Parse iCal text content and extract VEVENT date ranges
 */
function parseICalContent(icalText: string): ReservedDateRange[] {
  const reserved: ReservedDateRange[] = [];

  // Split into events (between BEGIN:VEVENT and END:VEVENT)
  const eventMatches = icalText.match(
    /BEGIN:VEVENT[\s\S]*?END:VEVENT/g
  );

  if (!eventMatches) return reserved;

  for (const eventText of eventMatches) {
    // Extract DTSTART
    const dtStartMatch = eventText.match(/DTSTART[^:]*:([^\r\n]+)/);
    // Extract DTEND
    const dtEndMatch = eventText.match(/DTEND[^:]*:([^\r\n]+)/);

    if (dtStartMatch && dtEndMatch) {
      const startDate = parseICalDate(dtStartMatch[1]);
      const endDate = parseICalDate(dtEndMatch[1]);

      if (startDate && endDate) {
        reserved.push({ startDate, endDate });
      }
    }
  }

  // Sort by start date
  reserved.sort(
    (a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return reserved;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cache && now - cache.timestamp < CACHE_DURATION_MS) {
      return new Response(JSON.stringify(cache.data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          "X-Cache": "HIT",
        },
      });
    }

    // Get the iCal URL from environment variable
    const icalUrl = import.meta.env.AIRBNB_ICAL_URL;

    if (!icalUrl) {
      console.warn("AIRBNB_ICAL_URL environment variable not set");
      return new Response(
        JSON.stringify({
          error: "iCal URL not configured",
          reserved: [],
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60",
          },
        }
      );
    }

    // Fetch the iCal feed using standard fetch() (Cloudflare Workers compatible)
    const response = await fetch(icalUrl, {
      headers: {
        "User-Agent": "Alpine-Court-Chalet/1.0",
        Accept: "text/calendar",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch iCal: ${response.status}`);
    }

    const icalText = await response.text();

    // Parse the iCal content
    const reserved = parseICalContent(icalText);

    // Update cache
    cache = {
      data: reserved,
      timestamp: now,
    };

    return new Response(JSON.stringify(reserved), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Error fetching iCal:", error);

    // Return cached data if available, even if stale
    if (cache) {
      return new Response(JSON.stringify(cache.data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
          "X-Cache": "STALE",
        },
      });
    }

    // Return empty array on error (graceful degradation)
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  }
};
