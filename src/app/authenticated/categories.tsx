import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { Modal } from "react-native"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>({})
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

  const handleDeleteCategory = async () => {
    try {
      const res = await fetch(
        `https://interim-ginni-cobbe-6d5420d0.koyeb.app/categories/categories/${selectedCategory.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "access_token"
            )}`,
          },
        }
      )

      if (res.ok) {
        setIsModalVisible(false)
        const newCategories = categories.filter(
          (category: any) => category.id !== selectedCategory.id
        )
        setCategories(newCategories)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View className="flex flex-1 bg-white">
      <View className="flex flex-1 flex-col items-center p-5">
        <Text className="text-2xl font-black self-start">Categorias:</Text>

        <ScrollView contentContainerClassName="flex flex-row flex-wrap gap-5 items-center justify-center">
          {categories.map((category: any) => (
            <TouchableOpacity
              className="w-2/5 bg-black/60 rounded-md shadow-md flex items-center justify-center mt-2 flex-col p-4 h-32"
              onPress={() => {
                setSelectedCategory(category)
                setIsModalVisible(true)
              }}
              key={category.id}
            >
              <Text className="text-3xl">{category.icon}</Text>
              <Text className="text-white text-xl font-semibold">
                {category.name.slice(0, 10) + "."}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Link href="/authenticated/addcategory" asChild>
          <TouchableOpacity className="w-full bg-[#4ECB71] h-16 rounded-md shadow-md flex items-center justify-center mt-10">
            <Text className="text-white text-xl font-semibold">
              Adicionar Categoria
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View className="flex flex-1 justify-center w-full flex-col items-center p-5 bg-black/60">
          <View className="w-4/5 justify-center items-center items center flex bg-white rounded-md p-5">
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="w-full"
            >
              <Text className="text-2xl font-black text-red-500 self-end">
                X
              </Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold self-start mb-5">
              {selectedCategory.icon} {selectedCategory.name}
            </Text>
            <Link
              href={`/authenticated/editcategory/${selectedCategory.id}`}
              asChild
            >
              <TouchableOpacity className="w-full items-center justify-center bg-blue-500 h-14 rounded-md">
                <Text className="text-white">Editar Categoria</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              className="w-full items-center justify-center bg-red-500 h-14 rounded-md mt-2"
              onPress={() => setIsConfirmVisible(true)}
            >
              <Text className="text-white">Excluir Categoria</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          visible={isConfirmVisible}
          transparent={true}
          onRequestClose={() => setIsConfirmVisible(false)}
        >
          <View className="flex flex-1 justify-center w-full flex-col items-center p-5 bg-black/60">
            <View className="w-full justify-center items-center items center flex bg-white rounded-md p-5">
              <Text className="text-2xl font-black self-start">
                Tem certeza que deseja excluir essa categoria?
              </Text>
              <View className="flex flex-row items-center justify-center gap-2">
                <TouchableOpacity
                  className="w-1/2 items-center justify-center bg-blue-500 h-14 rounded-md mt-2"
                  onPress={() => setIsConfirmVisible(false)}
                >
                  <Text className="text-white">Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-1/2 items-center justify-center bg-red-500 h-14 rounded-md mt-2"
                  onPress={() => {
                    setIsConfirmVisible(false)
                    handleDeleteCategory()
                  }}
                >
                  <Text className="text-white">Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  )
}
