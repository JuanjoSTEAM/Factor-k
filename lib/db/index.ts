// ============================================
// DATABASE FACTORY
// ============================================

import { IDatabase } from "@/lib/db/database.interface"
import { MemoryDatabase } from "@/lib/db/memory.db"

type DBType = "memory" | "json" | "firebase"

/**
 * Factory para obtener la instancia correcta de la base de datos
 * Permite cambiar de implementación cambiando una sola variable
 */
class DatabaseFactory {
  private static instance: IDatabase | null = null
  private static type: DBType = "memory" // Cambiar aquí para usar otra implementación

  static getInstance(): IDatabase {
    if (!this.instance) {
      switch (this.type) {
        case "memory":
          this.instance = new MemoryDatabase()
          break
        case "json":
          // this.instance = new JsonDatabase() // Implementar cuando sea necesario
          this.instance = new MemoryDatabase()
          break
        case "firebase":
          // this.instance = new FirebaseDatabase() // Implementar cuando sea necesario
          this.instance = new MemoryDatabase()
          break
        default:
          this.instance = new MemoryDatabase()
      }
    }
    return this.instance
  }

  static setType(type: DBType): void {
    this.type = type
    this.instance = null // Reset para usar la nueva implementación
  }

  static getType(): DBType {
    return this.type
  }
}

// Exportar instancia singleton
export const db = DatabaseFactory.getInstance()
export { DatabaseFactory }
