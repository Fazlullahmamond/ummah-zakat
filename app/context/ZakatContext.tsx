"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the Zakat calculation constants
const ZAKAT_RATE = 0.025 // 2.5%
const AGRICULTURE_RATE_NATURAL = 0.1 // 10% for natural irrigation
const AGRICULTURE_RATE_ARTIFICIAL = 0.05 // 5% for artificial irrigation

// Define the Nisab threshold (example values - should be updated with current rates)
const NISAB_GOLD_GRAMS = 87.48 // 87.48 grams of gold
const NISAB_SILVER_GRAMS = 612.36 // 612.36 grams of silver

// Default gold and silver prices (should be updated with API)
const DEFAULT_GOLD_PRICE_PER_GRAM = 60 // USD
const DEFAULT_SILVER_PRICE_PER_GRAM = 0.8 // USD

interface ZakatValues {
  cash: {
    cashAtHand: number
    bankAccounts: number
  }
  gold: {
    goldWeight: number
    goldPurity: number
    silverWeight: number
    silverPurity: number
  }
  business: {
    inventory: number
    receivables: number
    cash: number
    liabilities: number
  }
  investments: {
    shares: number
    mutualFunds: number
    crypto: number
    otherInvestments: number
  }
  debts: {
    shortTermDebts: number
    longTermDebts: number
  }
  agriculture: {
    naturalIrrigation: number
    artificialIrrigation: number
  }
  livestock: {
    camels: number
    cows: number
    goats: number
    sheep: number
  }
  sadaqah: {
    monthlyGoal: number
    contributed: number
  }
}

interface ZakatCalculations {
  cashZakat: number
  goldZakat: number
  businessZakat: number
  investmentsZakat: number
  agricultureZakat: number
  livestockZakat: number
  totalZakat: number
  isAboveNisab: boolean
  nisabThreshold: number
}

interface ZakatContextType {
  values: ZakatValues
  calculations: ZakatCalculations
  goldPrice: number
  silverPrice: number
  updateValues: (category: keyof ZakatValues, data: any) => void
  updatePrices: (gold: number, silver: number) => void
  calculateZakat: () => void
}

const defaultZakatValues: ZakatValues = {
  cash: {
    cashAtHand: 0,
    bankAccounts: 0,
  },
  gold: {
    goldWeight: 0,
    goldPurity: 24,
    silverWeight: 0,
    silverPurity: 100,
  },
  business: {
    inventory: 0,
    receivables: 0,
    cash: 0,
    liabilities: 0,
  },
  investments: {
    shares: 0,
    mutualFunds: 0,
    crypto: 0,
    otherInvestments: 0,
  },
  debts: {
    shortTermDebts: 0,
    longTermDebts: 0,
  },
  agriculture: {
    naturalIrrigation: 0,
    artificialIrrigation: 0,
  },
  livestock: {
    camels: 0,
    cows: 0,
    goats: 0,
    sheep: 0,
  },
  sadaqah: {
    monthlyGoal: 0,
    contributed: 0,
  },
}

const defaultCalculations: ZakatCalculations = {
  cashZakat: 0,
  goldZakat: 0,
  businessZakat: 0,
  investmentsZakat: 0,
  agricultureZakat: 0,
  livestockZakat: 0,
  totalZakat: 0,
  isAboveNisab: false,
  nisabThreshold: 0,
}

const ZakatContext = createContext<ZakatContextType>({
  values: defaultZakatValues,
  calculations: defaultCalculations,
  goldPrice: DEFAULT_GOLD_PRICE_PER_GRAM,
  silverPrice: DEFAULT_SILVER_PRICE_PER_GRAM,
  updateValues: () => {},
  updatePrices: () => {},
  calculateZakat: () => {},
})

