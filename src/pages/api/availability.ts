/**
 * API endpoint to fetch and parse Airbnb iCal feed
 * Returns reserved/booked date ranges as JSON
 */
import type { APIRoute } from "astro";
import ical from "node-ical";

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
 * Extract reserved date ranges from parsed iCal events
 */
function extractReservedDates(
  events: ical.CalendarResponse
): ReservedDateRange[] {
  const reserved: ReservedDateRange[] = [];

  for (const key in events) {
    const event = events[key];

    // Only process VEVENT items (skip VCALENDAR, VTIMEZONE, etc.)
    if (event.type === "VEVENT") {
      const vevent = event as ical.VEvent;

      if (vevent.start && vevent.end) {
        reserved.push({
          startDate: vevent.start.toISOString(),
          endDate: vevent.end.toISOString(),
        });
      }
    }
  }

  // Sort by start date
  reserved.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
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
    // Try both import.meta.env and process.env for compatibility
    const icalUrl =
      import.meta.env.AIRBNB_ICAL_URL || process.env.AIRBNB_ICAL_URL;

    console.log("[availability] iCal URL present:", !!icalUrl);

    if (!icalUrl) {
      console.warn("AIRBNB_ICAL_URL environment variable not set");
      return new Response(
        JSON.stringify({
          error: "iCal URL not configured",
          reserved: [],
        }),
        {
          status: 200, // Return 200 with empty data rather than error
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60",
          },
        }
      );
    }

    // Fetch and parse the iCal feed
    // node-ical.async.fromURL handles the fetch internally
    console.log("[availability] Fetching iCal from URL...");
    const events = await ical.async.fromURL(icalUrl);
    console.log("[availability] Events count:", Object.keys(events).length);

    // Extract reserved dates
    const reserved = extractReservedDates(events);
    console.log("[availability] Reserved dates found:", reserved.length);

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
