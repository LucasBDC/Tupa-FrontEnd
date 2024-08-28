import { View, Text } from "react-native"
import React from "react"
import { formatNumber } from "react-native-currency-input"

interface Props {
  date: string
  amount: number
  category: string
}

export default function PurchaseCard(props: Props) {
  const formattedValue = formatNumber(props.amount, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  })
  return (
    <View className="flex flex-row items-center justify-between bg-green-50 rounded-sm p-2 mt-2 odd:bg-green-100">
      <View>
        <Text className="text-xl font-semibold">{formattedValue}</Text>
        <Text>{props.category}</Text>
      </View>
      <Text className="font-semibold">{props.date}</Text>
    </View>
  )
}
