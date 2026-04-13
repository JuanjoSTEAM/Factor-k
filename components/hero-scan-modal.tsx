"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HeroScanModalProps {
  isOpen: boolean
  onComplete: (profile: AdventurerProfile) => void
}

export interface AdventurerProfile {
  animal: string
  superpower: string
  place: string
  adventurerClass: string
  classEmoji: string
  classDescription: string
}

const questions = [
  {
    id: "animal",
    title: "¡Elige tu animal espiritual! 🦁",
    subtitle: "¿Cuál sería tu compañero de aventuras?",
    options: [
      { value: "leon", label: "León", emoji: "🦁" },
      { value: "aguila", label: "Águila", emoji: "🦅" },
      { value: "lobo", label: "Lobo", emoji: "🐺" },
      { value: "dragon", label: "Dragón", emoji: "🐉" },
      { value: "delfin", label: "Delfín", emoji: "🐬" },
    ]
  },
  {
    id: "superpower",
    title: "¡Tu superpoder épico! ⚡",
    subtitle: "¿Qué habilidad tendrías?",
    options: [
      { value: "vuelo", label: "Vuelo", emoji: "🦅" },
      { value: "fuerza", label: "Fuerza", emoji: "💪" },
      { value: "magia", label: "Magia", emoji: "🔮" },
      { value: "invisibilidad", label: "Invisibilidad", emoji: "👻" },
      { value: "teletransportacion", label: "Teletransportación", emoji: "✨" },
    ]
  },
  {
    id: "place",
    title: "¡Tu lugar favorito en el mundo! 🌍",
    subtitle: "¿Dónde te sientes más vivo?",
    options: [
      { value: "montana", label: "Montaña", emoji: "🏔️" },
      { value: "bosque", label: "Bosque", emoji: "🌲" },
      { value: "oceano", label: "Océano", emoji: "🌊" },
      { value: "espacio", label: "Espacio", emoji: "🚀" },
      { value: "ciudad", label: "Ciudad", emoji: "🏙️" },
    ]
  }
]

function assignAdventurerClass(animal: string, superpower: string, place: string): Omit<AdventurerProfile, 'animal' | 'superpower' | 'place'> {
  // Lógica de asignación de clase basada en combinaciones
  const combinations = {
    // Guerrero: fuerza, montaña, animales fuertes
    warrior: [
      ['leon', 'fuerza', 'montana'],
      ['dragon', 'fuerza', 'montana'],
      ['lobo', 'fuerza', 'montana'],
      ['leon', 'fuerza', 'bosque'],
      ['dragon', 'fuerza', 'bosque'],
    ],
    // Mago: magia, lugares místicos
    mage: [
      ['lobo', 'magia', 'bosque'],
      ['dragon', 'magia', 'montana'],
      ['delfin', 'magia', 'oceano'],
      ['aguila', 'magia', 'espacio'],
      ['leon', 'magia', 'ciudad'],
    ],
    // Explorador: vuelo, espacio, lugares lejanos
    explorer: [
      ['aguila', 'vuelo', 'espacio'],
      ['aguila', 'vuelo', 'montana'],
      ['delfin', 'vuelo', 'oceano'],
      ['lobo', 'teletransportacion', 'espacio'],
      ['dragon', 'vuelo', 'espacio'],
    ],
    // Guardián: protección, comunidad, ética
    guardian: [
      ['delfin', 'fuerza', 'oceano'],
      ['delfin', 'invisibilidad', 'oceano'],
      ['lobo', 'fuerza', 'ciudad'],
      ['aguila', 'fuerza', 'ciudad'],
      ['leon', 'invisibilidad', 'ciudad'],
    ]
  }

  const currentCombo = [animal, superpower, place]

  for (const [classKey, combos] of Object.entries(combinations)) {
    if (combos.some((combo: string[]) => combo.every((val, idx) => val === currentCombo[idx]))) {
      switch (classKey) {
        case 'warrior':
          return {
            adventurerClass: 'Guerrero',
            classEmoji: '⚔️',
            classDescription: '¡Un valiente luchador que enfrenta desafíos con coraje! 💪'
          }
        case 'mage':
          return {
            adventurerClass: 'Mago',
            classEmoji: '🔮',
            classDescription: '¡Un maestro de la magia y el conocimiento arcano! ✨'
          }
        case 'explorer':
          return {
            adventurerClass: 'Explorador',
            classEmoji: '🗺️',
            classDescription: '¡Un aventurero intrépido que descubre mundos nuevos! 🌍'
          }
        case 'guardian':
          return {
            adventurerClass: 'Guardián',
            classEmoji: '🛡️',
            classDescription: '¡Un protector sabio que cuida de los demás! 👑'
          }
      }
    }
  }

  // Clase por defecto si no coincide ninguna combinación
  return {
    adventurerClass: 'Héroe Legendario',
    classEmoji: '⭐',
    classDescription: '¡Un héroe único con poderes extraordinarios! 🌟'
  }
}

export function HeroScanModal({ isOpen, onComplete }: HeroScanModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Todas las preguntas respondidas, asignar clase
      const profile = assignAdventurerClass(
        answers.animal || value,
        answers.superpower || value,
        answers.place || value
      )

      const fullProfile: AdventurerProfile = {
        animal: answers.animal || value,
        superpower: answers.superpower || value,
        place: answers.place || value,
        ...profile
      }

      onComplete(fullProfile)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers({})
  }

  if (!isOpen) return null

  const currentQuestion = questions[currentStep]

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            ¡Escaneo de Héroe! 🚀
          </DialogTitle>
        </DialogHeader>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              {currentQuestion.title}
            </h3>
            <p className="text-muted-foreground">
              {currentQuestion.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}