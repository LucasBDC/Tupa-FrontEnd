import React from "react"
import { useState, useEffect } from "react"
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CategoryDashStatus from "@/components/CategoryDashStatus"
import { Link } from "expo-router"

export default function Dashboard() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "https://interim-ginni-cobbe-6d5420d0.koyeb.app/user/categories",
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

  const weeklyCategories = categories.filter(
    (category: any) => category.display_type === "weekly"
  )
  const monthlyCategories = categories.filter(
    (category: any) => category.display_type === "monthly"
  )

  return (
    <View className="flex flex-1 bg-white">
      <ScrollView contentContainerClassName="flex items-center  p-5">
        <View className="flex flex-row justify-between w-full items-center mb-6">
          <View className="flex flex-row items-center gap-2 ">
            <Text className="text-3xl font-semibold text-black/40">
              Categoria:
            </Text>
          </View>
          <View className="flex flex-row gap-0 items-center">
            <Text className="text-lg rounded-full text-black px-4">Atual:</Text>
            <Text className="text-lg">Total:</Text>
          </View>
        </View>

        {/* Weekly Categories */}
        <View className="w-full">
          <Text className="text-xl font-semibold text-black/60">Semanal:</Text>
          <View className="flex flex-col gap-8">
            {weeklyCategories.map((category: any) => (
              <CategoryDashStatus
                key={category.id}
                name={category.name}
                icon={category.icon}
                current_budget={category.current_budget}
                budget={category.budget}
              />
            ))}
          </View>
        </View>
        <View className="w-full border-b-2  border-black/20 mt-5"></View>
        {/* Monthly Categories */}
        <View className="w-full mt-5 mb-10">
          <Text className="text-xl font-semibold text-black/60">Mensal:</Text>
          <View className="flex flex-col gap-8">
            {monthlyCategories.map((category: any) => (
              <CategoryDashStatus
                key={category.id}
                name={category.name}
                icon={category.icon}
                current_budget={category.current_budget}
                budget={category.budget}
              />
            ))}
          </View>
        </View>
        <Link href="/authenticated/addcategory" asChild>
          <TouchableOpacity className=" border-2 border-dashed flex justify-center items-center w-full rounded-lg mt-10 border-black/60">
            <Text className="t p-3 text-black/60 font-medium">
              Adicionar Categoria
            </Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
      <Link
        href="/authenticated/addcost"
        asChild
        className="absolute bottom-12 right-10"
        style={{ position: "absolute", bottom: 12, right: 10 }}
      >
        <TouchableOpacity className="w-16 h-16 bg-green-500 flex items-center justify-center rounded-full">
          <Image source={require("assets/plus.png")} />
        </TouchableOpacity>
      </Link>
    </View>
  )
}
