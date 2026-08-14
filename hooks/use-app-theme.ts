import { Colors, type ThemeColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useAppTheme(): {
  scheme: "light" | "dark";
  isDark: boolean;
  colors: ThemeColors;
} {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  return {
    scheme,
    isDark: scheme === "dark",
    colors: Colors[scheme],
  };
}
