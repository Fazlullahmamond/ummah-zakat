"use client";

import type React from "react";

import { View, ScrollView } from "react-native";
import { useTheme } from "./context/ThemeContext";
import TabBar from "./_TabBar";
import { SafeAreaView } from "react-native-safe-area-context";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ScreenLayout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ScrollView style={{ flex: 1, padding: theme.spacing.m }}>
          {children}
        </ScrollView>
        <TabBar />
      </View>
    </SafeAreaView>
  );
}
