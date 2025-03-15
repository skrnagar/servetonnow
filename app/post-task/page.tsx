"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGeolocation } from "@/context/geolocation-context"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"

const categories = [
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Appliance Repair",
  "Gardening",
  "HVAC",
  "Moving",
  "Other"
]

// Placeholder for Supabase upload function.  Replace with actual Supabase integration.
const uploadMedia = async (file: File, bucket: string) => {
  //Implementation for Supabase upload goes here.  This is a placeholder.
  console.log("Uploading", file, "to", bucket);
  return new Promise(resolve => {
      setTimeout(() => {
        resolve({url: 'https://example.com/placeholder.jpg'})
      }, 500)
  })
}


export default function PostTaskPage() {
  const router = useRouter()
  const { userCity } = useGeolocation()
  const { toast } = useToast()
  const isMobile = useIsMobile()

  const [activeTab, setActiveTab] = useState("details")
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    city: userCity || "",
    budget: "",
    date: new Date(),
    images: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTaskDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTaskDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setTaskDetails(prev => ({ ...prev, date }))
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    try {
      const uploadPromises = Array.from(files).map(file => 
        uploadMedia(file, 'tasks')
      )

      const results = await Promise.all(uploadPromises)
      const uploadedUrls = results.map(result => result.url)

      // Update your state/form with uploaded URLs
      setTaskDetails(prev => ({...prev, images: [...prev.images, ...uploadedUrls]}))
      console.log('Uploaded files:', uploadedUrls)
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!taskDetails.title || !taskDetails.description || !taskDetails.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    // Submit form logic would go here
    toast({
      title: "Task Posted Successfully!",
      description: "Professionals will start bidding on your task soon."
    })

    // Redirect to task details page
    // router.push("/tasks/task-id")
  }

  const nextStep = () => {
    if (activeTab === "details") {
      if (!taskDetails.title || !taskDetails.description || !taskDetails.category) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields in this step",
          variant: "destructive"
        })
        return
      }
      setActiveTab("location")
    } else if (activeTab === "location") {
      if (!taskDetails.address || !taskDetails.city) {
        toast({
          title: "Missing information",
          description: "Please fill in your address and city",
          variant: "destructive"
        })
        return
      }
      setActiveTab("budget")
    }
  }

  const prevStep = () => {
    if (activeTab === "location") {
      setActiveTab("details")
    } else if (activeTab === "budget") {
      setActiveTab("location")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post a Task</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Describe your task in detail to receive bids from our qualified professionals.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details">Task Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="budget">Budget & Date</TabsTrigger>
            </TabsList>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Task Details Tab */}
            <TabsContent value="details" className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Fix leaking bathroom sink"
                    value={taskDetails.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={taskDetails.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide details about your task..."
                    rows={5}
                    value={taskDetails.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Photos (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={nextStep}>
                  Next: Location
                </Button>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={taskDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    value={taskDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Your exact address will only be shared with the professional you hire.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button type="button" onClick={nextStep}>
                  Next: Budget & Date
                </Button>
              </div>
            </TabsContent>

            {/* Budget & Date Tab */}
            <TabsContent value="budget" className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-1">
                    Budget (₹) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={taskDetails.budget}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="border rounded-md p-4">
                    <Calendar
                      mode="single"
                      selected={taskDetails.date}
                      onSelect={handleDateChange}
                      className="mx-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button type="submit">
                  Post Task
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  )
}