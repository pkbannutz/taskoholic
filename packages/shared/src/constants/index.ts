// Timer durations in minutes
export const TIMER_DURATIONS = {
  SHORT: 5,
  MEDIUM: 15,
  LONG: 25,
} as const;

// Task priorities
export const TASK_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

// Task statuses
export const TASK_STATUSES = {
  INBOX: 'INBOX',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
} as const;

// Habit frequencies
export const HABIT_FREQUENCIES = {
  DAILY: 'DAILY',
  WEEKDAYS: 'WEEKDAYS',
  CUSTOM: 'CUSTOM',
} as const;

// Energy levels
export const ENERGY_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

// Soundscapes
export const SOUNDSCAPES = {
  SILENCE: 'SILENCE',
  RAINFALL: 'RAINFALL',
  CAFE: 'CAFE',
  WHITE_NOISE: 'WHITE_NOISE',
} as const;

// Themes
export const THEMES = {
  MOLESKINE: 'moleskine',
  ARCADE: 'arcade',
  PARCHMENT: 'parchment',
  MINIMALIST: 'minimalist',
} as const;

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'FREE',
  PRO: 'PRO',
  ARTISAN: 'ARTISAN',
} as const;

// Free tier limits
export const FREE_TIER_LIMITS = {
  HABITS: 5,
  WEEKLY_TASKS: 10,
  ROUTINES: 1,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  TASKS: '/api/tasks',
  HABITS: '/api/habits',
  NOTES: '/api/notes',
  FOCUS: '/api/focus',
  ANALYTICS: '/api/analytics',
  USER: '/api/user',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'taskoholic-theme',
  SOUND_ENABLED: 'taskoholic-sound-enabled',
  DEFAULT_TIMER: 'taskoholic-default-timer',
  SIDEBAR_OPEN: 'taskoholic-sidebar-open',
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280,
} as const;
