// Provider-agnostic analytics facade.
//
// The app calls track()/screen() at key moments; by default these are no-ops.
// At app start, wire a real provider (e.g. PostHog) via setAnalyticsBackend()
// once an API key is configured. This keeps the instrumentation in place and
// makes activating a provider a ~10-line change with no app-wide edits.

export type AnalyticsProps = Record<string, string | number | boolean>;

export interface AnalyticsBackend {
  track(event: string, props?: AnalyticsProps): void;
  screen(name: string, props?: AnalyticsProps): void;
}

let backend: AnalyticsBackend | null = null;

export function setAnalyticsBackend(b: AnalyticsBackend | null): void {
  backend = b;
}

export function track(event: string, props?: AnalyticsProps): void {
  try {
    backend?.track(event, props);
  } catch {
    // analytics must never break the app
  }
}

export function screen(name: string, props?: AnalyticsProps): void {
  try {
    backend?.screen(name, props);
  } catch {
    // analytics must never break the app
  }
}

// Stable event taxonomy — keep these names unchanged once a provider is live.
export const Events = {
  AppOpen: "app_open",
  OnboardingComplete: "onboarding_complete",
  ChapterOpen: "chapter_open",
  TheoryOpen: "theory_open",
  LessonStart: "lesson_start",
  LessonComplete: "lesson_complete",
} as const;
