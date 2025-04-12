"use client"

import { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import CurrencyInput from "./components/CurrencyInput"
import ValueDisplay from "./components/ValueDisplay"
import ScreenLayout from "./_layout-template"

export default function LivestockScreen() {
  const { theme } = useTheme()
  const { values, updateValues, calculations } = useZakat()

  const [camels, setCamels] = useState(values.livestock.camels.toString())
  const [cows, setCows] = useState(values.livestock.cows.toString())
  const [goats, setGoats] = useState(values.livestock.goats.toString())
  const [sheep, setSheep] = useState(values.livestock.sheep.toString())

  useEffect(() => {
    updateValues("livestock", {
      camels: Number.parseInt(camels) || 0,
      cows: Number.parseInt(cows) || 0,
      goats: Number.parseInt(goats) || 0,
      sheep: Number.parseInt(sheep) || 0,
    })
  }, [camels, cows, goats, sheep])

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

  // Calculate Zakat for each type of livestock (simplified)
  const camelZakat = Math.floor(Number.parseInt(camels) / 5)
  const cowZakat = Math.floor(Number.parseInt(cows) / 30)
  const goatZakat = Math.floor(Number.parseInt(goats) / 40)
  const sheepZakat = Math.floor(Number.parseInt(sheep) / 40)

  // Convert to monetary value (simplified)
  const camelValue = camelZakat * 500 // Assuming $500 per camel
  const cowValue = cowZakat * 300 // Assuming $300 per cow
  const goatValue = goatZakat * 100 // Assuming $100 per goat
  const sheepValue = sheepZakat * 100 // Assuming $100 per sheep

  const totalZakat = camelValue + cowValue + goatValue + sheepValue

  return (
    <ScreenLayout>
      <Text style={styles.title}>Livestock</Text>
      <Text style={styles.subtitle}>Enter number of camels, cows, goats if applicable.</Text>

      <ZakatCard title="Livestock Assets" delay={100}>
        <CurrencyInput label="Camels" value={camels} onChangeText={setCamels} hint="Number of camels" />

        <CurrencyInput label="Cows" value={cows} onChangeText={setCows} hint="Number of cows" />

        <CurrencyInput label="Goats" value={goats} onChangeText={setGoats} hint="Number of goats" />

        <CurrencyInput label="Sheep" value={sheep} onChangeText={setSheep} hint="Number of sheep" />
      </ZakatCard>

      <ValueDisplay
        items={[
          { label: "Camels", value: camelValue },
          { label: "Cows", value: cowValue },
          { label: "Goats", value: goatValue },
          { label: "Sheep", value: sheepValue },
        ]}
        total={{
          label: "Total Livestock Zakat",
          value: totalZakat,
        }}
        delay={300}
      />
    </ScreenLayout>
  )
}
