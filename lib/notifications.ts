import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// The daily streak reminder was removed in 1.0.2. Up to 1.0.1 the app
// scheduled it every day at 19:00, and an app update does not remove it:
// iOS keeps scheduled notifications itself, and on Android expo-notifications
// re-arms the daily alarm. This clears them on app start.
// Remove this file and expo-notifications once few users are left on 1.0.1.
const LEGACY_CHANNEL_ID = "reminders";

export async function clearLegacyReminders(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // nothing scheduled — fine
  }
  if (Platform.OS === "android") {
    try {
      await Notifications.deleteNotificationChannelAsync(LEGACY_CHANNEL_ID);
    } catch {
      // the channel was never created — fine
    }
  }
}
