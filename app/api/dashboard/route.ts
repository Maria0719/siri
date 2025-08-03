import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getDashboardStats } from "@/lib/database"

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided")
  }

  const token = authHeader.substring(7)
  return jwt.verify(token, process.env.JWT_SECRET!) as any
}

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    const stats = await getDashboardStats(decoded.userId)

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
