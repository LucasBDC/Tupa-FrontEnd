import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Text,
} from "react-native"
import CurrencyInput from "react-native-currency-input"
import FakeCurrencyInput from "react-native-currency-input"
import { formatNumber } from "react-native-currency-input"

export const Header = () => {
  const [user, setUser] = useState<any>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [logoutVisible, setLogoutVisible] = useState(false)
  const [newBudget, setNewBudget] = useState(0.0)
  const [shownBudget, setShownBudget] = useState(0.0)
  const router = useRouter()
  const formattedValue = formatNumber(newBudget, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  })

  useEffect(() => {
    const getUser = async () => {
      //   AsyncStorage.removeItem("access_token")
      try {
        const res = await fetch(
          "https://interim-ginni-cobbe-6d5420d0.koyeb.app/user/me",
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
          setUser(data)
        }
        setNewBudget(user.budget)
      } catch (error) {
        console.error("Error getting user:", error)
      }
    }
    getUser()
  }, [user.budget])

  const handleConfirm = async () => {
    const res = await fetch(
      "https://interim-ginni-cobbe-6d5420d0.koyeb.app/user/budget",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ budget: newBudget }),
      }
    )
    setShownBudget(newBudget)
    setModalVisible(false)
  }

  return (
    <View className="p-5 mt-10">
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={() => {
            setLogoutVisible(true)
          }}
        >
          <Image source={require("assets/image.png")} className="w-14 h-14" />
          <Text className="text-xl font-black z-10 text-[#4ECB71]">Tupã.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row"
          onPress={() => setModalVisible(true)}
        >
          <Image source={require("assets/pencil.png")} />
          <Text
            className={`underline text-lg ${
              newBudget < 0 ? "text-red-500" : "text-emerald-500"
            }`}
          >
            {formattedValue}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={logoutVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 ">
          <View className="bg-white p-5 rounded-lg w-full absolute top-0 py-10 pt-32">
            <Text className="text-lg font-medium self-center">
              Deseja realmente sair?
            </Text>
            <View className="flex flex-row justify-around mt-5">
              <TouchableOpacity
                className="bg-red-500 p-3 rounded-lg"
                onPress={() => setLogoutVisible(false)}
              >
                <Text className="text-white">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-green-500 p-3 rounded-lg"
                onPress={() => {
                  AsyncStorage.removeItem("access_token")
                  router.push("/")
                }}
              >
                <Text className="text-white">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white p-5 rounded-lg w-full absolute top-0 py-10">
            <TouchableOpacity
              className="self-end"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-xl text-red-500 font-black">X</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold mb-3">
              Atualize seu orcamento
            </Text>
            <FakeCurrencyInput
              value={newBudget}
              onChangeValue={setNewBudget}
              placeholder="R$ 0,00"
              className="border-b-2 border-gray-300 pb-2 mb-4 text-lg"
              delimiter="."
              separator=","
              prefix="R$"
              precision={2}
            />
            <TouchableOpacity
              className="bg-green-500 p-3 rounded-lg"
              onPress={handleConfirm}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Atualizar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
