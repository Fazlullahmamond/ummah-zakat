"use client"

import { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import CurrencyInput from "./components/CurrencyInput"
import ValueDisplay from "./components/ValueDisplay"
import ScreenLayout from "./_layout-template"

export default function InvestmentsScreen() {
  const { theme } = useTheme()
  const { values, updateValues, calculations } = useZakat()

  const [shares, setShares] = useState(values.investments.shares.toString())
  const [mutualFunds, setMutualFunds] = useState(values.investments.mutualFunds.toString())
  const [crypto, setCrypto] = useState(values.investments.crypto.toString())
  const [otherInvestments, setOtherInvestments] = useState(values.investments.otherInvestments.toString())

  useEffect(() => {
    updateValues("investments", {
      shares: Number.parseFloat(shares) || 0,
      mutualFunds: Number.parseFloat(mutualFunds) || 0,
      crypto: Number.parseFloat(crypto) || 0,
      otherInvestments: Number.parseFloat(otherInvestments) || 0,
    })
  }, [shares, mutualFunds, crypto, otherInvestments])

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
  const totalInvestments =
    Number.parseFloat(shares) +
      Number.parseFloat(mutualFunds) +
      Number.parseFloat(crypto) +
      Number.parseFloat(otherInvestments) || 0
  const zakatDue = calculations.investmentsZakat

  return (
    <ScreenLayout>
      <Text style={styles.title}>Investments</Text>
      <Text style={styles.subtitle}>Zakat on shares, mutual funds, crypto (if applicable in your fiqh).</Text>

      <ZakatCard title="Investment Assets" delay={100}>
        <CurrencyInput label="Shares" value={shares} onChangeText={setShares} hint="Current market value of shares" />

        <CurrencyInput
          label="Mutual Funds"
          value={mutualFunds}
          onChangeText={setMutualFunds}
          hint="Current value of mutual funds"
        />

        <CurrencyInput
          label="Cryptocurrency"
          value={crypto}
          onChangeText={setCrypto}
          hint="Current value of cryptocurrency"
        />

        <CurrencyInput
          label="Other Investments"
          value={otherInvestments}
          onChangeText={setOtherInvestments}
          hint="Value of other investment assets"
        />
      </ZakatCard>

      <ValueDisplay
        items={[
          { label: "Shares", value: Number.parseFloat(shares) || 0 },
          { label: "Mutual Funds", value: Number.parseFloat(mutualFunds) || 0 },
          { label: "Cryptocurrency", value: Number.parseFloat(crypto) || 0 },
          { label: "Other Investments", value: Number.parseFloat(otherInvestments) || 0 },
        ]}
        total={{
          label: "Zakat Due on Investments",
          value: zakatDue,
        }}
        delay={300}
      />
    </ScreenLayout>
  )
}
