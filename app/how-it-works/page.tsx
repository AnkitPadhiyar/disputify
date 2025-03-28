import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Users, Video, Star, FileText, Award, Bot } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How Disputify Works</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Disputify is a platform for structured, respectful debates on a wide range of topics. Here's how to get
          started and make the most of your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <Users className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Sign Up & Select Categories</CardTitle>
            <CardDescription>Create an account and choose debate categories that interest you.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Create a free account with your email</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Select from various debate categories</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Personalize your profile and preferences</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Video className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Join a Debate</CardTitle>
            <CardDescription>Get matched with opponents and discuss AI-generated topics.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Topics are generated based on your selected categories</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Debate with up to 4 participants</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Video conferencing with clear audio and video</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <FileText className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Structured Debate Format</CardTitle>
            <CardDescription>Follow a clear format for effective discussions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Introduction phase for initial positions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Main arguments phase for detailed points</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Counter-questioning round for direct challenges</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Conclusion phase for final statements</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Star className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Rate & Provide Feedback</CardTitle>
            <CardDescription>Rate opponents and provide constructive feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Rate opponents on a scale of 1-10</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Provide written feedback on debate performance</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Improve your skills based on feedback received</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Bot className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>AI Feedback & Moderation</CardTitle>
            <CardDescription>Get insights and ensure a respectful environment.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Receive AI-generated feedback on the debate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>AI monitors for inappropriate language</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Fair and unbiased topic generation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Award className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Leaderboard & Achievements</CardTitle>
            <CardDescription>Track your progress and compete with others.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Earn points based on your debate performance</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Climb the global leaderboard rankings</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Unlock achievements for debate milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>View your stats and history in your profile</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

