import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine Tailwind CSS classes with proper merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date strings
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Get star rating as an array for rendering
export function getRatingStars(rating: number): boolean[] {
  return Array(5)
    .fill(false)
    .map((_, index) => index < Math.round(rating));
}

// Format numbers with commas for thousands
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Set timeout promise
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if email is valid
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Check if password meets requirements
export function isValidPassword(password: string): boolean {
  // 8-16 characters, must include at least one uppercase letter and one special character
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
  return regex.test(password);
}