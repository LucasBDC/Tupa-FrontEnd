import React from "react"
import { useState, useEffect } from "react"
import { View, Image, TouchableOpacity, Text } from "react-native"
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
        const res = await fetch("http://127.0.0.1:8000/user/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "access_token"
            )}`,
          },
        })
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
      <View className="flex flex-1 items-center  p-5">
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
        <View className="flex flex-col gap-8">
          {categories.map((category: any) => (
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
      <Link href="/addcost" asChild>
        <TouchableOpacity className="absolute bottom-32 right-10 w-16 h-16 bg-green-500 flex items-center justify-center rounded-full">
          <Image source={require("assets/plus.png")} />
        </TouchableOpacity>
      </Link>
      <Footer />
    </View>
  )
}
