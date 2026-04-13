// ============================================
// SEED DATA - RUTAS Y CURSOS INICIALES
// ============================================

import { Route, Theme, AgeGroup } from "@/lib/types"
import { IdGenerator } from "@/lib/services/generators"

/**
 * Datos iniciales para cargar en la BD
 * Contiene todas las rutas, temas y cursos básicos
 */

// ===== RUTAS =====
export const ROUTES: Route[] = [
  {
    id: "rte_numeros_infinitos",
    title: "Números Infinitos",
    description: "Domina las matemáticas desde lo más básico hasta álgebra avanzada",
    emoji: "🧮",
    category: "matematicas",
    themes: [],
    totalCourses: 75,
  },
  {
    id: "rte_tycoon_financiero",
    title: "Tycoon Financiero",
    description: "Aprende a gestionar dinero y crear tu imperio financiero",
    emoji: "💰",
    category: "finanzas",
    themes: [],
    totalCourses: 75,
  },
  {
    id: "rte_global_explorer",
    title: "Global Explorer",
    description: "Domina el inglés y descubre culturas del mundo",
    emoji: "🌍",
    category: "ingles",
    themes: [],
    totalCourses: 75,
  },
  {
    id: "rte_maquina_inteligente",
    title: "Máquina Inteligente",
    description: "Explora el futuro con inteligencia artificial",
    emoji: "🤖",
    category: "ia",
    themes: [],
    totalCourses: 75,
  },
  {
    id: "rte_constructor_mecanico",
    title: "Constructor Mecánico",
    description: "Construye robots y sistemas automatizados",
    emoji: "🦾",
    category: "robotica",
    themes: [],
    totalCourses: 75,
  },
  {
    id: "rte_game_dev_master",
    title: "Game Dev Master",
    description: "Crea tus propios videojuegos",
    emoji: "🎮",
    category: "videojuegos",
    themes: [],
    totalCourses: 75,
  },
  {
    id: "rte_shield_hacker",
    title: "Shield Hacker",
    description: "Protégete en internet y aprende ciberseguridad",
    emoji: "🔐",
    category: "ciberseguridad",
    themes: [],
    totalCourses: 75,
  },
  {
    id: "rte_content_creator_pro",
    title: "Content Creator Pro",
    description: "Sé un creador de contenido seguro y responsable",
    emoji: "📱",
    category: "redes_sociales",
    themes: [],
    totalCourses: 75,
  },
]

