import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Home, Settings, Thermometer } from "lucide-react"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background")}>
        <div className="flex min-h-screen">
          <aside className="w-64 border-r bg-muted/40 p-4">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b">
              <Thermometer className="h-6 w-6" />
              <span className="font-bold">Cold Room Tracker</span>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/analytics">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
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
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}

