-- Create database and tables for SIRIA project
CREATE DATABASE IF NOT EXISTS siria_db;

-- Use the database
\c siria_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'farmer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create farms table
CREATE TABLE IF NOT EXISTS farms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    area_hectares DECIMAL(10, 2),
    crop_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create drought_predictions table
CREATE TABLE IF NOT EXISTS drought_predictions (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
    prediction_date DATE NOT NULL,
    drought_probability DECIMAL(5, 2) NOT NULL,
    severity_level VARCHAR(20) NOT NULL,
    confidence_score DECIMAL(5, 2),
    satellite_data JSONB,
    weather_data JSONB,
    soil_moisture DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recovery_plans table
CREATE TABLE IF NOT EXISTS recovery_plans (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
    prediction_id INTEGER REFERENCES drought_predictions(id) ON DELETE CASCADE,
    plan_title VARCHAR(255) NOT NULL,
    plan_description TEXT NOT NULL,
    recommended_actions JSONB,
    estimated_cost DECIMAL(10, 2),
    implementation_timeline VARCHAR(100),
    priority_level VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create satellite_data table
CREATE TABLE IF NOT EXISTS satellite_data (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
    data_date DATE NOT NULL,
    data_source VARCHAR(50) NOT NULL,
    soil_moisture DECIMAL(5, 2),
    vegetation_index DECIMAL(5, 2),
    land_surface_temperature DECIMAL(5, 2),
    precipitation DECIMAL(8, 2),
    raw_data JSONB,
    processed_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_farms_user_id ON farms(user_id);
CREATE INDEX IF NOT EXISTS idx_drought_predictions_farm_id ON drought_predictions(farm_id);
CREATE INDEX IF NOT EXISTS idx_drought_predictions_date ON drought_predictions(prediction_date);
CREATE INDEX IF NOT EXISTS idx_recovery_plans_farm_id ON recovery_plans(farm_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_satellite_data_farm_id ON satellite_data(farm_id);
CREATE INDEX IF NOT EXISTS idx_satellite_data_date ON satellite_data(data_date);

-- Insert sample data
INSERT INTO users (name, email, password_hash, role) VALUES
('Juan Pérez', 'juan.perez@email.com', '$2b$10$example_hash_1', 'farmer'),
('María García', 'maria.garcia@email.com', '$2b$10$example_hash_2', 'farmer'),
('Carlos López', 'carlos.lopez@email.com', '$2b$10$example_hash_3', 'admin'),
('Ana Rodríguez', 'ana.rodriguez@email.com', '$2b$10$example_hash_4', 'farmer')
ON CONFLICT (email) DO NOTHING;

-- Insert sample farms
INSERT INTO farms (user_id, name, location, latitude, longitude, area_hectares, crop_type) VALUES
(1, 'Finca El Progreso', 'Antioquia, Colombia', 6.2442, -75.5812, 15.5, 'Café'),
(1, 'Cultivo San José', 'Antioquia, Colombia', 6.2500, -75.5900, 8.2, 'Maíz'),
(2, 'Hacienda La Esperanza', 'Valle del Cauca, Colombia', 3.4516, -76.5320, 25.0, 'Caña de azúcar'),
(4, 'Granja Los Andes', 'Cundinamarca, Colombia', 4.7110, -74.0721, 12.3, 'Papa')
ON CONFLICT DO NOTHING;
