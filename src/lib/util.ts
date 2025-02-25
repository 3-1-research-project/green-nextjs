import crypto from "crypto";

/**
 * Generate a Gravatar URL for a given email.
 * @param email - The user's email address.
 * @param size - The size of the avatar (default: 80px).
 * @returns Gravatar URL.
 */
export const gravatarUrl = (email: string, size: number = 80): string => {
  const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
};

/**
 * Format a datetime string into `YYYY-MM-DD @ HH:mm:ss` format.
 * @param date - The date string or object.
 * @returns Formatted date string.
 */
export const formatDatetime = (date: string | Date): string => {
  return new Date(date).toISOString().replace(/T/, " @ ").replace(/\..+/, "");
};
