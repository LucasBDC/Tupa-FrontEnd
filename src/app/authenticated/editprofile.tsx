import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, router, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native"
import CurrencyInput from "react-native-currency-input"

export default function Page() {
  const [user, setUser] = useState<any>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [budget, setBudget] = useState(0.0)
  const [currentBudget, setCurrentBudget] = useState(0.1)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      alert(
        "A senha não será automáticamente colocada no campo de senha por motivos de sua segurança."
      )
      try {
        const res = await fetch("http://127.0.0.1:8000/user/me", {
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
          setUser(data)
          setName(data.name)
          setEmail(data.email)
          setBudget(data.budget)
          setCurrentBudget(data.current_budget)
        }
      } catch (error) {
        console.error("Error getting user:", error)
      }
    }
    getUser()
  }, [])

  const verifyInputs = () => {
    if (name == "" || email == "" || password == "" || confirmPassword == "") {
      alert("Preencha todos os campos!")
    } else if (password !== confirmPassword) {
      alert("As senhas digitadas não coincidem!")
    } else {
      handleSignup()
    }
  }

  const handleSignup = async () => {
    const res = await fetch(
      "https://interim-ginni-cobbe-6d5420d0.koyeb.app/user/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          hashed_password: password,
          budget: budget,
        }),
      }
    )
    if (res.ok) {
      alert("Cadastro efetuado com sucesso!")
      router.push("/")
    } else {
      const errorData = await res.json()
      alert(`Erro ao efetuar cadastro: ${errorData.detail}`)
      alert(password + " " + email)
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-1 items-center justify-center">
          <View className="w-full flex gap-5">
            <View className="w-full flex items-center">
              <Image
                source={require("assets/email.png")}
                className="absolute top-5 z-20 left-24"
              />
              <TextInput
                placeholder="Nome"
                placeholderTextColor={"#2C9E4C"}
                className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-2/3 text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
                value={name}
                onChange={(e) => setName(e.nativeEvent.text)}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            <View className="w-full flex items-center">
              <Image
                source={require("assets/email.png")}
                className="absolute top-5 z-20 left-24"
              />
              <TextInput
                placeholder="E-mail"
                placeholderTextColor={"#2C9E4C"}
                className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-2/3 text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
                value={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View className="w-full flex items-center">
              <Image
                source={require("assets/senha.png")}
                className="absolute top-5 z-20 left-24"
              />
              <TextInput
                placeholder="Senha"
                placeholderTextColor={"#2C9E4C"}
                className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-2/3 text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
                value={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <View className="w-full flex items-center">
              <Text className="mb-2">Orcamento atual:</Text>
              <Image
                source={require("assets/email.png")}
                className="absolute top-12 z-20 left-24"
              />
              <CurrencyInput
                placeholder="Orçamento"
                placeholderTextColor={"#2C9E4C"}
                className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-2/3 text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
                value={currentBudget}
                onChangeValue={setCurrentBudget}
              />
            </View>
            <View className="w-full flex items-center">
              <Text className="mb-2">Orcamento total:</Text>
              <Image
                source={require("assets/email.png")}
                className="absolute top-12 z-20 left-24"
              />
              <CurrencyInput
                placeholder="Orçamento"
                placeholderTextColor={"#2C9E4C"}
                className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-2/3 text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
                value={budget}
                onChangeValue={setBudget}
              />
            </View>
          </View>
          <TouchableOpacity
            className="w-2/3 bg-[#4ECB71] h-16 rounded-full shadow-md flex items-center justify-center mt-10"
            onPress={verifyInputs}
          >
            <Text className="text-white text-xl font-semibold">
              Atualizar conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
