"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type User } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Video, VideoOff, ThumbsUp, ThumbsDown, FileText, Users, Clock, Bot, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock function to generate a topic based on categories
function generateTopic(categories: string[]): string {
  const topics = {
    politics: [
      "Should voting be mandatory?",
      "Is a two-party political system effective?",
      "Should the electoral college be abolished?",
    ],
    technology: [
      "Is AI development moving too quickly without proper regulation?",
      "Should social media platforms be held responsible for user content?",
      "Is cryptocurrency the future of finance?",
    ],
    ethics: [
      "Is it ethical to use animals for scientific research?",
      "Should euthanasia be legalized?",
      "Is capital punishment justified?",
    ],
    environment: [
      "Should nuclear energy be a primary solution to climate change?",
      "Are carbon taxes effective in reducing emissions?",
      "Should single-use plastics be banned globally?",
    ],
    education: [
      "Should college education be free?",
      "Are standardized tests an effective measure of student ability?",
      "Should schools eliminate homework?",
    ],
    health: [
      "Should healthcare be universal and government-provided?",
      "Should vaccines be mandatory?",
      "Is alternative medicine a legitimate form of healthcare?",
    ],
    economics: [
      "Is a universal basic income a viable economic policy?",
      "Should there be a maximum wage cap?",
      "Is globalization beneficial for developing countries?",
    ],
    social: [
      "Should social media have age restrictions?",
      "Is cancel culture harmful to society?",
      "Should hate speech be protected as free speech?",
    ],
  }

  // Get random topic from each selected category
  const selectedTopics = categories.flatMap((category) => {
    return topics[category as keyof typeof topics] || []
  })

  // Return a random topic from the selected categories
  return (
    selectedTopics[Math.floor(Math.random() * selectedTopics.length)] ||
    "Should online debates be limited to 10 minutes?"
  )
}

// Mock AI feedback generator
function generateAIFeedback(topic: string, notes: string): string {
  const feedbackTemplates = [
    `The debate on "${topic}" was well-structured with strong arguments from both sides. The pro side effectively used statistical evidence, while the con side excelled in addressing ethical implications. For improvement, both sides could benefit from more concrete examples and addressing counterarguments more directly.`,

    `In this debate on "${topic}", participants demonstrated good knowledge of the subject matter. The arguments were generally logical, though at times emotional appeals overshadowed factual analysis. The most compelling points were those backed by real-world examples and clear reasoning. Future debates would benefit from more structured rebuttals.`,

    `The debate regarding "${topic}" showed passionate engagement from all participants. Strong points were made about societal impacts and practical implementation. However, some claims lacked sufficient evidence, and there were moments where participants talked over each other. More focused questioning during the counter-questioning round would enhance the quality of discourse.`,
  ]

  return feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)]
}

