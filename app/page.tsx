"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { LandingHero } from "@/components/landing-hero"
import { AuthModal } from "@/components/auth-modal"
import { StudentDashboard } from "@/components/student-dashboard"
import { TeacherDashboard } from "@/components/teacher-dashboard"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

// Translations object
const translations = {
  en: {
    navbar: {
      home: "Home",
      features: "Features",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Unlock Infinite Potential",
      subtitle: "A revolutionary educational platform designed for extraordinary minds. Explore quantum physics, master digital arts, sharpen logical reasoning, and dive into philosophical inquiry.",
      studentBtn: "I'm a Student",
      teacherBtn: "I'm a Teacher",
      tagline: "Designed for Gifted Minds",
    },
    auth: {
      login: "Log In",
      signup: "Sign Up",
      email: "Email Address",
      password: "Password",
      name: "Full Name",
      continueWith: "Continue with",
      orContinueWith: "or continue with email",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      welcomeBack: "Welcome Back",
      createAccount: "Create Account",
    },
    student: {
      welcome: "Welcome back",
      continuelearning: "Continue where you left off",
      innovativeAreas: "Innovative Learning Areas",
      quantumLab: "Quantum Lab",
      digitalArts: "Digital Arts",
      advancedLogic: "Advanced Logic",
      ethicsPhilosophy: "Ethics & Philosophy",
      videoLessons: "Video Lessons",
      viewAll: "View All",
      progress: "Progress",
      streak: "Streak",
      achievements: "Achievements",
      recentActivity: "Recent Activity",
    },
    teacher: {
      welcome: "Welcome back",
      studentManagement: "Student Management",
      addStudent: "Add Student",
      analytics: "Analytics Overview",
      searchStudents: "Search students...",
      name: "Name",
      email: "Email",
      level: "Level",
      progress: "Progress",
      actions: "Actions",
      totalStudents: "Total Students",
      avgProgress: "Avg. Progress",
      activeNow: "Active Now",
      hoursLearned: "Hours Learned",
      progressByArea: "Progress by Area",
      weeklyActivity: "Weekly Activity",
      levelDistribution: "Level Distribution",
    },
    footer: {
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookieSettings: "Cookie Settings",
      contactUs: "Contact Us",
      aboutUs: "About Us",
      careers: "Careers",
      blog: "Blog",
      support: "Support",
      newsletter: "Newsletter",
      subscribeText: "Subscribe to our newsletter for updates",
    },
  },
  es: {
    navbar: {
      home: "Inicio",
      features: "Características",
      about: "Acerca de",
      contact: "Contacto",
    },
    hero: {
      title: "Desbloquea el Potencial Infinito",
      subtitle: "Una plataforma educativa revolucionaria diseñada para mentes extraordinarias. Explora la física cuántica, domina las artes digitales, agudiza el razonamiento lógico y sumérgete en la investigación filosófica.",
      studentBtn: "Soy Estudiante",
      teacherBtn: "Soy Profesor",
      tagline: "Diseñado para Mentes Dotadas",
    },
    auth: {
      login: "Iniciar Sesión",
      signup: "Registrarse",
      email: "Correo Electrónico",
      password: "Contraseña",
      name: "Nombre Completo",
      continueWith: "Continuar con",
      orContinueWith: "o continuar con correo",
      noAccount: "¿No tienes cuenta?",
      hasAccount: "¿Ya tienes cuenta?",
      welcomeBack: "Bienvenido de Nuevo",
      createAccount: "Crear Cuenta",
    },
    student: {
      welcome: "Bienvenido de nuevo",
      continuelearning: "Continúa donde lo dejaste",
      innovativeAreas: "Áreas de Aprendizaje Innovadoras",
      quantumLab: "Laboratorio Cuántico",
      digitalArts: "Artes Digitales",
      advancedLogic: "Lógica Avanzada",
      ethicsPhilosophy: "Ética y Filosofía",
      videoLessons: "Lecciones en Video",
      viewAll: "Ver Todo",
      progress: "Progreso",
      streak: "Racha",
      achievements: "Logros",
      recentActivity: "Actividad Reciente",
    },
    teacher: {
      welcome: "Bienvenido de nuevo",
      studentManagement: "Gestión de Estudiantes",
      addStudent: "Añadir Estudiante",
      analytics: "Resumen Analítico",
      searchStudents: "Buscar estudiantes...",
      name: "Nombre",
      email: "Correo",
      level: "Nivel",
      progress: "Progreso",
      actions: "Acciones",
      totalStudents: "Total Estudiantes",
      avgProgress: "Progreso Prom.",
      activeNow: "Activos Ahora",
      hoursLearned: "Horas Aprendidas",
      progressByArea: "Progreso por Área",
      weeklyActivity: "Actividad Semanal",
      levelDistribution: "Distribución de Niveles",
    },
    footer: {
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      cookieSettings: "Configuración de Cookies",
      contactUs: "Contáctanos",
      aboutUs: "Sobre Nosotros",
      careers: "Carreras",
      blog: "Blog",
      support: "Soporte",
      newsletter: "Boletín",
      subscribeText: "Suscríbete a nuestro boletín",
    },
  },
  de: {
    navbar: {
      home: "Startseite",
      features: "Funktionen",
      about: "Über uns",
      contact: "Kontakt",
    },
    hero: {
      title: "Entfessle unendliches Potenzial",
      subtitle: "Eine revolutionäre Bildungsplattform für außergewöhnliche Köpfe. Erkunde Quantenphysik, meistere digitale Kunst, schärfe logisches Denken und tauche in philosophische Untersuchungen ein.",
      studentBtn: "Ich bin Schüler",
      teacherBtn: "Ich bin Lehrer",
      tagline: "Für begabte Köpfe entwickelt",
    },
    auth: {
      login: "Anmelden",
      signup: "Registrieren",
      email: "E-Mail-Adresse",
      password: "Passwort",
      name: "Vollständiger Name",
      continueWith: "Weiter mit",
      orContinueWith: "oder mit E-Mail fortfahren",
      noAccount: "Noch kein Konto?",
      hasAccount: "Bereits ein Konto?",
      welcomeBack: "Willkommen zurück",
      createAccount: "Konto erstellen",
    },
    student: {
      welcome: "Willkommen zurück",
      continuelearning: "Mach weiter, wo du aufgehört hast",
      innovativeAreas: "Innovative Lernbereiche",
      quantumLab: "Quantenlabor",
      digitalArts: "Digitale Kunst",
      advancedLogic: "Fortgeschrittene Logik",
      ethicsPhilosophy: "Ethik & Philosophie",
      videoLessons: "Videolektionen",
      viewAll: "Alle anzeigen",
      progress: "Fortschritt",
      streak: "Serie",
      achievements: "Erfolge",
      recentActivity: "Letzte Aktivität",
    },
    teacher: {
      welcome: "Willkommen zurück",
      studentManagement: "Schülerverwaltung",
      addStudent: "Schüler hinzufügen",
      analytics: "Analyseübersicht",
      searchStudents: "Schüler suchen...",
      name: "Name",
      email: "E-Mail",
      level: "Niveau",
      progress: "Fortschritt",
      actions: "Aktionen",
      totalStudents: "Gesamtschüler",
      avgProgress: "Durchschn. Fortschritt",
      activeNow: "Jetzt aktiv",
      hoursLearned: "Gelernte Stunden",
      progressByArea: "Fortschritt nach Bereich",
      weeklyActivity: "Wöchentliche Aktivität",
      levelDistribution: "Niveauverteilung",
    },
    footer: {
      privacyPolicy: "Datenschutzrichtlinie",
      termsOfService: "Nutzungsbedingungen",
      cookieSettings: "Cookie-Einstellungen",
      contactUs: "Kontaktieren Sie uns",
      aboutUs: "Über uns",
      careers: "Karriere",
      blog: "Blog",
      support: "Support",
      newsletter: "Newsletter",
      subscribeText: "Abonnieren Sie unseren Newsletter",
    },
  },
  zh: {
    navbar: {
      home: "首页",
      features: "功能",
      about: "关于",
      contact: "联系",
    },
    hero: {
      title: "解锁无限潜能",
      subtitle: "一个为杰出头脑设计的革命性教育平台。探索量子物理，掌握数字艺术，锐化逻辑推理，深入哲学探究。",
      studentBtn: "我是学生",
      teacherBtn: "我是老师",
      tagline: "专为天才设计",
    },
    auth: {
      login: "登录",
      signup: "注册",
      email: "电子邮箱",
      password: "密码",
      name: "全名",
      continueWith: "继续使用",
      orContinueWith: "或使用邮箱继续",
      noAccount: "没有账户？",
      hasAccount: "已有账户？",
      welcomeBack: "欢迎回来",
      createAccount: "创建账户",
    },
    student: {
      welcome: "欢迎回来",
      continuelearning: "继续上次的学习",
      innovativeAreas: "创新学习领域",
      quantumLab: "量子实验室",
      digitalArts: "数字艺术",
      advancedLogic: "高级逻辑",
      ethicsPhilosophy: "伦理与哲学",
      videoLessons: "视频课程",
      viewAll: "查看全部",
      progress: "进度",
      streak: "连续学习",
      achievements: "成就",
      recentActivity: "最近活动",
    },
    teacher: {
      welcome: "欢迎回来",
      studentManagement: "学生管理",
      addStudent: "添加学生",
      analytics: "数据分析概览",
      searchStudents: "搜索学生...",
      name: "姓名",
      email: "邮箱",
      level: "等级",
      progress: "进度",
      actions: "操作",
      totalStudents: "学生总数",
      avgProgress: "平均进度",
      activeNow: "当前在线",
      hoursLearned: "学习时长",
      progressByArea: "分区进度",
      weeklyActivity: "周活动",
      levelDistribution: "等级分布",
    },
    footer: {
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      cookieSettings: "Cookie设置",
      contactUs: "联系我们",
      aboutUs: "关于我们",
      careers: "招聘",
      blog: "博客",
      support: "支持",
      newsletter: "时事通讯",
      subscribeText: "订阅我们的新闻通讯",
    },
  },
}

