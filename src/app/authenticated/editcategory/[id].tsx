import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import React, { useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native"
import EmojiSelector from "react-native-emoji-selector"
import { useState } from "react"
import CurrencyInput, { FakeCurrencyInput } from "react-native-currency-input"
import { useRouter, useLocalSearchParams } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EmojiModal from "react-native-emoji-modal"

export default function EditCategory() {
  const [emoji, setEmoji] = useState("🫠")
  const [name, setName] = useState("")
  const [budget, setBudget] = useState(0.0)
  const [displayType, setDisplayType] = useState("weekly")
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const handleUpdateCategory = async () => {
    const res = await fetch(
      "https://interim-ginni-cobbe-6d5420d0.koyeb.app/categories/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          id: id,
          icon: emoji,
          name: name,
          budget: budget,
          display_type: displayType,
        }),
      }
    )
    if (res.ok) {
      alert("Categoria atualizada com sucesso!")
      router.push("/authenticated/categories")
    } else {
      const errorData = await res.json()
      alert(`Erro ao adicionar categoria: ${errorData.detail}`)
    }
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `https://interim-ginni-cobbe-6d5420d0.koyeb.app/categories/${id}`,
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
          setEmoji(data.icon)
          setName(data.name)
          setBudget(data.budget)
          setDisplayType(data.display_type)
        }
      } catch (error) {
        alert(error)
      }
    }
    fetchCategory()
  }, [])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-1 bg-white">
          <View className="flex flex-1 p-5">
            <View className="flex flex-row justify-between items-center">
              <View>
                <TouchableOpacity
                  className="bg-black w-32 h-32 rounded-lg flex items-center justify-center"
                  onPress={() => setIsVisible(true)}
                >
                  <Text className="text-7xl">{emoji ? emoji : "🫠"}</Text>
                </TouchableOpacity>
                <Text className="text-black/30 text-lg">Escolha um ícone.</Text>
              </View>
              <View className="flex flex-col gap-4">
                <View className="flex flex-row gap-2 items-center">
                  <TouchableOpacity
                    className={`${
                      displayType === "weekly" && "bg-green-400"
                    } border-2 rounded-full border-green-500`}
                    style={{ height: 20, width: 20 }}
                    onPress={() => setDisplayType("weekly")}
                  ></TouchableOpacity>
                  <Text className="text-lg">Semanal</Text>
                </View>
                <View className="flex flex-row gap-2 items-center">
                  <TouchableOpacity
                    className={`${
                      displayType === "monthly" && "bg-green-400"
                    } border-2 rounded-full border-green-500`}
                    style={{ height: 20, width: 20 }}
                    onPress={() => setDisplayType("monthly")}
                  ></TouchableOpacity>
                  <Text className="text-lg">Mensal</Text>
                </View>
              </View>
            </View>
            <View className="w-full flex items-center mt-10">
              <Image
                source={require("assets/text.png")}
                className="absolute top-5 z-20 left-5"
              />
              <TextInput
                placeholder="Nome da categoria"
                placeholderTextColor={"#2C9E4C"}
                className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-full text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
                value={name}
                onChange={(e) => setName(e.nativeEvent.text)}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            <View className="w-full flex items-center mt-10">
              <Image
                source={require("assets/money.png")}
                className="absolute top-5 z-20 left-5"
              />
              <CurrencyInput
                value={budget}
                onChangeValue={setBudget}
                placeholderTextColor={"#2C9E4C"}
                placeholder="R$ 0,00"
                className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-full text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
                delimiter="."
                separator=","
                prefix="R$"
                precision={2}
              />
            </View>
            <TouchableOpacity
              className="w-full bg-[#4ECB71] h-16 rounded-md shadow-md flex items-center justify-center mt-10"
              onPress={handleUpdateCategory}
            >
              <Text className="text-white text-lg font-semibold">
                Atualizar Categoria
              </Text>
            </TouchableOpacity>
          </View>
          {isVisible && (
            <View className="flex flex-1 absolute bg-white p-5 pt-20 z-20">
              <EmojiModal
                onEmojiSelected={(emoji) => {
                  setEmoji(emoji)
                  setIsVisible(false)
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
