import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TaskConfirmationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Task Posted Successfully!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Your task has been posted and is now visible to professionals in your area. You'll start receiving bids
            soon.
          </p>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
            <ol className="text-left space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Professionals review your task</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Qualified professionals in your area will review your task details.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">You'll receive bids</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Professionals will submit their bids with pricing and availability.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Choose the best match</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Review profiles, ratings, and prices to select the best professional.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="font-medium">Task completion and payment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Once the task is complete, you can release the payment securely.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard/tasks" className="flex-1">
              <Button className="w-full">View My Tasks</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                Back to Home <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

