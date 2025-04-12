"use client";

import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import { useTheme } from "./context/ThemeContext";
import { useZakat } from "./context/ZakatContext";
import ZakatCard from "./components/ZakatCard";
import ZakatSummaryItem from "./components/ZakatSummaryItem";
import { Download } from "react-native-feather";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ScreenLayout from "./_layout-template";

export default function SummaryScreen() {
  const { theme } = useTheme();
  const { calculations, goldPrice } = useZakat();

  // Animated values for count-up effect
  const animatedTotal = useSharedValue(0);

  useEffect(() => {
    // Animate the total value
    animatedTotal.value = withTiming(calculations.totalZakat, {
      duration: 1500,
    });
  }, [calculations.totalZakat]);

  const animatedTotalStyle = useAnimatedStyle(() => {
    return {
      fontSize: 36,
      fontWeight: "bold",
      color: theme.colors.primary,
    };
  });

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
    totalContainer: {
      alignItems: "center",
      marginBottom: theme.spacing.l,
    },
    totalLabel: {
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
    },
    nisabContainer: {
      flexDirection: "row",
      color: theme.colors.text,
      justifyContent: "space-between",
      backgroundColor: calculations.isAboveNisab
        ? theme.colors.success + "20"
        : theme.colors.error + "20",
      padding: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      marginBottom: theme.spacing.m,
    },
    nisabText: {
      color: calculations.isAboveNisab
        ? theme.colors.success
        : theme.colors.error,
      fontWeight: "bold",
    },
    shareButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.l,
    },
    shareButtonText: {
      color: "white",
      fontWeight: "bold",
      marginLeft: theme.spacing.s,
    },

    donateButton: {
      backgroundColor: theme.colors.secondary,
      padding: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.l,
    },
    donateButtonText: {
      color: "white",
      fontWeight: "bold",
      marginLeft: theme.spacing.s,
    },
  });

  // Format the total for display
  const formattedTotal = calculations.totalZakat.toFixed(2);

  // Share summary function
  const shareSummary = async () => {
    try {
      const message = `
Ummah Zakat Calculator Summary

Total Zakat Due: ${formattedTotal}

Breakdown:
- Cash: ${calculations.cashZakat.toFixed(2)}
- Gold & Silver: ${calculations.goldZakat.toFixed(2)}
- Business: ${calculations.businessZakat.toFixed(2)}
- Investments: ${calculations.investmentsZakat.toFixed(2)}
- Agriculture: ${calculations.agricultureZakat.toFixed(2)}
- Livestock: ${calculations.livestockZakat.toFixed(2)}

Nisab Threshold: ${calculations.nisabThreshold.toFixed(2)}
Status: ${calculations.isAboveNisab ? "Zakat is due" : "Below Nisab threshold"}
      `;

      await Share.share({
        message,
        title: "Zakat Calculation Summary",
      });
    } catch (error) {
      console.error("Error sharing summary:", error);
    }
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Zakat Summary</Text>
      <Text style={styles.subtitle}>
        Complete breakdown of your Zakat obligations
      </Text>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Zakat Due</Text>
        <Animated.Text style={animatedTotalStyle}>
          ${formattedTotal}
        </Animated.Text>
      </View>

      <View style={styles.nisabContainer}>
        <Text>Nisab Threshold (Gold Standard)</Text>
        <Text style={styles.nisabText}>
          ${calculations.nisabThreshold.toFixed(2)}
        </Text>
      </View>

      <View style={styles.nisabContainer}>
        <Text>Status</Text>
        <Text style={styles.nisabText}>
          {calculations.isAboveNisab ? "Zakat is due" : "Below Nisab threshold"}
        </Text>
      </View>

      <ZakatCard title="Breakdown" delay={100}>
        <ZakatSummaryItem
          label="Cash"
          amount={calculations.cashZakat}
          delay={100}
        />
        <ZakatSummaryItem
          label="Gold & Silver"
          amount={calculations.goldZakat}
          delay={200}
        />
        <ZakatSummaryItem
          label="Business Assets"
          amount={calculations.businessZakat}
          delay={300}
        />
        <ZakatSummaryItem
          label="Investments"
          amount={calculations.investmentsZakat}
          delay={400}
        />
        <ZakatSummaryItem
          label="Agriculture"
          amount={calculations.agricultureZakat}
          delay={500}
        />
        <ZakatSummaryItem
          label="Livestock"
          amount={calculations.livestockZakat}
          delay={600}
        />
        <ZakatSummaryItem
          label="Total Zakat"
          amount={calculations.totalZakat}
          isTotal={true}
          delay={700}
        />
      </ZakatCard>

      <TouchableOpacity style={styles.shareButton} onPress={shareSummary}>
        <Download color="white" width={20} height={20} />
        <Text style={styles.shareButtonText}>Share Summary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.donateButton}
        onPress={() => {
          const url = "https://www.example.com/donate";
          Linking.openURL(url).catch((err) =>
            console.error("Failed to open URL:", err)
          );
        }}
      >
        <Text style={styles.donateButtonText}>Donate Now</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}
