"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type DebateResult = {
  id: string
  topic: string
  date: string
  score: number
  position: number // 1st, 2nd, etc.
  participants: number
}

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  stats: {
    totalPoints: number
    debatesParticipated: number
    debatesWon: number
    averageRating: number
  }
  debateHistory: DebateResult[]
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
  updateUserStats: (stats: Partial<User["stats"]>) => void
  addDebateResult: (result: DebateResult) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  updateUserStats: () => {},
  addDebateResult: () => {},
})

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 450,
      debatesParticipated: 15,
      debatesWon: 7,
      averageRating: 8.2,
    },
    debateHistory: [
      {
        id: "debate-1",
        topic: "Is AI development moving too quickly without proper regulation?",
        date: "2025-03-15",
        score: 8.5,
        position: 1,
        participants: 4,
      },
      {
        id: "debate-2",
        topic: "Should voting be mandatory?",
        date: "2025-03-10",
        score: 7.8,
        position: 2,
        participants: 4,
      },
    ],
  },
  {
    id: "user-2",
    name: "Sam Rivera",
    email: "sam@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 380,
      debatesParticipated: 12,
      debatesWon: 5,
      averageRating: 7.9,
    },
    debateHistory: [],
  },
  {
    id: "user-3",
    name: "Taylor Kim",
    email: "taylor@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 520,
      debatesParticipated: 18,
      debatesWon: 9,
      averageRating: 8.5,
    },
    debateHistory: [],
  },
  {
    id: "user-4",
    name: "Jordan Smith",
    email: "jordan@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 410,
      debatesParticipated: 14,
      debatesWon: 6,
      averageRating: 8.0,
    },
    debateHistory: [],
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    // For demo purposes, check if this is one of our mock users
    const mockUser = mockUsers.find((u) => u.email === userData.email)

    if (mockUser) {
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } else {
      // If not a mock user, create a new user with default stats
      const newUser: User = {
        ...userData,
        stats: {
          totalPoints: 0,
          debatesParticipated: 0,
          debatesWon: 0,
          averageRating: 0,
        },
        debateHistory: [],
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUserStats = (stats: Partial<User["stats"]>) => {
    if (!user) return

    const updatedUser = {
      ...user,
      stats: {
        ...user.stats,
        ...stats,
      },
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const addDebateResult = (result: DebateResult) => {
    if (!user) return

    const updatedUser = {
      ...user,
      debateHistory: [result, ...user.debateHistory],
      stats: {
        ...user.stats,
        debatesParticipated: user.stats.debatesParticipated + 1,
        totalPoints: user.stats.totalPoints + result.score,
        debatesWon: result.position === 1 ? user.stats.debatesWon + 1 : user.stats.debatesWon,
        averageRating:
          (user.stats.averageRating * user.stats.debatesParticipated + result.score) /
          (user.stats.debatesParticipated + 1),
      },
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateUserStats,
        addDebateResult,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

