/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    backgroundSecondary: "#E9ECEF",
    backgroundThird: "#D2D9DF",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primaryColor: "#42e392",
    activeColor: "#2e302f",
    inactiveColor: "#5c5858",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    backgroundSecondary: "#363433",
    backgroundThird: "#5c5858",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primaryColor: "#42e392",
    activeColor: "#2e302f",
    inactiveColor: "#5c5858",
  },
};
