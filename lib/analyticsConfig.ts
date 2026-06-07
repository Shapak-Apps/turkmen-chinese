// PostHog project configuration.
//
// To activate analytics:
//   1. Create a free project at https://posthog.com (or your self-hosted instance).
//   2. Settings → Project → copy the "Project API Key". It is a PUBLIC client
//      key (meant to ship in apps), so it's safe to put here.
//   3. Paste it into POSTHOG_API_KEY below.
//
// Until the key is non-empty, analytics stays a no-op (nothing is sent).
// Cloud host: US = https://us.i.posthog.com, EU = https://eu.i.posthog.com
export const POSTHOG_API_KEY = "";
export const POSTHOG_HOST = "https://us.i.posthog.com";
