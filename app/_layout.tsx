"use client"

import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./context/ThemeContext"
import { ZakatProvider } from "./context/ZakatContext"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { useTheme } from "./context/ThemeContext"
import "react-native-gesture-handler"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ZakatProvider>
          <RootLayoutNav />
        </ZakatProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

function RootLayoutNav() {
  const { theme } = useTheme()

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        />
      </View>
    </SafeAreaProvider>
  )
}
