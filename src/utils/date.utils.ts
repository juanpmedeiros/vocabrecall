/**
 * Date formatting utilities (PROMPT 6).
 * All functions expect ISO date strings (e.g. "2025-11-15").
 */

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function diffInDays(a: Date, b: Date): number {
  const startA = getStartOfDay(a);
  const startB = getStartOfDay(b);
  return Math.floor((startA.getTime() - startB.getTime()) / (24 * 60 * 60 * 1000));
}

export function formatRelativeDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  const days = diffInDays(today, d);

  if (days === 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  if (days > 1 && days <= 7) return `Há ${days} dias`;
  if (days > 7 && days <= 14) return 'Há 1 semana';
  if (days > 14 && days <= 30) return `Há ${Math.floor(days / 7)} semanas`;
  return formatDate(dateStr);
}

export function isRecentDate(dateStr: string, days: number): boolean {
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  const diff = diffInDays(today, d);
  return diff >= 0 && diff <= days;
}
