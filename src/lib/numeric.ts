export function formatPeriod(startDate: string, endDate: string | null): string {
  const format = (date: string) => {
    const d = new Date(date + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  return `${format(startDate)} – ${endDate ? format(endDate) : "Present"}`;
}
