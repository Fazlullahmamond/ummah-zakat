"use client"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface CurrencyInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  hint?: string
}

export default function CurrencyInput({ label, value, onChangeText, placeholder = "0.00", hint }: CurrencyInputProps) {
  const { theme } = useTheme()

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
    currencySymbol: {
      paddingHorizontal: theme.spacing.m,
      fontSize: 16,
      color: theme.colors.text,
    },
    input: {
      flex: 1,
      padding: theme.spacing.m,
      fontSize: 16,
      color: theme.colors.text,
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.text + "80"}
        />
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  )
}
