import PostHog from "posthog-react-native";
import { setAnalyticsBackend } from "@/lib/analytics";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "@/lib/analyticsConfig";

let posthog: PostHog | null = null;

/**
 * Wire PostHog as the analytics backend. Safe to call on every app start:
 * it is a no-op until POSTHOG_API_KEY is configured, and initialises once.
 */
export function initAnalytics(): void {
  if (!POSTHOG_API_KEY || posthog) return;
  posthog = new PostHog(POSTHOG_API_KEY, { host: POSTHOG_HOST });
  setAnalyticsBackend({
    track: (event, props) => posthog?.capture(event, props),
    screen: (name, props) => posthog?.screen(name, props),
  });
}
