import { DateTime } from "luxon";
import i18n from "./i18n"; // Assuming you're using i18n for language management

// Function to format dates with timezone and locale
function luxonEvent(eventDateISO) {
  const userLocale = i18n.language || "en"; // Use the current i18n language or default to 'en'
  const userTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; // Detect user's timezone or default to UTC

  const eventDate = DateTime.fromISO(eventDateISO, { zone: "utc" }).setZone(
    userTimezone
  );
  const now = DateTime.now().setZone(userTimezone);

  // Calculate relative time difference
  const diffInSeconds = now.diff(eventDate, "seconds").toObject().seconds;

  if (diffInSeconds < 60) {
    return eventDate.toRelative({ locale: userLocale }); // e.g., "a few seconds ago"
  }

  if (diffInSeconds < 60 * 60) {
    return eventDate.toRelative({ locale: userLocale }); // e.g., "45 minutes ago"
  }

  if (diffInSeconds < 60 * 60 * 24) {
    return eventDate.toRelative({ locale: userLocale }); // e.g., "5 hours ago"
  }

  // If the post is within the current year
  if (eventDate.year === now.year) {
    return eventDate.setLocale(userLocale).toFormat("MMMM d"); // e.g., "January 15"
  }

  // For posts in previous years
  return eventDate.setLocale(userLocale).toFormat("yyyy MMMM d"); // e.g., "2024 January 15"
}

export default luxonEvent;
