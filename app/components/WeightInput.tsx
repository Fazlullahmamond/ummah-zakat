"use client"

import { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface WeightInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  hint?: string
}

export default function WeightInput({ label, value, onChangeText, placeholder = "0.00", hint }: WeightInputProps) {
  const { theme } = useTheme()
  const [unit, setUnit] = useState<"g" | "tola">("g")

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.m,
    },
    label: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.background,
    },
    input: {
      flex: 1,
      padding: theme.spacing.m,
      fontSize: 16,
      color: theme.colors.text,
    },
    unitSelector: {
      flexDirection: "row",
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
    },
    unitButton: {
      paddingHorizontal: theme.spacing.m,
      paddingVertical: theme.spacing.s,
    },
    unitButtonActive: {
      backgroundColor: theme.colors.primary + "20",
    },
    unitText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    unitTextActive: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    hint: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.6,
      marginTop: 4,
    },
  })

  const handleChangeText = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleanedText = text.replace(/[^0-9.]/g, "")

    // Ensure only one decimal point
    const parts = cleanedText.split(".")
    if (parts.length > 2) {
      return
    }

    onChangeText(cleanedText)
  }

  const toggleUnit = (selectedUnit: "g" | "tola") => {
    if (unit !== selectedUnit) {
      setUnit(selectedUnit)

      // Convert the value between grams and tolas (1 tola = 11.664 grams)
      if (value) {
        const numValue = Number.parseFloat(value)
        if (!isNaN(numValue)) {
          let convertedValue: number

          if (selectedUnit === "tola") {
            // Convert from grams to tolas
            convertedValue = numValue / 11.664
          } else {
            // Convert from tolas to grams
            convertedValue = numValue * 11.664
          }

          onChangeText(convertedValue.toFixed(2))
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.text + "80"}
        />
        <View style={styles.unitSelector}>
          <TouchableOpacity
            style={[styles.unitButton, unit === "g" && styles.unitButtonActive]}
            onPress={() => toggleUnit("g")}
          >
            <Text style={[styles.unitText, unit === "g" && styles.unitTextActive]}>g</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, unit === "tola" && styles.unitButtonActive]}
            onPress={() => toggleUnit("tola")}
          >
            <Text style={[styles.unitText, unit === "tola" && styles.unitTextActive]}>tola</Text>
          </TouchableOpacity>
        </View>
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  )
}
