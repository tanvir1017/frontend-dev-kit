import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes
 * while resolving conflicts using clsx and twMerge.
 * @param {...ClassValue[]} inputs - Variable number of class name inputs (strings, objects, arrays) compatible with clsx.
 * @returns {string} A single string of merged and deduplicated class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Formats a date into a human-readable string.
 * @param {Date | string} date - The date to format, either as a Date object or a string.
 * @returns {string} A formatted date string (e.g., "July 30, 2025").
 */
export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Generates a URL-friendly slug from a text string.
 * @param {string} text - The input text to convert into a slug.
 * @returns {string} A slugified string (e.g., "hello-world" from "Hello World!").
 */
export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
