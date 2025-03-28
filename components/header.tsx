"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"
import { YinYangLogo } from "@/components/yin-yang-logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <YinYangLogo className="h-8 w-8" />
          <span className="font-bold text-xl">Disputify</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/debates" className="font-medium transition-colors hover:text-primary">
            Debates
          </Link>
          <Link href="/leaderboard" className="font-medium transition-colors hover:text-primary">
            Leaderboard
          </Link>
          <Link href="/how-it-works" className="font-medium transition-colors hover:text-primary">
            How It Works
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{user?.name}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-debates">My Debates</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </header>
  )
}

