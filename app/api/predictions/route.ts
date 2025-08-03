import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createDroughtPrediction, getDroughtPredictionsByFarmId } from "@/lib/database"

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
    const { searchParams } = new URL(request.url)
    const farmId = searchParams.get("farmId")

    if (!farmId) {
      return NextResponse.json({ error: "Farm ID is required" }, { status: 400 })
    }

    const predictions = await getDroughtPredictionsByFarmId(Number.parseInt(farmId))

    return NextResponse.json({ predictions })
  } catch (error) {
    console.error("Get predictions error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    const {
      farmId,
      predictionDate,
      droughtProbability,
      severityLevel,
      confidenceScore,
      soilMoisture,
      satelliteData,
      weatherData,
    } = await request.json()

    if (!farmId || !predictionDate || !droughtProbability || !severityLevel || !confidenceScore || !soilMoisture) {
      return NextResponse.json({ error: "All prediction fields are required" }, { status: 400 })
    }

    const prediction = await createDroughtPrediction(
      farmId,
      predictionDate,
      droughtProbability,
      severityLevel,
      confidenceScore,
      soilMoisture,
      satelliteData,
      weatherData,
    )

    return NextResponse.json({ prediction }, { status: 201 })
  } catch (error) {
    console.error("Create prediction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
