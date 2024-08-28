import { View, Text, Modal, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { formatNumber } from "react-native-currency-input"

interface Props {
  date: string
  amount: number
  category: string
  description: string
}

export default function PurchaseCard(props: Props) {
  const [showModal, setShowModal] = useState(false)
  const formattedValue = formatNumber(props.amount, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  })
  const date = new Date(props.date)

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()} - ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  return (
    <>
      <TouchableOpacity
        className="flex flex-row items-center justify-between bg-green-50 rounded-sm p-2 mt-2 odd:bg-green-100"
        onPress={() => setShowModal(true)}
      >
        <View>
          <Text className="text-xl font-semibold">{formattedValue}</Text>
          <Text>{props.category}</Text>
        </View>
        <Text className="font-semibold">{formattedDate}</Text>

        <Modal
          visible={showModal}
          transparent={true}
          onRequestClose={() => setShowModal(false)}
          animationType="fade"
        >
          <View className="flex-1 justify-center w-full flex-col items-center p-5 bg-black/60">
            <View className="bg-white p-5 rounded-lg w-full">
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text className="self-end text-red-500 text-xl font-black">
                  X
                </Text>
              </TouchableOpacity>
              <Text>Valor: {formattedValue}</Text>
              <Text>
                Descricao:{" "}
                {props.description
                  ? props.description
                  : "Descricao nao adicionada"}
              </Text>
              <Text>{formattedDate}</Text>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </>
  )
}
