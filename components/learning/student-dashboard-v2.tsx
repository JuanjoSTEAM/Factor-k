// ============================================
// NUEVO DASHBOARD DEL ESTUDIANTE (V2)
// ============================================

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { StudentProfile, Route, Theme, LearningCourse } from "@/lib/types"
import { useDatabase } from "@/hooks/use-database"
import { PointsService } from "@/lib/services/points.service"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RoutesGrid } from "./routes-grid"
import { ThemeSelector } from "./theme-selector"
import { LevelSelector } from "./level-selector"
import { LessonPlayer } from "./lesson-player"
import { Settings, LogOut } from "lucide-react"

type ViewState = "dashboard" | "routes" | "themes" | "levels" | "lesson"

interface StudentDashboardV2Props {
  student: StudentProfile
  appliedTheme: any
  onSignOut: () => void
}

export function StudentDashboardV2({
  student,
  appliedTheme,
  onSignOut,
}: StudentDashboardV2Props) {
  const [viewState, setViewState] = useState<ViewState>("dashboard")
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [currentCourse, setCurrentCourse] = useState<LearningCourse | null>(null)
  const [courses, setCourses] = useState<LearningCourse[]>([])
  const { listCourses, updateStudent } = useDatabase()

  const levelInfo = PointsService.getProgressToNextLevel(
    student.scoreSystem.totalPoints
  )

  // Cargar cursos disponibles
  useEffect(() => {
    async function loadCourses() {
      const available = await listCourses()
      setCourses(available)
    }
    loadCourses()
  }, [listCourses])

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route)
    setViewState("themes")
  }

  const handleSelectTheme = (theme: Theme) => {
    setSelectedTheme(theme)
    setViewState("levels")
  }

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level)

    // Buscar el curso correspondiente
    if (selectedRoute && selectedTheme) {
      const course = courses.find(
        (c) =>
          c.routeId === selectedRoute.id &&
          c.themeId === selectedTheme.id &&
          c.levelId === level
      )
      if (course) {
        setCurrentCourse(course)
        setViewState("lesson")
      }
    }
  }

  const handleLessonComplete = async (pointsEarned: number) => {
    const updatedStudent: StudentProfile = {
      ...student,
      scoreSystem: {
        ...student.scoreSystem,
        totalPoints: student.scoreSystem.totalPoints + pointsEarned,
        completedCourses: [
          ...student.scoreSystem.completedCourses,
          currentCourse!.id,
        ],
        lastActivityDate: new Date().toISOString(),
      },
    }

    await updateStudent(student.id, updatedStudent)

    // Volver al dashboard
    setViewState("dashboard")
    setSelectedRoute(null)
    setSelectedTheme(null)
    setSelectedLevel(null)
    setCurrentCourse(null)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: appliedTheme?.bgColor }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{appliedTheme?.studentEmoji}</div>
            <div>
              <h1 className="text-3xl font-bold">{student.fullName}</h1>
              <p className="text-muted-foreground">
                {student.ageGroup} · {student.contentLevel}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Ajustes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Puntos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              className="p-6"
              style={{
                borderColor: appliedTheme?.accentColor,
              }}
            >
              <p className="text-xs text-muted-foreground mb-2">PUNTOS TOTALES</p>
              <p
                className="text-4xl font-bold"
                style={{ color: appliedTheme?.accentColor }}
              >
                {PointsService.formatPoints(student.scoreSystem.totalPoints)}
              </p>
              <p className="text-xs mt-2">
                Nivel {levelInfo.currentLevel}
              </p>
            </Card>
          </motion.div>

          {/* Cursos Completados */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <p className="text-xs text-muted-foreground mb-2">CURSOS</p>
              <p className="text-4xl font-bold">
                {(student.scoreSystem.completedCourses || []).length}
              </p>
              <p className="text-xs mt-2">Completados</p>
            </Card>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <p className="text-xs text-muted-foreground mb-2">RACHA</p>
              <p className="text-4xl font-bold flex items-center gap-2">
                {student.scoreSystem.streakDays}
                <span className="text-2xl">🔥</span>
              </p>
              <p className="text-xs mt-2">Días consecutivos</p>
            </Card>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <p className="text-xs text-muted-foreground mb-2">LOGROS</p>
              <div className="flex gap-1 mb-4">
                {(student.badges || []).slice(0, 3).map((badge) => (
                  <div key={badge.id} className="text-2xl" title={badge.name}>
                    {badge.emoji}
                  </div>
                ))}
                {(student.badges || []).length > 3 && (
                  <div className="text-2xl">+{(student.badges || []).length - 3}</div>
                )}
              </div>
              <p className="text-xs">Desbloqueados</p>
            </Card>
          </motion.div>
        </div>

        {/* Progreso hasta Siguiente Nivel */}
        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Progreso del Nivel</h3>
              <span className="text-sm text-muted-foreground">
                {Math.round(levelInfo.progressPercentage)}%
              </span>
            </div>
            <Progress
              value={levelInfo.progressPercentage}
              className="h-3"
            />
            <p className="text-xs text-muted-foreground">
              {levelInfo.pointsInCurrentLevel} / 1000 puntos para Nivel{" "}
              {levelInfo.currentLevel + 1}
            </p>
          </div>
        </Card>

        {/* Contenido Principal */}
        {viewState === "dashboard" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* CTA Principal */}
            <div
              className="rounded-lg p-8 text-center space-y-4"
              style={{
                background: `linear-gradient(135deg, ${appliedTheme?.accentColor}, ${appliedTheme?.secondaryColor})`,
              }}
            >
              <h2 className="text-3xl font-bold text-white">
                ¡Continúa tu aprendizaje!
              </h2>
              <p className="text-white/90">
                Tienes {courses.length} cursos disponibles
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
                onClick={() => setViewState("routes")}
              >
                Explorar Rutas →
              </Button>
            </div>

            {/* Personalizaciones del Estudiante */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Tu Perfil Personalizado</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Héroe</p>
                  <p className="font-semibold">{student.heroProfile.heroClass}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Deporte</p>
                  <p className="font-semibold">
                    {student.sportProfile.favoriteTeam || student.sportProfile.favoriteSport}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Animal Espíritu</p>
                  <p className="font-semibold">
                    {student.heroProfile.spiritAnimal}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Superpoder</p>
                  <p className="font-semibold">
                    {student.heroProfile.superpower}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {viewState === "routes" && (
          <RoutesGrid
            studentAgeGroup={student.ageGroup}
            appliedTheme={appliedTheme}
            onSelectRoute={handleSelectRoute}
          />
        )}

        {viewState === "themes" && selectedRoute && (
          <ThemeSelector
            route={selectedRoute}
            appliedTheme={appliedTheme}
            onSelectTheme={handleSelectTheme}
            onBack={() => setViewState("routes")}
          />
        )}

        {viewState === "levels" && selectedRoute && selectedTheme && (
          <LevelSelector
            route={selectedRoute}
            theme={selectedTheme}
            studentAgeGroup={student.ageGroup}
            appliedTheme={appliedTheme}
            onSelectLevel={handleSelectLevel}
            onBack={() => setViewState("themes")}
          />
        )}

        {viewState === "lesson" && currentCourse && (
          <LessonPlayer
            course={currentCourse}
            appliedTheme={appliedTheme}
            studentName={student.fullName || student.name}
            onComplete={handleLessonComplete}
            onBack={() => setViewState("levels")}
          />
        )}
      </div>
    </div>
  )
}
