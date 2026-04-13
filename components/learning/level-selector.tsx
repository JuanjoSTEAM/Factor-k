// ============================================
// COMPONENTE: SELECTOR DE NIVELES
// ============================================

"use client"

import { Route, Theme } from "@/lib/types"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock, Star } from "lucide-react"

const LEVEL_NAMES = [
  "Primeros Pasos",
  "Explorador",
  "Aventurero",
  "Emprendedor",
  "Experto",
]

const LEVEL_AGES = ["3-5 años", "6-8 años", "9-11 años", "12-14 años", "15+ años"]

const LEVEL_DESCRIPTIONS = [
  "Aprende los conceptos básicos jugando",
  "Explora nuevas habilidades",
  "Aventúrate en desafíos interesantes",
  "Desarrolla tu propio emprendimiento",
  "Domina completamente el tema",
]

interface LevelSelectorProps {
  route: Route
  theme: Theme
  studentAgeGroup: string
  appliedTheme: any
  onSelectLevel: (level: number) => void
  onBack: () => void
}

export function LevelSelector({
  route,
  theme,
  studentAgeGroup,
  appliedTheme,
  onSelectLevel,
  onBack,
}: LevelSelectorProps) {
  // Map age group to default level (0-indexed)
  const ageToLevel: Record<string, number> = {
    "3-5": 0,
    "6-8": 1,
    "9-11": 2,
    "12-14": 3,
    "15+": 4,
  }

  const recommendedLevel = ageToLevel[studentAgeGroup] || 0

  return (
    <div className="space-y-6">
      {/* Header con back button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>{route.emoji}</span>
            {route.title}
            <span className="text-lg">/</span>
            <span>{theme.emoji}</span>
            {theme.title}
          </h2>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Selecciona tu Nivel</h3>
        <p className="text-sm text-muted-foreground">
          Tu edad recomendada es: {LEVEL_NAMES[recommendedLevel]}
        </p>
      </div>

      {/* Niveles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => {
          const isRecommended = index === recommendedLevel
          const canAccess =
            index <= recommendedLevel + 1 // Can access +1 level above recommended

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={canAccess ? { y: -5 } : {}}
            >
              <Card
                className="p-4 cursor-pointer transition-all relative h-full flex flex-col"
                style={{
                  borderColor: isRecommended
                    ? appliedTheme?.accentColor
                    : "transparent",
                  borderWidth: "2px",
                  opacity: canAccess ? 1 : 0.5,
                  cursor: canAccess ? "pointer" : "not-allowed",
                  pointerEvents: canAccess ? "auto" : "none",
                }}
                onClick={() => canAccess && onSelectLevel(index + 1)}
              >
                {/* Badge recomendado */}
                {isRecommended && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{
                      backgroundColor: appliedTheme?.accentColor,
                    }}
                  >
                    RECOMENDADO
                  </div>
                )}

                {/* Lock si no puede acceder */}
                {!canAccess && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1">
                  {/* Número y emoji */}
                  <div className="text-4xl mb-3 text-center">
                    {index === 0 && "🌱"}
                    {index === 1 && "🔍"}
                    {index === 2 && "🗺️"}
                    {index === 3 && "💼"}
                    {index === 4 && "👑"}
                  </div>

                  {/* Información */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-center">
                      Nivel {index + 1}
                    </h4>
                    <p className="text-xs font-semibold text-center">
                      {LEVEL_NAMES[index]}
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      {LEVEL_AGES[index]}
                    </p>
                    <p className="text-xs text-center mt-2 leading-tight">
                      {LEVEL_DESCRIPTIONS[index]}
                    </p>
                  </div>
                </div>

                {/* Botón */}
                <Button
                  size="sm"
                  className="w-full mt-3"
                  style={{
                    backgroundColor: appliedTheme?.accentColor,
                  }}
                  disabled={!canAccess}
                >
                  {isRecommended ? (
                    <>
                      <Star className="w-3 h-3 mr-1" />
                      Comenzar
                    </>
                  ) : (
                    "Jugar"
                  )}
                </Button>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Info adicional */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-xs text-blue-800">
          💡 Puedes acceder a un nivel arriba del recomendado para desafiarte.
          Desbloquea nuevos niveles completando cursos.
        </p>
      </Card>
    </div>
  )
}
