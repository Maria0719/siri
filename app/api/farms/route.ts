import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createFarm, getFarmsByUserId } from "@/lib/database"

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
    const farms = await getFarmsByUserId(decoded.userId)

    return NextResponse.json({ farms })
  } catch (error) {
    console.error("Get farms error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    const { name, location, latitude, longitude, areaHectares, cropType } = await request.json()

    if (!name || !location || !latitude || !longitude || !areaHectares || !cropType) {
      return NextResponse.json({ error: "All farm fields are required" }, { status: 400 })
    }

    const farm = await createFarm(decoded.userId, name, location, latitude, longitude, areaHectares, cropType)

    return NextResponse.json({ farm }, { status: 201 })
  } catch (error) {
    console.error("Create farm error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
