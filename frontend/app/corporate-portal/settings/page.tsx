import { Metadata } from "next"
import SettingsClient from "./SettingsClient"

export const metadata: Metadata = {
  title: "Settings & Preferences",
  description: "Manage your company details, authorized payers, billing information, and notification settings.",
}

export default function SettingsPage() {
  return <SettingsClient />
}
