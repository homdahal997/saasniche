import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num)
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatContentType(contentType: string) {
  return contentType
    .split("_")
    .map(word => capitalizeFirst(word.toLowerCase()))
    .join(" ")
}

export function formatIndustry(industry: string) {
  return industry
    .split("_")
    .map(word => capitalizeFirst(word.toLowerCase()))
    .join(" ")
}
