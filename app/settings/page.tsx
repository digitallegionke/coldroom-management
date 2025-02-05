import type { Metadata } from "next"
import SettingsPage from "@/components/settings-page"

export const metadata: Metadata = {
  title: "Settings - Coldroom Tracker",
  description: "Configure system settings and preferences.",
}

export default function Settings() {
  return <SettingsPage />
}

