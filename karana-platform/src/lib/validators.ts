import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const projectRequestSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z
    .string()
    .min(20, "Please describe your project in detail")
    .max(2000),
  serviceId: z.string(),
  budget: z.number().positive("Budget must be a positive number").optional(),
  timeline: z.string().optional(),
  specifications: z.record(z.any()).optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

export const quoteSchema = z.object({
  quotedAmount: z.number().positive("Amount must be positive"),
  quotedTimeline: z.string().min(1, "Timeline is required"),
  depositAmount: z.number().positive("Deposit must be positive").optional(),
  quoteNotes: z.string().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ProjectRequestInput = z.infer<typeof projectRequestSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type QuoteInput = z.infer<typeof quoteSchema>
