"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import Animated, { FadeInDown } from "react-native-reanimated"

interface ZakatCardProps {
  title: string
  children: React.ReactNode
  delay?: number
}

export default function ZakatCard({ title, children, delay = 0 }: ZakatCardProps) {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      marginBottom: theme.spacing.m,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
      textAlign: "center",
    },
    pattern: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 60,
      height: 60,
      opacity: 0.1,
    },
  })

  return (
    <Animated.View style={styles.container} entering={FadeInDown.delay(delay).springify()}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pattern}>{/* Islamic geometric pattern as background decoration */}</View>
      {children}
    </Animated.View>
  )
}
