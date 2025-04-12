"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"

// Define theme colors
const lightTheme = {
  colors: {
    primary: "#4CAF50", // Mint green
    secondary: "#D4AF37", // Gold
    background: "#FFFFFF", // White
    card: "#F9F9F9", // Light gray
    text: "#333333", // Dark gray
    border: "#EEEEEE", // Light border
    notification: "#FF9500", // Orange
    error: "#FF3B30", // Red
    success: "#34C759", // Green
    accent: "#F8F4E3", // Light gold/cream
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
}

const darkTheme = {
  colors: {
    primary: "#4CAF50", // Mint green
    secondary: "#D4AF37", // Gold
    background: "#121212", // Dark background
    card: "#1E1E1E", // Dark card
    text: "#FFFFFF", // White text
    border: "#2C2C2C", // Dark border
    notification: "#FF9F0A", // Orange
    error: "#FF453A", // Red
    success: "#30D158", // Green
    accent: "#2D2A1B", // Dark gold/cream
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
}

type Theme = typeof lightTheme

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState(colorScheme === "dark")

  useEffect(() => {
    setIsDark(colorScheme === "dark")
  }, [colorScheme])

  const theme = isDark ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)