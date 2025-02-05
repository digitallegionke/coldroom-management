import type { Metadata } from "next"
import DashboardPage from "@/components/dashboard-page"

export const metadata: Metadata = {
  title: "Coldroom Produce Tracking System",
  description: "Monitor temperature, capacity, and inventory in real-time.",
}

export default function Home() {
  return <DashboardPage />
}

