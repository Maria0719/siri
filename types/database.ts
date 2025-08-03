export interface User {
  id: number
  name: string
  email: string
  password_hash: string
  role: "farmer" | "admin" | "researcher"
  created_at: Date
  updated_at: Date
}

export interface Farm {
  id: number
  user_id: number
  name: string
  location: string
  latitude: number
  longitude: number
  area_hectares: number
  crop_type: string
  created_at: Date
  updated_at: Date
}

export interface DroughtPrediction {
  id: number
  farm_id: number
  prediction_date: Date
  drought_probability: number
  severity_level: "mild" | "moderate" | "severe" | "extreme"
  confidence_score: number
  satellite_data?: object
  weather_data?: object
  soil_moisture: number
  created_at: Date
}

export interface RecoveryPlan {
  id: number
  farm_id: number
  prediction_id: number
  plan_title: string
  plan_description: string
  recommended_actions: string[]
  estimated_cost: number
  implementation_timeline: string
  priority_level: "low" | "medium" | "high" | "critical"
  status: "pending" | "in_progress" | "completed" | "cancelled"
  created_at: Date
  updated_at: Date
}

export interface Alert {
  id: number
  user_id: number
  farm_id: number
  alert_type: string
  title: string
  message: string
  severity: "info" | "warning" | "critical"
  is_read: boolean
  created_at: Date
  farm_name?: string
}

export interface SatelliteData {
  id: number
  farm_id: number
  data_date: Date
  data_source: string
  soil_moisture: number
  vegetation_index: number
  land_surface_temperature: number
  precipitation: number
  raw_data?: object
  processed_data?: object
  created_at: Date
}

export interface DashboardStats {
  totalFarms: number
  unreadAlerts: number
  activePredictions: number
  pendingPlans: number
}
