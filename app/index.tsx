import { Colors } from "@/constants/theme";
import { hasOnboarded } from "@/lib/onboarding";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function AppEntry() {
  const [target, setTarget] = useState<"/(tabs)/lessons" | "/onboarding" | null>(null);

  useEffect(() => {
    hasOnboarded().then((done) => {
      setTarget(done ? "/(tabs)/lessons" : "/onboarding");
    });
  }, []);

  if (target === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.primaryAccentColor} />
      </View>
    );
  }

  return <Redirect href={target} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfacePrimary,
    alignItems: "center",
    justifyContent: "center",
  },
});
