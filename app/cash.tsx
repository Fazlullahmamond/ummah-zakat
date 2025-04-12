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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CashScreen() {
  const { theme } = useTheme();
  const { values, updateValues, calculations } = useZakat();

  const [cashAtHand, setCashAtHand] = useState("");
  const [bankAccounts, setBankAccounts] = useState("");

  useEffect(() => {
    async function fetchStoredValues() {
      try {
        // Fetch stored values from AsyncStorage
        const storedCashAtHand = await AsyncStorage.getItem("cashAtHand");
        const storedBankAccounts = await AsyncStorage.getItem("bankAccounts");

        // Log the fetched values for debugging
        console.log("Fetched storedCashAtHand:", storedCashAtHand);
        console.log("Fetched storedBankAccounts:", storedBankAccounts);

        // Only set state from AsyncStorage if it's null, otherwise keep the user input
        setCashAtHand(
          storedCashAtHand !== null
            ? storedCashAtHand
            : values.cash.cashAtHand.toString()
        );

        setBankAccounts(
          storedBankAccounts !== null
            ? storedBankAccounts
            : values.cash.bankAccounts.toString()
        );
      } catch (error) {
        console.error("Error fetching stored values:", error);
        setCashAtHand(values.cash.cashAtHand.toString());
        setBankAccounts(values.cash.bankAccounts.toString());
      }
    }

    fetchStoredValues();
  }, []);

  useEffect(() => {
    // Log to see when we are saving new values to AsyncStorage
    console.log("Saving Cash at Hand to AsyncStorage:", cashAtHand);
    console.log("Saving Bank Accounts to AsyncStorage:", bankAccounts);

    // Store new values into AsyncStorage when they change
    if (cashAtHand) {
      AsyncStorage.setItem("cashAtHand", cashAtHand);
    }
    if (bankAccounts) {
      AsyncStorage.setItem("bankAccounts", bankAccounts);
    }
  }, [cashAtHand, bankAccounts]);

  useEffect(() => {
    // Update context when values change
    updateValues("cash", {
      cashAtHand: parseFloat(cashAtHand) || 0,
      bankAccounts: parseFloat(bankAccounts) || 0,
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

  const totalCash = parseFloat(cashAtHand) + parseFloat(bankAccounts) || 0;
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
          { label: "Cash at Hand", value: parseFloat(cashAtHand) || 0 },
          { label: "Bank Accounts", value: parseFloat(bankAccounts) || 0 },
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
