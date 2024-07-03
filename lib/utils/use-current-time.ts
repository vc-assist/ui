import { useEffect, useState } from "react";

/**
 * The current time, updates every `interval` (default: 1000) milliseconds.
 */
export function useCurrentTime(interval = 1000): Date {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}
