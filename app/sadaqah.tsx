"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "./context/ThemeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useZakat } from "./context/ZakatContext"
import ZakatCard from "./components/ZakatCard"
import CurrencyInput from "./components/CurrencyInput"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, FadeInUp } from "react-native-reanimated"
import ScreenLayout from "./_layout-template"

export default function SadaqahScreen() {
  const { theme } = useTheme()
  const { values, updateValues } = useZakat()

  // States for monthly goal and contributed amount
  const [monthlyGoal, setMonthlyGoal] = useState("0")
  const [contributed, setContributed] = useState("0")
  const [isLoaded, setIsLoaded] = useState(false) // Flag to ensure async data load first

  useEffect(() => {
    const fetchStoredValues = async () => {
      const storedGoal = await AsyncStorage.getItem("monthlyGoal")
      const storedContributed = await AsyncStorage.getItem("contributed")

      // If values are stored, use them, else fallback to default values
      if (storedGoal !== null) setMonthlyGoal(storedGoal)
      if (storedContributed !== null) setContributed(storedContributed)

      setIsLoaded(true) // Data has been loaded
    }
    fetchStoredValues()
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Update values in the context whenever either monthly goal or contributed value changes
    updateValues("sadaqah", {
      monthlyGoal: Number.parseFloat(monthlyGoal) || 0,
      contributed: Number.parseFloat(contributed) || 0,
    })
  }, [monthlyGoal, contributed, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      // Only update AsyncStorage when data is ready
      AsyncStorage.setItem("monthlyGoal", monthlyGoal)
    }
  }, [monthlyGoal, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      // Only update AsyncStorage when data is ready
      AsyncStorage.setItem("contributed", contributed)
    }
  }, [contributed, isLoaded])

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
    resultContainer: {
      marginTop: theme.spacing.l,
      padding: theme.spacing.m,
      backgroundColor: theme.colors.accent,
      borderRadius: theme.borderRadius.m,
      alignItems: "center",
    },
    resultLabel: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
    },
    resultAmount: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    infoText: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
      marginTop: theme.spacing.s,
      textAlign: "center",
    },
    progressContainer: {
      width: "100%",
      height: 20,
      backgroundColor: theme.colors.border,
      borderRadius: 10,
      marginVertical: theme.spacing.m,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    progressText: {
      position: "absolute",
      width: "100%",
      textAlign: "center",
      color: theme.colors.background,
      fontWeight: "bold",
      fontSize: 12,
      lineHeight: 20,
    },
    quickAddContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.m,
    },
    quickAddButton: {
      backgroundColor: theme.colors.primary + "20",
      paddingVertical: theme.spacing.s,
      paddingHorizontal: theme.spacing.m,
      borderRadius: theme.borderRadius.s,
      alignItems: "center",
      flex: 1,
      marginHorizontal: 4,
    },
    quickAddText: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
  })

  // Calculate progress percentage
  const goalAmount = Number.parseFloat(monthlyGoal) || 0
  const contributedAmount = Number.parseFloat(contributed) || 0
  const progressPercentage = goalAmount > 0 ? Math.min((contributedAmount / goalAmount) * 100, 100) : 0

  // Animated progress bar
  const progressWidth = useSharedValue(progressPercentage)

  useEffect(() => {
    progressWidth.value = withSpring(progressPercentage)
  }, [progressPercentage])

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    }
  })

  // Quick add functions
  const quickAdd = (amount: number) => {
    const newContributed = contributedAmount + amount
    if (newContributed <= goalAmount) {
      setContributed(newContributed.toString())
    } else {
      alert("Contributed amount cannot exceed the monthly goal.")
    }
  }

  return (
    <ScreenLayout>
      <Text style={styles.title}>Sadaqah</Text>
      <Text style={styles.subtitle}>Track and set monthly or one-time sadaqah goals.</Text>

      <ZakatCard title="Sadaqah Goals" delay={100}>
        <CurrencyInput
          label="Monthly Goal"
          value={monthlyGoal}
          onChangeText={setMonthlyGoal}
          hint="Set your monthly sadaqah goal"
        />

        <CurrencyInput
          label="Contributed So Far"
          value={contributed}
          onChangeText={setContributed}
          hint="Amount you've contributed this month"
        />

        <View style={styles.quickAddContainer}>
          <TouchableOpacity style={styles.quickAddButton} onPress={() => quickAdd(5)}>
            <Text style={styles.quickAddText}>+$5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAddButton} onPress={() => quickAdd(10)}>
            <Text style={styles.quickAddText}>+$10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAddButton} onPress={() => quickAdd(20)}>
            <Text style={styles.quickAddText}>+$20</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAddButton} onPress={() => quickAdd(50)}>
            <Text style={styles.quickAddText}>+$50</Text>
          </TouchableOpacity>
        </View>
      </ZakatCard>

      <Animated.View style={styles.resultContainer} entering={FadeInUp.delay(300).springify()}>
        <Text style={styles.resultLabel}>Monthly Progress</Text>

        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, animatedProgressStyle]} />
          <Text style={styles.progressText}>{progressPercentage.toFixed(0)}%</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <Text style={styles.resultLabel}>Contributed</Text>
          <Text style={styles.resultAmount}>${contributedAmount.toFixed(2)}</Text>
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: theme.spacing.s }}
        >
          <Text style={styles.resultLabel}>Goal</Text>
          <Text style={styles.resultAmount}>${goalAmount.toFixed(2)}</Text>
        </View>

        <Text style={styles.infoText}>
          Sadaqah is voluntary charity that can be given at any time. It's a beautiful way to purify your wealth and
          gain blessings. Remember, even a smile is considered sadaqah in Islam.
        </Text>
      </Animated.View>
    </ScreenLayout>
  )
}
