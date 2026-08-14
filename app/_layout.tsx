import { Events, track } from "@/lib/analytics";
import { initAnalytics } from "@/lib/analyticsProvider";
import { syncStreakReminder } from "@/lib/notifications";
import { getSettings } from "@/lib/settings";
import { checkAndResetIfNeeded } from "@/lib/streak";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  type Theme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  useEffect(() => {
    initAnalytics();
    track(Events.AppOpen);
    void checkAndResetIfNeeded();
    void getSettings().then((s) => syncStreakReminder(s.remindersEnabled));
  }, []);

  const navigationTheme = useMemo<Theme>(() => {
    const base = scheme === "dark" ? DarkTheme : DefaultTheme;
    const c = Colors[scheme];
    return {
      ...base,
      dark: scheme === "dark",
      colors: {
        ...base.colors,
        primary: c.primaryAccentColor,
        background: c.background,
        card: c.surfacePrimary,
        text: c.textPrimary,
        border: c.borderColor,
        notification: c.primaryAccentColor,
      },
    };
  }, [scheme]);

  if (!loaded && !error) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={navigationTheme}>
      <GestureHandlerRootView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
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
