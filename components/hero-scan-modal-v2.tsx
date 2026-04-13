"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileGenerator } from "@/lib/services/generators"
import { db } from "@/lib/db"
import { StudentProfile } from "@/lib/types"

interface HeroScanModalProps {
  isOpen: boolean
  onComplete: (profile: StudentProfile) => void
}

type Question = {
  id: string
  title: string
  subtitle: string
  type: "text" | "date" | "select" | "options"
  placeholder?: string
  options?: Array<{ value: string; label: string; emoji?: string }>
}

const questions: Question[] = [
  // FASE A: BÁSICA
  {
    id: "name",
    title: "¡Bienvenido a Factor K! 🚀",
    subtitle: "¿Cuál es tu nombre?",
    type: "text",
    placeholder: "Tu nombre aquí...",
  },
  {
    id: "dateOfBirth",
    title: "¡Deseamos saber tu edad! 🎂",
    subtitle: "¿Cuándo naciste?",
    type: "date",
  },
  {
    id: "gender",
    title: "¿Eres niño o niña? 👦👧",
    subtitle: "Elige tu género",
    type: "options",
    options: [
      { value: "niño", label: "Niño", emoji: "👦" },
      { value: "niña", label: "Niña", emoji: "👧" },
      { value: "otro", label: "Otro", emoji: "✨" },
    ],
  },
  {
    id: "email",
    title: "Tu email (opcional) 📧",
    subtitle: "Nos helps si nos dejas tu email",
    type: "text",
    placeholder: "tu.email@ejemplo.com",
  },

  // FASE B: AVENTURERO
  {
    id: "animal",
    title: "¡Elige tu animal espiritual! 🦁",
    subtitle: "¿Cuál sería tu compañero de aventuras?",
    type: "options",
    options: [
      { value: "leon", label: "León", emoji: "🦁" },
      { value: "aguila", label: "Águila", emoji: "🦅" },
      { value: "lobo", label: "Lobo", emoji: "🐺" },
      { value: "dragon", label: "Dragón", emoji: "🐉" },
      { value: "delfin", label: "Delfín", emoji: "🐬" },
    ],
  },
  {
    id: "superpower",
    title: "¡Tu superpoder épico! ⚡",
    subtitle: "¿Qué habilidad tendrías?",
    type: "options",
    options: [
      { value: "vuelo", label: "Vuelo", emoji: "🦅" },
      { value: "fuerza", label: "Fuerza", emoji: "💪" },
      { value: "magia", label: "Magia", emoji: "🔮" },
      { value: "invisibilidad", label: "Invisibilidad", emoji: "👻" },
      { value: "teletransportacion", label: "Teletransportación", emoji: "✨" },
    ],
  },
  {
    id: "place",
    title: "¡Tu lugar favorito en el mundo! 🌍",
    subtitle: "¿Dónde te sientes más vivo?",
    type: "options",
    options: [
      { value: "montana", label: "Montaña", emoji: "🏔️" },
      { value: "bosque", label: "Bosque", emoji: "🌲" },
      { value: "oceano", label: "Océano", emoji: "🌊" },
      { value: "espacio", label: "Espacio", emoji: "🚀" },
      { value: "ciudad", label: "Ciudad", emoji: "🏙️" },
    ],
  },

  // FASE C: PERSONALIZACIÓN
  {
    id: "sport",
    title: "¿Tu deporte favorito? ⚽",
    subtitle: "Elige un deporte (o skip)",
    type: "options",
    options: [
      { value: "futbol", label: "Fútbol", emoji: "⚽" },
      { value: "baloncesto", label: "Baloncesto", emoji: "🏀" },
      { value: "tenis", label: "Tenis", emoji: "🎾" },
      { value: "natacion", label: "Natación", emoji: "🏊" },
      { value: "atletismo", label: "Atletismo", emoji: "🏃" },
      { value: "ninguno", label: "Ninguno", emoji: "✋" },
    ],
  },
  {
    id: "favoriteColor",
    title: "¿Tu color favorito? 🎨",
    subtitle: "Este personalizará tu dashboard",
    type: "options",
    options: [
      { value: "rojo", label: "Rojo", emoji: "🔴" },
      { value: "azul", label: "Azul", emoji: "🔵" },
      { value: "verde", label: "Verde", emoji: "🟢" },
      { value: "amarillo", label: "Amarillo", emoji: "🟡" },
      { value: "morado", label: "Morado", emoji: "🟣" },
      { value: "rosa", label: "Rosa", emoji: "💗" },
      { value: "negro", label: "Negro", emoji: "⚫" },
      { value: "naranja", label: "Naranja", emoji: "🟠" },
      { value: "turquesa", label: "Turquesa", emoji: "💚" },
      { value: "gris", label: "Gris", emoji: "⚪" },
    ],
  },
]

