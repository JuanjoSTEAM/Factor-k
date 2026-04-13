// ============================================
// COMPONENTE: REPRODUCTOR DE LECCIONES
// ============================================

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LearningCourse, Lesson, MiniGame } from "@/lib/types"
import { ArrowLeft, Play, CheckCircle, Star } from "lucide-react"
import Confetti from "react-confetti"

type LessonSection = "lesson" | "exercise" | "game" | "project" | "evaluation" | "complete"

interface LessonPlayerProps {
  course: LearningCourse
  appliedTheme: any
  studentName: string
  onComplete: (pointsEarned: number) => void
  onBack: () => void
}

export function LessonPlayer({
  course,
  appliedTheme,
  studentName,
  onComplete,
  onBack,
}: LessonPlayerProps) {
  const [currentSection, setCurrentSection] = useState<LessonSection>("lesson")
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [currentGameIndex, setCurrentGameIndex] = useState(0)
  const [totalPointsEarned, setTotalPointsEarned] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [completedSections, setCompletedSections] = useState<Set<LessonSection>>(
    new Set()
  )

  const currentLesson = course.lessons[currentLessonIndex]
  const currentGame = course.miniGames[currentGameIndex]

  const progressPercentage = (Object.keys(completedSections).length / 5) * 100

  const handleLessonComplete = () => {
    const pointsEarned = 10
    setTotalPointsEarned((prev) => prev + pointsEarned)
    setCompletedSections((prev) => new Set(prev).add("lesson"))

    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1)
    } else {
      setCurrentSection("game")
      setCurrentGameIndex(0)
    }
  }

  const handleGameComplete = (gamePoints: number) => {
    setTotalPointsEarned((prev) => prev + gamePoints)
    setCompletedSections((prev) => new Set(prev).add("game"))

    if (currentGameIndex < course.miniGames.length - 1) {
      setCurrentGameIndex((prev) => prev + 1)
    } else {
      setCurrentSection("project")
    }
  }

  const handleProjectComplete = () => {
    const projectPoints = 100
    setTotalPointsEarned((prev) => prev + projectPoints)
    setCompletedSections((prev) => new Set(prev).add("project"))
    setCurrentSection("evaluation")
  }

  const handleEvaluationComplete = (evalPoints: number) => {
    setTotalPointsEarned((prev) => prev + evalPoints)
    setCompletedSections((prev) => new Set(prev).add("evaluation"))
    setShowConfetti(true)
    setCurrentSection("complete")
  }

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti recycle={false} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <div className="text-right">
          <h2 className="font-bold text-lg">{course.title}</h2>
          <p className="text-xs text-muted-foreground">Nivel {course.levelId}</p>
        </div>
        <Badge style={{ backgroundColor: appliedTheme?.accentColor }}>
          <Star className="w-3 h-3 mr-1" />
          {totalPointsEarned} pts
        </Badge>
      </div>

      {/* Progreso */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progreso del curso</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} />
      </div>

      {/* Contenido */}
      <AnimatePresence mode="wait">
        {currentSection === "lesson" && (
          <motion.div
            key="lesson"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentLesson.title}</h3>
                  <p className="text-muted-foreground">{currentLesson.description}</p>
                </div>

                {/* Contenido placeholder */}
                <div
                  className="min-h-64 rounded-lg p-6"
                  style={{
                    backgroundColor: appliedTheme?.accentColor + "15",
                    border: `2px solid ${appliedTheme?.accentColor}40`,
                  }}
                >
                  <p className="text-center text-muted-foreground">
                    📚 {currentLesson.content} ({currentLesson.duration} min)
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Lección {currentLessonIndex + 1} de {course.lessons.length}
                  </span>
                  <Button
                    onClick={handleLessonComplete}
                    style={{
                      backgroundColor: appliedTheme?.accentColor,
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completar Lección
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection === "game" && (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentGame.title}</h3>
                  <p className="text-muted-foreground">{currentGame.description}</p>
                </div>

                {/* Mini-Game Placeholder */}
                <div
                  className="min-h-64 rounded-lg p-6 flex flex-col items-center justify-center gap-4"
                  style={{
                    backgroundColor: currentGame.theme.colors[0] + "15",
                    border: `2px solid ${currentGame.theme.colors[0]}`,
                  }}
                >
                  <div className="text-6xl">{currentGame.theme.emojis[0]}</div>
                  <p className="text-center font-semibold">🎮 Mini-Juego Interactivo</p>
                  <p className="text-sm text-muted-foreground">
                    Dificultad: {currentGame.difficulty}/5
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Juego {currentGameIndex + 1} de {course.miniGames.length}
                  </span>
                  <Button
                    onClick={() => handleGameComplete(currentGame.pointsReward)}
                    style={{
                      backgroundColor: currentGame.theme.colors[1],
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Jugar y Completar (+{currentGame.pointsReward} pts)
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection === "project" && (
          <motion.div
            key="project"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>🏗️</span>
                    {course.project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {course.project.description}
                  </p>
                </div>

                {/* Project Placeholder */}
                <div
                  className="min-h-64 rounded-lg p-6 flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: appliedTheme?.accentColor + "15",
                    border: `2px dashed ${appliedTheme?.accentColor}`,
                  }}
                >
                  <p className="text-center text-muted-foreground">
                    Crea tu proyecto aquí ({course.project.duration} min)
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={handleProjectComplete}
                  style={{
                    backgroundColor: appliedTheme?.accentColor,
                  }}
                >
                  Finalizar Proyecto (+100 pts)
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection === "evaluation" && (
          <motion.div
            key="evaluation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>⚔️</span>
                    {course.epicEvaluation.title}
                  </h3>
                  <p className="text-muted-foreground">
                    Demuestra todo lo aprendido en esta evaluación épica
                  </p>
                </div>

                {/* Evaluation Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: appliedTheme?.accentColor + "15",
                    }}
                  >
                    <p className="text-sm text-muted-foreground">Fases</p>
                    <p className="text-2xl font-bold">
                      {course.epicEvaluation.phases}
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: appliedTheme?.accentColor + "15",
                    }}
                  >
                    <p className="text-sm text-muted-foreground">Puntos Máximos</p>
                    <p className="text-2xl font-bold">
                      {course.epicEvaluation.maxPoints}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-lg"
                  onClick={() => handleEvaluationComplete(300)}
                  style={{
                    backgroundColor: appliedTheme?.accentColor,
                  }}
                >
                  🎯 Comenzar Duelo del Saber (+300 pts)
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="p-8 text-center space-y-6">
              <div className="text-6xl">🎉</div>
              <div>
                <h3 className="text-3xl font-bold mb-2">¡Curso Completado!</h3>
                <p className="text-muted-foreground">
                  ¡Excelente trabajo, {studentName}!
                </p>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: appliedTheme?.accentColor + "15",
                  border: `2px solid ${appliedTheme?.accentColor}`,
                }}
              >
                <p className="text-5xl font-bold" style={{ color: appliedTheme?.accentColor }}>
                  +{totalPointsEarned}
                </p>
                <p className="text-sm mt-2">Puntos Totales</p>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={onBack}>
                  Volver a Rutas
                </Button>
                <Button variant="outline" className="w-full">
                  Ver Progreso General
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps Indicator */}
      <div className="flex justify-center gap-2">
        {["lesson", "game", "project", "evaluation", "complete"].map(
          (step, index) => (
            <div
              key={step}
              className={`h-3 rounded-full transition-all ${
                completedSections.has(step as LessonSection)
                  ? "w-8"
                  : "w-3"
              }`}
              style={{
                backgroundColor:
                  completedSections.has(step as LessonSection) ||
                  step === currentSection
                    ? appliedTheme?.accentColor
                    : "#e5e7eb",
              }}
            />
          )
        )}
      </div>
    </div>
  )
}
