import type { Metadata } from "next"
import UsersPage from "@/components/users-page"

export const metadata: Metadata = {
  title: "User Management - Coldroom Tracker",
  description: "Manage system users and permissions.",
}

export default function Users() {
  return <UsersPage />
}

