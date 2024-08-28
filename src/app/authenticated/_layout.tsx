import { Header } from "@/components/Header"
import "@/global.css"
import { Slot } from "expo-router"
import { Footer } from "@/components/Footer"

export default function Layout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  )
}
