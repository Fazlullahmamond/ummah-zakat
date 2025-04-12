"use client"

import { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import WeightInput from "./components/WeightInput"
import CurrencyInput from "./components/CurrencyInput"
import ValueDisplay from "./components/ValueDisplay"
import ScreenLayout from "./_layout-template"

export default function GoldScreen() {
  const { theme } = useTheme()
  const { values, updateValues, calculations, goldPrice, silverPrice, updatePrices } = useZakat()

  const [goldWeight, setGoldWeight] = useState(values.gold.goldWeight.toString())
  const [goldPurity, setGoldPurity] = useState(values.gold.goldPurity.toString())
  const [silverWeight, setSilverWeight] = useState(values.gold.silverWeight.toString())
  const [silverPurity, setSilverPurity] = useState(values.gold.silverPurity.toString())
  const [goldPriceInput, setGoldPriceInput] = useState(goldPrice.toString())
  const [silverPriceInput, setSilverPriceInput] = useState(silverPrice.toString())

  useEffect(() => {
    updateValues("gold", {
      goldWeight: Number.parseFloat(goldWeight) || 0,
      goldPurity: Number.parseFloat(goldPurity) || 24,
      silverWeight: Number.parseFloat(silverWeight) || 0,
      silverPurity: Number.parseFloat(silverPurity) || 100,
    })

    updatePrices(Number.parseFloat(goldPriceInput) || 60, Number.parseFloat(silverPriceInput) || 0.8)
  }, [goldWeight, goldPurity, silverWeight, silverPurity, goldPriceInput, silverPriceInput])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.m,
      backgroundColor: theme.colors.background,
    },
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
    infoText: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
      marginTop: theme.spacing.s,
      textAlign: "center",
    },
  })

  // Calculate values for display
  const goldValue =
    Number.parseFloat(goldWeight) * (Number.parseFloat(goldPurity) / 24) * Number.parseFloat(goldPriceInput) || 0
  const silverValue =
    Number.parseFloat(silverWeight) * (Number.parseFloat(silverPurity) / 100) * Number.parseFloat(silverPriceInput) || 0
  const totalValue = goldValue + silverValue
  const zakatDue = calculations.goldZakat

  return (
    <ScreenLayout>
      <Text style={styles.title}>Gold & Silver</Text>
      <Text style={styles.subtitle}>Input weight and purity of gold/silver in grams or tolas.</Text>

      <ZakatCard title="Gold Details" delay={100}>
        <WeightInput
          label="Gold Weight"
          value={goldWeight}
          onChangeText={setGoldWeight}
          hint="Weight of gold in grams or tolas"
        />

        <CurrencyInput
          label="Gold Purity (Karat)"
          value={goldPurity}
          onChangeText={setGoldPurity}
          hint="24K is pure gold, 22K is 91.7% pure, 18K is 75% pure"
        />

        <CurrencyInput
          label="Gold Price per Gram (USD)"
          value={goldPriceInput}
          onChangeText={setGoldPriceInput}
          hint="Current market price"
        />
      </ZakatCard>

      <ZakatCard title="Silver Details" delay={200}>
        <WeightInput
          label="Silver Weight"
          value={silverWeight}
          onChangeText={setSilverWeight}
          hint="Weight of silver in grams or tolas"
        />

        <CurrencyInput
          label="Silver Purity (%)"
          value={silverPurity}
          onChangeText={setSilverPurity}
          hint="100% is pure silver, 92.5% is sterling silver"
        />

        <CurrencyInput
          label="Silver Price per Gram (USD)"
          value={silverPriceInput}
          onChangeText={setSilverPriceInput}
          hint="Current market price"
        />
      </ZakatCard>

      <ValueDisplay
        items={[
          { label: "Gold Value", value: goldValue },
          { label: "Silver Value", value: silverValue },
          { label: "Total Value", value: totalValue },
          { label: "Zakat Due", value: zakatDue, color: theme.colors.primary },
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
