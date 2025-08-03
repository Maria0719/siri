import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createUser, getUserByEmail } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role = "farmer" } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await createUser(name, email, passwordHash, role)

    // Create JWT token
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })

    // Return user data (without password) and token
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
