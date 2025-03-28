"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { Trophy, Award, BarChart3, History } from "lucide-react"

export default function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("stats")

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mb-4">
                <img
                  src={user.avatar || "/placeholder.svg?height=96&width=96"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Points</span>
                <span className="font-bold">{user.stats.totalPoints}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Debates Won</span>
                <span className="font-bold">{user.stats.debatesWon}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Win Rate</span>
                <span className="font-bold">
                  {user.stats.debatesParticipated > 0
                    ? `${Math.round((user.stats.debatesWon / user.stats.debatesParticipated) * 100)}%`
                    : "0%"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Rating</span>
                <span className="font-bold">{user.stats.averageRating.toFixed(1)}/10</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Rating Progress</span>
                </div>
                <Progress value={user.stats.averageRating * 10} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="stats" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Statistics</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span className="hidden sm:inline">Achievements</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">Debate History</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="stats" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Debate Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Debates Participated</span>
                          <span className="text-sm font-medium">{user.stats.debatesParticipated}</span>
                        </div>
                        <Progress value={Math.min(user.stats.debatesParticipated * 5, 100)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Debates Won</span>
                          <span className="text-sm font-medium">{user.stats.debatesWon}</span>
                        </div>
                        <Progress value={Math.min(user.stats.debatesWon * 10, 100)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Win Rate</span>
                          <span className="text-sm font-medium">
                            {user.stats.debatesParticipated > 0
                              ? `${Math.round((user.stats.debatesWon / user.stats.debatesParticipated) * 100)}%`
                              : "0%"}
                          </span>
                        </div>
                        <Progress
                          value={
                            user.stats.debatesParticipated > 0
                              ? (user.stats.debatesWon / user.stats.debatesParticipated) * 100
                              : 0
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rating Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Argument Quality</span>
                          <span className="text-sm font-medium">8.2/10</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Presentation</span>
                          <span className="text-sm font-medium">7.8/10</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Rebuttal Effectiveness</span>
                          <span className="text-sm font-medium">8.5/10</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
                  <CardHeader className="pb-2">
                    <Trophy className="h-6 w-6 text-yellow-500 mb-2" />
                    <CardTitle className="text-base">First Victory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Won your first debate</p>
                  </CardContent>
                </Card>

                <Card
                  className={
                    user.stats.debatesWon >= 5
                      ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800"
                      : "opacity-50"
                  }
                >
                  <CardHeader className="pb-2">
                    <Award className="h-6 w-6 text-blue-500 mb-2" />
                    <CardTitle className="text-base">Seasoned Debater</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Win 5 debates</p>
                    {user.stats.debatesWon >= 5 && <p className="text-xs mt-1 font-medium">Achieved!</p>}
                  </CardContent>
                </Card>

                <Card
                  className={
                    user.stats.debatesParticipated >= 10
                      ? "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800"
                      : "opacity-50"
                  }
                >
                  <CardHeader className="pb-2">
                    <Award className="h-6 w-6 text-purple-500 mb-2" />
                    <CardTitle className="text-base">Debate Enthusiast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Participate in 10 debates</p>
                    {user.stats.debatesParticipated >= 10 && <p className="text-xs mt-1 font-medium">Achieved!</p>}
                  </CardContent>
                </Card>

                <Card className="opacity-50">
                  <CardHeader className="pb-2">
                    <Award className="h-6 w-6 text-green-500 mb-2" />
                    <CardTitle className="text-base">Perfect Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Receive a 10/10 rating</p>
                  </CardContent>
                </Card>

                <Card className="opacity-50">
                  <CardHeader className="pb-2">
                    <Award className="h-6 w-6 text-red-500 mb-2" />
                    <CardTitle className="text-base">Comeback King</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Win after being rated lowest in first round</p>
                  </CardContent>
                </Card>

                <Card className="opacity-50">
                  <CardHeader className="pb-2">
                    <Award className="h-6 w-6 text-amber-500 mb-2" />
                    <CardTitle className="text-base">Topic Master</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Win debates in 5 different categories</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              {user.debateHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead className="text-right">Position</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.debateHistory.map((debate) => (
                      <TableRow key={debate.id}>
                        <TableCell>{debate.date}</TableCell>
                        <TableCell>{debate.topic}</TableCell>
                        <TableCell className="text-right">
                          {debate.position === 1 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Winner
                            </span>
                          ) : (
                            `${debate.position}${debate.position === 2 ? "nd" : debate.position === 3 ? "rd" : "th"}`
                          )}
                        </TableCell>
                        <TableCell className="text-right">{debate.score.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No debate history yet</p>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

