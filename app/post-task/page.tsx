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

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Clipboard, MessageSquare, DollarSign, Calendar, Clock, Image as ImageIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { useGeolocation } from "@/context/geolocation-context"
import { useToast } from "@/components/ui/use-toast"

const categories = [
  { value: "cleaning", label: "Cleaning" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "appliance-repair", label: "Appliance Repair" },
  { value: "pest-control", label: "Pest Control" },
  { value: "painting", label: "Painting" },
  { value: "moving", label: "Moving & Packing" },
  { value: "carpentry", label: "Carpentry" },
  { value: "gardening", label: "Gardening" },
  { value: "security", label: "Security Installation" },
  { value: "other", label: "Other" },
]

export default function PostTaskPage() {
  const router = useRouter()
  const { userCity } = useGeolocation()
  const { toast } = useToast()
  
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    duration: "1-2",
    budgetType: "fixed",
    budget: "",
    location: userCity || "",
    address: "",
    images: null,
  })
  
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTaskData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleRadioChange = (name: string, value: string) => {
    setTaskData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Here you would normally submit the data to your API
      // For now we'll just simulate a submission with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      toast({
        title: "Task posted successfully!",
        description: "Professionals will start bidding on your task soon.",
      })
      
      // Redirect to task view page (implement later)
      router.push("/tasks/thank-you")
    } catch (error) {
      toast({
        title: "Error posting task",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Post a Task</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Describe your task and receive offers from skilled professionals
        </p>
      </div>
      
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
              <Clipboard className="h-5 w-5" />
            </div>
            <span className="text-sm">Details</span>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className={`h-1 w-full ${step >= 2 ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}></div>
          </div>
          
          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-sm">Schedule</span>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className={`h-1 w-full ${step >= 3 ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}></div>
          </div>
          
          <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="text-sm">Budget</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Task Details */}
        {step === 1 && (
          <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div>
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="E.g., Fix leaking bathroom tap"
                value={taskData.title}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                name="category" 
                value={taskData.category}
                onValueChange={(value) => setTaskData((prev) => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please describe your task in detail. Include any specific requirements or expectations."
                value={taskData.description}
                onChange={handleChange}
                required
                className="mt-1 min-h-32"
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="button" onClick={nextStep}>
                Next: Schedule
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Schedule */}
        {step === 2 && (
          <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={taskData.date}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="time">Preferred Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={taskData.time}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Estimated Duration</Label>
              <RadioGroup 
                value={taskData.duration} 
                onValueChange={(value) => handleRadioChange("duration", value)}
                className="mt-2 flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="duration-1" />
                  <Label htmlFor="duration-1" className="font-normal">1-2 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-4" id="duration-2" />
                  <Label htmlFor="duration-2" className="font-normal">3-4 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5-8" id="duration-3" />
                  <Label htmlFor="duration-3" className="font-normal">5-8 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-day" id="duration-4" />
                  <Label htmlFor="duration-4" className="font-normal">Full day</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multi-day" id="duration-5" />
                  <Label htmlFor="duration-5" className="font-normal">Multi-day project</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="location">City</Label>
              <Input
                id="location"
                name="location"
                placeholder="City"
                value={taskData.location}
                onChange={handleChange}
                required
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                We'll match you with professionals near this location
              </p>
            </div>
            
            <div>
              <Label htmlFor="address">Address (Optional)</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter the full address where the service is needed"
                value={taskData.address}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button type="button" onClick={nextStep}>
                Next: Budget
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div>
              <Label>Budget Type</Label>
              <RadioGroup 
                value={taskData.budgetType} 
                onValueChange={(value) => handleRadioChange("budgetType", value)}
                className="mt-2 flex flex-col space-y-3"
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="fixed" id="budget-1" className="mt-1" />
                  <div>
                    <Label htmlFor="budget-1" className="font-medium">Fixed price</Label>
                    <p className="text-sm text-gray-500">Set a specific budget for the entire task</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="hourly" id="budget-2" className="mt-1" />
                  <div>
                    <Label htmlFor="budget-2" className="font-medium">Hourly rate</Label>
                    <p className="text-sm text-gray-500">Pay based on how long the task takes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="range" id="budget-3" className="mt-1" />
                  <div>
                    <Label htmlFor="budget-3" className="font-medium">Budget range</Label>
                    <p className="text-sm text-gray-500">Set a min and max you're willing to pay</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="budget">
                {taskData.budgetType === 'fixed' ? 'Budget Amount (₹)' : 
                 taskData.budgetType === 'hourly' ? 'Hourly Rate (₹/hour)' : 
                 'Budget Range (₹)'}
              </Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <Input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder={taskData.budgetType === 'range' ? "e.g., 1000-2000" : "e.g., 1000"}
                  value={taskData.budget}
                  onChange={handleChange}
                  required
                  className="pl-8"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {taskData.budgetType === 'fixed' ? 'Total price for the task' : 
                 taskData.budgetType === 'hourly' ? 'Amount you\'re willing to pay per hour' : 
                 'Minimum and maximum budget, separated by a hyphen'}
              </p>
            </div>
            
            <div>
              <Label className="block mb-2">Add Photos (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Drag and drop images here, or click to browse</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Browse Files
                </Button>
                <input type="file" className="hidden" multiple accept="image/*" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Up to 5 images, 5MB each (JPG, PNG)
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting Task...
                  </>
                ) : (
                  'Post Task'
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
      
      {/* Task posting tips */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-blue-700 dark:text-blue-300 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Tips for getting the best bids
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <li>• Be specific about what you need in your task description</li>
          <li>• Include clear photos of the task if possible</li>
          <li>• Set a realistic budget based on the complexity of the task</li>
          <li>• Respond quickly to questions from interested professionals</li>
        </ul>
      </div>
    </div>
  )
}
