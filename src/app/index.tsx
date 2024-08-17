import { Link, router, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  useEffect(() => {
    const checkToken = async () => {
      AsyncStorage.removeItem("access_token")
      try {
        const res = await fetch(
          "https://tupa-backend.onrender.com/auth/authenticate",
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
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error checking token:", error)
      }
    }
    checkToken()
  }, [])
  const handleLogin = async () => {
    const form_data = new FormData()
    form_data.append("username", email)
    form_data.append("password", password)
    const res = await fetch("https://tupa-backend.onrender.com/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }).toString(),
    })
    if (res.ok) {
      alert("Login efetuado com sucesso!")
      const data = await res.json()
      await AsyncStorage.setItem("access_token", data.access_token)
      router.push("/dashboard")
    } else {
      const errorData = await res.json()
      alert(`Erro ao efetuar login: ${errorData.detail}`)
    }
  }
  return (
    <View className="flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center">
        <Image
          source={require("assets/image.png")}
          className="drop-shadow shadow-xl"
        />
        <View className="-top-10 flex justify-center items-center">
          <Text className="text-8xl font-black z-10 text-[#4ECB71]">Tupã.</Text>
          <Text className="text-lg -top-4 z-0">Bem vindo de volta!</Text>
        </View>
      </View>
      <View className="w-full flex gap-5">
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
          />
        </View>
      </View>
      <View className="w-2/3">
        <Text className="my-3 self-end text-[#34944F]">
          Esqueci minha senha!
        </Text>
      </View>
      <TouchableOpacity
        className="w-2/3 bg-[#4ECB71] h-16 rounded-full shadow-md flex items-center justify-center mt-10"
        onPress={handleLogin}
      >
        <Text className="text-white text-xl font-semibold">Entrar</Text>
      </TouchableOpacity>
      <Link href="/signup" asChild>
        <Text className="mt-2 ">
          Ainda não tem conta?{" "}
          <Text className="text-[#34944F]">Crie Aqui!</Text>
        </Text>
      </Link>
    </View>
  )
}