// ===== TEMAS POR RUTA =====
export const THEMES: Theme[] = [
  // Ruta 1: Números Infinitos
  {
    id: "tema_1_1",
    routeId: "rte_numeros_infinitos",
    themeNumber: 1,
    title: "Numeración & Aritmética",
    description: "Aprende números, suma, resta, multiplicación y división",
    emoji: "➕",
  },
  {
    id: "tema_1_2",
    routeId: "rte_numeros_infinitos",
    themeNumber: 2,
    title: "Geometría & Espacialidad",
    description: "Explora formas, perímetro, área y volumen",
    emoji: "🟠",
  },
  {
    id: "tema_1_3",
    routeId: "rte_numeros_infinitos",
    themeNumber: 3,
    title: "Álgebra & Lógica",
    description: "Resuelve ecuaciones y aprende lógica matemática",
    emoji: "✖️",
  },

  // Ruta 2: Tycoon Financiero
  {
    id: "tema_2_1",
    routeId: "rte_tycoon_financiero",
    themeNumber: 1,
    title: "Dinero & Transacciones",
    description: "Entiende cómo funciona el dinero",
    emoji: "💵",
  },
  {
    id: "tema_2_2",
    routeId: "rte_tycoon_financiero",
    themeNumber: 2,
    title: "Presupuesto & Ahorro",
    description: "Aprende a ahorrar y presupuestar",
    emoji: "🏦",
  },
  {
    id: "tema_2_3",
    routeId: "rte_tycoon_financiero",
    themeNumber: 3,
    title: "Inversión & Crecimiento",
    description: "Invierte y haz crecer tu dinero",
    emoji: "📈",
  },

  // Ruta 3: Global Explorer
  {
    id: "tema_3_1",
    routeId: "rte_global_explorer",
    themeNumber: 1,
    title: "Vocabulario Temático",
    description: "Aprende palabras en inglés por temas",
    emoji: "📚",
  },
  {
    id: "tema_3_2",
    routeId: "rte_global_explorer",
    themeNumber: 2,
    title: "Conversación & Frases",
    description: "Practica conversaciones reales",
    emoji: "💬",
  },
  {
    id: "tema_3_3",
    routeId: "rte_global_explorer",
    themeNumber: 3,
    title: "Cultura & Costumbres",
    description: "Descubre culturas alrededor del mundo",
    emoji: "🎭",
  },

  // Ruta 4: Máquina Inteligente
  {
    id: "tema_4_1",
    routeId: "rte_maquina_inteligente",
    themeNumber: 1,
    title: "Conceptos IA Básicos",
    description: "¿Qué es la inteligencia artificial?",
    emoji: "🧠",
  },
  {
    id: "tema_4_2",
    routeId: "rte_maquina_inteligente",
    themeNumber: 2,
    title: "Aplicaciones IA",
    description: "Conoce usos reales de IA",
    emoji: "🔧",
  },
  {
    id: "tema_4_3",
    routeId: "rte_maquina_inteligente",
    themeNumber: 3,
    title: "Chat & Prompts",
    description: "Aprende a usar herramientas de IA",
    emoji: "💬",
  },

  // Ruta 5: Constructor Mecánico
  {
    id: "tema_5_1",
    routeId: "rte_constructor_mecanico",
    themeNumber: 1,
    title: "Conceptos Básicos",
    description: "Máquinas simples y mecanismos",
    emoji: "⚙️",
  },
  {
    id: "tema_5_2",
    routeId: "rte_constructor_mecanico",
    themeNumber: 2,
    title: "Construcción",
    description: "Construye robots y máquinas",
    emoji: "🔨",
  },
  {
    id: "tema_5_3",
    routeId: "rte_constructor_mecanico",
    themeNumber: 3,
    title: "Sensores & Control",
    description: "Usa sensores y automatización",
    emoji: "📡",
  },

  // Ruta 6: Game Dev Master
  {
    id: "tema_6_1",
    routeId: "rte_game_dev_master",
    themeNumber: 1,
    title: "Conceptos Game Design",
    description: "Diseña videojuegos",
    emoji: "🎨",
  },
  {
    id: "tema_6_2",
    routeId: "rte_game_dev_master",
    themeNumber: 2,
    title: "Plataformas Criar Juegos",
    description: "Usa Scratch, Unity, Godot",
    emoji: "🎯",
  },
  {
    id: "tema_6_3",
    routeId: "rte_game_dev_master",
    themeNumber: 3,
    title: "Arte & Sonido",
    description: "Crea gráficos y sonidos",
    emoji: "🎵",
  },

  // Ruta 7: Shield Hacker
  {
    id: "tema_7_1",
    routeId: "rte_shield_hacker",
    themeNumber: 1,
    title: "Protección Básica",
    description: "Crea contraseñas fuertes",
    emoji: "🔒",
  },
  {
    id: "tema_7_2",
    routeId: "rte_shield_hacker",
    themeNumber: 2,
    title: "Detección Amenazas",
    description: "Identifica peligros en internet",
    emoji: "⚠️",
  },
  {
    id: "tema_7_3",
    routeId: "rte_shield_hacker",
    themeNumber: 3,
    title: "Privacidad & Datos",
    description: "Protege tu información",
    emoji: "🛡️",
  },

  // Ruta 8: Content Creator Pro
  {
    id: "tema_8_1",
    routeId: "rte_content_creator_pro",
    themeNumber: 1,
    title: "Creación Contenido",
    description: "Crea contenido creativo",
    emoji: "🎬",
  },
  {
    id: "tema_8_2",
    routeId: "rte_content_creator_pro",
    themeNumber: 2,
    title: "Redes Sociales Seguras",
    description: "Usa redes con responsabilidad",
    emoji: "📱",
  },
  {
    id: "tema_8_3",
    routeId: "rte_content_creator_pro",
    themeNumber: 3,
    title: "Comunidad & Engagement",
    description: "Construye comunidad",
    emoji: "👥",
  },
]

// Mapeo de rutas a temas
export const routeThemeMap: Record<string, string[]> = {
  "rte_numeros_infinitos": ["tema_1_1", "tema_1_2", "tema_1_3"],
  "rte_tycoon_financiero": ["tema_2_1", "tema_2_2", "tema_2_3"],
  "rte_global_explorer": ["tema_3_1", "tema_3_2", "tema_3_3"],
  "rte_maquina_inteligente": ["tema_4_1", "tema_4_2", "tema_4_3"],
  "rte_constructor_mecanico": ["tema_5_1", "tema_5_2", "tema_5_3"],
  "rte_game_dev_master": ["tema_6_1", "tema_6_2", "tema_6_3"],
  "rte_shield_hacker": ["tema_7_1", "tema_7_2", "tema_7_3"],
  "rte_content_creator_pro": ["tema_8_1", "tema_8_2", "tema_8_3"],
}

// Actualizar temas en rutas
export function initializeRoutes(): Route[] {
  return ROUTES.map((route) => ({
    ...route,
    themes: THEMES.filter((theme) => theme.routeId === route.id),
  }))
}

// Configuración de contenidos por edad
export const CONTENT_BY_AGE_GROUP: Record<AgeGroup, string[]> = {
  "3-5": ["tema_1_1", "tema_2_1", "tema_3_1", "tema_4_1", "tema_5_1", "tema_6_1", "tema_7_1", "tema_8_1"],
  "6-8": ["tema_1_1", "tema_2_1", "tema_3_1", "tema_4_1", "tema_5_1", "tema_6_1", "tema_7_1", "tema_8_1"],
  "9-11": ["tema_1_2", "tema_2_2", "tema_3_2", "tema_4_2", "tema_5_2", "tema_6_2", "tema_7_2", "tema_8_2"],
  "12-14": ["tema_1_3", "tema_2_3", "tema_3_3", "tema_4_3", "tema_5_3", "tema_6_3", "tema_7_3", "tema_8_3"],
  "15+": ["tema_1_3", "tema_2_3", "tema_3_3", "tema_4_3", "tema_5_3", "tema_6_3", "tema_7_3", "tema_8_3"],
}
