// ============================================
// SERVICIOS AUXILIARES
// ============================================

import { AgeGroup, ContentLevel, AppliedTheme } from "@/lib/types"

// ===== GENERADORES DE ID =====
export class IdGenerator {
  static generate(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  static studentId(): string {
    return this.generate("std")
  }

  static routeId(): string {
    return this.generate("rte")
  }

  static courseId(): string {
    return this.generate("crs")
  }

  static schoolId(): string {
    return this.generate("sch")
  }

  static groupId(): string {
    return this.generate("grp")
  }

  static teacherId(): string {
    return this.generate("tch")
  }

  static parentId(): string {
    return this.generate("par")
  }

  static notificationId(): string {
    return this.generate("ntf")
  }

  static transactionId(): string {
    return this.generate("trx")
  }

  static evaluationId(): string {
    return this.generate("eval")
  }
}

// ===== CALCULADORES DE EDAD Y NIVEL =====
export class AgeCalculator {
  /**
   * Calcula la edad a partir de fecha de nacimiento
   */
  static calculateAge(dateOfBirth: string): number {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  /**
   * Mapea edad a grupo de edad
   */
  static getAgeGroup(age: number): AgeGroup {
    if (age <= 5) return "3-5"
    if (age <= 8) return "6-8"
    if (age <= 11) return "9-11"
    if (age <= 14) return "12-14"
    return "15+"
  }

  /**
   * Mapea edad a nivel de contenido
   */
  static getContentLevel(age: number): ContentLevel {
    if (age <= 5) return "PrimerosPasos"
    if (age <= 8) return "Explorador"
    if (age <= 11) return "Aventurero"
    if (age <= 14) return "Emprendedor"
    return "Experto"
  }
}

// ===== GENERADOR DE TEMA VISUAL =====
export class ThemeGenerator {
  /**
   * Colores de equipos de La Liga
   */
  private static TEAM_COLORS: Record<string, { primary: string; secondary: string; shield: string }> = {
    "real-madrid": {
      primary: "#FFF",
      secondary: "#DC143C",
      shield: "🤍",
    },
    barcelona: {
      primary: "#0084D6",
      secondary: "#DC0E15",
      shield: "🔵",
    },
    atletico: {
      primary: "#FF0000",
      secondary: "#FFFFFF",
      shield: "🔴",
    },
    "real-sociedad": {
      primary: "#003399",
      secondary: "#FFFFFF",
      shield: "💙",
    },
    sevilla: {
      primary: "#FF0000",
      secondary: "#FFFFFF",
      shield: "🔴",
    },
    villarreal: {
      primary: "#FFEB00",
      secondary: "#003366",
      shield: "💛",
    },
    "real-betis": {
      primary: "#007000",
      secondary: "#FFFFFF",
      shield: "💚",
    },
    valencia: {
      primary: "#FFFFFF",
      secondary: "#000000",
      shield: "⚪",
    },
    "real-valladolid": {
      primary: "#FFFFFF",
      secondary: "#4169E1",
      shield: "⚪",
    },
    "athletic-bilbao": {
      primary: "#DC143C",
      secondary: "#FFFFFF",
      shield: "🔴",
    },
  }

  /**
   * Colores de deportes
   */
  private static SPORT_COLORS: Record<string, string[]> = {
    futbol: ["#FFF", "#000"],
    baloncesto: ["#FFA500", "#000"],
    tenis: ["#FFD700", "#006400"],
    natacion: ["#0099FF", "#FFFFFF"],
    gimnasia: ["#FF1493", "#FFFFFF"],
    atletismo: ["#FFD700", "#000"],
    ciclismo: ["#FF6600", "#FFFFFF"],
  }

  /**
   * Colores disponibles
   */
  private static COLOR_OPTIONS: Record<string, string> = {
    rojo: "#DC143C",
    azul: "#0084D6",
    verde: "#228B22",
    amarillo: "#FFD700",
    morado: "#9932CC",
    rosa: "#FF1493",
    negro: "#000000",
    naranja: "#FFA500",
    turquesa: "#40E0D0",
    gris: "#808080",
  }

  /**
   * Genera tema visual basado en equipo
   */
  static generateThemeFromTeam(
    team: string,
    favoriteColor?: string
  ): AppliedTheme {
    const teamInfo = this.TEAM_COLORS[team]
    if (!teamInfo) {
      return this.generateThemeFromColor(favoriteColor || "azul")
    }

    const accentColor = favoriteColor
      ? this.COLOR_OPTIONS[favoriteColor.toLowerCase()] || "#FFD700"
      : "#FFD700"

    return {
      primaryBg: teamInfo.primary,
      secondaryBg: teamInfo.secondary,
      accentColor,
      headerImage: `url(data:image/svg+xml,${this.generateShield(team)})`,
      dashboardGradient: `linear-gradient(135deg, ${teamInfo.primary}, ${teamInfo.secondary})`,
    }
  }

