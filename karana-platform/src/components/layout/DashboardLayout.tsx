"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FolderKanban, CreditCard, Settings, LogOut, Bell } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-r border-border/50 bg-card/30 lg:min-h-screen flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link href="/" className="font-heading font-bold text-xl tracking-wider">KARANA</Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-x-auto lg:overflow-visible flex lg:flex-col items-center lg:items-stretch">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== "/dashboard"
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-border/50 hidden lg:block">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-border/50 bg-background flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="font-medium capitalize text-lg hidden md:block">
            {pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "Dashboard"}
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-indigo-500"></span>
            </Button>
            
            <div className="flex items-center gap-3 border-l border-border/50 pl-4">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-indigo-500/20 text-indigo-400">
                  {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
