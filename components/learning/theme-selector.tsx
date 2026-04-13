// ============================================
// COMPONENTE: SELECCIONAR TEMA EN UNA RUTA
// ============================================

"use client"

import { Route, Theme } from "@/lib/types"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ThemeSelectorProps {
  route: Route
  appliedTheme: any
  onSelectTheme: (theme: Theme) => void
  onBack: () => void
}

export function ThemeSelector({
  route,
  appliedTheme,
  onSelectTheme,
  onBack,
}: ThemeSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Header con back button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>{route.emoji}</span>
            {route.title}
          </h2>
          <p className="text-sm text-muted-foreground">{route.description}</p>
        </div>
      </div>

      {/* Temas */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Selecciona un Tema</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {route.themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-all"
              style={{
                borderColor: appliedTheme?.accentColor,
              }}
              onClick={() => onSelectTheme(theme)}
            >
              <div className="text-4xl mb-3">{theme.emoji}</div>
              <h4 className="font-bold mb-2">{theme.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {theme.description}
              </p>
              <Button
                size="sm"
                className="w-full"
                style={{
                  backgroundColor: appliedTheme?.accentColor,
                }}
              >
                Tema {theme.themeNumber}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
