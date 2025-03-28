import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CategorySelector } from "@/components/category-selector"
import { YinYangLogo } from "@/components/yin-yang-logo"
import { Users, Video, Award, Bot } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted p-4 mb-4">
                <YinYangLogo className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Disputify: Structured Online Debates
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Engage in respectful, timed debates on AI-generated topics. Improve your argumentation skills and expand
                your perspectives.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="#join-debate">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="join-debate" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join a Debate</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Select your preferred categories and get matched with opponents for a structured debate.
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <CategorySelector />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted p-2">
                <YinYangLogo className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Disputify?</h2>
              <p className="text-muted-foreground md:text-xl">
                Our platform is designed to foster meaningful discussions in a structured environment.
              </p>
              <div className="grid gap-6 mt-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Multiple Participants</h3>
                    <p className="text-sm text-muted-foreground">
                      Debate with up to 4 participants, with voting and feedback from all members.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Structured Format</h3>
                    <p className="text-sm text-muted-foreground">
                      Introduction, main arguments, counter-questioning, and conclusion phases.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Leaderboard & Achievements</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your progress, earn points, and climb the leaderboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">AI Feedback & Moderation</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive AI-generated feedback and ensure a respectful environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[400px] w-[400px] rounded-full bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-background to-transparent opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <YinYangLogo className="h-40 w-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

