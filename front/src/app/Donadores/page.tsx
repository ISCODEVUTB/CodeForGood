"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit3, Trash2, Heart, Mail, DollarSign, Search } from "lucide-react"


// Datos del donador
// Puedes ajustar el tipo según la estructura de tus datos
type Donador = {
    id: number
    name: string
    email: string
    amount: string
}

export default function DonadoresPage() {
    // Estados para manejar los donadores, carga, formulario y edición
    // Puedes ajustar los tipos según tus necesidades
    const [donadores, setDonadores] = useState<Donador[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingDonor, setEditingDonor] = useState<Donador | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        amount: "",
    })

    // Función para obtener los donadores desde la API
    // Puedes ajustar la URL según tu configuración de API
    const fetchDonadores = async () => {
        try {
            // Aquí puedes cambiar la URL a la de tu API
            const response = await fetch("http://127.0.0.1:8000/donors")
            const data = await response.json()
            setDonadores(data)
        } catch (error) {
            console.error("Error fetching donadores:", error)
        } finally {
            setLoading(false)
        }
    }

    // Función para manejar el envío del formulario
    // Puedes ajustar la lógica según tus necesidades
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // ENDPOINTS
            // Puedes ajustar la URL según tu configuración de API
            const url = editingDonor ? `http://127.0.0.1:8000/donors/${editingDonor.id}` : "http://127.0.0.1:8000/donors"
            const method = editingDonor ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            // Verifica si la respuesta es exitosa
            // Puedes ajustar la lógica según tus necesidades
            if (response.ok) {
                fetchDonadores()
                setShowForm(false)
                setEditingDonor(null)
                setFormData({ name: "", email: "", amount: "" })
            }
        } catch (error) {
            console.error("Error saving donador:", error)
        }
    }


    // Función para manejar la eliminación de un donador
    // Puedes ajustar la lógica según tus necesidades
    const handleDelete = async (id: number) => {
        // Confirmación antes de eliminar
        if (confirm("¿Estás seguro de que quieres eliminar este donador?")) {
            try {

                // Aquí puedes cambiar la URL a la de tu API
                const response = await fetch(`http://127.0.0.1:8000/donors/${id}`, {
                    method: "DELETE",
                })
                if (response.ok) {
                    fetchDonadores()
                }
            } catch (error) {
                console.error("Error deleting donador:", error)
            }
        }
    }

    // Función para manejar la edición de un donador
    // Puedes ajustar la lógica según tus necesidades
    const handleEdit = (donador: Donador) => {
        setEditingDonor(donador)
        setFormData({
            name: donador.name || "",
            email: donador.email || "",
            amount: donador.amount || "",
        })
        setShowForm(true)
    }

    // Filtrar donadores según el término de búsqueda
    // Puedes ajustar la lógica según tus necesidades
    const filteredDonadores = donadores.filter(
        (donador) =>
            donador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donador.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    useEffect(() => {
        fetchDonadores()
    }, [])

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
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
                    >
                        <div className="mb-6 sm:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                Donadores
                            </h1>
                            <p className="text-lg text-gray-600">Gestiona la información de todos los donadores registrados</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowForm(true)}
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Agregar Donador</span>
                        </motion.button>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar voluntarios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </motion.div>

                    {/* Form Modal */}
                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                                onClick={() => setShowForm(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
                                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                        <Heart className="w-6 h-6 mr-3 text-purple-600" />
                                        {editingDonor ? "Editar Donador" : "Nuevo Donador"}
                                    </h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                value={formData.amount}
                                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3 pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                type="button"
                                                onClick={() => {
                                                    setShowForm(false)
                                                    setEditingDonor(null)
                                                    setFormData({ name: "", email: "", amount: "" })
                                                }}
                                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300"
                                            >
                                                Cancelar
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                type="submit"
                                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                            >
                                                {editingDonor ? "Actualizar" : "Crear"}
                                            </motion.button>
                                        </div>
                                    </form>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Donadores Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 animate-pulse"
                                >
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            ))
                        ) : filteredDonadores.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay donadores</h3>
                                <p className="text-gray-600">
                                    {searchTerm ? "No se encontraron donadores con ese criterio" : "Aún no hay donadores registrados"}
                                </p>
                            </div>
                        ) : (
                            filteredDonadores.map((donador, index) => (
                                <motion.div
                                    key={donador.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 p-6 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                            <Heart className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleEdit(donador)}
                                                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-300"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(donador.id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{donador.name}</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="w-4 h-4 mr-2" />
                                            <span className="text-sm truncate">{donador.email}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <DollarSign className="w-4 h-4 mr-2" />
                                            <span className="text-sm font-medium">${donador.amount}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
