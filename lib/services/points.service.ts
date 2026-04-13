// ============================================
// SERVICIO DE PUNTOS Y TRANSACCIONES
// ============================================

import { StudentProfile, PointTransaction, Badge } from "@/lib/types"
import { IdGenerator } from "@/lib/services/generators"

/**
 * Configuración de puntos por actividad
 */
export const POINTS_CONFIG = {
  LESSON_COMPLETE: 10,
  QUIZ_COMPLETE: 15,
  MINI_GAME_EASY: 20,
  MINI_GAME_MEDIUM: 30,
  MINI_GAME_HARD: 40,
  MINI_GAME_EXPERT: 60,
  PROJECT_COMPLETE: 100,
  EPIC_EVALUATION_PASS: 300,
  STREAK_BONUS: 50,
  DAILY_LOGIN: 5,
  ACHIEVEMENT_UNLOCKED: 25,
} as const

/**
 * Servicio para gestionar puntos y transacciones
 */
export class PointsService {
  /**
   * Registra una transacción de puntos
   */
  static createTransaction(
    studentId: string,
    amount: number,
    type: "lesson" | "quiz" | "game" | "project" | "evaluation" | "bonus",
    source: string
  ): PointTransaction {
    return {
      id: IdGenerator.generate("transaction"),
      studentId,
      amount,
      type,
      source,
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Calcula puntos según tipo de actividad y dificultad
   */
  static calculatePoints(
    activityType: "lesson" | "quiz" | "game" | "project" | "evaluation",
    difficulty?: number,
    metadata?: Record<string, any>
  ): number {
    switch (activityType) {
      case "lesson":
        return POINTS_CONFIG.LESSON_COMPLETE

      case "quiz":
        return POINTS_CONFIG.QUIZ_COMPLETE

      case "game":
        if (!difficulty) return POINTS_CONFIG.MINI_GAME_EASY
        if (difficulty <= 2) return POINTS_CONFIG.MINI_GAME_EASY
        if (difficulty <= 3) return POINTS_CONFIG.MINI_GAME_MEDIUM
        if (difficulty <= 4) return POINTS_CONFIG.MINI_GAME_HARD
        return POINTS_CONFIG.MINI_GAME_EXPERT

      case "project":
        return POINTS_CONFIG.PROJECT_COMPLETE

      case "evaluation":
        return POINTS_CONFIG.EPIC_EVALUATION_PASS

      default:
        return 0
    }
  }

  /**
   * Aplica bonificaciones (streak, achievements, etc)
   */
  static applyBonuses(
    basePoints: number,
    studentProfile: StudentProfile
  ): { points: number; bonusBreakdown: Record<string, number> } {
    const bonuses: Record<string, number> = {}

    // Streak bonus
    if (studentProfile.scoreSystem.streakDays > 7) {
      bonuses["streakBonus"] = POINTS_CONFIG.STREAK_BONUS
    }

    const totalBonus = Object.values(bonuses).reduce((a, b) => a + b, 0)
    const totalPoints = basePoints + totalBonus

    return {
      points: totalPoints,
      bonusBreakdown: bonuses,
    }
  }

  /**
   * Verifica si se desbloquea un badge
   */
  static checkBadgeUnlock(
    studentProfile: StudentProfile,
    activity: string,
    difficulty?: number
  ): Badge | null {
    const currentPoints = studentProfile.scoreSystem.totalPoints

    // Badges por hitos de puntos
    const pointsMilestones: [number, string, string][] = [
      [100, "badge_100", "Principiante"],
      [500, "badge_500", "Explorador"],
      [1000, "badge_1000", "Aventurero"],
      [5000, "badge_5000", "Maestro"],
      [10000, "badge_10000", "Leyenda"],
    ]

    for (const [threshold, id, name] of pointsMilestones) {
      if (
        currentPoints >= threshold &&
        !studentProfile.badges.some((b) => b.id === id)
      ) {
        return {
          id,
          name,
          description: `Alcanza ${threshold} puntos`,
          emoji: "🏆",
          unlockedAt: new Date().toISOString(),
        }
      }
    }

    // Badges especiales
    if (activity === "evaluation" && difficulty === 5) {
      return {
        id: "badge_expert",
        name: "Experto",
        description: "Completa una evaluación épica en modo experto",
        emoji: "👑",
        unlockedAt: new Date().toISOString(),
      }
    }

    return null
  }

  /**
   * Formatea puntos para visualización
   */
  static formatPoints(points: number): string {
    if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}k`
    }
    return points.toString()
  }

  /**
   * Calcula nivel basado en puntos
   */
  static calculateLevel(totalPoints: number): number {
    const basePoints = 1000
    return Math.floor(totalPoints / basePoints) + 1
  }

  /**
   * Obtiene progreso hasta próximo nivel
   */
  static getProgressToNextLevel(totalPoints: number): {
    currentLevel: number
    pointsInCurrentLevel: number
    pointsNeededForNext: number
    progressPercentage: number
  } {
    const currentLevel = this.calculateLevel(totalPoints)
    const basePoints = 1000
    const pointsForCurrentLevel = (currentLevel - 1) * basePoints
    const pointsInCurrentLevel = totalPoints - pointsForCurrentLevel
    const pointsNeededForNext = basePoints - pointsInCurrentLevel

    return {
      currentLevel,
      pointsInCurrentLevel,
      pointsNeededForNext,
      progressPercentage: (pointsInCurrentLevel / basePoints) * 100,
    }
  }
}
