import { Link } from "expo-router"
import { View, TouchableOpacity, Image } from "react-native"

export const Footer = () => {
  return (
    <View className="flex flex-row items-center justify-evenly p-5 pb-10 bg-white">
      <Link href="/authenticated/dashboard" asChild>
        <TouchableOpacity>
          <Image source={require("assets/home.png")} className="opacity-40" />
        </TouchableOpacity>
      </Link>
      <Link href="/authenticated/categories" asChild>
        <TouchableOpacity>
          <Image source={require("assets/wallet.png")} />
        </TouchableOpacity>
      </Link>
      <Link href="/authenticated/purchasehistory" asChild>
        <TouchableOpacity className="">
          <Image source={require("assets/historic.png")} />
        </TouchableOpacity>
      </Link>
    </View>
  )
}
