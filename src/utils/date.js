export function formatDate(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

export function formatDateTime(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function daysBetween(from, to) {
  const start = new Date(from).setHours(0, 0, 0, 0);
  const end = new Date(to).setHours(0, 0, 0, 0);
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export function minutesBetween(from, to) {
  return Math.round((new Date(to) - new Date(from)) / (1000 * 60));
}
