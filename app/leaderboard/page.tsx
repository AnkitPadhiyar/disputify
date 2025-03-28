"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award } from "lucide-react"
import type { User } from "@/contexts/auth-context"

// Mock leaderboard data
const mockLeaderboardData: User[] = [
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
    id: "user-5",
    name: "Jamie Lee",
    email: "jamie@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 350,
      debatesParticipated: 10,
      debatesWon: 4,
      averageRating: 7.8,
    },
    debateHistory: [],
  },
  {
    id: "user-6",
    name: "Casey Morgan",
    email: "casey@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 320,
      debatesParticipated: 9,
      debatesWon: 3,
      averageRating: 7.6,
    },
    debateHistory: [],
  },
  {
    id: "user-7",
    name: "Riley Patel",
    email: "riley@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 290,
      debatesParticipated: 8,
      debatesWon: 2,
      averageRating: 7.5,
    },
    debateHistory: [],
  },
  {
    id: "user-8",
    name: "Quinn Wilson",
    email: "quinn@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 260,
      debatesParticipated: 7,
      debatesWon: 2,
      averageRating: 7.4,
    },
    debateHistory: [],
  },
  {
    id: "user-9",
    name: "Avery Chen",
    email: "avery@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 230,
      debatesParticipated: 6,
      debatesWon: 1,
      averageRating: 7.3,
    },
    debateHistory: [],
  },
  {
    id: "user-10",
    name: "Morgan Davis",
    email: "morgan@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      totalPoints: 200,
      debatesParticipated: 5,
      debatesWon: 1,
      averageRating: 7.2,
    },
    debateHistory: [],
  },
]

type SortOption = "totalPoints" | "debatesWon" | "averageRating"

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<SortOption>("totalPoints")
  const [leaderboard, setLeaderboard] = useState<User[]>([])

  useEffect(() => {
    // Sort the leaderboard data based on the selected option
    const sortedData = [...mockLeaderboardData].sort((a, b) => {
      return b.stats[sortBy] - a.stats[sortBy]
    })

    setLeaderboard(sortedData)
  }, [sortBy])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-amber-700" />
      default:
        return <span className="font-mono text-sm">{index + 1}</span>
    }
  }

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl">Leaderboard</CardTitle>
              <CardDescription>See how debaters rank based on their performance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="totalPoints">Total Points</SelectItem>
                  <SelectItem value="debatesWon">Debates Won</SelectItem>
                  <SelectItem value="averageRating">Average Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>Debater</TableHead>
                <TableHead className="text-right">Total Points</TableHead>
                <TableHead className="text-right">Debates Won</TableHead>
                <TableHead className="text-right">Debates Participated</TableHead>
                <TableHead className="text-right">Average Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex justify-center items-center">{getRankIcon(index)}</div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/${user.id}`} className="flex items-center gap-2 hover:underline">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                        <img
                          src={user.avatar || "/placeholder.svg?height=32&width=32"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{user.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{user.stats.totalPoints}</TableCell>
                  <TableCell className="text-right">{user.stats.debatesWon}</TableCell>
                  <TableCell className="text-right">{user.stats.debatesParticipated}</TableCell>
                  <TableCell className="text-right">{user.stats.averageRating.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

