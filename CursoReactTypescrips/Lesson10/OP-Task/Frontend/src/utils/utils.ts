/**
 * Formats an ISO date string into a human-readable date in Spanish locale
 * 
 * @param {string} isoString - The ISO 8601 date string to format (e.g., "2023-05-15T14:30:00Z")
 * @returns {string} Formatted date string in Spanish (e.g., "15 de mayo de 2023")
 * 
 * @example
 * const formattedDate = formatDate("2023-05-15T14:30:00Z");
 * console.log(formattedDate); // "15 de mayo de 2023"
 */
export function formatDate(isoString: string): string {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Create a date formatter for Spanish locale with full month names
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',   // Show full year (e.g., 2023)
        month: 'long',     // Show full month name (e.g., "mayo")
        day: 'numeric'     // Show day of month (e.g., 15)
    });

    // Format the date according to the specified options
    return formatter.format(date);
}