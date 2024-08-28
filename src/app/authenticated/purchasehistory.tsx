import { View, Text, ScrollView } from "react-native"
import React, { useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import PurchaseCard from "@/components/PurchaseCard"

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([])
  useEffect(() => {
    const handleGetPurchaseHistory = async () => {
      try {
        const res = await fetch(
          "https://interim-ginni-cobbe-6d5420d0.koyeb.app/user/purchases",
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
          setPurchases(data)
        }
      } catch (error) {
        alert("Erro ao consultar historico de compras")
      }
    }
    handleGetPurchaseHistory()
  }, [])
  return (
    <View className="flex flex-1">
      <ScrollView className="flex flex-1 p-5">
        {purchases
          .slice(0)
          .reverse()
          .map((purchase: any) => (
            <PurchaseCard
              key={purchase.id}
              date={purchase.date}
              amount={purchase.price}
              category={purchase.category}
              description={purchase.description}
            />
          ))}
      </ScrollView>
    </View>
  )
}

export default PurchaseHistory