function assignAdventurerClass(
  animal: string,
  superpower: string,
  place: string
): { adventurerClass: string; classEmoji: string; classDescription: string } {
  const combinations: Record<string, string[][]> = {
    warrior: [
      ["leon", "fuerza", "montana"],
      ["dragon", "fuerza", "montana"],
      ["lobo", "fuerza", "montana"],
      ["leon", "fuerza", "bosque"],
      ["dragon", "fuerza", "bosque"],
    ],
    mage: [
      ["lobo", "magia", "bosque"],
      ["dragon", "magia", "montana"],
      ["delfin", "magia", "oceano"],
      ["aguila", "magia", "espacio"],
      ["leon", "magia", "ciudad"],
    ],
    explorer: [
      ["aguila", "vuelo", "espacio"],
      ["aguila", "vuelo", "montana"],
      ["delfin", "vuelo", "oceano"],
      ["lobo", "teletransportacion", "espacio"],
      ["dragon", "vuelo", "espacio"],
    ],
    guardian: [
      ["delfin", "fuerza", "oceano"],
      ["delfin", "invisibilidad", "oceano"],
      ["lobo", "fuerza", "ciudad"],
      ["aguila", "fuerza", "ciudad"],
      ["leon", "invisibilidad", "ciudad"],
    ],
  }

  const currentCombo = [animal, superpower, place]

  for (const [classKey, combos] of Object.entries(combinations)) {
    if (
      combos.some((combo) =>
        combo.every((val, idx) => val === currentCombo[idx])
      )
    ) {
      switch (classKey) {
        case "warrior":
          return {
            adventurerClass: "Guerrero",
            classEmoji: "⚔️",
            classDescription:
              "¡Un valiente luchador que enfrenta desafíos con coraje! 💪",
          }
        case "mage":
          return {
            adventurerClass: "Mago",
            classEmoji: "🔮",
            classDescription:
              "¡Un maestro de la magia y el conocimiento arcano! ✨",
          }
        case "explorer":
          return {
            adventurerClass: "Explorador",
            classEmoji: "🗺️",
            classDescription:
              "¡Un aventurero intrépido que descubre mundos nuevos! 🌍",
          }
        case "guardian":
          return {
            adventurerClass: "Guardián",
            classEmoji: "🛡️",
            classDescription:
              "¡Un protector sabio que cuida de los demás! 👑",
          }
      }
    }
  }

  return {
    adventurerClass: "Héroe Legendario",
    classEmoji: "⭐",
    classDescription: "¡Un héroe único con poderes extraordinarios! 🌟",
  }
}

export function HeroScanModalV2({ isOpen, onComplete }: HeroScanModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleComplete(value)
    }
  }

  const handleComplete = async (lastValue: string) => {
    setIsLoading(true)
    try {
      const allAnswers = { ...answers, [questions[currentStep].id]: lastValue }

      const adventurerClass = assignAdventurerClass(
        allAnswers.animal,
        allAnswers.superpower,
        allAnswers.place
      )

      // Generar perfil completo
      const fullProfile = ProfileGenerator.generateProfile({
        name: allAnswers.name,
        dateOfBirth: allAnswers.dateOfBirth,
        gender: allAnswers.gender,
        email: allAnswers.email || undefined,
        animal: allAnswers.animal,
        superpower: allAnswers.superpower,
        place: allAnswers.place,
        adventurerClass: adventurerClass.adventurerClass,
        classEmoji: adventurerClass.classEmoji,
        classDescription: adventurerClass.classDescription,
        sport: allAnswers.sport !== "ninguno" ? allAnswers.sport : undefined,
        team: undefined, // TODO: Agregar selección de equipo si sport es futbol
        favoriteColor: allAnswers.favoriteColor,
      })

      // Guardar en BD
      await db.student.create(fullProfile as StudentProfile)

      // Enviar al callback
      onComplete(fullProfile as StudentProfile)
    } catch (error) {
      console.error("Error al crear perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  if (!isOpen) return null

  const currentQuestion = questions[currentStep]
  const canContinue =
    answers[currentQuestion.id] !== undefined &&
    answers[currentQuestion.id] !== ""

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            ¡Escaneo de Héroe! 🚀
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Encabezado */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {currentQuestion.title}
              </h3>
              <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
            </div>

            {/* Contenido según tipo */}
            <div className="space-y-4">
              {currentQuestion.type === "text" && (
                <Input
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && canContinue) {
                      handleAnswer(
                        currentQuestion.id,
                        answers[currentQuestion.id]
                      )
                    }
                  }}
                  autoFocus
                />
              )}

              {currentQuestion.type === "date" && (
                <Input
                  type="date"
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  autoFocus
                />
              )}

              {currentQuestion.type === "options" &&
                currentQuestion.options && (
                  <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                    {currentQuestion.options.map((option) => (
                      <motion.div
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`p-4 cursor-pointer transition-all ${
                            answers[currentQuestion.id] === option.value
                              ? "border-primary bg-primary/10"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() =>
                            handleAnswer(currentQuestion.id, option.value)
                          }
                        >
                          <div className="flex items-center gap-3">
                            {option.emoji && (
                              <span className="text-2xl">{option.emoji}</span>
                            )}
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
            </div>

            {/* Indicador de progreso */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full ${
                      index === currentStep ? "bg-primary w-6" : "bg-muted w-2"
                    }`}
                    animate={{ width: index === currentStep ? 24 : 8 }}
                  />
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-2 justify-between">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentStep === 0 || isLoading}
              >
                ← Atrás
              </Button>

              <div className="text-sm text-muted-foreground">
                {currentStep + 1} / {questions.length}
              </div>

              <Button
                onClick={() =>
                  handleAnswer(
                    currentQuestion.id,
                    answers[currentQuestion.id] || ""
                  )
                }
                disabled={!canContinue || isLoading}
                
              >
                {currentStep === questions.length - 1
                  ? isLoading
                    ? "Creando perfil..."
                    : "¡Completar!"
                  : "Siguiente →"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
