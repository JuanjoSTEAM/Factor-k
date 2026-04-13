// ============================================
// HOOK: USAR BASE DE DATOS EN COMPONENTES
// ============================================

"use client"

import { useCallback, useState } from "react"
import { db } from "@/lib/db"
import { StudentProfile, Route, LearningCourse } from "@/lib/types"

/**
 * Hook para interactuar con la base de datos
 * Maneja estados de carga y errores automáticamente
 */
export function useDatabase() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // ===== ESTUDIANTE =====
  const createStudent = useCallback(
    async (profile: StudentProfile): Promise<StudentProfile | null> => {
      setLoading(true)
      setError(null)
      try {
        return await db.student.create(profile)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getStudent = useCallback(
    async (id: string): Promise<StudentProfile | null> => {
      setLoading(true)
      setError(null)
      try {
        return await db.student.read(id)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const updateStudent = useCallback(
    async (id: string, updates: Partial<StudentProfile>): Promise<StudentProfile | null> => {
      setLoading(true)
      setError(null)
      try {
        return await db.student.update(id, updates)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const listStudents = useCallback(
    async (): Promise<StudentProfile[]> => {
      setLoading(true)
      setError(null)
      try {
        return await db.student.list()
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return []
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getStudentByEmail = useCallback(
    async (email: string): Promise<StudentProfile | null> => {
      setLoading(true)
      setError(null)
      try {
        return await db.student.findByEmail(email)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // ===== RUTAS =====
  const listRoutes = useCallback(
    async (): Promise<Route[]> => {
      setLoading(true)
      setError(null)
      try {
        return await db.route.list()
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return []
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getRoute = useCallback(
    async (id: string): Promise<Route | null> => {
      setLoading(true)
      setError(null)
      try {
        return await db.route.read(id)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // ===== CURSOS =====
  const listCourses = useCallback(
    async (): Promise<LearningCourse[]> => {
      setLoading(true)
      setError(null)
      try {
        return await db.course.list()
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return []
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getCoursesByRoute = useCallback(
    async (routeId: string): Promise<LearningCourse[]> => {
      setLoading(true)
      setError(null)
      try {
        return await db.course.findByRoute(routeId)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return []
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getCoursesByAgeGroup = useCallback(
    async (ageGroup: string): Promise<LearningCourse[]> => {
      setLoading(true)
      setError(null)
      try {
        return await db.course.findByAgeGroup(ageGroup)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Error desconocido")
        setError(error)
        return []
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    loading,
    error,
    // Estudiante
    createStudent,
    getStudent,
    updateStudent,
    listStudents,
    getStudentByEmail,
    // Rutas
    listRoutes,
    getRoute,
    // Cursos
    listCourses,
    getCoursesByRoute,
    getCoursesByAgeGroup,
  }
}
