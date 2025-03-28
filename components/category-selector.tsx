"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

const categories = [
  { id: "politics", label: "Politics" },
  { id: "technology", label: "Technology" },
  { id: "ethics", label: "Ethics" },
  { id: "environment", label: "Environment" },
  { id: "education", label: "Education" },
  { id: "health", label: "Healthcare" },
  { id: "economics", label: "Economics" },
  { id: "social", label: "Social Issues" },
]

export function CategorySelector() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleJoinDebate = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or sign up to join a debate",
        variant: "destructive",
      })
      return
    }

    if (selectedCategories.length === 0) {
      toast({
        title: "No categories selected",
        description: "Please select at least one category",
        variant: "destructive",
      })
      return
    }

    // Store selected categories in localStorage for use in debate room
    localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories))

    // Navigate to debate room
    router.push("/debate-room")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Select Debate Categories</CardTitle>
        <CardDescription>
          Choose categories you're interested in debating. The topic will be generated based on your selection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label htmlFor={category.id}>{category.label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleJoinDebate} className="w-full">
          Join Debate
        </Button>
      </CardFooter>
    </Card>
  )
}

