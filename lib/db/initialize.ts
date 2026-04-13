// ============================================
// INICIALIZADOR DE BASE DE DATOS
// ============================================

import { db } from "@/lib/db"
import { ROUTES, THEMES, routeThemeMap, initializeRoutes } from "@/lib/data/seed-routes"
import { LEARNING_COURSES } from "@/lib/data/seed-courses"
import { Route } from "@/lib/types"

let initialized = false

/**
 * Inicializa la base de datos con datos semilla
 * Se ejecutan una sola vez cuando la app se carga
 */
export async function initializeDatabase(): Promise<void> {
  if (initialized) return

  try {
    // Verificar si ya hay rutas en BD
    const existingRoutes = await db.route.list()
    if (existingRoutes.length > 0) {
      initialized = true
      console.log("✅ Base de datos ya inicializada")
      return
    }

    console.log("📦 Inicializando base de datos...")

    // Crear rutas
    const routesWithThemes = initializeRoutes()
    for (const route of routesWithThemes) {
      await db.route.create(route)
    }

    // Cargar cursos de aprendizaje
    for (const course of LEARNING_COURSES) {
      await db.course.create(course)
    }

    console.log("✅ Base de datos inicializada con rutas y cursos")
    initialized = true
  } catch (error) {
    console.error("❌ Error al inicializar base de datos:", error)
  }
}

/**
 * Limpia la base de datos (solo para desarrollo)
 */
export async function clearDatabase(): Promise<void> {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Solo disponible en desarrollo")
  }
  await db.clear()
  initialized = false
}

/**
 * Exporta datos de la BD (para backup/debugging)
 */
export async function exportData(): Promise<Record<string, unknown>> {
  return await db.export()
}

/**
 * Importa datos a la BD (para restore)
 */
export async function importData(data: Record<string, unknown>): Promise<void> {
  await db.import(data)
  initialized = false
}
