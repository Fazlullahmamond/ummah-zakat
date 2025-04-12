"use client";

import { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "./context/ThemeContext";
import { useZakat } from "./context/ZakatContext";
import ZakatCard from "./components/ZakatCard";
import CurrencyInput from "./components/CurrencyInput";
import ValueDisplay from "./components/ValueDisplay";
import ScreenLayout from "./_layout-template";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "./_TabBar";

export default function CashScreen() {
  const { theme } = useTheme();
  const { values, updateValues, calculations } = useZakat();

  const [cashAtHand, setCashAtHand] = useState(
    values.cash.cashAtHand.toString()
  );
  const [bankAccounts, setBankAccounts] = useState(
    values.cash.bankAccounts.toString()
  );

  useEffect(() => {
    updateValues("cash", {
      cashAtHand: Number.parseFloat(cashAtHand) || 0,
      bankAccounts: Number.parseFloat(bankAccounts) || 0,
    });
  }, [cashAtHand, bankAccounts]);

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
  });

  const totalCash =
    Number.parseFloat(cashAtHand) + Number.parseFloat(bankAccounts) || 0;
  const zakatDue = calculations.cashZakat;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Cash & Bank Savings</Text>
      <Text style={styles.subtitle}>
        Enter your cash at hand and total in all bank accounts.
      </Text>

      <ZakatCard title="Cash Details" delay={100}>
        <CurrencyInput
          label="Cash at Hand"
          value={cashAtHand}
          onChangeText={setCashAtHand}
          hint="Money you have in physical cash"
        />

        <CurrencyInput
          label="Bank Accounts"
          value={bankAccounts}
          onChangeText={setBankAccounts}
          hint="Total amount in all your bank accounts"
        />
      </ZakatCard>

      <ValueDisplay
        items={[
          { label: "Cash at Hand", value: Number.parseFloat(cashAtHand) || 0 },
          {
            label: "Bank Accounts",
            value: Number.parseFloat(bankAccounts) || 0,
          },
        ]}
        total={{
          label: "Zakat Due on Cash",
          value: zakatDue,
        }}
        delay={300}
      />
      <TabBar />
    </SafeAreaView>
  );
}