// Mock participants (in addition to the current user)
const mockParticipants: User[] = [
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

type DebatePhase =
  | "waiting"
  | "introduction"
  | "mainArguments"
  | "counterQuestions"
  | "conclusion"
  | "voting"
  | "results"

type ParticipantWithStream = User & {
  stream: MediaStream | null
  isSpeaking: boolean
  ratings: Record<string, number> // userId -> rating
  feedback: Record<string, string> // userId -> feedback
}

export default function DebateRoom() {
  const { isAuthenticated, user, addDebateResult } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [topic, setTopic] = useState("")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(120) // 2 minutes per phase
  const [debatePhase, setDebatePhase] = useState<DebatePhase>("waiting")
  const [participants, setParticipants] = useState<ParticipantWithStream[]>([])
  const [activeTab, setActiveTab] = useState<"debate" | "notes">("debate")
  const [notes, setNotes] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null)
  const [aiFeedback, setAiFeedback] = useState("")
  const [showAiFeedback, setShowAiFeedback] = useState(false)
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const [participantToRate, setParticipantToRate] = useState<ParticipantWithStream | null>(null)
  const [currentRating, setCurrentRating] = useState([5])
  const [currentFeedback, setCurrentFeedback] = useState("")
  const [results, setResults] = useState<
    {
      id: string
      name: string
      avatar: string
      totalScore: number
      position: number
    }[]
  >([])

  const notesRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Get selected categories from localStorage
    const categoriesJson = localStorage.getItem("selectedCategories")
    const selectedCategories = categoriesJson ? JSON.parse(categoriesJson) : []

    // Generate topic based on selected categories
    const generatedTopic = generateTopic(selectedCategories)
    setTopic(generatedTopic)

    // Initialize camera and microphone
    initializeMedia()

    // Initialize participants (current user + mock participants)
    if (user) {
      const initialParticipants: ParticipantWithStream[] = [
        {
          ...user,
          stream: null,
          isSpeaking: false,
          ratings: {},
          feedback: {},
        },
        ...mockParticipants.map((p) => ({
          ...p,
          stream: null,
          isSpeaking: false,
          ratings: {},
          feedback: {},
        })),
      ]
      setParticipants(initialParticipants)
    }

    return () => {
      // Clean up media streams when component unmounts
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isAuthenticated, router, user])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (debatePhase !== "waiting" && debatePhase !== "results" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            if (debatePhase === "conclusion") {
              setDebatePhase("voting")
            }
            return 0
          }
          return prev - 1
        })

        setPhaseTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase or next speaker
            advanceDebate()
            return getPhaseTime(debatePhase)
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [debatePhase, timeLeft, phaseTimeLeft])

  const getPhaseTime = (phase: DebatePhase): number => {
    switch (phase) {
      case "introduction":
        return 60 // 1 minute per person
      case "mainArguments":
        return 120 // 2 minutes per person
      case "counterQuestions":
        return 180 // 3 minutes total
      case "conclusion":
        return 60 // 1 minute per person
      default:
        return 120
    }
  }

  const advanceDebate = () => {
    // Find current speaker index
    const currentSpeakerIndex = participants.findIndex((p) => p.id === currentSpeaker)

    // If we haven't gone through all speakers in this phase
    if (currentSpeakerIndex < participants.length - 1) {
      // Move to next speaker
      setCurrentSpeaker(participants[currentSpeakerIndex + 1].id)
      setPhaseTimeLeft(getPhaseTime(debatePhase))

      // Update speaking status
      setParticipants((prev) =>
        prev.map((p) => ({
          ...p,
          isSpeaking: p.id === participants[currentSpeakerIndex + 1].id,
        })),
      )
    } else {
      // Move to next phase
      switch (debatePhase) {
        case "introduction":
          setDebatePhase("mainArguments")
          setCurrentSpeaker(participants[0].id)
          setPhaseTimeLeft(getPhaseTime("mainArguments"))
          setParticipants((prev) =>
            prev.map((p) => ({
              ...p,
              isSpeaking: p.id === participants[0].id,
            })),
          )
          break
        case "mainArguments":
          setDebatePhase("counterQuestions")
          setCurrentSpeaker(null) // Free-for-all in counter questions
          setPhaseTimeLeft(getPhaseTime("counterQuestions"))
          setParticipants((prev) =>
            prev.map((p) => ({
              ...p,
              isSpeaking: true, // All can speak in counter questions
            })),
          )
          break
        case "counterQuestions":
          setDebatePhase("conclusion")
          setCurrentSpeaker(participants[0].id)
          setPhaseTimeLeft(getPhaseTime("conclusion"))
          setParticipants((prev) =>
            prev.map((p) => ({
              ...p,
              isSpeaking: p.id === participants[0].id,
            })),
          )
          break
        case "conclusion":
          setDebatePhase("voting")
          setCurrentSpeaker(null)
          // Generate AI feedback
          setAiFeedback(generateAIFeedback(topic, notes))
          break
        default:
          break
      }
    }
  }

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setLocalStream(stream)

      // Update current user's stream
      if (user) {
        setParticipants((prev) => prev.map((p) => (p.id === user.id ? { ...p, stream } : p)))
      }

      // For demo purposes, create mock streams for other participants
      // In a real app, this would be handled by WebRTC
      setParticipants((prev) => prev.map((p) => (p.id !== user?.id ? { ...p, stream } : p)))

      toast({
        title: "Media connected",
        description: "Camera and microphone are ready",
      })
    } catch (error) {
      console.error("Error accessing media devices:", error)
      toast({
        title: "Media error",
        description: "Could not access camera or microphone",
        variant: "destructive",
      })
    }
  }

  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsMicOn(!isMicOn)
    }
  }

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsVideoOn(!isVideoOn)
    }
  }

  const startDebate = () => {
    setDebatePhase("introduction")
    setCurrentSpeaker(participants[0].id)
    setPhaseTimeLeft(getPhaseTime("introduction"))
    setParticipants((prev) =>
      prev.map((p) => ({
        ...p,
        isSpeaking: p.id === participants[0].id,
      })),
    )
  }

  const openRatingDialog = (participant: ParticipantWithStream) => {
    if (participant.id === user?.id) return // Can't rate yourself

    setParticipantToRate(participant)
    setCurrentRating([5])
    setCurrentFeedback("")
    setRatingDialogOpen(true)
  }

  const submitRating = () => {
    if (!participantToRate || !user) return

    // Update the participant's ratings
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantToRate.id
          ? {
              ...p,
              ratings: {
                ...p.ratings,
                [user.id]: currentRating[0],
              },
              feedback: {
                ...p.feedback,
                [user.id]: currentFeedback,
              },
            }
          : p,
      ),
    )

    setRatingDialogOpen(false)

    // Check if all participants have been rated
    const updatedParticipants = participants.map((p) =>
      p.id === participantToRate.id
        ? {
            ...p,
            ratings: {
              ...p.ratings,
              [user.id]: currentRating[0],
            },
            feedback: {
              ...p.feedback,
              [user.id]: currentFeedback,
            },
          }
        : p,
    )

    const allRated = updatedParticipants
      .filter((p) => p.id !== user.id) // Exclude current user
      .every((p) => p.ratings[user.id]) // Check if current user has rated everyone

    if (allRated) {
      calculateResults(updatedParticipants)
    }
  }

  const calculateResults = (updatedParticipants: ParticipantWithStream[]) => {
    // Calculate total score for each participant
    const resultsData = updatedParticipants.map((p) => {
      const ratings = Object.values(p.ratings)
      const totalScore = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0

      return {
        id: p.id,
        name: p.name,
        avatar: p.avatar || "/placeholder.svg?height=40&width=40",
        totalScore,
      }
    })

    // Sort by score and assign positions
    const sortedResults = resultsData
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((result, index) => ({
        ...result,
        position: index + 1,
      }))

    setResults(sortedResults)

    // If current user is in the results, add to debate history
    if (user) {
      const userResult = sortedResults.find((r) => r.id === user.id)
      if (userResult) {
        addDebateResult({
          id: `debate-${Date.now()}`,
          topic,
          date: new Date().toISOString().split("T")[0],
          score: userResult.totalScore,
          position: userResult.position,
          participants: updatedParticipants.length,
        })
      }
    }

    // Show AI feedback
    setShowAiFeedback(true)
  }

  const finishDebate = () => {
    router.push("/")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getPhaseTitle = () => {
    switch (debatePhase) {
      case "waiting":
        return "Waiting to Start"
      case "introduction":
        return "Introduction Phase"
      case "mainArguments":
        return "Main Arguments"
      case "counterQuestions":
        return "Counter-Questioning Round"
      case "conclusion":
        return "Conclusion Phase"
      case "voting":
        return "Voting Phase"
      case "results":
        return "Debate Results"
    }
  }

  const getPhaseDescription = () => {
    switch (debatePhase) {
      case "waiting":
        return "Prepare your arguments for the debate"
      case "introduction":
        return "Briefly introduce your position"
      case "mainArguments":
        return "Present your main arguments"
      case "counterQuestions":
        return "Ask questions and challenge other participants"
      case "conclusion":
        return "Summarize your position and final thoughts"
      case "voting":
        return "Rate other participants and provide feedback"
      case "results":
        return "View the results of the debate"
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">{getPhaseTitle()}</CardTitle>
              <CardDescription>Topic: {topic}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">Total: {formatTime(timeLeft)}</span>
              </div>
              {debatePhase !== "waiting" && debatePhase !== "voting" && debatePhase !== "results" && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">
                    {currentSpeaker
                      ? `Speaker: ${participants.find((p) => p.id === currentSpeaker)?.name}`
                      : "Open Floor"}
                  </span>
                </div>
              )}
              {debatePhase !== "waiting" && debatePhase !== "voting" && debatePhase !== "results" && (
                <div>
                  <Progress value={(phaseTimeLeft / getPhaseTime(debatePhase)) * 100} className="h-2 w-24" />
                  <p className="text-xs text-center mt-1 font-mono">{formatTime(phaseTimeLeft)}</p>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="debate"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "debate" | "notes")}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="debate" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Debate Room</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Notes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="debate" className="mt-0">
              {showAiFeedback ? (
                <div className="space-y-6">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">AI Feedback</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{aiFeedback}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Debate Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.map((result, index) => (
                          <div key={result.id} className="flex items-center gap-4">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted font-medium">
                              {index === 0 ? <Trophy className="h-4 w-4 text-yellow-500" /> : <span>{index + 1}</span>}
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                              <div className="h-10 w-10 rounded-full overflow-hidden">
                                <img
                                  src={result.avatar || "/placeholder.svg"}
                                  alt={result.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{result.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {result.id === user?.id ? "You" : "Participant"}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{result.totalScore.toFixed(1)}</p>
                              <p className="text-sm text-muted-foreground">Average Score</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className={`relative aspect-video bg-muted rounded-lg overflow-hidden ${
                        participant.isSpeaking && debatePhase !== "voting" ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {participant.stream ? (
                        <video
                          ref={(videoRef) => {
                            if (videoRef && participant.stream) {
                              videoRef.srcObject = participant.stream
                              videoRef.play().catch((error) => console.error("Error playing video:", error))
                            }
                          }}
                          muted={participant.id === user?.id}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p>Loading video...</p>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <div className="bg-background/80 px-2 py-1 rounded text-sm">
                          {participant.id === user?.id ? "You" : participant.name}
                          {participant.isSpeaking && debatePhase !== "voting" && (
                            <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                          )}
                        </div>

                        {debatePhase === "voting" && participant.id !== user?.id && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-background/80 hover:bg-background"
                            onClick={() => openRatingDialog(participant)}
                          >
                            Rate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Take notes during the debate to help organize your thoughts and prepare for your responses.
                </p>
                <Textarea
                  ref={notesRef}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your private notes..."
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 justify-between">
          {debatePhase === "waiting" ? (
            <div className="w-full">
              <p className="text-sm text-muted-foreground mb-4">{getPhaseDescription()}</p>
              <Button onClick={startDebate} className="w-full">
                Start Debate
              </Button>
            </div>
          ) : showAiFeedback ? (
            <Button onClick={finishDebate} className="w-full">
              Return to Home
            </Button>
          ) : (
            <>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={toggleMic}>
                  {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleVideo}>
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setActiveTab(activeTab === "debate" ? "notes" : "debate")}
                >
                  {activeTab === "debate" ? <FileText className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                </Button>
              </div>

              <div>
                {debatePhase !== "voting" ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setShowAiFeedback(true)} disabled={!results.length}>
                    Show Results
                  </Button>
                )}
              </div>
            </>
          )}
        </CardFooter>
      </Card>

      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate {participantToRate?.name}</DialogTitle>
            <DialogDescription>
              Rate the participant's performance on a scale of 1-10 and provide feedback
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Rating (1-10)</h3>
              <Slider
                value={currentRating}
                min={1}
                max={10}
                step={1}
                onValueChange={setCurrentRating}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
              <div className="text-center mt-1">Current rating: {currentRating[0]}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Feedback</h3>
              <Textarea
                value={currentFeedback}
                onChange={(e) => setCurrentFeedback(e.target.value)}
                placeholder="Provide constructive feedback..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={submitRating}>Submit Rating</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

