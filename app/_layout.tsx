import { Events, track } from "@/lib/analytics";
import { initAnalytics } from "@/lib/analyticsProvider";
import { syncStreakReminder } from "@/lib/notifications";
import { getSettings } from "@/lib/settings";
import { checkAndResetIfNeeded } from "@/lib/streak";
import { runMigrations } from "@/storage/migrations";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    runMigrations().finally(() => setMigrated(true));
  }, []);

  useEffect(() => {
    if ((loaded || error) && migrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error, migrated]);

  useEffect(() => {
    initAnalytics();
    track(Events.AppOpen);
    void checkAndResetIfNeeded();
    void getSettings().then((s) => syncStreakReminder(s.remindersEnabled));
  }, []);

  if ((!loaded && !error) || !migrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <GestureHandlerRootView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: "#B91C1C",
    alignItems: "center",
    justifyContent: "center",
  },
});
