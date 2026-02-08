/**
 * Read-only availability calendar that displays booked dates from Airbnb iCal
 * Uses @demark-pro/react-booking-calendar for the calendar UI
 */
import { useEffect, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

interface ReservedDateRange {
  startDate: Date;
  endDate: Date;
}

interface AvailabilityCalendarProps {
  className?: string;
}

export default function AvailabilityCalendar({
  className = "",
}: AvailabilityCalendarProps): React.JSX.Element {
  const [reserved, setReserved] = useState<ReservedDateRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch("/api/availability");

        if (!response.ok) {
          throw new Error("Failed to fetch availability");
        }

        const data = await response.json();

        // Handle empty array or error response
        if (Array.isArray(data)) {
          // Convert ISO strings to Date objects
          const reservedDates: ReservedDateRange[] = data.map(
            (item: { startDate: string; endDate: string }) => ({
              startDate: new Date(item.startDate),
              endDate: new Date(item.endDate),
            })
          );
          setReserved(reservedDates);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching availability:", err);
        setError("Unable to load availability");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();

    // Refresh every hour
    const interval = setInterval(fetchAvailability, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center py-8 ${className}`}
        aria-label="Loading availability"
      >
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`py-6 text-center text-sm text-neutral-500 ${className}`}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`availability-calendar ${className}`}>
      <Calendar
        reserved={reserved}
        protection={true}
        range={false}
        options={{
          locale: "en-US",
          weekStartsOn: 0,
          useAttributes: true,
        }}
      />
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-neutral-500">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-neutral-300 bg-white" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-primary-500/30" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}
