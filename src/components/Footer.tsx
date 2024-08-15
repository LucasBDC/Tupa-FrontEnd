import { Link } from "expo-router"
import { View, TouchableOpacity, Image } from "react-native"

export const Footer = () => {
  return (
    <View className="flex flex-row items-center justify-evenly p-5 mb-5">
      <Link href="/categories" asChild>
        <TouchableOpacity>
          <Image source={require("assets/wallet.png")} />
        </TouchableOpacity>
      </Link>
      <TouchableOpacity>
        <Image source={require("assets/historic.png")} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require("assets/graphics.png")} />
      </TouchableOpacity>
    </View>
  )
}
