import { type ClassValue, clsx } from 'clsx';

// Simple cn utility without tailwind-merge for lighter bundle
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Get score status color class
export function getScoreStatus(score: number): 'gold' | 'success' | 'warning' | 'danger' {
  if (score >= 90) return 'gold';
  if (score >= 80) return 'success';
  if (score >= 70) return 'warning';
  return 'danger';
}

// Get score status label
export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Gold Standard';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Needs Work';
  return 'Needs Attention';
}
