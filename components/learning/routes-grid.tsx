// ============================================
// COMPONENTE: RUTAS DISPONIBLES
// ============================================

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Route } from "@/lib/types"
import { useDatabase } from "@/hooks/use-database"

interface RoutesGridProps {
  studentAgeGroup: string
  appliedTheme: any
  onSelectRoute: (route: Route) => void
}

export function RoutesGrid({
  studentAgeGroup,
  appliedTheme,
  onSelectRoute,
}: RoutesGridProps) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const { listRoutes } = useDatabase()

  useEffect(() => {
    async function loadRoutes() {
      const allRoutes = await listRoutes()
      setRoutes(allRoutes)
      setLoading(false)
    }
    loadRoutes()
  }, [listRoutes])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: appliedTheme?.accentColor }} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Rutas de Aprendizaje</h2>
        <p className="text-muted-foreground">Elige una ruta para comenzar tu aventura</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {routes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-all h-full flex flex-col justify-between"
              style={{
                borderColor: appliedTheme?.accentColor,
              }}
              onClick={() => onSelectRoute(route)}
            >
              {/* Emoji de ruta */}
              <div className="text-5xl mb-4">{route.emoji}</div>

              {/* Información */}
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{route.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {route.description}
                </p>
              </div>

              {/* Estadísticas */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span>Temas:</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Cursos:</span>
                  <Badge variant="secondary">{route.totalCourses}</Badge>
                </div>
              </div>

              {/* Botón */}
              <Button
                className="w-full"
                style={{
                  backgroundColor: appliedTheme?.accentColor,
                }}
              >
                Explorar →
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
