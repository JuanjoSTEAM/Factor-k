# 🎮 FACTOR K v3.0 - BACKEND IMPLEMENTATION

## 📦 Implementación Base de Datos

Este proyecto incluye un sistema de base de datos flexible y extensible que soporta múltiples implementaciones.

### 🏗️ Arquitectura

```
lib/
├── types.ts                    # Tipos principales (StudentProfile, Route, Course, etc)
├── db/
│   ├── database.interface.ts   # Interfaz abstracta IDatabase
│   ├── memory.db.ts            # Implementación en memoria
│   ├── index.ts                # Factory para obtener instancia
│   └── initialize.ts           # Función para inicializar datos semilla
├── services/
│   └── generators.ts           # Utilidades (ID, edad, tema visual)
└── data/
    └── seed-routes.ts          # Datos iniciales (8 rutas, 24 temas)
```

### 🚀 Uso Actual: In-Memory Database

Por defecto, el proyecto usa **MemoryDatabase** que almacena datos en memoria RAM.

**Ventajas:**
- ✅ Desarrollo rápido sin configuración
- ✅ Perfecto para testing y prototipado
- ✅ Sin dependencias externas

**Limitaciones:**
- ❌ Datos se pierden al recargar la página
- ❌ Solo funciona en desarrollo/testing

#### Ejemplo de uso en componentes:

```typescript
"use client"

import { useDatabase } from "@/hooks/use-database"

export function MiComponente() {
  const { createStudent, listRoutes, loading, error } = useDatabase()

  const handleCrearEstudiante = async () => {
    await createStudent({
      id: "std_123",
      name: "Carlos",
      // ...resto de datos
    })
  }

  return ( /* JSX */ )
}
```

### 🔄 Cambiar a otra Implementación (Cuando sea necesario)

#### Opción 1: JSON File Database

Para persistencia en archivo JSON:

1. Crear `lib/db/json.db.ts`:

```typescript
import { IDatabase } from "@/lib/db/database.interface"
import fs from "fs/promises"
import path from "path"

export class JsonDatabase implements IDatabase {
  private filePath = path.join(process.cwd(), "data.json")

  async loadData() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8")
      return JSON.parse(data)
    } catch {
      return this.getEmptyData()
    }
  }

  async saveData(data: any) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2))
  }

  // Implementar interfaces...
}
```

2. Actualizar `lib/db/index.ts`:

```typescript
import { JsonDatabase } from "@/lib/db/json.db"

// ...
case "json":
  this.instance = new JsonDatabase()
  break
```

3. Cambiar tipo en DatabaseFactory:

```typescript
private static type: DBType = "json"
```

#### Opción 2: Firebase Realtime Database

Para usar Firebase:

1. Instalar dependencia:
```bash
npm install firebase firebase-admin
```

2. Crear `lib/db/firebase.db.ts`

3. Actualizar factory

#### Opción 3: MongoDB / Supabase / PostgreSQL

Misma estructura, crear implementación compatible con IDatabase

### 📊 Schema Actual

Los tipos principales se definen en `lib/types.ts`:

- **StudentProfile**: Perfil completo del estudiante
- **Route**: Rutas de aprendizaje (8 totales)
- **LearningCourse**: Cursos interactivos
- **School/Group/Teacher/Parent**: Gestión escolar
- **Notification/PointTransaction/Badge**: Sistema gamificación
- **EpicEvaluation**: Evaluaciones finales

### 🌱 Datos Iniciales (Seed Data)

El proyecto cargaautomáticamente:

- ✅ **8 Rutas** temáticas
- ✅ **24 Temas** (3 por ruta)
- ✅ **120 Niveles** (5 por tema, por edad)

Ubicados en `lib/data/seed-routes.ts`

Se cargan automáticamente en `initializeDatabase()` si no existen en la BD.

### 🎯 Flujo Actual: Registro de Estudiante

1. **Usuario elige "Soy Estudiante"** → Abre `HeroScanModalV2`
2. **9 preguntas de registro**:
   - Nombre, fecha de nacimiento, género, email
   - Animal espiritual, superpoder, lugar favorito
   - Deporte, color favorito
3. **Sistema calcula automáticamente**:
   - Edad → ageGroup (3-5, 6-8, 9-11, 12-14, 15+)
   - contentLevel (PrimerosPasos, Explorador, Aventurero, Emprendedor, Experto)
   - Clase aventurero (Guerrero, Mago, Explorador, Guardián)
   - Tema visual (colores, gradientes, emojis)
4. **Se crea StudentProfile** y se guarda en BD
5. **Usuario ve dashboard personalizado**

### 📝 Próximos Pasos (FASE 2-3)

- [ ] Cambiar a JSON Database para persistencia en desarrollo
- [ ] Integrar FirebaseRealtime para producción
- [ ] Crear componentes de lecciones interactivas
- [ ] Implementar mini-juegos gamificados
- [ ] Sistema de puntos y badges
- [ ] Panel profesor y padre

### 🔗 Exportar/Importar Datos

```typescript
// Exportar todos los datos
const datos = await db.export()
console.log(datos) // {students: [...], routes: [...], ...}

// Importar desde backup
await db.import(datos)
```

### 🧪 Testing

```typescript
// Limpiar BD (solo en desarrollo)
await db.clear()

// Crear estudiante de prueba
await db.student.create({
  id: "test_1"
  name: "Juan Prueba",
  // ...resto
})

// Consultar
const estudiante = await db.student.read("test_1")
const lista = await db.student.list()
```

###✨ Features Gamificación (En desarrollo)

Cada juego hereda automáticamente:

- 🎨 Colores del equipo/deporte elegido
- 🎵 Sonidos personalizados
- 🎉 Confeti con colores del estudiante
- 📊 Sistema de puntos híbrido
- 🏆 Badges y logros

### 📞 Soporte

Para preguntas sobre la arquitectura, ver:
- `lib/db/database.interface.ts` - Contrato de BD
- `lib/services/generators.ts` - Utilidades
- `components/hero-scan-modal-v2.tsx` - Ejemplo de uso
