"use client"

import { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import CurrencyInput from "./components/CurrencyInput"
import ValueDisplay from "./components/ValueDisplay"
import ScreenLayout from "./_layout-template"

export default function BusinessScreen() {
  const { theme } = useTheme()
  const { values, updateValues, calculations } = useZakat()

  const [inventory, setInventory] = useState(values.business.inventory.toString())
  const [receivables, setReceivables] = useState(values.business.receivables.toString())
  const [cash, setCash] = useState(values.business.cash.toString())
  const [liabilities, setLiabilities] = useState(values.business.liabilities.toString())

  useEffect(() => {
    updateValues("business", {
      inventory: Number.parseFloat(inventory) || 0,
      receivables: Number.parseFloat(receivables) || 0,
      cash: Number.parseFloat(cash) || 0,
      liabilities: Number.parseFloat(liabilities) || 0,
    })
  }, [inventory, receivables, cash, liabilities])

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
  const totalAssets = Number.parseFloat(inventory) + Number.parseFloat(receivables) + Number.parseFloat(cash) || 0
  const totalLiabilities = Number.parseFloat(liabilities) || 0
  const netAssets = totalAssets - totalLiabilities
  const zakatDue = calculations.businessZakat

  return (
    <ScreenLayout>
      <Text style={styles.title}>Business Assets</Text>
      <Text style={styles.subtitle}>Add value of stock, receivables, and profits held for over a year.</Text>

      <ZakatCard title="Business Assets" delay={100}>
        <CurrencyInput
          label="Inventory/Stock Value"
          value={inventory}
          onChangeText={setInventory}
          hint="Value of goods intended for sale"
        />

        <CurrencyInput
          label="Accounts Receivable"
          value={receivables}
          onChangeText={setReceivables}
          hint="Money owed to your business"
        />

        <CurrencyInput label="Business Cash" value={cash} onChangeText={setCash} hint="Cash in business accounts" />
      </ZakatCard>

      <ZakatCard title="Business Liabilities" delay={200}>
        <CurrencyInput
          label="Liabilities"
          value={liabilities}
          onChangeText={setLiabilities}
          hint="Short-term debts and expenses"
        />
      </ZakatCard>

      <ValueDisplay
        items={[
          { label: "Total Assets", value: totalAssets },
          { label: "Total Liabilities", value: totalLiabilities },
          { label: "Net Assets", value: netAssets },
          { label: "Zakat Due (2.5%)", value: zakatDue, color: theme.colors.primary },
        ]}
        total={{
          label: "Total Zakat Due",
          value: zakatDue,
        }}
        delay={300}
      />
    </ScreenLayout>
  )
}
