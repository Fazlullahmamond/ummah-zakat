"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "./context/ThemeContext"
import { useZakat } from "./context/ZakatContext"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { Link } from "expo-router"
import {
  DollarSign,
  GoldIcon,
  Briefcase,
  TrendingUp,
  CreditCard,
  Droplet,
  Feather,
  Heart,
} from "./navigation/TabIcons"
import TabBar from "./_TabBar"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  const { theme } = useTheme()
  const { calculations } = useZakat()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.m,
      backgroundColor: theme.colors.background,
    },
    header: {
      alignItems: "center",
      marginBottom: theme.spacing.l,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: theme.spacing.m,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
      textAlign: "center",
      opacity: 0.8,
    },
    summaryCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      marginBottom: theme.spacing.m,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
      textAlign: "center",
    },
    totalAmount: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.colors.primary,
      textAlign: "center",
      marginBottom: theme.spacing.m,
    },
    nisabStatus: {
      fontSize: 14,
      color: calculations.isAboveNisab ? theme.colors.success : theme.colors.error,
      textAlign: "center",
      fontWeight: "bold",
    },
    categoriesTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
      marginTop: theme.spacing.l,
    },
    categoriesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 50,
      justifyContent: "space-between",
    },
    categoryCard: {
      width: "48%",
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      marginBottom: theme.spacing.m,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    categoryIcon: {
      marginBottom: theme.spacing.s,
    },
    categoryTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
      textAlign: "center",
    },
    categoryDescription: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.7,
      textAlign: "center",
    },
    pattern: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 60,
      height: 60,
      opacity: 0.1,
    },
  })

  const categories = [
    {
      name: "Cash",
      icon: <DollarSign color={theme.colors.primary} width={24} height={24} />,
      description: "Cash at hand and bank accounts",
      href: "/cash",
    },
    {
      name: "Gold & Silver",
      icon: <GoldIcon color={theme.colors.secondary} size={24} />,
      description: "Jewelry and precious metals",
      href: "/gold",
    },
    {
      name: "Business",
      icon: <Briefcase color={theme.colors.primary} width={24} height={24}  />,
      description: "Business assets and inventory",
      href: "/business",
    },
    {
      name: "Investments",
      icon: <TrendingUp color={theme.colors.primary} width={24} height={24}  />,
      description: "Shares, funds, and crypto",
      href: "/investments",
    },
    {
      name: "Debts",
      icon: <CreditCard color={theme.colors.primary} width={24} height={24}  />,
      description: "Deduct eligible debts",
      href: "/debts",
    },
    {
      name: "Agriculture",
      icon: <Droplet color={theme.colors.primary} width={24} height={24}  />,
      description: "Crops and produce",
      href: "/agriculture",
    },
    {
      name: "Livestock",
      icon: <Feather color={theme.colors.primary} size={24} />,
      description: "Camels, cows, goats, sheep",
      href: "/livestock",
    },
    {
      name: "Sadaqah",
      icon: <Heart color={theme.colors.error} width={24} height={24}  />,
      description: "Track voluntary charity",
      href: "/sadaqah",
    },
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 0 }}>
        <Animated.View style={styles.header} entering={FadeInDown.delay(100).springify()}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: theme.colors.accent,
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: theme.spacing.m,
            }}
          >
            <Text style={{ fontSize: 32, color: theme.colors.primary }}>🌙</Text>
          </View>
          <Text style={styles.title}>Ummah Zakat Calculator</Text>
          <Text style={styles.subtitle}>Calculate your Zakat obligations with ease</Text>
        </Animated.View>

        <Animated.View style={styles.summaryCard} entering={FadeInDown.delay(200).springify()}>
          <Text style={styles.summaryTitle}>Your Zakat Summary</Text>
          <Text style={styles.totalAmount}>${calculations.totalZakat.toFixed(2)}</Text>
          <Text style={styles.nisabStatus}>
            {calculations.isAboveNisab
              ? "Your wealth is above Nisab threshold"
              : "Your wealth is below Nisab threshold"}
          </Text>
        </Animated.View>

        <Text style={styles.categoriesTitle}>Categories</Text>

        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <Animated.View
              key={category.name}
              style={styles.categoryCard}
              entering={FadeInUp.delay(300 + index * 50).springify()}
            >
              <Link href={category.href as any} asChild>
                <TouchableOpacity style={{ width: "100%", alignItems: "center" }}>
                  <View style={styles.categoryIcon}>{category.icon}</View>
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </TouchableOpacity>
              </Link>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
      <TabBar />
    </SafeAreaView>
  )
}
