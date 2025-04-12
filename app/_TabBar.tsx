"use client";

import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "./context/ThemeContext";
import {
  DollarSign,
  GoldIcon,
  Briefcase,
  TrendingUp,
  CreditCard,
  Droplet,
  Feather,
  Heart,
  PieChart,
} from "./navigation/TabIcons";
import { useRouter, usePathname } from "expo-router";

export default function TabBar() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const styles = StyleSheet.create({
    tabBarContainer: {
      borderBottomWidth: 1,
      position: "absolute",
      bottom: 10,
      left: 0,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,

    },
    tabBar: {
      flexDirection: "row",
      paddingVertical: theme.spacing.s,
    },
    tabItem: {
      paddingHorizontal: theme.spacing.m,
      alignItems: "center",
      width: 80, // Fixed width for each tab
    },
    iconContainer: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: theme.colors.card,
    },
    activeIconContainer: {
      backgroundColor: theme.colors.primary + "20",
    },
    tabLabel: {
      fontSize: 12,
      textAlign: "center",
      marginTop: 2,
    },
    activeTabLabel: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
  });

  const tabs = [
    {
      name: "Home",
      icon: (
        <PieChart
          color={
            pathname === "/home" ? theme.colors.primary : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/home",
    },
    {
      name: "Cash",
      icon: (
        <DollarSign
          color={
            pathname === "/cash" ? theme.colors.primary : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/cash",
    },
    {
      name: "Gold",
      icon: (
        <GoldIcon
          color={
            pathname === "/gold" ? theme.colors.primary : theme.colors.text
          }
          size={20}
        />
      ),
      href: "/gold",
    },
    {
      name: "Business",
      icon: (
        <Briefcase
          color={
            pathname === "/business" ? theme.colors.primary : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/business",
    },
    {
      name: "Invest",
      icon: (
        <TrendingUp
          color={
            pathname === "/investments"
              ? theme.colors.primary
              : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/investments",
    },
    {
      name: "Debts",
      icon: (
        <CreditCard
          color={
            pathname === "/debts" ? theme.colors.primary : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/debts",
    },
    {
      name: "Agri",
      icon: (
        <Droplet
          color={
            pathname === "/agriculture"
              ? theme.colors.primary
              : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/agriculture",
    },
    {
      name: "Livestock",
      icon: (
        <Feather
          color={
            pathname === "/livestock" ? theme.colors.primary : theme.colors.text
          }
          size={20}
        />
      ),
      href: "/livestock",
    },
    {
      name: "Sadaqah",
      icon: (
        <Heart
          color={
            pathname === "/sadaqah" ? theme.colors.primary : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/sadaqah",
    },
    {
      name: "Summary",
      icon: (
        <PieChart
          color={
            pathname === "/summary" ? theme.colors.primary : theme.colors.text
          }
          width={20}
          height={20}
        />
      ),
      href: "/summary",
    },
  ] as const;

  return (
    <View style={styles.tabBarContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.s }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => {
              if (pathname !== tab.href) {
                if (tab.href === "/cash") {
                  router.push(tab.href); // Allow back navigation for Cash
                } else {
                  router.replace(tab.href); // Prevent stack buildup for others
                }
              }
            }}
          >
            <View
              style={[
                styles.iconContainer,
                pathname === tab.href && styles.activeIconContainer,
              ]}
            >
              {tab.icon}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
