import { DollarSign, Briefcase, TrendingUp, CreditCard, Droplet, PieChart, Heart } from "react-native-feather"
import { SvgXml } from "react-native-svg"

// Custom Gold Icon
export const GoldIcon = ({ color, size }: { color: string; size: number }) => {
  const goldSvg = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L4 9V21H20V9L12 3Z" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8L8 11V17H16V11L12 8Z" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  `
  return <SvgXml xml={goldSvg} width={size} height={size} />
}

// Custom Feather Icon for Livestock
export const Feather = ({ color, size }: { color: string; size: number }) => {
  const featherSvg = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58722 21.9983 7.99504C21.9983 6.40285 21.3658 4.87588 20.24 3.75004C19.1142 2.62419 17.5872 1.9917 15.995 1.9917C14.4028 1.9917 12.8758 2.62419 11.75 3.75004L4 11.5V20H12.5L20.24 12.24Z" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8L2 22" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 15H9" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  `
  return <SvgXml xml={featherSvg} width={size} height={size} />
}

export { DollarSign, Briefcase, TrendingUp, CreditCard, Droplet, PieChart, Heart }
