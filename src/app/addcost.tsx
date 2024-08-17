import { View, Text, TouchableOpacity, TextInput } from "react-native"
import React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, useRouter } from "expo-router"
import { Modal } from "react-native"
import CurrencyInput, {
  FakeCurrencyInput,
  formatNumber,
} from "react-native-currency-input"

export default function AddCost() {
  const [categories, setCategories] = useState([])
  const [selectedCategoryID, setSelectedCategoryID] = useState(0)
  const [selectedCategoryName, setSelectedCategoryName] = useState("")
  const [selectedCategoryCurrentBudget, setSelectedCategoryCurrentBudget] =
    useState(0.0)
  const [amount, setAmount] = useState(0.0)
  let availableAmount = selectedCategoryCurrentBudget - amount
  const formattedValue = formatNumber(availableAmount, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  })
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleCreateExpense = async () => {
    try {
      const res = await fetch(
        "https://tupa-backend.onrender.com/user/expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "access_token"
            )}`,
          },
          body: JSON.stringify({
            category_id: selectedCategoryID,
            amount: amount,
            category_amount: availableAmount,
          }),
        }
      )
      if (res.ok) {
        const data = await res.json()
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error creating expense:", error)
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "https://tupa-backend.onrender.com/user/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await AsyncStorage.getItem(
                "access_token"
              )}`,
            },
          }
        )
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (error) {
        console.error("Error getting categories:", error)
      }
    }
    getCategories()
  }, [])
  return (
    <View className="flex flex-1">
      <Header />
      <View className="flex flex-1 gap-4 p-5">
        {categories.map((category: any) => (
          <TouchableOpacity
            key={category.id}
            className={`flex flex-row w-full ${
              selectedCategoryID === category.id ? "bg-black/80" : "bg-black/60"
            } py-4 rounded-md items-center justify-center`}
            onPress={() => {
              setSelectedCategoryID(category.id)
              setSelectedCategoryName(category.name)
              setSelectedCategoryCurrentBudget(category.current_budget)
            }}
          >
            <Text className="text-4xl">{category.icon} </Text>
            <Text className="text-xl font-semibold text-white">
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="p-5">
        <Text className="font-medium text-black/40">Selecionada:</Text>
        <Text className="text-black font-bold">{selectedCategoryName}</Text>
      </View>
      <View className="p-5">
        <TouchableOpacity
          className="bg-[#4ECB71] h-16 rounded-md shadow-md flex items-center justify-center"
          onPress={() => setShowModal(true)}
        >
          <Text className="text-white text-xl font-semibold">Avancar</Text>
        </TouchableOpacity>
      </View>
      {showModal && (
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
          transparent={false}
        >
          <View className="flex-1 flex bg-black/40 items-center w-full py-20 p-5">
            <TouchableOpacity
              className="self-end pr-5"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-2xl text-red-500 font-black">X</Text>
            </TouchableOpacity>
            <View className="bg-black/80 w-80 h-80 rounded-3xl flex items-center justify-center mt-10">
              <View className="flex flex-1 justify-center items-center mt-10">
                <CurrencyInput
                  value={amount}
                  onChangeValue={(value) => setAmount(value)}
                  placeholder="R$ 0,00"
                  prefix="R$"
                  precision={2}
                  delimiter="."
                  separator=","
                  className="text-white text-4xl font-bold border-b-2 border-white"
                  placeholderTextColor={"#FFF"}
                  selectionColor={"#FFF"}
                />
              </View>
              <Text className="relative bottom-0 font-medium text-white mb-10 text-xs">
                Você terá: {formattedValue} para gastar em{" "}
                {selectedCategoryName}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-[#4ECB71] h-16 rounded-full shadow-md flex items-center justify-center mt-10 w-80"
              onPress={handleCreateExpense}
            >
              <Text className="text-white text-xl font-semibold">
                Adicionar Despesa
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <Footer />
    </View>
  )
}

interface Props {
  name: string
  current_budget: number
  setShowModal: (value: boolean) => void
}

const FinishForm = (props: Props) => {
  const [amount, setAmount] = useState(0.0)
  let availableAmount = props.current_budget - amount

  return <View></View>
}
