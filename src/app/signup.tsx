import { Link, router, useRouter } from "expo-router"
import React, { useState } from "react"
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native"

export default function Page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [budget, setBudget] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    const res = await fetch("http://127.0.0.1:8000/user/", {
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
    })
    if (res.ok) {
      alert("Cadastro efetuado com sucesso!")
      router.push("/")
    } else {
      const errorData = await res.json()
      alert(password + " " + email)
      alert(`Erro ao efetuar login: ${errorData.detail}`)
    }
  }
  return (
    <View className="flex flex-1 items-center justify-center">
      <View className="flex flex-row items-center justify-center mb-10 px-32">
        <Image source={require("assets/image.png")} className="w-24 h-24" />
        <View className="flex ">
          <Text className="text-xl font-black z-10 text-[#4ECB71]">Tupã.</Text>
          <Text className="text-md z-0">
            Bem vindo! Espero que goste do app!
          </Text>
        </View>
      </View>
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
          />
        </View>
        <View className="w-full flex items-center">
          <Image
            source={require("assets/email.png")}
            className="absolute top-5 z-20 left-24"
          />
          <TextInput
            placeholder="Orçamento"
            placeholderTextColor={"#2C9E4C"}
            className="bg-[#D9D9D9] border-2 rounded-lg border-[#4ECB71] w-2/3 text-[#2C9E4C] h-16 shadow-md p-4 font-medium z-10 pl-12"
            value={budget}
            onChange={(e) => setBudget(e.nativeEvent.text)}
            keyboardType="numbers-and-punctuation"
            autoCapitalize="none"
          />
        </View>
      </View>
      <TouchableOpacity
        className="w-2/3 bg-[#4ECB71] h-16 rounded-full shadow-md flex items-center justify-center mt-10"
        onPress={handleSignup}
      >
        <Text className="text-white text-xl font-semibold">Criar conta</Text>
      </TouchableOpacity>
      <Link href="/" asChild>
        <Text className="mt-2 ">
          Já tem conta? <Text className="text-[#34944F]">Entre Aqui!</Text>
        </Text>
      </Link>
    </View>
  )
}
