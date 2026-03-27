"use client"

import { motion } from "framer-motion"
import { GraduationCap, Users, ArrowRight } from "lucide-react"

interface LandingHeroProps {
  onSelectRole: (role: "student" | "teacher") => void
  translations: {
    title: string
    subtitle: string
    studentBtn: string
    teacherBtn: string
    tagline: string
  }
}

export function LandingHero({ onSelectRole, translations }: LandingHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground mb-4"
          >
            {translations.tagline}
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance"
          >
            <span className="text-primary">
              {translations.title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mb-12 max-w-xl mx-auto text-pretty"
          >
            {translations.subtitle}
          </motion.p>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <RoleCard
              icon={<GraduationCap className="w-5 h-5" />}
              title={translations.studentBtn}
              onClick={() => onSelectRole("student")}
            />
            <RoleCard
              icon={<Users className="w-5 h-5" />}
              title={translations.teacherBtn}
              onClick={() => onSelectRole("teacher")}
              variant="outline"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RoleCard({
  icon,
  title,
  onClick,
  variant = "default",
}: {
  icon: React.ReactNode
  title: string
  onClick: () => void
  variant?: "default" | "outline"
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-colors ${
        variant === "default"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border hover:border-primary/50 hover:text-primary"
      }`}
    >
      {icon}
      <span>{title}</span>
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  )
}
