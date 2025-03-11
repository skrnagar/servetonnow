"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Calendar, Clock, MapPin, Upload, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGeolocation } from "@/context/geolocation-context"


// Sample service categories - Corrected to be consistent with the original code's structure
const categories = [
  { value: "cleaning", label: "Cleaning" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "moving", label: "Moving" },
  { value: "handyman", label: "Handyman" },
  { value: "landscaping", label: "Landscaping" },
  { value: "painting", label: "Painting" },
  { value: "other", label: "Other" },
];

export default function PostTaskPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userCity } = useGeolocation()

  // Get category from URL if present
  const categoryParam = searchParams.get("category")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categoryParam || "",
    budget: "",
    location: userCity || "",
    date: "",
    time: "",
    urgency: "normal",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, urgency: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit the task data to backend
    console.log("Form submitted:", formData)

    // Navigate to success page
    router.push("/task-posted")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>Post a Task</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Post a Task</h1>
        <p className="text-muted-foreground mb-8">
          Describe your task and get quotes from professional service providers
        </p>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>Let us know what you need help with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="E.g., Fix a leaking pipe in kitchen sink"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Task Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide details about your task"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="mt-1 min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      type="button"
                      variant={formData.category === category.value ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setFormData({ ...formData, category: category.value })}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="budget">Budget (optional)</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  placeholder="₹"
                  value={formData.budget}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location & Timing</CardTitle>
              <CardDescription>When and where do you need this task done?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter your address"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Time
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">How urgent is this task?</Label>
                <RadioGroup
                  defaultValue={formData.urgency}
                  onValueChange={handleRadioChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flexible" />
                    <Label htmlFor="flexible" className="font-normal">
                      Flexible - Any time in the next few weeks
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="font-normal">
                      Normal - Within the next week
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="font-normal">
                      Urgent - As soon as possible
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add Files (optional)</CardTitle>
              <CardDescription>Upload photos or documents related to your task</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files or click to browse
                </p>
                <Input id="file-upload" type="file" className="hidden" multiple />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" variant="outline">
                    Select Files
                  </Button>
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Post Task</Button>
          </div>
        </form>
      </div>
    </div>
  )
}