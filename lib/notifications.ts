import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { T } from "@/lib/strings";

const STREAK_REMINDER_ID = "streak-reminder";
const CHANNEL_ID = "reminders";
const REMINDER_HOUR = 19; // 19:00 local time
const REMINDER_MINUTE = 0;

// Show scheduled local notifications while the app is foregrounded too.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return;
  try {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Ýatlatmalar",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  } catch {
    // channel setup is best-effort
  }
}

/** Prompts only if the permission is still undetermined; otherwise returns the current grant. */
async function requestPermission(): Promise<boolean> {
  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    if (!current.canAskAgain) return false;
    const asked = await Notifications.requestPermissionsAsync();
    return asked.granted;
  } catch {
    return false;
  }
}

async function cancelStreakReminder(): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(STREAK_REMINDER_ID);
  } catch {
    // nothing scheduled — fine
  }
}

async function scheduleStreakReminder(): Promise<void> {
  await ensureAndroidChannel();
  await cancelStreakReminder();
  try {
    await Notifications.scheduleNotificationAsync({
      identifier: STREAK_REMINDER_ID,
      content: {
        title: T.notifications.reminderTitle,
        body: T.notifications.reminderBody,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: REMINDER_HOUR,
        minute: REMINDER_MINUTE,
        channelId: CHANNEL_ID,
      },
    });
  } catch {
    // scheduling failed (e.g. permission revoked) — non-fatal
  }
}

/**
 * Reconcile the daily streak reminder with the user's preference.
 * Call on app start and whenever the setting changes.
 */
export async function syncStreakReminder(enabled: boolean): Promise<void> {
  if (!enabled) {
    await cancelStreakReminder();
    return;
  }
  const granted = await requestPermission();
  if (granted) {
    await scheduleStreakReminder();
  } else {
    await cancelStreakReminder();
  }
}
