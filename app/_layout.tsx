import "react-native-reanimated";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { DatabaseProvider } from "@nozbe/watermelondb/DatabaseProvider";
import CurrenciesContextProvider from "@/store/currencies.context";
import SavingsContextProvider from "@/store/savings.context";
import SettingsContextProvider from "@/store/settings.context";
import database from "@/db/database";
import "@/i18n";
import { useTranslation } from "react-i18next";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation("app");
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <DatabaseProvider database={database}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SettingsContextProvider>
          <CurrenciesContextProvider>
            <SavingsContextProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(currencies)/manageCurrency"
                  options={{
                    presentation: "modal",
                    headerTitleAlign: "center",
                    headerStyle: {
                      backgroundColor:
                        Colors[colorScheme ?? "light"].primaryColor,
                    },
                    headerTintColor: Colors[colorScheme ?? "light"].activeColor,
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft
                          size={28}
                          color={Colors[colorScheme ?? "light"].activeColor}
                        ></ArrowLeft>
                      </TouchableOpacity>
                    ),
                  }}
                />
                <Stack.Screen
                  name="(savings)/manageSaving"
                  options={{
                    presentation: "modal",
                    headerTitleAlign: "center",
                    headerStyle: {
                      backgroundColor:
                        Colors[colorScheme ?? "light"].primaryColor,
                    },
                    headerTintColor: Colors[colorScheme ?? "light"].activeColor,
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft
                          size={28}
                          color={Colors[colorScheme ?? "light"].activeColor}
                        ></ArrowLeft>
                      </TouchableOpacity>
                    ),
                  }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </SavingsContextProvider>
          </CurrenciesContextProvider>
        </SettingsContextProvider>
      </ThemeProvider>
    </DatabaseProvider>
  );
}
