"use client"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"
import { useTheme } from "../context/ThemeContext"
import { useZakat } from "../context/ZakatContext"
import Animated, { FadeInUp } from "react-native-reanimated"

const { width } = Dimensions.get("window")

export default function ZakatBarChart() {
  const { theme } = useTheme()
  const { calculations } = useZakat()

  const styles = StyleSheet.create({
    container: {
      marginVertical: theme.spacing.l,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
      textAlign: "center",
    },
    chartContainer: {
      alignItems: "center",
      marginTop: theme.spacing.s,
    },
    legendContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: theme.spacing.m,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: theme.spacing.m,
      marginBottom: theme.spacing.s,
    },
    legendColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 4,
    },
    legendText: {
      fontSize: 12,
      color: theme.colors.text,
    },
  })

  // Prepare data for the chart
  const chartData = {
    labels: ["Cash", "Gold", "Biz", "Invest", "Agri", "Live"],
    datasets: [
      {
        data: [
          calculations.cashZakat,
          calculations.goldZakat,
          calculations.businessZakat,
          calculations.investmentsZakat,
          calculations.agricultureZakat,
          calculations.livestockZakat,
        ],
      },
    ],
  }

  // Find the maximum value for setting the Y-axis scale
  const maxValue = Math.max(...chartData.datasets[0].data)
  const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.2) : 100

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.colors.primary,
    labelColor: (opacity = 1) => theme.colors.text,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
    propsForLabels: {
      fontSize: 10,
    },
  }

  // Colors for the bars
  const colors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.primary + "CC", // 80% opacity
    theme.colors.primary + "99", // 60% opacity
    theme.colors.primary + "66", // 40% opacity
    theme.colors.primary + "33", // 20% opacity
  ]

  // Legend items
  const legendItems = [
    { label: "Cash", color: colors[0] },
    { label: "Gold & Silver", color: colors[1] },
    { label: "Business", color: colors[2] },
    { label: "Investments", color: colors[3] },
    { label: "Agriculture", color: colors[4] },
    { label: "Livestock", color: colors[5] },
  ]

  return (
    <Animated.View style={styles.container} entering={FadeInUp.delay(250).springify()}>
      <Text style={styles.title}>Your Zakat by Category</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={width - theme.spacing.m * 4}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          yAxisLabel="$"
          yAxisSuffix=""
          // yAxisMax is not supported, adjust data or chartConfig if needed
          showBarTops={true}
          showValuesOnTopOfBars={true}
          withInnerLines={true}
          segments={5}
          style={{
            borderRadius: theme.borderRadius.m,
            paddingRight: 0,
          }}
          flatColor={true}
          withCustomBarColorFromData={true}
          // customBarColors is not supported, consider using chartConfig or modifying the dataset
        />
      </View>
      <View style={styles.legendContainer}>
        {legendItems.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  )
}
