import { Pool } from "pg"

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Database connection helper
export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  } finally {
    client.release()
  }
}

// User operations
export async function createUser(name: string, email: string, passwordHash: string, role = "farmer") {
  const result = await query(
    "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, passwordHash, role],
  )
  return result.rows[0]
}

export async function getUserByEmail(email: string) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email])
  return result.rows[0]
}

export async function getUserById(id: number) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id])
  return result.rows[0]
}

// Farm operations
export async function createFarm(
  userId: number,
  name: string,
  location: string,
  latitude: number,
  longitude: number,
  areaHectares: number,
  cropType: string,
) {
  const result = await query(
    "INSERT INTO farms (user_id, name, location, latitude, longitude, area_hectares, crop_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [userId, name, location, latitude, longitude, areaHectares, cropType],
  )
  return result.rows[0]
}

export async function getFarmsByUserId(userId: number) {
  const result = await query("SELECT * FROM farms WHERE user_id = $1 ORDER BY created_at DESC", [userId])
  return result.rows
}

export async function getFarmById(id: number) {
  const result = await query("SELECT * FROM farms WHERE id = $1", [id])
  return result.rows[0]
}

// Drought prediction operations
export async function createDroughtPrediction(
  farmId: number,
  predictionDate: string,
  droughtProbability: number,
  severityLevel: string,
  confidenceScore: number,
  soilMoisture: number,
  satelliteData?: object,
  weatherData?: object,
) {
  const result = await query(
    "INSERT INTO drought_predictions (farm_id, prediction_date, drought_probability, severity_level, confidence_score, soil_moisture, satellite_data, weather_data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      farmId,
      predictionDate,
      droughtProbability,
      severityLevel,
      confidenceScore,
      soilMoisture,
      JSON.stringify(satelliteData),
      JSON.stringify(weatherData),
    ],
  )
  return result.rows[0]
}

export async function getDroughtPredictionsByFarmId(farmId: number) {
  const result = await query("SELECT * FROM drought_predictions WHERE farm_id = $1 ORDER BY prediction_date ASC", [
    farmId,
  ])
  return result.rows
}

export async function getLatestDroughtPrediction(farmId: number) {
  const result = await query("SELECT * FROM drought_predictions WHERE farm_id = $1 ORDER BY created_at DESC LIMIT 1", [
    farmId,
  ])
  return result.rows[0]
}

// Recovery plan operations
export async function createRecoveryPlan(
  farmId: number,
  predictionId: number,
  planTitle: string,
  planDescription: string,
  recommendedActions: string[],
  estimatedCost: number,
  implementationTimeline: string,
  priorityLevel = "medium",
) {
  const result = await query(
    "INSERT INTO recovery_plans (farm_id, prediction_id, plan_title, plan_description, recommended_actions, estimated_cost, implementation_timeline, priority_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      farmId,
      predictionId,
      planTitle,
      planDescription,
      JSON.stringify(recommendedActions),
      estimatedCost,
      implementationTimeline,
      priorityLevel,
    ],
  )
  return result.rows[0]
}

export async function getRecoveryPlansByFarmId(farmId: number) {
  const result = await query(
    "SELECT rp.*, dp.drought_probability, dp.severity_level FROM recovery_plans rp LEFT JOIN drought_predictions dp ON rp.prediction_id = dp.id WHERE rp.farm_id = $1 ORDER BY rp.created_at DESC",
    [farmId],
  )
  return result.rows
}

// Alert operations
export async function createAlert(
  userId: number,
  farmId: number,
  alertType: string,
  title: string,
  message: string,
  severity = "info",
) {
  const result = await query(
    "INSERT INTO alerts (user_id, farm_id, alert_type, title, message, severity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [userId, farmId, alertType, title, message, severity],
  )
  return result.rows[0]
}

export async function getAlertsByUserId(userId: number, limit = 10) {
  const result = await query(
    "SELECT a.*, f.name as farm_name FROM alerts a LEFT JOIN farms f ON a.farm_id = f.id WHERE a.user_id = $1 ORDER BY a.created_at DESC LIMIT $2",
    [userId, limit],
  )
  return result.rows
}

export async function markAlertAsRead(alertId: number) {
  const result = await query("UPDATE alerts SET is_read = TRUE WHERE id = $1 RETURNING *", [alertId])
  return result.rows[0]
}

// Satellite data operations
export async function saveSatelliteData(
  farmId: number,
  dataDate: string,
  dataSource: string,
  soilMoisture: number,
  vegetationIndex: number,
  landSurfaceTemperature: number,
  precipitation: number,
  rawData?: object,
  processedData?: object,
) {
  const result = await query(
    "INSERT INTO satellite_data (farm_id, data_date, data_source, soil_moisture, vegetation_index, land_surface_temperature, precipitation, raw_data, processed_data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      farmId,
      dataDate,
      dataSource,
      soilMoisture,
      vegetationIndex,
      landSurfaceTemperature,
      precipitation,
      JSON.stringify(rawData),
      JSON.stringify(processedData),
    ],
  )
  return result.rows[0]
}

export async function getSatelliteDataByFarmId(farmId: number, limit = 30) {
  const result = await query("SELECT * FROM satellite_data WHERE farm_id = $1 ORDER BY data_date DESC LIMIT $2", [
    farmId,
    limit,
  ])
  return result.rows
}

// Dashboard statistics
export async function getDashboardStats(userId: number) {
  const farmsResult = await query("SELECT COUNT(*) as total_farms FROM farms WHERE user_id = $1", [userId])

  const alertsResult = await query(
    "SELECT COUNT(*) as unread_alerts FROM alerts WHERE user_id = $1 AND is_read = FALSE",
    [userId],
  )

  const predictionsResult = await query(
    "SELECT COUNT(*) as active_predictions FROM drought_predictions dp JOIN farms f ON dp.farm_id = f.id WHERE f.user_id = $1 AND dp.prediction_date >= CURRENT_DATE",
    [userId],
  )

  const plansResult = await query(
    "SELECT COUNT(*) as pending_plans FROM recovery_plans rp JOIN farms f ON rp.farm_id = f.id WHERE f.user_id = $1 AND rp.status = $2",
    [userId, "pending"],
  )

  return {
    totalFarms: Number.parseInt(farmsResult.rows[0].total_farms),
    unreadAlerts: Number.parseInt(alertsResult.rows[0].unread_alerts),
    activePredictions: Number.parseInt(predictionsResult.rows[0].active_predictions),
    pendingPlans: Number.parseInt(plansResult.rows[0].pending_plans),
  }
}

export default pool
