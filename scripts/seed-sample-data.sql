-- Insert sample drought predictions
INSERT INTO drought_predictions (farm_id, prediction_date, drought_probability, severity_level, confidence_score, soil_moisture) VALUES
(1, CURRENT_DATE + INTERVAL '7 days', 75.5, 'moderate', 85.2, 25.3),
(1, CURRENT_DATE + INTERVAL '14 days', 82.1, 'severe', 78.9, 18.7),
(2, CURRENT_DATE + INTERVAL '10 days', 65.3, 'mild', 92.1, 32.1),
(3, CURRENT_DATE + INTERVAL '5 days', 88.7, 'severe', 89.5, 15.2),
(4, CURRENT_DATE + INTERVAL '12 days', 71.2, 'moderate', 81.3, 28.9)
ON CONFLICT DO NOTHING;

-- Insert sample recovery plans
INSERT INTO recovery_plans (farm_id, prediction_id, plan_title, plan_description, recommended_actions, estimated_cost, implementation_timeline, priority_level) VALUES
(1, 1, 'Plan de Mitigación de Sequía - Café', 'Plan integral para proteger el cultivo de café durante período de sequía moderada', 
 '["Implementar sistema de riego por goteo", "Aplicar mulch orgánico", "Instalar mallas de sombrío", "Monitoreo diario de humedad del suelo"]', 
 2500000.00, '2-3 semanas', 'high'),
(2, 3, 'Estrategia de Conservación - Maíz', 'Medidas preventivas para cultivo de maíz ante sequía leve',
 '["Ajustar calendario de siembra", "Implementar captación de agua lluvia", "Aplicar técnicas de labranza mínima"]',
 1800000.00, '1-2 semanas', 'medium'),
(3, 4, 'Plan de Emergencia - Caña de Azúcar', 'Acciones urgentes para proteger cultivo de caña ante sequía severa',
 '["Activar sistema de riego de emergencia", "Aplicar bioestimulantes", "Implementar cortavientos", "Coordinar con cooperativa local"]',
 4200000.00, '1 semana', 'critical')
ON CONFLICT DO NOTHING;

-- Insert sample alerts
INSERT INTO alerts (user_id, farm_id, alert_type, title, message, severity) VALUES
(1, 1, 'drought_warning', 'Alerta de Sequía - Finca El Progreso', 'Se predice una sequía moderada en los próximos 7 días. Probabilidad: 75.5%', 'warning'),
(1, 2, 'weather_update', 'Actualización Climática - Cultivo San José', 'Condiciones favorables detectadas. Humedad del suelo: 32.1%', 'info'),
(2, 3, 'drought_critical', 'Alerta Crítica - Hacienda La Esperanza', 'Sequía severa inminente. Se requiere acción inmediata.', 'critical'),
(4, 4, 'maintenance', 'Mantenimiento de Sensores - Granja Los Andes', 'Programar calibración de sensores de humedad del suelo', 'info')
ON CONFLICT DO NOTHING;

-- Insert sample satellite data
INSERT INTO satellite_data (farm_id, data_date, data_source, soil_moisture, vegetation_index, land_surface_temperature, precipitation) VALUES
(1, CURRENT_DATE - INTERVAL '1 day', 'Copernicus', 25.3, 0.65, 28.5, 0.0),
(1, CURRENT_DATE - INTERVAL '2 days', 'Copernicus', 27.1, 0.67, 27.8, 2.3),
(2, CURRENT_DATE - INTERVAL '1 day', 'Copernicus', 32.1, 0.72, 26.9, 1.5),
(3, CURRENT_DATE - INTERVAL '1 day', 'Copernicus', 15.2, 0.45, 31.2, 0.0),
(4, CURRENT_DATE - INTERVAL '1 day', 'Copernicus', 28.9, 0.69, 25.4, 3.1)
ON CONFLICT DO NOTHING;
