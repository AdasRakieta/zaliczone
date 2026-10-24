// Compare calendar dates independently of the daylight saving offset.
export function calendarDaysBetween(date: string, reference: string): number {
  return (Date.parse(date + 'T00:00:00Z') - Date.parse(reference + 'T00:00:00Z')) / 86_400_000
}
