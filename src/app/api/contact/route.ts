import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact-schema"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const result = contactSchema.safeParse(json)

    if (!result.success) {
      const firstIssue = result.error.issues[0]

      return NextResponse.json(
        {
          success: false,
          error: firstIssue?.message ?? "Invalid contact form submission.",
        },
        { status: 400 }
      )
    }

    const submission = {
      ...result.data,
      receivedAt: new Date().toISOString(),
    }


    return NextResponse.json({
      success: true,
      message: "Inquiry received. Zyra will respond with next-step recommendations shortly.",
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your inquiry right now. Please try again.",
      },
      { status: 500 }
    )
  }
}