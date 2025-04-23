import { useFocusEffect } from "@react-navigation/native"
import { BackHandler, View } from "react-native"
import { useCallback } from "react"
import { usePathname, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useTheme } from "./context/ThemeContext"

export default function RootLayoutNav() {
  const { theme } = useTheme()
  const pathname = usePathname()

  // Disable hardware back button (except for /cash)
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (pathname !== "/cash") {
          return true // Block back
        }
        return false // Allow back
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress)
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [pathname])
  )

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: pathname === "/cash", 
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        />
      </View>
    </SafeAreaProvider>
  )
}
