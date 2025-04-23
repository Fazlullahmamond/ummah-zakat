"use client"

import { useState, useEffect } from "react"
import { Text, StyleSheet, View } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import CurrencyInput from "./components/CurrencyInput"
import ValueDisplay from "./components/ValueDisplay"
import ScreenLayout from "./_layout-template"
import { Droplet } from "./navigation/TabIcons"

export default function AgricultureScreen() {
  const { theme } = useTheme()
  const { values, updateValues, calculations } = useZakat()

  const [naturalIrrigation, setNaturalIrrigation] = useState(values.agriculture.naturalIrrigation.toString())
  const [artificialIrrigation, setArtificialIrrigation] = useState(values.agriculture.artificialIrrigation.toString())

  useEffect(() => {
    updateValues("agriculture", {
      naturalIrrigation: Number.parseFloat(naturalIrrigation) || 0,
      artificialIrrigation: Number.parseFloat(artificialIrrigation) || 0,
    })
  }, [naturalIrrigation, artificialIrrigation])

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

  const naturalZakat = Number.parseFloat(naturalIrrigation) * 0.1 || 0
  const artificialZakat = Number.parseFloat(artificialIrrigation) * 0.05 || 0
  const totalZakat = naturalZakat + artificialZakat

  return (
    <ScreenLayout>
      {/* Circular Droplet Icon */}
      <View style={styles.iconCircle}>
        <Droplet color={theme.colors.primary} width={28} height={28} />
      </View>

      <Text style={styles.title}>Agricultural Produce</Text>
      <Text style={styles.subtitle}>10% (without irrigation), 5% (with irrigation) of total produce.</Text>

      <ZakatCard title="Agricultural Assets" delay={100}>
        <CurrencyInput
          label="Natural Irrigation Produce"
          value={naturalIrrigation}
          onChangeText={setNaturalIrrigation}
          hint="Value of produce from rain/natural water sources (10% zakat)"
        />

        <CurrencyInput
          label="Artificial Irrigation Produce"
          value={artificialIrrigation}
          onChangeText={setArtificialIrrigation}
          hint="Value of produce from artificial irrigation (5% zakat)"
        />
      </ZakatCard>

      <ValueDisplay
        items={[
          { label: "Natural (10%)", value: naturalZakat },
          { label: "Artificial (5%)", value: artificialZakat },
        ]}
        total={{
          label: "Total Agricultural Zakat",
          value: totalZakat,
        }}
        delay={300}
      />
    </ScreenLayout>
  )
}
