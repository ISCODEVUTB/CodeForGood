"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import { motion } from "framer-motion"
import { BarChart3, Users, Heart, TrendingUp, RefreshCw, AlertCircle } from "lucide-react"

// Datos para repotes
type Summary = {
    total_donors: number
    total_volunteers: number
}

export default function ReportesPage() {
    // Estados para manejar los datos de analytics
    const [summary, setSummary] = useState<Summary | null>(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    // Función para obtener los datos de analytics
    const fetchAnalytics = async () => {
        setRefreshing(true)
        try {
            // ENDPOINT: Cambia la URL según tu configuración de backend
            const response = await fetch("http://127.0.0.1:8000/analytics/summary")
            const data = await response.json()
            setSummary(data)
        } catch (error) {
            console.error("Error fetching analytics:", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    // Si aún está cargando, mostrar un spinner
    // o una animación de carga
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Header />
                <main className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-6"
                            />
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl text-gray-600 font-medium"
                            >
                                Cargando reportes...
                            </motion.p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header />
            <main className="relative overflow-hidden py-10">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                    Reportes y Estadísticas
                                </h1>
                                <p className="text-lg text-gray-600 max-w-2xl">
                                    Visualiza las métricas más importantes de tu plataforma en tiempo real
                                </p>
                            </div>
                            {/* Boton para actualizar los datos*/}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={fetchAnalytics}
                                disabled={refreshing}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
                                <span>Actualizar</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Cartas con las estadisticas */}
                    {summary ? (
                        <div className="space-y-8">
                            {/* Main Stats Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                <div className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                                <Heart className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                                +12%
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{summary.total_donors}</h3>
                                        <p className="text-gray-600 font-medium">Total Donadores</p>
                                    </div>
                                </div>

                                <div className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                                <Users className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+8%</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{summary.total_volunteers}</h3>
                                        <p className="text-gray-600 font-medium">Total Voluntarios</p>
                                    </div>
                                </div>

                                <div className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                                <TrendingUp className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                +15%
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                            {summary.total_donors + summary.total_volunteers}
                                        </h3>
                                        <p className="text-gray-600 font-medium">Total Usuarios</p>
                                    </div>
                                </div>

                                <div className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                                <BarChart3 className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                                                Activo
                                            </span>
                                        </div>
                                        {/* Porcentaje de voluntarios */}
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                            {summary.total_volunteers && summary.total_donors
                                                ? Math.round(
                                                    (summary.total_volunteers / (summary.total_donors + summary.total_volunteers)) * 100,
                                                )
                                                : 0}
                                            %
                                        </h3>
                                        <p className="text-gray-600 font-medium">Ratio Voluntarios</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Detailed Analytics */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
                            >
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                        <BarChart3 className="w-7 h-7 mr-3 text-purple-600" />
                                        Análisis Detallado
                                    </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                                                <h4 className="text-lg font-semibold text-purple-900 mb-3">Donadores Registrados</h4>
                                                <div className="flex items-end space-x-4">
                                                    <span className="text-4xl font-bold text-purple-600">{summary.total_donors}</span>
                                                    <div className="text-sm text-purple-700">
                                                        <div className="flex items-center">
                                                            <TrendingUp className="w-4 h-4 mr-1" />
                                                            +12% este mes
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-purple-700 mt-2">Personas que han realizado donaciones</p>
                                            </div>

                                            <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                                <h4 className="text-lg font-semibold text-blue-900 mb-3">Voluntarios Activos</h4>
                                                <div className="flex items-end space-x-4">
                                                    <span className="text-4xl font-bold text-blue-600">{summary.total_volunteers}</span>
                                                    <div className="text-sm text-blue-700">
                                                        <div className="flex items-center">
                                                            <TrendingUp className="w-4 h-4 mr-1" />
                                                            +8% este mes
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-blue-700 mt-2">Personas dispuestas a ayudar</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                                                <h4 className="text-lg font-semibold text-green-900 mb-4">Distribución de Usuarios</h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-green-700">Donadores</span>
                                                        <span className="font-semibold text-green-900">
                                                            {/* Estadistica de donadores*/}
                                                            {summary.total_donors && summary.total_volunteers
                                                                ? Math.round(
                                                                    (summary.total_donors / (summary.total_donors + summary.total_volunteers)) * 100,
                                                                )
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-green-200 rounded-full h-2">
                                                        <div
                                                            className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                                                            style={{
                                                                width: `${summary.total_donors && summary.total_volunteers
                                                                        ? (summary.total_donors / (summary.total_donors + summary.total_volunteers)) * 100
                                                                        : 0
                                                                    }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-green-700">Voluntarios</span>
                                                        <span className="font-semibold text-green-900">
                                                            {summary.total_donors && summary.total_volunteers
                                                                ? Math.round(
                                                                    (summary.total_volunteers / (summary.total_donors + summary.total_volunteers)) *
                                                                    100,
                                                                )
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-green-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                                            style={{
                                                                width: `${summary.total_volunteers && summary.total_donors
                                                                        ? (summary.total_volunteers / (summary.total_donors + summary.total_volunteers)) *
                                                                        100
                                                                        : 0
                                                                    }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                                                <h4 className="text-lg font-semibold text-orange-900 mb-3">Crecimiento Total</h4>
                                                <div className="flex items-center space-x-3">
                                                    <TrendingUp className="w-8 h-8 text-orange-600" />
                                                    <div>
                                                        <div className="text-2xl font-bold text-orange-600">+10.2%</div>
                                                        <div className="text-orange-700 text-sm">Crecimiento mensual promedio</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-20"
                        >
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 max-w-md mx-auto">
                                <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">No hay datos disponibles</h3>
                                <p className="text-gray-600 mb-6">No se pudieron cargar los datos de analytics.</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={fetchAnalytics}
                                    className="flex items-center space-x-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    <span>Reintentar</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    )
}