export const ZakatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [values, setValues] = useState<ZakatValues>(defaultZakatValues)
  const [calculations, setCalculations] = useState<ZakatCalculations>(defaultCalculations)
  const [goldPrice, setGoldPrice] = useState(DEFAULT_GOLD_PRICE_PER_GRAM)
  const [silverPrice, setSilverPrice] = useState(DEFAULT_SILVER_PRICE_PER_GRAM)

  // Function to load data from localStorage, or set default if not found
  const loadFromStorage = () => {
    const savedValues = localStorage.getItem("zakatValues")
    const savedGoldPrice = localStorage.getItem("goldPrice")
    const savedSilverPrice = localStorage.getItem("silverPrice")

    const valuesFromStorage = savedValues ? JSON.parse(savedValues) : defaultZakatValues
    const goldPriceFromStorage = savedGoldPrice ? parseFloat(savedGoldPrice) : DEFAULT_GOLD_PRICE_PER_GRAM
    const silverPriceFromStorage = savedSilverPrice ? parseFloat(savedSilverPrice) : DEFAULT_SILVER_PRICE_PER_GRAM

    setValues(valuesFromStorage)
    setGoldPrice(goldPriceFromStorage)
    setSilverPrice(silverPriceFromStorage)
  }

  // Update values for a specific category
  const updateValues = (category: keyof ZakatValues, data: any) => {
    setValues((prev) => {
      const updatedValues = {
        ...prev,
        [category]: {
          ...prev[category],
          ...data,
        },
      }
      localStorage.setItem("zakatValues", JSON.stringify(updatedValues)) // Save updated values to localStorage
      return updatedValues
    })
  }

  // Update gold and silver prices
  const updatePrices = (gold: number, silver: number) => {
    setGoldPrice(gold)
    setSilverPrice(silver)
    localStorage.setItem("goldPrice", gold.toString())
    localStorage.setItem("silverPrice", silver.toString())
  }

  // Calculate Zakat
  const calculateZakat = () => {
    // Calculate Nisab threshold (using gold standard)
    const nisabThreshold = NISAB_GOLD_GRAMS * goldPrice

    // Calculate Cash Zakat
    const totalCash = values.cash.cashAtHand + values.cash.bankAccounts
    const cashZakat = totalCash * ZAKAT_RATE

    // Calculate Gold & Silver Zakat
    const goldValue = values.gold.goldWeight * (values.gold.goldPurity / 24) * goldPrice
    const silverValue = values.gold.silverWeight * (values.gold.silverPurity / 100) * silverPrice
    const goldZakat = (goldValue + silverValue) * ZAKAT_RATE

    // Calculate Business Zakat
    const businessAssets = values.business.inventory + values.business.receivables + values.business.cash
    const netBusinessAssets = businessAssets - values.business.liabilities
    const businessZakat = Math.max(0, netBusinessAssets) * ZAKAT_RATE

    // Calculate Investments Zakat
    const totalInvestments =
      values.investments.shares +
      values.investments.mutualFunds +
      values.investments.crypto +
      values.investments.otherInvestments
    const investmentsZakat = totalInvestments * ZAKAT_RATE

    // Calculate Agriculture Zakat
    const naturalIrrigationZakat = values.agriculture.naturalIrrigation * AGRICULTURE_RATE_NATURAL
    const artificialIrrigationZakat = values.agriculture.artificialIrrigation * AGRICULTURE_RATE_ARTIFICIAL
    const agricultureZakat = naturalIrrigationZakat + artificialIrrigationZakat

    // Calculate Livestock Zakat (simplified)
    const camelZakat = Math.floor(values.livestock.camels / 5) * 1
    const cowZakat = Math.floor(values.livestock.cows / 30) * 1
    const goatZakat = Math.floor(values.livestock.goats / 40) * 1
    const sheepZakat = Math.floor(values.livestock.sheep / 40) * 1

    const livestockZakat = camelZakat * 500 + cowZakat * 300 + goatZakat * 100 + sheepZakat * 100

    const totalZakatableWealth = totalCash + goldValue + silverValue + Math.max(0, netBusinessAssets) + totalInvestments

    const isAboveNisab = totalZakatableWealth >= nisabThreshold

    const totalZakat = isAboveNisab
      ? cashZakat + goldZakat + businessZakat + investmentsZakat + agricultureZakat + livestockZakat
      : 0

    setCalculations({
      cashZakat,
      goldZakat,
      businessZakat,
      investmentsZakat,
      agricultureZakat,
      livestockZakat,
      totalZakat,
      isAboveNisab,
      nisabThreshold,
    })
  }

  // Load values from localStorage when the component mounts
  useEffect(() => {
    loadFromStorage()
  }, [])

  // Recalculate when values change
  useEffect(() => {
    calculateZakat()
  }, [values, goldPrice, silverPrice])

  return (
    <ZakatContext.Provider
      value={{
        values,
        calculations,
        goldPrice,
        silverPrice,
        updateValues,
        updatePrices,
        calculateZakat,
      }}
    >
      {children}
    </ZakatContext.Provider>
  )
}

export const useZakat = () => useContext(ZakatContext)
