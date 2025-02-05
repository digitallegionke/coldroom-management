import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Home, Settings, Thermometer, Users } from "lucide-react"
import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Barlow } from "next/font/google"

const barlow = Barlow({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: "Coldroom Produce Tracking System",
  description: "Monitor temperature, capacity, and inventory in real-time.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap" />
      </head>
      <body className={cn("bg-background h-full", barlow.variable, "font-sans")}>
        <div className="flex h-full">
          <aside className="hidden w-56 border-r bg-muted/40 lg:block">
            <div className="flex h-16 items-center gap-2 border-b px-4">
              <Thermometer className="h-6 w-6 text-primary" />
              <span className="font-semibold">Cold Room Tracker</span>
            </div>
            <nav className="space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/inventory">
                  <BarChart3 className="h-4 w-4" />
                  Inventory
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/users">
                  <Users className="h-4 w-4" />
                  Users
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </nav>
          </aside>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}

