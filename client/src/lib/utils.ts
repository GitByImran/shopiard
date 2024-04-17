import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateTitle = (title: string, maxLength: number) => {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength) + "...";
};

export const discountedPrice = (price: number, discountPercentage: number) =>
  Math.round(price * (1 - discountPercentage / 100));
