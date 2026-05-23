"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

export default function RequestFormPage({ params }: { params: { serviceSlug: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    timeline: "",
    specifications: {} as any
  })

  // Basic auth check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/login?callbackUrl=/request/${params.serviceSlug}`)
    }
  }, [status, router, params.serviceSlug])

  if (status === "loading" || status === "unauthenticated") {
    return null
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, 5))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Find serviceId from slug (mocked for now, in a real app fetch from API first)
      const serviceId = "cli_to_fetch" 
      
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          budget: formData.budget ? parseFloat(formData.budget) : undefined,
          serviceId: params.serviceSlug // we'll rely on backend logic to resolve slug to ID in next sprint
        }),
      })
      
      if (!response.ok) throw new Error("Submission failed")
      
      toast.success("Project requested successfully!")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Failed to submit project request")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 flex justify-center min-h-[80vh] items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-4">
            <span>Step {step} of 5</span>
            <span>{step === 1 ? "Basics" : step === 2 ? "Details" : step === 3 ? "Files" : step === 4 ? "Budget" : "Review"}</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500" 
              initial={{ width: `${((step - 1) / 5) * 100}%` }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Project Basics"}
              {step === 2 && "Specifications"}
              {step === 3 && "Reference Files"}
              {step === 4 && "Budget & Timeline"}
              {step === 5 && "Review Request"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us what you want to build."}
              {step === 5 && "Please review your information before submitting."}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Title</label>
                    <Input 
                      placeholder="e.g. Next-Gen Smart Thermostat" 
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Description</label>
                    <Textarea 
                      placeholder="Describe what you want to achieve..." 
                      className="min-h-[150px]"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <p className="text-muted-foreground mb-4">Specific details related to this service type will go here.</p>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Technical Requirements (Optional)</label>
                    <Textarea placeholder="Any specific frameworks, materials, or constraints?" className="min-h-[100px]" />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <p className="text-muted-foreground">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-2">Max file size: 50MB</p>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estimated Budget ($ USD)</label>
                    <Input 
                      type="number" 
                      placeholder="e.g. 5000" 
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Desired Timeline</label>
                    <Input 
                      placeholder="e.g. Within 4 weeks"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-sm">
                  <div className="grid grid-cols-3 border-b border-border py-2">
                    <span className="font-medium text-muted-foreground">Title</span>
                    <span className="col-span-2">{formData.title || "Not provided"}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-border py-2">
                    <span className="font-medium text-muted-foreground">Description</span>
                    <span className="col-span-2 line-clamp-3">{formData.description || "Not provided"}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-border py-2">
                    <span className="font-medium text-muted-foreground">Budget</span>
                    <span className="col-span-2">{formData.budget ? `$${formData.budget}` : "Not specified"}</span>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <span className="font-medium text-muted-foreground">Timeline</span>
                    <span className="col-span-2">{formData.timeline || "Flexible"}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <div className="p-6 border-t border-border flex justify-between bg-muted/20">
            <Button variant="outline" onClick={prevStep} disabled={step === 1 || isSubmitting}>
              Back
            </Button>
            {step < 5 ? (
              <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700">
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
