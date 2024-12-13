import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(price);
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat("fr-FR").format(number);
}

export function generateOrderId() {
  return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}