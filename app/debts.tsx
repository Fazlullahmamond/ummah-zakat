"use client"

import { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import CurrencyInput from "./components/CurrencyInput"
import ValueDisplay from "./components/ValueDisplay"
import ScreenLayout from "./_layout-template"

export default function DebtsScreen() {
  const { theme } = useTheme()
  const { values, updateValues } = useZakat()

  const [shortTermDebts, setShortTermDebts] = useState(values.debts.shortTermDebts.toString())
  const [longTermDebts, setLongTermDebts] = useState(values.debts.longTermDebts.toString())

  useEffect(() => {
    updateValues("debts", {
      shortTermDebts: Number.parseFloat(shortTermDebts) || 0,
      longTermDebts: Number.parseFloat(longTermDebts) || 0,
    })
  }, [shortTermDebts, longTermDebts])

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.l,
      textAlign: "center",
      opacity: 0.8,
    },
  })

  // Calculate values for display
  const totalDebts = Number.parseFloat(shortTermDebts) + Number.parseFloat(longTermDebts) || 0

  return (
    <ScreenLayout>
      <Text style={styles.title}>Debts & Liabilities</Text>
      <Text style={styles.subtitle}>Deduct any immediate debts or bills due within a year.</Text>

      <ZakatCard title="Your Debts" delay={100}>
        <CurrencyInput
          label="Short-term Debts"
          value={shortTermDebts}
          onChangeText={setShortTermDebts}
          hint="Debts due within one year"
        />

        <CurrencyInput
          label="Long-term Debts"
          value={longTermDebts}
          onChangeText={setLongTermDebts}
          hint="Debts due after one year (some scholars exclude these from Zakat calculations)"
        />
      </ZakatCard>

      <ValueDisplay
        items={[
          { label: "Short-term Debts", value: Number.parseFloat(shortTermDebts) || 0 },
          { label: "Long-term Debts", value: Number.parseFloat(longTermDebts) || 0 },
        ]}
        total={{
          label: "Total Debts",
          value: totalDebts,
        }}
        delay={300}
      />
    </ScreenLayout>
  )
}
