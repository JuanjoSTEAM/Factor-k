// ============================================
// DATABASE SERVICE - INTERFAZ ABSTRACTA
// ============================================

import {
  StudentProfile,
  Route,
  LearningCourse,
  School,
  Group,
  Teacher,
  Parent,
  Notification,
  PointTransaction,
  EpicEvaluation,
} from "@/lib/types"

/**
 * Interfaz abstracta para base de datos
 * Permite implementaciones múltiples: Memory, JSON, Firebase, etc.
 */
export interface IDatabase {
  // ===== ESTUDIANTE =====
  student: {
    create(profile: StudentProfile): Promise<StudentProfile>
    read(id: string): Promise<StudentProfile | null>
    update(id: string, profile: Partial<StudentProfile>): Promise<StudentProfile | null>
    delete(id: string): Promise<boolean>
    list(): Promise<StudentProfile[]>
    findByEmail(email: string): Promise<StudentProfile | null>
    findBySchool(schoolId: string): Promise<StudentProfile[]>
    findByGroup(groupId: string): Promise<StudentProfile[]>
  }

  // ===== RUTAS Y CURSOS =====
  route: {
    create(route: Route): Promise<Route>
    read(id: string): Promise<Route | null>
    list(): Promise<Route[]>
    getByCategory(category: string): Promise<Route[]>
  }

  course: {
    create(course: LearningCourse): Promise<LearningCourse>
    read(id: string): Promise<LearningCourse | null>
    list(): Promise<LearningCourse[]>
    findByRoute(routeId: string): Promise<LearningCourse[]>
    findByRouteAndTheme(routeId: string, themeId: string): Promise<LearningCourse[]>
    findByRouteAndLevel(routeId: string, level: number): Promise<LearningCourse[]>
    findByAgeGroup(ageGroup: string): Promise<LearningCourse[]>
  }

  // ===== ESCUELA Y GESTIÓN =====
  school: {
    create(school: School): Promise<School>
    read(id: string): Promise<School | null>
    findByCode(code: string): Promise<School | null>
    list(): Promise<School[]>
  }

  group: {
    create(group: Group): Promise<Group>
    read(id: string): Promise<Group | null>
    findBySchool(schoolId: string): Promise<Group[]>
    update(id: string, group: Partial<Group>): Promise<Group | null>
    addStudent(groupId: string, studentId: string): Promise<boolean>
    removeStudent(groupId: string, studentId: string): Promise<boolean>
  }

  teacher: {
    create(teacher: Teacher): Promise<Teacher>
    read(id: string): Promise<Teacher | null>
    findByEmail(email: string): Promise<Teacher | null>
    findBySchool(schoolId: string): Promise<Teacher[]>
    update(id: string, teacher: Partial<Teacher>): Promise<Teacher | null>
  }

  parent: {
    create(parent: Parent): Promise<Parent>
    read(id: string): Promise<Parent | null>
    findByEmail(email: string): Promise<Parent | null>
    update(id: string, parent: Partial<Parent>): Promise<Parent | null>
    linkChild(parentId: string, childId: string): Promise<boolean>
  }

  // ===== NOTIFICACIONES Y PUNTOS =====
  notification: {
    create(notification: Notification): Promise<Notification>
    readAll(recipientId: string): Promise<Notification[]>
    markAsRead(id: string): Promise<boolean>
    delete(id: string): Promise<boolean>
  }

  pointTransaction: {
    create(transaction: PointTransaction): Promise<PointTransaction>
    getByStudent(studentId: string): Promise<PointTransaction[]>
    getTotalPoints(studentId: string): Promise<number>
  }

  // ===== EVALUACIONES =====
  evaluation: {
    create(evaluation: EpicEvaluation): Promise<EpicEvaluation>
    read(id: string): Promise<EpicEvaluation | null>
    getByStudent(studentId: string): Promise<EpicEvaluation[]>
    getByCourse(courseId: string): Promise<EpicEvaluation[]>
    update(id: string, evaluation: Partial<EpicEvaluation>): Promise<EpicEvaluation | null>
  }

  // ===== UTILIDADES =====
  clear(): Promise<void> // Usar solo para testing
  export(): Promise<Record<string, unknown>> // Exportar datos
  import(data: Record<string, unknown>): Promise<void> // Importar datos
}
