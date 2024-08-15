import { View, Text } from "react-native"
import React from "react"

interface Props {
  name: string
  icon: string
  current_budget: number
  budget: number
}

export default function CategoryDashStatus(props: Props) {
  return (
    <View className="flex flex-row justify-between w-full items-center">
      <View className="flex flex-row items-center gap-2">
        <Text className="text-4xl">{props.icon}</Text>
        <Text className="text-xl font-bold">{props.name}</Text>
      </View>
      <View className="flex flex-row gap-4">
        <View className="bg-green-300 rounded-full">
          <Text className="text-lg   text-black px-4">
            {props.current_budget}
          </Text>
        </View>
        <Text className="text-lg">{props.budget}</Text>
      </View>
    </View>
  )
}
