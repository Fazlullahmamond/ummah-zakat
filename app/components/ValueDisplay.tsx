"use client"

import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import Animated, { FadeInUp } from "react-native-reanimated"

interface ValueDisplayProps {
  items: {
    label: string
    value: number
    color?: string
  }[]
  total?: {
    label: string
    value: number
  }
  delay?: number
}

export default function ValueDisplay({ items, total, delay = 0 }: ValueDisplayProps) {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      marginTop: theme.spacing.l,
      backgroundColor: theme.colors.accent,
      borderRadius: theme.borderRadius.m,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    itemsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: theme.spacing.m,
    },
    itemWrapper: {
      width: "48%",
      marginBottom: theme.spacing.m,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.s,
      padding: theme.spacing.m,
      alignItems: "center",
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    itemLabel: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
      textAlign: "center",
    },
    itemValue: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    totalContainer: {
      padding: theme.spacing.m,
      backgroundColor: theme.colors.primary + "15",
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    totalValue: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
  })

  return (
    <Animated.View style={styles.container} entering={FadeInUp.delay(delay).springify()}>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={item.label} style={styles.itemWrapper}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={[styles.itemValue, { color: item.color || theme.colors.text }]}>${item.value.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {total && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{total.label}</Text>
          <Text style={styles.totalValue}>${total.value.toFixed(2)}</Text>
        </View>
      )}
    </Animated.View>
  )
}
