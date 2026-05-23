"use client"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
      <h2 className="text-xl font-semibold">Failed to load dashboard</h2>
      <p className="text-muted-foreground text-sm">{error.message}</p>
      <Button onClick={reset} variant="outline" className="mt-4">
        Try again
      </Button>
    </div>
  )
}
