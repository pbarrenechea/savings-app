import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";
import { Euro, PiggyBank, Cog } from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Sidebar from "@/components/Sidebar";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation("app");
  const colorScheme = useColorScheme();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].inactiveColor,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].primaryColor,
          },
          headerTitleAlign: "center",
          headerTintColor: Colors[colorScheme ?? "light"].activeColor,
          headerShown: true,

          tabBarButton: HapticTab,
          //tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
              backgroundColor: Colors[colorScheme ?? "light"].primaryColor,
            },
            default: {
              backgroundColor: Colors[colorScheme ?? "light"].primaryColor,
              color: Colors[colorScheme ?? "light"].inactiveColor,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="currencies"
          options={{
            title: t("tabs.currencies"),
            tabBarIcon: ({ focused }) => (
              <Euro
                size={28}
                color={
                  focused
                    ? Colors[colorScheme ?? "light"].activeColor
                    : Colors[colorScheme ?? "light"].inactiveColor
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="savings"
          options={{
            title: t("tabs.savings"),
            tabBarIcon: ({ focused }) => (
              <PiggyBank
                size={28}
                color={
                  focused
                    ? Colors[colorScheme ?? "light"].activeColor
                    : Colors[colorScheme ?? "light"].inactiveColor
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t("tabs.settings"),
            tabBarIcon: ({ focused }) => (
              <Cog
                size={28}
                color={
                  focused
                    ? Colors[colorScheme ?? "light"].activeColor
                    : Colors[colorScheme ?? "light"].inactiveColor
                }
              />
            ),
          }}
        />
      </Tabs>
      {sideBarVisible && <Sidebar setSidebarVisibility={setSideBarVisible} />}
    </>
  );
}
