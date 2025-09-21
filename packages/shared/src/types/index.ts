import { z } from 'zod';

// User Types
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  subscriptionTier: z.enum(['FREE', 'PRO', 'ARTISAN']).default('FREE'),
  preferences: z.record(z.any()).default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserPreferencesSchema = z.object({
  theme: z.enum(['moleskine', 'arcade', 'parchment', 'minimalist']).default('moleskine'),
  soundEnabled: z.boolean().default(true),
  defaultTimerDuration: z.number().min(5).max(480).default(25),
  notifications: z.object({
    email: z.boolean().default(false),
    push: z.boolean().default(true),
    reminder: z.boolean().default(true),
  }).default({}),
});

export type User = z.infer<typeof UserSchema>;
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

// Task Types
export const TaskSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1).max(200),
  status: z.enum(['INBOX', 'IN_PROGRESS', 'COMPLETE']).default('INBOX'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  estimatedTime: z.number().min(1).max(480).nullable(),
  energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable(),
  dueDate: z.date().nullable(),
  completedAt: z.date().nullable(),
  sprintsCompleted: z.number().default(0),
  linkedGoalId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  sprintsCompleted: true,
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

// Habit Types
export const HabitSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1).max(200),
  frequency: z.enum(['DAILY', 'WEEKDAYS', 'CUSTOM']).default('DAILY'),
  currentStreak: z.number().default(0),
  longestStreak: z.number().default(0),
  lastCompleted: z.date().nullable(),
  linkedTimerDuration: z.number().min(1).max(480).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateHabitSchema = HabitSchema.omit({
  id: true,
  userId: true,
  currentStreak: true,
  longestStreak: true,
  lastCompleted: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateHabitSchema = CreateHabitSchema.partial();

export type Habit = z.infer<typeof HabitSchema>;
export type CreateHabit = z.infer<typeof CreateHabitSchema>;
export type UpdateHabit = z.infer<typeof UpdateHabitSchema>;

// Note Types
export const NoteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1).max(200),
  content: z.string(),
  tags: z.array(z.string()).default([]),
  notebookId: z.string().nullable(),
  linkedTasks: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateNoteSchema = NoteSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateNoteSchema = CreateNoteSchema.partial();

export type Note = z.infer<typeof NoteSchema>;
export type CreateNote = z.infer<typeof CreateNoteSchema>;
export type UpdateNote = z.infer<typeof UpdateNoteSchema>;

// Focus Session Types
export const FocusSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  duration: z.number().min(1),
  soundscape: z.enum(['SILENCE', 'RAINFALL', 'CAFE', 'WHITE_NOISE']).default('SILENCE'),
  completedAt: z.date(),
  linkedTaskId: z.string().nullable(),
  createdAt: z.date(),
});

export const CreateFocusSessionSchema = FocusSessionSchema.omit({
  id: true,
  userId: true,
  completedAt: true,
  createdAt: true,
});

export type FocusSession = z.infer<typeof FocusSessionSchema>;
export type CreateFocusSession = z.infer<typeof CreateFocusSessionSchema>;

// API Response Types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
  }).optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
};

// Coach Recommendation Types
export const CoachRecommendationSchema = z.object({
  energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  timeAvailable: z.number().min(5).max(480),
});

export type CoachRecommendation = z.infer<typeof CoachRecommendationSchema>;

// Analytics Types
export const AnalyticsPeriodSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

export type AnalyticsPeriod = z.infer<typeof AnalyticsPeriodSchema>;

// Theme Types
export const ThemeSchema = z.enum(['moleskine', 'arcade', 'parchment', 'minimalist']);
export type Theme = z.infer<typeof ThemeSchema>;

// Soundscape Types
export const SoundscapeSchema = z.enum(['SILENCE', 'RAINFALL', 'CAFE', 'WHITE_NOISE']);
export type Soundscape = z.infer<typeof SoundscapeSchema>;

