/**
 * Single source of truth for category display (badge + study card).
 * Replaces duplicated config in LessonCard, LessonDetailModal, StudyCard.
 */

import type { ReactNode } from 'react';
import type { Category } from '@/types';
import { Utensils, Trophy, Cpu, Plane, Train, Briefcase, Tag } from 'lucide-react';

const BADGE_STYLES: Record<Category | 'default', { bg: string; text: string }> = {
  food: { bg: 'bg-orange-100', text: 'text-orange-700' },
  sports: { bg: 'bg-green-100', text: 'text-green-700' },
  technology: { bg: 'bg-blue-100', text: 'text-blue-700' },
  travel: { bg: 'bg-purple-100', text: 'text-purple-700' },
  transports: { bg: 'bg-amber-100', text: 'text-amber-700' },
  business: { bg: 'bg-red-100', text: 'text-red-700' },
  default: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

const STUDY_STYLES: Record<
  Category | 'default',
  { bg: string; text: string; gradient: string; icon: ReactNode }
> = {
  food: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    gradient: 'from-orange-500 to-red-500',
    icon: <Utensils size={12} />,
  },
  sports: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    gradient: 'from-green-500 to-emerald-500',
    icon: <Trophy size={12} />,
  },
  technology: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    gradient: 'from-blue-500 to-cyan-500',
    icon: <Cpu size={12} />,
  },
  travel: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    gradient: 'from-purple-500 to-pink-500',
    icon: <Plane size={12} />,
  },
  transports: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    gradient: 'from-yellow-500 to-orange-500',
    icon: <Train size={12} />,
  },
  business: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    gradient: 'from-red-500 to-rose-500',
    icon: <Briefcase size={12} />,
  },
  default: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    gradient: 'from-gray-500 to-slate-500',
    icon: <Tag size={12} />,
  },
};

const CATEGORY_VALUES: Category[] = [
  'food',
  'sports',
  'technology',
  'travel',
  'transports',
  'business',
];

function normalizeCategory(category: string): Category | 'default' {
  const lower = category.toLowerCase();
  return CATEGORY_VALUES.includes(lower as Category) ? (lower as Category) : 'default';
}

/** For LessonCard and LessonDetailModal badge. */
export function getCategoryBadgeStyle(category: string): { bg: string; text: string } {
  return BADGE_STYLES[normalizeCategory(category)];
}

/** For StudyCard (gradient, icon, bg, text). */
export function getCategoryStudyStyle(category: string): {
  bg: string;
  text: string;
  gradient: string;
  icon: ReactNode;
} {
  return STUDY_STYLES[normalizeCategory(category)];
}

export { CATEGORY_VALUES };
