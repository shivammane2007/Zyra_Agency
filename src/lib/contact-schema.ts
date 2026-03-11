import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  company: z.string().min(2, "Enter your company or team name."),
  budget: z.string().min(2, "Tell us the budget range or phase."),
  message: z.string().min(20, "Share a bit more context about the project."),
})

export type ContactFormValues = z.infer<typeof contactSchema>