type Language = keyof typeof translations
type View = "landing" | "student" | "teacher"

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en")
  const [view, setView] = useState<View>("landing")
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = translations[language]

  const handleSelectRole = (role: "student" | "teacher") => {
    setSelectedRole(role)
    setShowAuthModal(true)
  }

  const handleAuth = () => {
    setShowAuthModal(false)
    if (selectedRole) {
      setView(selectedRole)
    }
  }

  const handleBackToLanding = () => {
    setView("landing")
    setSelectedRole(null)
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="relative min-h-screen bg-background">
      {/* Navigation */}
      <Navbar
        language={language}
        setLanguage={(lang) => setLanguage(lang as Language)}
        translations={t.navbar}
      />

      {/* Back Button (visible in dashboard views) */}
      <AnimatePresence>
        {view !== "landing" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-24 left-4 z-40"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToLanding}
              className="glass-card rounded-xl border-border/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <Home className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Switcher (visible in dashboard views) */}
      <AnimatePresence>
        {view !== "landing" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-4 z-40"
          >
            <div className="glass-card rounded-xl p-1 flex gap-1">
              <button
                onClick={() => setView("student")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "student"
                    ? "gradient-bg text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setView("teacher")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "teacher"
                    ? "gradient-bg text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Teacher
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingHero
              onSelectRole={handleSelectRole}
              translations={t.hero}
            />
          </motion.div>
        )}

        {view === "student" && (
          <motion.div
            key="student"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <StudentDashboard translations={t.student} />
          </motion.div>
        )}

        {view === "teacher" && (
          <motion.div
            key="teacher"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <TeacherDashboard translations={t.teacher} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        role={selectedRole || "student"}
        translations={t.auth}
      />

      {/* Footer */}
      <Footer translations={t.footer} />
    </main>
  )
}
