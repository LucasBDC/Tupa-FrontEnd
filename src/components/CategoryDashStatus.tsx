import { View, Text } from "react-native"
import React from "react"

interface Props {
  name: string
  icon: string
  current_budget: number
  budget: number
}

export default function CategoryDashStatus(props: Props) {
  const [twentypercent, setTwentyPercent] = React.useState(0.2 * props.budget)
  return (
    <View className="flex flex-row justify-between w-full items-center">
      <View className="flex flex-row items-center gap-2">
        <Text className="text-4xl">{props.icon}</Text>
        <Text className="text-xl font-bold">{props.name}</Text>
      </View>
      <View className="flex flex-row gap-4">
        <View
          className={`rounded-full ${
            props.current_budget >= twentypercent
              ? "bg-green-300"
              : props.current_budget < 0
              ? "bg-red-300"
              : "bg-[#FFCC00]"
          }`}
        >
          <Text className="text-lg text-black px-4">
            {props.current_budget}
          </Text>
        </View>
        <Text className="text-lg">{props.budget}</Text>
      </View>
    </View>
  )
}
