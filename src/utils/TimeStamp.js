import { getYear, format, isToday, formatDistance } from "date-fns";

export function formatDate(ts) {
  const today = new Date();
  if (isToday(ts)) {
    return format(ts, "HH:mm:ss");
  }

  return getYear(ts) === getYear(today)
    ? format(ts, "MM/dd HH:mm:ss")
    : format(ts, "MM/dd/yyyy HH:mm:ss");
}

export function TS(ts, prev) {
  return formatDistance(ts, prev, { includeSeconds: true });
}
