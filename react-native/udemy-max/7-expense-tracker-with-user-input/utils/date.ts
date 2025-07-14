export function getFormattedDate(date: Date): string {
    return date.toISOString().slice(0, 10); // Returns date in YYYY-MM-DD format
}