import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link } from "expo-router"
import React, { useEffect, useState } from "react"
import { View, Text, Touchable, TouchableOpacity } from "react-native"

export default function Categories() {
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
      <View className="flex flex-1 flex-col items-center p-5">
        <Text className="text-2xl font-black self-start">Categorias:</Text>

        <View className="flex flex-row flex-wrap gap-5 items-center justify-center">
          {categories.map((category: any) => (
            <Link href={`/category/${category.id}`} asChild key={category.id}>
              <TouchableOpacity className="w-2/5 bg-black/60 rounded-md shadow-md flex items-center justify-center mt-2 flex-col p-4 h-32">
                <Text className="text-5xl">{category.icon}</Text>
                <Text className="text-white text-xl font-semibold">
                  {category.name}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        <Link href="/addcategory" asChild>
          <TouchableOpacity className="w-full bg-[#4ECB71] h-16 rounded-md shadow-md flex items-center justify-center mt-10">
            <Text className="text-white text-xl font-semibold">
              Adicionar Categoria
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Footer />
    </View>
  )
}
