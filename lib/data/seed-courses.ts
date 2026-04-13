// ============================================
// SEED DATA - CURSOS DE APRENDIZAJE
// ============================================

import { LearningCourse, AgeGroup } from "@/lib/types"
import { IdGenerator } from "@/lib/services/generators"

/**
 * RUTA PILOTO: Números Infinitos (Matemáticas)
 * Tema 1: Numeración & Aritmética
 * Nivel 1 (3-5 años): "Números Mágicos"
 *
 * Este es el template para las otras rutas
 */

export const LEARNING_COURSES: LearningCourse[] = [
  // ===== RUTA 1: NÚMEROS INFINITOS =====
  // TEMA 1: Numeración & Aritmética
  // Nivel 1 (Primeros Pasos - 3-5 años)
  {
    id: "crs_num_1_1_1",
    routeId: "rte_numeros_infinitos",
    themeId: "tema_1_1",
    levelId: 1,
    ageGroup: "3-5",
    title: "Números Mágicos (1-10)",
    description: "Aprende a contar del 1 al 10 junto a personajes mágicos",
    
    lessons: [
      {
        id: "les_1",
        title: "Los Números del 1 al 5",
        description: "Conoce los primeros 5 números mágicos",
        duration: 3,
        content: "Sistema numérico básico con animaciones",
        type: "explanation",
      },
      {
        id: "les_2",
        title: "Los Números del 6 al 10",
        description: "Completamos la décena",
        duration: 3,
        content: "Continuación números básicos",
        type: "explanation",
      },
      {
        id: "les_3",
        title: "Contar Objetos",
        description: "Practica contando objetos en pantalla",
        duration: 5,
        content: "Ejercicios interactivos de conteo",
        type: "exercise",
      },
    ],

    miniGames: [
      {
        id: "game_1",
        title: "Carrera de Números",
        description: "¿Cuántos objetos ves? ¡Selecciona el número correcto!",
        duration: 5,
        theme: {
          colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
          emojis: ["🎮", "⭐", "🎯"],
          sounds: ["victory", "correct", "next"],
        },
        difficulty: 1,
        pointsReward: 20,
      },
      {
        id: "game_2",
        title: "Secuencia Mágica",
        description: "Sigue la secuencia de números correcta",
        duration: 5,
        theme: {
          colors: ["#9B59B6", "#F39C12", "#E74C3C"],
          emojis: ["✨", "🌟", "💫"],
          sounds: ["success", "magic", "complete"],
        },
        difficulty: 1,
        pointsReward: 25,
      },
    ],

    project: {
      title: "Mi Colección de 10",
      description: "Recolecta 10 objetos diferentes en tu proyecto",
      duration: 10,
    },

    epicEvaluation: {
      title: "Duelo del Saber - Números Mágicos",
      phases: 4,
      totalDuration: 30,
      maxPoints: 500,
    },

    totalDuration: 35,
    createdAt: new Date().toISOString(),
  },

  // Nivel 2 (Explorador - 6-8 años)
  {
    id: "crs_num_1_1_2",
    routeId: "rte_numeros_infinitos",
    themeId: "tema_1_1",
    levelId: 2,
    ageGroup: "6-8",
    title: "Suma y Resta (hasta 20)",
    description: "Domina suma y resta con números hasta 20",

    lessons: [
      {
        id: "les_1",
        title: "¿Qué es la Suma?",
        description: "Concepto básico de suma",
        duration: 5,
        content: "Explicación interactiva con bloques",
        type: "explanation",
      },
      {
        id: "les_2",
        title: "¿Qué es la Resta?",
        description: "Concepto básico de resta",
        duration: 5,
        content: "Explicación visual",
        type: "explanation",
      },
      {
        id: "les_3",
        title: "Suma y Resta en Acción",
        description: "Practica operaciones básicas",
        duration: 8,
        content: "Ejercicios interactivos",
        type: "exercise",
      },
    ],

    miniGames: [
      {
        id: "game_1",
        title: "Torres de Bloques",
        description: "Suma correctamente para construir torres",
        duration: 8,
        theme: {
          colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
          emojis: ["🧱", "🏗️", "⭐"],
          sounds: ["build", "success"],
        },
        difficulty: 2,
        pointsReward: 30,
      },
      {
        id: "game_2",
        title: "Aventura Numérica",
        description: "Resuelve sumas y restas para avanzar",
        duration: 8,
        theme: {
          colors: ["#9B59B6", "#F39C12", "#E74C3C"],
          emojis: ["🗺️", "🌍", "🎯"],
          sounds: ["level_up", "win"],
        },
        difficulty: 2,
        pointsReward: 35,
      },
    ],

    project: {
      title: "Mi Tienda de Números",
      description: "Crea una tienda virtual usando sumas y restas",
      duration: 15,
    },

    epicEvaluation: {
      title: "Duelo del Saber - Suma y Resta",
      phases: 4,
      totalDuration: 30,
      maxPoints: 500,
    },

    totalDuration: 40,
    createdAt: new Date().toISOString(),
  },

  // Nivel 3 (Aventurero - 9-11 años)
  {
    id: "crs_num_1_1_3",
    routeId: "rte_numeros_infinitos",
    themeId: "tema_1_1",
    levelId: 3,
    ageGroup: "9-11",
    title: "Multiplicación & División",
    description: "Aprende multiplicación y división",

    lessons: [
      {
        id: "les_1",
        title: "¿Qué es la Multiplicación?",
        description: "Sumas repetidas como multiplicación",
        duration: 6,
        content: "Explicación con ejemplos visuales",
        type: "explanation",
      },
      {
        id: "les_2",
        title: "¿Qué es la División?",
        description: "Repartir en partes iguales",
        duration: 6,
        content: "Explicación con simulaciones",
        type: "explanation",
      },
      {
        id: "les_3",
        title: "Tablas de Multiplicar",
        description: "Memoriza las tablas hasta el 10",
        duration: 10,
        content: "Ejercicios de memorización",
        type: "exercise",
      },
    ],

    miniGames: [
      {
        id: "game_1",
        title: "Multiplicación Rápida",
        description: "Resuelve sumas de multiplicación contra reloj",
        duration: 10,
        theme: {
          colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
          emojis: ["⚡", "⏱️", "🎯"],
          sounds: ["tick", "correct", "victory"],
        },
        difficulty: 3,
        pointsReward: 40,
      },
      {
        id: "game_2",
        title: "División Inteligente",
        description: "Divide correctamente para ganar puntos",
        duration: 10,
        theme: {
          colors: ["#9B59B6", "#F39C12", "#E74C3C"],
          emojis: ["🎲", "🔢", "✨"],
          sounds: ["divide", "success"],
        },
        difficulty: 3,
        pointsReward: 45,
      },
    ],

    project: {
      title: "Tabla de Multiplicar Personal",
      description: "Crea una tabla de multiplicar interactiva",
      duration: 20,
    },

    epicEvaluation: {
      title: "Duelo del Saber - Multiplicación & División",
      phases: 4,
      totalDuration: 30,
      maxPoints: 500,
    },

    totalDuration: 50,
    createdAt: new Date().toISOString(),
  },

  // Nivel 4 (Emprendedor - 12-14 años)
  {
    id: "crs_num_1_1_4",
    routeId: "rte_numeros_infinitos",
    themeId: "tema_1_1",
    levelId: 4,
    ageGroup: "12-14",
    title: "Álgebra Básica & Fracciones",
    description: "Introduce variables y fracciones",

    lessons: [
      {
        id: "les_1",
        title: "¿Qué son las Variables?",
        description: "La letra 'x' en ecuaciones",
        duration: 8,
        content: "Introducción a variables",
        type: "explanation",
      },
      {
        id: "les_2",
        title: "Fracciones Básicas",
        description: "Partes de un todo",
        duration: 8,
        content: "Conceptos de fracciones",
        type: "explanation",
      },
      {
        id: "les_3",
        title: "Resolviendo Ecuaciones",
        description: "Encuentra el valor de x",
        duration: 10,
        content: "Ejemplos y práctica",
        type: "exercise",
      },
    ],

    miniGames: [
      {
        id: "game_1",
        title: "Cazador de Ecuaciones",
        description: "Resuelve ecuaciones de primer grado",
        duration: 12,
        theme: {
          colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
          emojis: ["🎯", "🔍", "x"],
          sounds: ["solve", "correct"],
        },
        difficulty: 4,
        pointsReward: 50,
      },
      {
        id: "game_2",
        title: "Maestro de Fracciones",
        description: "Simplifica fracciones correctamente",
        duration: 12,
        theme: {
          colors: ["#9B59B6", "#F39C12", "#E74C3C"],
          emojis: ["🥧", "✂️", "📐"],
          sounds: ["fraction", "correct"],
        },
        difficulty: 4,
        pointsReward: 55,
      },
    ],

    project: {
      title: "Proyecto de Álgebra",
      description: "Crea y resuelve tus propias ecuaciones",
      duration: 25,
    },

    epicEvaluation: {
      title: "Duelo del Saber - Álgebra Básica",
      phases: 4,
      totalDuration: 30,
      maxPoints: 500,
    },

    totalDuration: 60,
    createdAt: new Date().toISOString(),
  },

  // Nivel 5 (Experto - 15+ años)
  {
    id: "crs_num_1_1_5",
    routeId: "rte_numeros_infinitos",
    themeId: "tema_1_1",
    levelId: 5,
    ageGroup: "15+",
    title: "Funciones & Gráficas",
    description: "Gráficas, funciones lineales y análisis",

    lessons: [
      {
        id: "les_1",
        title: "¿Qué es una Función?",
        description: "Entrada, proceso, salida",
        duration: 10,
        content: "Concepto de función matemática",
        type: "explanation",
      },
      {
        id: "les_2",
        title: "Sistema de Coordenadas",
        description: "Plano cartesiano (X, Y)",
        duration: 10,
        content: "Ubicación de puntos",
        type: "explanation",
      },
      {
        id: "les_3",
        title: "Funciones Lineales",
        description: "Rectas y ecuaciones",
        duration: 15,
        content: "Incluye gráficas interactivas",
        type: "exercise",
      },
    ],

    miniGames: [
      {
        id: "game_1",
        title: "Constructor de Gráficas",
        description: "Dibuja gráficas según funciones",
        duration: 15,
        theme: {
          colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
          emojis: ["📊", "📈", "🎨"],
          sounds: ["plot", "correct"],
        },
        difficulty: 5,
        pointsReward: 60,
      },
      {
        id: "game_2",
        title: "Análisis de Funciones",
        description: "Encuentra máximos, mínimos y pendientes",
        duration: 15,
        theme: {
          colors: ["#9B59B6", "#F39C12", "#E74C3C"],
          emojis: ["🔬", "📐", "🧮"],
          sounds: ["analyze", "correct"],
        },
        difficulty: 5,
        pointsReward: 65,
      },
    ],

    project: {
      title: "Mi Función Personal",
      description: "Crea y analiza una función del mundo real",
      duration: 30,
    },

    epicEvaluation: {
      title: "Duelo del Saber - Funciones Avanzadas",
      phases: 4,
      totalDuration: 30,
      maxPoints: 500,
    },

    totalDuration: 70,
    createdAt: new Date().toISOString(),
  },
]

/**
 * Índice rápido de cursos por ruta/tema/nivel
 */
export function getCourseKey(routeId: string, themeId: string, levelId: number): string {
  return `${routeId}_${themeId}_${levelId}`
}
