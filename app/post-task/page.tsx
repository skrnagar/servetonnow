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

// Sample service categories
const serviceCategories = [
  { id: "cleaning", name: "Cleaning" },
  { id: "plumbing", name: "Plumbing" },
  { id: "electrical", name: "Electrical" },
  { id: "appliance-repair", name: "Appliance Repair" },
  { id: "pest-control", name: "Pest Control" },
  { id: "painting", name: "Painting" },
  { id: "carpentry", name: "Carpentry" },
  { id: "gardening", name: "Gardening" },
  { id: "moving", name: "Moving" },
  { id: "other", name: "Other" },
]

export default function PostTaskPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userCity } = useGeolocation()

  // Get category from URL if available
  const categoryFromUrl = searchParams.get("category")

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: categoryFromUrl || "",
    description: "",
    budget: "",
    budgetType: "fixed",
    date: "",
    time: "",
    address: "",
    city: userCity || "",
  })

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle radio button changes
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, budgetType: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real app, you would send this data to your backend
    // Then redirect to a confirmation page
    router.push("/post-task/confirmation")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 py-4 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">Post a Task</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Post a Task</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Describe your task and receive competitive bids from professionals
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>Provide details about the task you need help with</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Task Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Fix leaking bathroom tap"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {serviceCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Task Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your task in detail. Include any specific requirements or expectations."
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <RadioGroup
                    defaultValue={formData.budgetType}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1 mb-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed Price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label htmlFor="hourly">Hourly Rate</Label>
                    </div>
                  </RadioGroup>
                  <div className="flex items-center">
                    <span className="text-lg mr-2">₹</span>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                      {formData.budgetType === "hourly" ? "per hour" : "total"}
                    </span>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Date
                    </Label>
                    <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Time
                    </Label>
                    <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Attachments */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Upload className="h-4 w-4" /> Attachments (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
                    <Input id="attachments" type="file" className="hidden" multiple />
                    <Label htmlFor="attachments" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm font-medium">Drag & drop files or click to browse</span>
                        <span className="text-xs text-gray-500 mt-1">Upload photos or documents (max 5MB each)</span>
                      </div>
                    </Label>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">How it works:</p>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Post your task with details and budget</li>
                      <li>Receive bids from qualified professionals</li>
                      <li>Compare profiles, reviews, and prices</li>
                      <li>Select the best professional for your task</li>
                      <li>Pay securely only when the task is complete</li>
                    </ol>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Post Task
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

