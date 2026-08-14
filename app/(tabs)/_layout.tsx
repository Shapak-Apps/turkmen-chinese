import { FontFamily } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryAccentColor,
        tabBarInactiveTintColor: colors.subduedTextColor,
        tabBarStyle: {
          backgroundColor: colors.surfacePrimary,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: 60,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: FontFamily.semibold,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="lessons"
        options={{
          title: "Esasy",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
