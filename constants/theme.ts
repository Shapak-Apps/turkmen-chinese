import { Platform, TextStyle } from "react-native";

const RED_500 = "#B91C1C";
const RED_600 = "#991B1B";
const RED_50 = "#FEF2F2";
const RED_100 = "#FEE2E2";

const GREEN_500 = "#00853E";
const GREEN_600 = "#006B30";
const GREEN_50 = "#ECFDF5";
const GREEN_100 = "#D1FAE5";

const SLATE_900 = "#0F172A";
const SLATE_700 = "#334155";
const SLATE_500 = "#64748B";
const SLATE_300 = "#CBD5E1";
const SLATE_200 = "#E2E8F0";
const SLATE_100 = "#F1F5F9";
const SLATE_50 = "#F8FAFC";

const AMBER_500 = "#D97706";
const AMBER_700 = "#B45309";
const AMBER_50 = "#FFFBEB";

export const Palette = {
  red: { 50: RED_50, 100: RED_100, 500: RED_500, 600: RED_600 },
  green: { 50: GREEN_50, 100: GREEN_100, 500: GREEN_500, 600: GREEN_600 },
  slate: {
    50: SLATE_50,
    100: SLATE_100,
    200: SLATE_200,
    300: SLATE_300,
    500: SLATE_500,
    700: SLATE_700,
    900: SLATE_900,
  },
  amber: { 50: AMBER_50, 500: AMBER_500, 700: AMBER_700 },
  white: "#FFFFFF",
  black: "#000000",
};

export const Colors = {
  primaryAccentColor: RED_500,
  primaryAccentColorDark: RED_600,
  primaryAccentBg: RED_50,
  primaryAccentBgStrong: RED_100,

  successColor: GREEN_500,
  successColorDark: GREEN_600,
  successBg: GREEN_50,
  successBgStrong: GREEN_100,

  warningColor: AMBER_500,
  // Text needs the darker amber: AMBER_500 on white is 3.19:1 and fails WCAG AA
  // for small text. AMBER_700 is 5.02:1 on white and 4.84:1 on warningBg.
  // Icons, borders and fills keep AMBER_500 — 4.5:1 does not apply to them.
  warningTextColor: AMBER_700,
  warningBg: AMBER_50,

  textPrimary: SLATE_900,
  textSecondary: SLATE_700,
  subduedTextColor: SLATE_500,
  textInverse: "#FFFFFF",

  borderColor: SLATE_200,
  borderColorStrong: SLATE_300,
  divider: SLATE_100,

  surfacePrimary: "#FFFFFF",
  surfaceSecondary: SLATE_50,
  surfaceTertiary: SLATE_100,

  light: {
    text: SLATE_900,
    background: "#FFFFFF",
    tint: RED_500,
    icon: SLATE_500,
    tabIconDefault: SLATE_500,
    tabIconSelected: RED_500,
  },
  dark: {
    text: "#ECEDEE",
    background: "#0F172A",
    tint: "#FFFFFF",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#FFFFFF",
  },
};

const interFontFamily = Platform.select({
  ios: { regular: "Inter_400Regular", medium: "Inter_500Medium", semibold: "Inter_600SemiBold", bold: "Inter_700Bold" },
  android: { regular: "Inter_400Regular", medium: "Inter_500Medium", semibold: "Inter_600SemiBold", bold: "Inter_700Bold" },
  default: { regular: "Inter_400Regular", medium: "Inter_500Medium", semibold: "Inter_600SemiBold", bold: "Inter_700Bold" },
})!;

export const FontFamily = {
  regular: interFontFamily.regular,
  medium: interFontFamily.medium,
  semibold: interFontFamily.semibold,
  bold: interFontFamily.bold,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: interFontFamily.regular,
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: interFontFamily.regular,
    serif: "serif",
    rounded: interFontFamily.regular,
    mono: "monospace",
  },
  web: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "Inter, system-ui, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

export const Type: Record<
  | "h1"
  | "h2"
  | "h3"
  | "title"
  | "subtitle"
  | "body"
  | "bodyMedium"
  | "bodySemibold"
  | "small"
  | "smallMedium"
  | "label"
  | "caption"
  | "button",
  TextStyle
> = {
  h1: { fontFamily: FontFamily.bold, fontSize: 32, lineHeight: 40, letterSpacing: -0.5 },
  h2: { fontFamily: FontFamily.bold, fontSize: 26, lineHeight: 32, letterSpacing: -0.3 },
  h3: { fontFamily: FontFamily.bold, fontSize: 22, lineHeight: 28, letterSpacing: -0.2 },
  title: { fontFamily: FontFamily.semibold, fontSize: 18, lineHeight: 24 },
  subtitle: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 22 },
  body: { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 24 },
  bodySemibold: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 24 },
  small: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 20 },
  smallMedium: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: FontFamily.semibold, fontSize: 13, lineHeight: 18, letterSpacing: 0.5, textTransform: "uppercase" },
  caption: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 16 },
  button: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22 },
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
};

export const Shadow = {
  sm: Platform.select({
    ios: { shadowColor: "#0F172A", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    android: { elevation: 1 },
    default: {},
  })!,
  md: Platform.select({
    ios: { shadowColor: "#0F172A", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
    android: { elevation: 2 },
    default: {},
  })!,
  lg: Platform.select({
    ios: { shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16 },
    android: { elevation: 4 },
    default: {},
  })!,
};
