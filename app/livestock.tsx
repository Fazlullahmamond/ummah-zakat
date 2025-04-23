"use client"

import { useState, useEffect } from "react"
import { Text, StyleSheet, View } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import CurrencyInput from "./components/CurrencyInput"
import ValueDisplay from "./components/ValueDisplay"
import ScreenLayout from "./_layout-template"
import { Feather } from "./navigation/TabIcons"

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
      marginBottom: theme.spacing.s,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.l,
      textAlign: "center",
      opacity: 0.8,
    },
    iconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: theme.spacing.m,
    },
  })

  // Zakat calculations (simplified)
  const camelZakat = Math.floor(Number.parseInt(camels) / 5)
  const cowZakat = Math.floor(Number.parseInt(cows) / 30)
  const goatZakat = Math.floor(Number.parseInt(goats) / 40)
  const sheepZakat = Math.floor(Number.parseInt(sheep) / 40)

  const camelValue = camelZakat * 500
  const cowValue = cowZakat * 300
  const goatValue = goatZakat * 100
  const sheepValue = sheepZakat * 100

  const totalZakat = camelValue + cowValue + goatValue + sheepValue

  return (
    <ScreenLayout>
      {/* Icon at the top in circle */}
      <View style={styles.iconCircle}>
        <Feather color={theme.colors.primary} size={28} />
      </View>

      <Text style={styles.title}>Livestock</Text>
      <Text style={styles.subtitle}>Enter number of camels, cows, goats, and sheep if applicable.</Text>

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
