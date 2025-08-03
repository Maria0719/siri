"use client"

import type React from "react"

import {
  Satellite,
  Droplets,
  Map,
  Brain,
  Users,
  TrendingUp,
  AlertTriangle,
  Database,
  Cloud,
  BarChart3,
  Shield,
  Globe,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

// Floating Animation Component
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Interactive Card Component
function InteractiveCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      viewport={{ once: true }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  )
}

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

export default function SiriaHomepage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const teamMembers = [
    { name: "Natalia Giraldo", hasPhoto: true, photo: "/images/natalia-giraldo.jpg" },
    { name: "Sofia Valencia", hasPhoto: true, photo: "/images/sofia-valencia.jpg" },
    { name: "Juan David Diaz", hasPhoto: true, photo: "/images/juan-david.jpg" },
    { name: "Maria Jose Ramirez", hasPhoto: true, photo: "/images/maria-jose-new.jpg" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-sky-200/20 to-blue-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Animated Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-xl border-b border-blue-200/30 sticky top-0 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("inicio")}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <Satellite className="w-5 h-5 text-white" />
          </motion.div>
          <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            SIRIA
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { name: "Inicio", id: "inicio" },
            { name: "Problemática", id: "problematica" },
            { name: "Solución", id: "solucion" },
            { name: "Usuario", id: "usuario" },
            { name: "Impacto", id: "impacto" },
            { name: "Equipo", id: "equipo" },
          ].map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 cursor-pointer relative bg-transparent border-none px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              {item.name}
            </motion.button>
          ))}
        </nav>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full cursor-pointer shadow-lg shadow-blue-500/30" />
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <main className="px-6 py-12 max-w-7xl mx-auto relative z-10">
        <section id="inicio" className="grid lg:grid-cols-2 gap-12 items-center mb-20 min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2 text-sm shadow-lg shadow-blue-500/30">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="mr-2"
                  >
                    🚀
                  </motion.span>
                  Sistema Inteligente de IA
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent bg-300% animate-gradient"
                  style={{ backgroundSize: "300% 300%" }}
                >
                  SIRIA
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-gray-800 text-2xl lg:text-3xl font-medium"
                >
                  Sistema Inteligente de Recuperación por Impacto de{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Sequía
                  </span>{" "}
                  Asistido por{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">IA</span>
                </motion.span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h2
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="text-lg font-semibold text-blue-700"
              >
                Predice y Gestiona el Impacto de Sequías en la Agricultura con Inteligencia Artificial
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-gray-700 leading-relaxed text-lg"
              >
                Aplicación web que combina imágenes satelitales y deep learning para predecir sequías en cultivos,
                ofreciendo planes de restauración para comunidades agrícolas.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: <Brain className="w-6 h-6" />, label: "CNN + LLM", desc: "Deep Learning" },
                { icon: <Database className="w-6 h-6" />, label: "Copernicus", desc: "Datos Satelitales" },
                { icon: <Satellite className="w-6 h-6" />, label: "ERA5", desc: "Clima Global" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 10,
                    transition: { duration: 0.3 },
                  }}
                  className="text-center p-6 bg-white/80 rounded-xl backdrop-blur-xl border border-blue-200/50 cursor-pointer shadow-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.5 + index * 0.2, type: "spring" }}
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 text-white"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{item.label}</div>
                  <div className="text-xs text-gray-600">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Floating Badges - Better organized over the image */}
            <FloatingElement delay={0}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 z-15 cursor-pointer"
              >
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 shadow-lg shadow-purple-500/30">
                  <Brain className="w-4 h-4 mr-2" />
                  CNN + LLM + MCP
                </Badge>
              </motion.div>
            </FloatingElement>

            <FloatingElement delay={1}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-1/3 left-2 z-15 cursor-pointer"
              >
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2 shadow-lg shadow-blue-500/30">
                  <Droplets className="w-4 h-4 mr-2" />
                  Humedad del Suelo
                </Badge>
              </motion.div>
            </FloatingElement>

            <FloatingElement delay={2}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.6, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-4 left-1/4 z-15 cursor-pointer"
              >
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 shadow-lg shadow-green-500/30">
                  <Map className="w-4 h-4 mr-2" />
                  Cobertura Terrestre
                </Badge>
              </motion.div>
            </FloatingElement>

            <FloatingElement delay={2.5}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.9, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-2/3 right-2 z-15 cursor-pointer"
              >
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2 shadow-lg shadow-orange-500/30">
                  <Satellite className="w-4 h-4 mr-2" />
                  80% Precisión
                </Badge>
              </motion.div>
            </FloatingElement>

            <FloatingElement delay={3}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-1/2 right-1/3 z-15 cursor-pointer"
              >
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-3 py-2 shadow-lg shadow-indigo-500/30">
                  <Database className="w-4 h-4 mr-2" />
                  ERA5
                </Badge>
              </motion.div>
            </FloatingElement>

            {/* Main Illustration - Solo Satélite Animado */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative h-80 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  className="cursor-pointer"
                >
                  <Satellite className="w-24 h-24 text-blue-600 mx-auto drop-shadow-2xl filter hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                </motion.div>

                {/* Ondas de señal animadas */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0,
                  }}
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.2, 0.05, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                  className="absolute inset-0 border-2 border-cyan-400/20 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.1, 0.02, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 2,
                  }}
                  className="absolute inset-0 border-2 border-blue-300/10 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Problemática Section */}
        <motion.section
          id="problematica"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4"
            >
              Problemática
            </motion.h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Las sequías representan uno de los desafíos más críticos para la agricultura moderna
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <InteractiveCard delay={0}>
              <Card className="border-red-300/50 bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-xl h-full border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="p-2 bg-red-500/20 rounded-full"
                    >
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </motion.div>
                    Impacto Crítico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Las sequías disminuyen drásticamente los recursos hídricos, afectando directamente a agricultores,
                    cultivos, ecosistemas y comunidades vulnerables.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-xl cursor-pointer backdrop-blur-sm border border-red-300/30"
                  >
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      <AnimatedCounter end={50} />%
                    </div>
                    <p className="text-sm text-gray-700">
                      Incremento en escasez de lluvias según IDEAM en el primer trimestre 2025
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </InteractiveCard>

            <InteractiveCard delay={0.2}>
              <Card className="border-blue-300/50 bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-xl h-full border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="p-2 bg-blue-500/20 rounded-full"
                    >
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    Falta de Herramientas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    70% de agricultores carecen de herramientas predictivas para enfrentar diversidades climáticas.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-xl cursor-pointer backdrop-blur-sm border border-blue-300/30"
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      <AnimatedCounter end={70} />%
                    </div>
                    <p className="text-sm text-gray-700">
                      Agricultores sin acceso a tecnologías de monitoreo climático
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </InteractiveCard>
          </div>
        </motion.section>

        {/* Solución Section */}
        <motion.section
          id="solucion"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
            >
              Nuestra Solución
            </motion.h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              SIRIA integra múltiples modelos de inteligencia artificial para ofrecer predicciones precisas
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Brain className="w-8 h-8 text-purple-600" />,
                title: "CNN + LLM + MCP",
                description:
                  "Proyecto basado en CNN (Convolutional Neural Network) para reconocimiento de desastres ambientales, procesado por LLM (Large Language Models) + MCP (Model Context Protocol) que genera planes de recuperación.",
                gradient: "from-purple-50 to-pink-50",
                border: "border-purple-300/50",
              },
              {
                icon: <Database className="w-8 h-8 text-blue-600" />,
                title: "Datos Copernicus",
                description:
                  "Utiliza tres conjuntos de datos especializados de Copernicus: Humedad del Suelo, Cobertura Terrestre y Datos Climáticos ERA5 para entrenar el modelo.",
                gradient: "from-blue-50 to-cyan-50",
                border: "border-blue-300/50",
              },
              {
                icon: <Satellite className="w-8 h-8 text-cyan-600" />,
                title: "Imágenes Satelitales",
                description:
                  "Combina imágenes satelitales y técnicas de deep learning para predecir sequías en cultivos con 80% de precisión.",
                gradient: "from-cyan-50 to-teal-50",
                border: "border-cyan-300/50",
              },
            ].map((item, index) => (
              <InteractiveCard key={index} delay={index * 0.2}>
                <Card
                  className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl h-full cursor-pointer border ${item.border} shadow-lg`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div
                      animate={hoveredCard === index ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-lg"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </InteractiveCard>
            ))}
          </div>

          {/* Data Sources */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Droplets className="w-6 h-6 text-blue-600" />,
                title: "Humedad del Suelo",
                description:
                  "Brinda datos mensuales de humedad superficial que permiten detectar déficit hídricos en etapas tempranas.",
                gradient: "from-blue-50 to-cyan-50",
                border: "border-blue-300/50",
              },
              {
                icon: <Map className="w-6 h-6 text-green-600" />,
                title: "Cobertura Terrestre",
                description:
                  "Genera mapas anuales de uso del suelo que identifican tipos de vegetación y cuerpos de agua.",
                gradient: "from-green-50 to-emerald-50",
                border: "border-green-300/50",
              },
              {
                icon: <Cloud className="w-6 h-6 text-sky-600" />,
                title: "Datos Climáticos ERA5",
                description: "Contiene variables atmosféricas diarias y horarias como temperatura y precipitación.",
                gradient: "from-sky-50 to-blue-50",
                border: "border-sky-300/50",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl cursor-pointer border ${item.border} shadow-lg`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        className="p-2 bg-white/50 rounded-full"
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Usuario Section */}
        <motion.section
          id="usuario"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-20"
        >
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4"
            >
              Usuario Final del Proyecto
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <InteractiveCard>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-xl max-w-4xl mx-auto border border-green-300/50 shadow-lg">
                <CardContent className="p-10 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-green-300/50 shadow-lg"
                  >
                    <Users className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Agricultores de Pequeña y Mediana Escala</h3>
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    El usuario final de SIRIA son los agricultores de pequeña y mediana escala que integran comunidades
                    rurales vulnerables, especialmente en regiones propensas a sequías.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                      whileHover={{ scale: 1.02, rotateY: 5 }}
                      className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-xl cursor-pointer backdrop-blur-sm border border-green-300/30 shadow-lg"
                    >
                      <h4 className="font-semibold text-gray-800 mb-4 text-lg">Características del Usuario:</h4>
                      <ul className="text-gray-700 text-sm space-y-3 text-left">
                        <li>• Enfrentan limitaciones para acceder a tecnologías de monitoreo climático</li>
                        <li>• Carecen de herramientas de análisis predictivo</li>
                        <li>• Dependen directamente de la agricultura como sustento</li>
                      </ul>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, rotateY: -5 }}
                      className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 rounded-xl cursor-pointer backdrop-blur-sm border border-blue-300/30 shadow-lg"
                    >
                      <h4 className="font-semibold text-gray-800 mb-4 text-lg">Objetivo de SIRIA:</h4>
                      <p className="text-gray-700 text-sm text-left leading-relaxed">
                        Empoderar a estos agricultores con una herramienta intuitiva y accesible que les permita
                        anticiparse a eventos de sequía y recuperar sus tierras de forma eficiente.
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </InteractiveCard>
          </motion.div>
        </motion.section>

        {/* Impacto Section */}
        <motion.section
          id="impacto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4"
            >
              Impacto de la Solución
            </motion.h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              SIRIA genera un impacto transformador en el sector agrícola vulnerable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
                title: "Aumento de Resiliencia",
                description:
                  "Predice cuándo viene una posible sequía para que los campesinos puedan prepararse antes de que afecte sus cosechas.",
                gradient: "from-blue-50 to-cyan-50",
                border: "border-blue-300/50",
              },
              {
                icon: <Shield className="w-8 h-8 text-green-600" />,
                title: "Bienestar Comunitario",
                description:
                  "Reduce el impacto económico de las sequías en familias más vulnerables, evitando que pierdan su principal fuente de ingresos.",
                gradient: "from-green-50 to-emerald-50",
                border: "border-green-300/50",
              },
              {
                icon: <Globe className="w-8 h-8 text-purple-600" />,
                title: "Inclusión Tecnológica",
                description:
                  "Transforma datos satelitales complejos en información práctica, con dashboards visuales comprensibles para agricultores.",
                gradient: "from-purple-50 to-pink-50",
                border: "border-purple-300/50",
              },
            ].map((item, index) => (
              <InteractiveCard key={index} delay={index * 0.2}>
                <Card
                  className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl h-full cursor-pointer border ${item.border} shadow-lg`}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-lg"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </InteractiveCard>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          id="equipo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Conoce al equipo
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">Los creadores detrás de SIRIA</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl cursor-pointer backdrop-blur-sm border border-purple-200/50 shadow-lg"
                >
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="w-full h-full rounded-full border-4 border-gradient-to-r from-purple-400 to-pink-500 p-1 bg-gradient-to-r from-purple-400 to-pink-500">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        {member.hasPhoto ? (
                          <img
                            src={member.photo || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <Users className="w-8 h-8 text-gray-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">{member.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}