  /**
   * Genera tema visual basado en deporte
   */
  static generateThemeFromSport(
    sport: string,
    favoriteColor?: string
  ): AppliedTheme {
    const sportColors = this.SPORT_COLORS[sport.toLowerCase()]
    const colors = sportColors || ["#0084D6", "#FFFFFF"]

    const accentColor = favoriteColor
      ? this.COLOR_OPTIONS[favoriteColor.toLowerCase()] || "#FFD700"
      : "#FFD700"

    return {
      primaryBg: colors[0],
      secondaryBg: colors[1],
      accentColor,
      dashboardGradient: `linear-gradient(135deg, ${colors[0]}, ${accentColor})`,
    }
  }

  /**
   * Genera tema visual basado en color
   */
  static generateThemeFromColor(colorName: string): AppliedTheme {
    const mainColor = this.COLOR_OPTIONS[colorName.toLowerCase()] || "#0084D6"
    const lightColor = this.lightenColor(mainColor, 20)
    const darkColor = this.darkenColor(mainColor, 20)

    return {
      primaryBg: mainColor,
      secondaryBg: lightColor,
      accentColor: darkColor,
      dashboardGradient: `linear-gradient(135deg, ${mainColor}, ${lightColor})`,
    }
  }

  /**
   * Aclara un color (hex)
   */
  private static lightenColor(color: string, percent: number): string {
    const num = parseInt(color.slice(1), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.min(255, (num >> 16) + amt)
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt)
    const B = Math.min(255, (num & 0x0000FF) + amt)
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
  }

  /**
   * Oscurece un color (hex)
   */
  private static darkenColor(color: string, percent: number): string {
    const num = parseInt(color.slice(1), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.max(0, (num >> 16) - amt)
    const G = Math.max(0, (num >> 8 & 0x00FF) - amt)
    const B = Math.max(0, (num & 0x0000FF) - amt)
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
  }

  /**
   * Genera SVG simple de escudo
   */
  private static generateShield(team: string): string {
    const emoji = this.TEAM_COLORS[team]?.shield || "🔵"
    return `<text font-size="32">${emoji}</text>`
  }
}

// ===== UTILIDADES DE PERFIL =====
export class ProfileGenerator {
  /**
   * Genera un perfil de estudiante basado en información de registro
   */
  static generateProfile(data: {
    name: string
    dateOfBirth: string
    gender: string
    email?: string
    animal: string
    superpower: string
    place: string
    adventurerClass: string
    classEmoji: string
    classDescription: string
    sport?: string
    team?: string
    favoriteColor: string
  }) {
    const age = AgeCalculator.calculateAge(data.dateOfBirth)
    const ageGroup = AgeCalculator.getAgeGroup(age)
    const contentLevel = AgeCalculator.getContentLevel(age)

    const theme = data.team
      ? ThemeGenerator.generateThemeFromTeam(data.team, data.favoriteColor)
      : data.sport
        ? ThemeGenerator.generateThemeFromSport(data.sport, data.favoriteColor)
        : ThemeGenerator.generateThemeFromColor(data.favoriteColor)

    return {
      id: IdGenerator.studentId(),
      name: data.name,
      fullName: data.name,
      dateOfBirth: data.dateOfBirth,
      age,
      gender: data.gender,
      email: data.email || undefined,
      ageGroup,
      contentLevel,
      heroProfile: {
        animal: data.animal,
        spiritAnimal: data.animal,
        superpower: data.superpower,
        place: data.place,
        adventurerClass: data.adventurerClass,
        heroClass: data.adventurerClass,
        classEmoji: data.classEmoji,
        classDescription: data.classDescription,
      },
      sportProfile: {
        sport: data.sport,
        favoriteSport: data.sport,
        team: data.team,
        favoriteTeam: data.team,
        favoriteColor: data.favoriteColor,
        teamColors: data.team
          ? {
              primary: ThemeGenerator["TEAM_COLORS"][data.team]?.primary || "#000",
              secondary: ThemeGenerator["TEAM_COLORS"][data.team]?.secondary || "#FFF",
            }
          : undefined,
      },
      appliedTheme: theme,
      routeProgress: {},
      scoreSystem: {
        totalPoints: 0,
        streakDays: 0,
        lastActivityDate: new Date().toISOString(),
        completedCourses: [],
      },
      badges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }
}
