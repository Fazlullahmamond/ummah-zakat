"use client"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import Animated, { FadeIn } from "react-native-reanimated"

interface ZakatSummaryItemProps {
  label: string
  amount: number
  isTotal?: boolean
  delay?: number
}

export default function ZakatSummaryItem({ label, amount, isTotal = false, delay = 0 }: ZakatSummaryItemProps) {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.s,
      borderBottomWidth: isTotal ? 0 : 1,
      borderBottomColor: theme.colors.border,
    },
    totalContainer: {
      marginTop: theme.spacing.s,
      paddingTop: theme.spacing.s,
      borderTopWidth: 2,
      borderTopColor: theme.colors.border,
    },
    label: {
      fontSize: isTotal ? 18 : 16,
      fontWeight: isTotal ? "bold" : "normal",
      color: theme.colors.text,
    },
    amount: {
      fontSize: isTotal ? 18 : 16,
      fontWeight: isTotal ? "bold" : "normal",
      color: isTotal ? theme.colors.primary : theme.colors.text,
    },
  })

  return (
    <Animated.View
      style={[styles.container, isTotal && styles.totalContainer]}
      entering={FadeIn.delay(delay).springify()}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </Animated.View>
  )
}
