// ============================================
// TIPOS PRINCIPALES - FACTOR K v3.0
// ============================================

// ===== ESTUDIANTE =====
export type AgeGroup = "3-5" | "6-8" | "9-11" | "12-14" | "15+"
export type ContentLevel = "PrimerosPasos" | "Explorador" | "Aventurero" | "Emprendedor" | "Experto"
export type Gender = "niño" | "niña" | "otro"

export interface HeroProfile {
  animal: string
  spiritAnimal: string
  superpower: string
  place: string
  adventurerClass: string
  heroClass?: string
  classEmoji: string
  classDescription: string
}

export interface SportProfile {
  sport?: string
  favoriteSport?: string
  team?: string
  favoriteTeam?: string
  teamColors?: { primary: string; secondary: string }
  teamShield?: string
  favoriteColor: string
}

export interface AppliedTheme {
  primaryBg: string
  secondaryBg: string
  accentColor: string
  headerImage?: string
  dashboardGradient: string
}

export interface StudentProfile {
  // Básicos
  id: string
  name: string
  fullName?: string
  dateOfBirth: string // ISO 8601
  age: number
  gender: Gender
  email?: string
  ageGroup: AgeGroup
  contentLevel: ContentLevel
  
  // Perfil Aventurero
  heroProfile: HeroProfile
  
  // Perfil Deportivo
  sportProfile: SportProfile
  
  // Tema Visual
  appliedTheme: AppliedTheme
  
  // Progreso
  routeProgress: Record<string, RouteProgress>
  
  // Score Global
  scoreSystem: {
    totalPoints: number
    streakDays: number
    lastActivityDate?: string
    completedCourses: string[]
  }
  
  // Badges & Logros
  badges: Badge[]
  
  // Sistema Escuela
  schoolId?: string
  groupId?: string
  
  // Metadata
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export interface RouteProgress {
  routeId: string
  currentLevel: number
  currentTheme: number
  completedLevels: number[]
  totalPoints: number
  badges: string[]
  completedAt?: string
}

// ===== APRENDIZAJE =====
export interface Lesson {
  id: string
  title: string
  description: string
  duration: number // en minutos
  content: string
  type: "explanation" | "exercise" | "game" | "project" | "evaluation"
}

export interface MiniGame {
  id: string
  title: string
  description: string
  duration: number
  theme: {
    colors: string[]
    emojis: string[]
    sounds: string[]
  }
  difficulty: 1 | 2 | 3 | 4 | 5
  pointsReward: number
}

export interface LearningCourse {
  id: string
  routeId: string
  themeId: string
  levelId: number
  ageGroup: AgeGroup
  title: string
  description: string
  
  lessons: Lesson[]
  miniGames: MiniGame[]
  project: {
    title: string
    description: string
    duration: number
  }
  
  epicEvaluation: {
    title: string
    phases: 4
    totalDuration: number
    maxPoints: number
  }
  
  totalDuration: number
  createdAt: string
}

export interface Theme {
  id: string
  routeId: string
  themeNumber: 1 | 2 | 3
  title: string
  description: string
  emoji: string
}

export interface Route {
  id: string
  title: string
  description: string
  emoji: string
  category: string
  themes: Theme[]
  totalCourses: number
}

// ===== ESCUELA Y GESTIÓN =====
export interface School {
  id: string
  name: string
  code: string
  pin: string
  createdAt: string
}

export interface Group {
  id: string
  schoolId: string
  name: string
  level: string
  description?: string
  teacherIds: string[]
  studentIds: string[]
  createdAt: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  schoolId: string
  groups: string[]
  createdAt: string
}

export interface Parent {
  id: string
  name: string
  email: string
  childrenIds: string[]
  notificationPreference: "daily" | "weekly" | "biweekly"
  createdAt: string
}

// ===== NOTIFICACIONES =====
export interface Notification {
  id: string
  recipientId: string
  type: "achievement" | "levelUp" | "reminder" | "alert"
  title: string
  message: string
  data?: Record<string, unknown>
  read: boolean
  createdAt: string
}

// ===== PROGRESO Y PUNTOS =====
export interface PointTransaction {
  id: string
  studentId: string
  amount: number
  type: "lesson" | "quiz" | "game" | "project" | "evaluation" | "bonus"
  source: string
  timestamp: string
}

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  unlockedAt?: string
}

// ===== EVALUACIONES =====
export interface EpicEvaluation {
  id: string
  studentId: string
  courseId: string
  phase1: {
    score: number
    maxScore: number
    completed: boolean
  }
  phase2: {
    score: number
    maxScore: number
    completed: boolean
  }
  phase3?: {
    opponentId: string
    won: boolean
    completed: boolean
  }
  totalPoints: number
  completedAt?: string
}
