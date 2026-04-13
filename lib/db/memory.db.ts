// ============================================
// DATABASE - MEMORIA (In-Memory Implementation)
// ============================================

import { IDatabase } from "@/lib/db/database.interface"
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
 * Implementación en memoria de la base de datos
 * Perfecta para desarrollo y testing
 * Los datos se pierden al recargar
 */
export class MemoryDatabase implements IDatabase {
  private students: Map<string, StudentProfile> = new Map()
  private routes: Map<string, Route> = new Map()
  private courses: Map<string, LearningCourse> = new Map()
  private schools: Map<string, School> = new Map()
  private groups: Map<string, Group> = new Map()
  private teachers: Map<string, Teacher> = new Map()
  private parents: Map<string, Parent> = new Map()
  private notifications: Map<string, Notification> = new Map()
  private pointTransactions: Map<string, PointTransaction> = new Map()
  private evaluations: Map<string, EpicEvaluation> = new Map()

  // ===== ESTUDIANTE =====
  student = {
    create: async (profile: StudentProfile): Promise<StudentProfile> => {
      this.students.set(profile.id, profile)
      return profile
    },

    read: async (id: string): Promise<StudentProfile | null> => {
      return this.students.get(id) || null
    },

    update: async (
      id: string,
      updates: Partial<StudentProfile>
    ): Promise<StudentProfile | null> => {
      const existing = this.students.get(id)
      if (!existing) return null
      const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() }
      this.students.set(id, updated)
      return updated
    },

    delete: async (id: string): Promise<boolean> => {
      return this.students.delete(id)
    },

    list: async (): Promise<StudentProfile[]> => {
      return Array.from(this.students.values())
    },

    findByEmail: async (email: string): Promise<StudentProfile | null> => {
      for (const student of this.students.values()) {
        if (student.email === email) return student
      }
      return null
    },

    findBySchool: async (schoolId: string): Promise<StudentProfile[]> => {
      return Array.from(this.students.values()).filter(
        (s) => s.schoolId === schoolId
      )
    },

    findByGroup: async (groupId: string): Promise<StudentProfile[]> => {
      return Array.from(this.students.values()).filter(
        (s) => s.groupId === groupId
      )
    },
  }

  // ===== RUTAS Y CURSOS =====
  route = {
    create: async (route: Route): Promise<Route> => {
      this.routes.set(route.id, route)
      return route
    },

    read: async (id: string): Promise<Route | null> => {
      return this.routes.get(id) || null
    },

    list: async (): Promise<Route[]> => {
      return Array.from(this.routes.values())
    },

    getByCategory: async (category: string): Promise<Route[]> => {
      return Array.from(this.routes.values()).filter(
        (r) => r.category === category
      )
    },
  }

  course = {
    create: async (course: LearningCourse): Promise<LearningCourse> => {
      this.courses.set(course.id, course)
      return course
    },

    read: async (id: string): Promise<LearningCourse | null> => {
      return this.courses.get(id) || null
    },

    list: async (): Promise<LearningCourse[]> => {
      return Array.from(this.courses.values())
    },

    findByRoute: async (routeId: string): Promise<LearningCourse[]> => {
      return Array.from(this.courses.values()).filter(
        (c) => c.routeId === routeId
      )
    },

    findByRouteAndTheme: async (
      routeId: string,
      themeId: string
    ): Promise<LearningCourse[]> => {
      return Array.from(this.courses.values()).filter(
        (c) => c.routeId === routeId && c.themeId === themeId
      )
    },

    findByRouteAndLevel: async (
      routeId: string,
      level: number
    ): Promise<LearningCourse[]> => {
      return Array.from(this.courses.values()).filter(
        (c) => c.routeId === routeId && c.levelId === level
      )
    },

    findByAgeGroup: async (ageGroup: string): Promise<LearningCourse[]> => {
      return Array.from(this.courses.values()).filter(
        (c) => c.ageGroup === ageGroup
      )
    },
  }

  // ===== ESCUELA Y GESTIÓN =====
  school = {
    create: async (school: School): Promise<School> => {
      this.schools.set(school.id, school)
      return school
    },

    read: async (id: string): Promise<School | null> => {
      return this.schools.get(id) || null
    },

    findByCode: async (code: string): Promise<School | null> => {
      for (const school of this.schools.values()) {
        if (school.code === code) return school
      }
      return null
    },

    list: async (): Promise<School[]> => {
      return Array.from(this.schools.values())
    },
  }

  group = {
    create: async (group: Group): Promise<Group> => {
      this.groups.set(group.id, group)
      return group
    },

    read: async (id: string): Promise<Group | null> => {
      return this.groups.get(id) || null
    },

    findBySchool: async (schoolId: string): Promise<Group[]> => {
      return Array.from(this.groups.values()).filter(
        (g) => g.schoolId === schoolId
      )
    },

    update: async (
      id: string,
      updates: Partial<Group>
    ): Promise<Group | null> => {
      const existing = this.groups.get(id)
      if (!existing) return null
      const updated = { ...existing, ...updates }
      this.groups.set(id, updated)
      return updated
    },

    addStudent: async (groupId: string, studentId: string): Promise<boolean> => {
      const group = this.groups.get(groupId)
      if (!group) return false
      if (!group.studentIds.includes(studentId)) {
        group.studentIds.push(studentId)
      }
      return true
    },

    removeStudent: async (groupId: string, studentId: string): Promise<boolean> => {
      const group = this.groups.get(groupId)
      if (!group) return false
      group.studentIds = group.studentIds.filter((id) => id !== studentId)
      return true
    },
  }

  teacher = {
    create: async (teacher: Teacher): Promise<Teacher> => {
      this.teachers.set(teacher.id, teacher)
      return teacher
    },

    read: async (id: string): Promise<Teacher | null> => {
      return this.teachers.get(id) || null
    },

    findByEmail: async (email: string): Promise<Teacher | null> => {
      for (const teacher of this.teachers.values()) {
        if (teacher.email === email) return teacher
      }
      return null
    },

    findBySchool: async (schoolId: string): Promise<Teacher[]> => {
      return Array.from(this.teachers.values()).filter(
        (t) => t.schoolId === schoolId
      )
    },

    update: async (
      id: string,
      updates: Partial<Teacher>
    ): Promise<Teacher | null> => {
      const existing = this.teachers.get(id)
      if (!existing) return null
      const updated = { ...existing, ...updates }
      this.teachers.set(id, updated)
      return updated
    },
  }

  parent = {
    create: async (parent: Parent): Promise<Parent> => {
      this.parents.set(parent.id, parent)
      return parent
    },

    read: async (id: string): Promise<Parent | null> => {
      return this.parents.get(id) || null
    },

    findByEmail: async (email: string): Promise<Parent | null> => {
      for (const parent of this.parents.values()) {
        if (parent.email === email) return parent
      }
      return null
    },

    update: async (
      id: string,
      updates: Partial<Parent>
    ): Promise<Parent | null> => {
      const existing = this.parents.get(id)
      if (!existing) return null
      const updated = { ...existing, ...updates }
      this.parents.set(id, updated)
      return updated
    },

    linkChild: async (parentId: string, childId: string): Promise<boolean> => {
      const parent = this.parents.get(parentId)
      if (!parent) return false
      if (!parent.childrenIds.includes(childId)) {
        parent.childrenIds.push(childId)
      }
      return true
    },
  }

  // ===== NOTIFICACIONES Y PUNTOS =====
  notification = {
    create: async (notification: Notification): Promise<Notification> => {
      this.notifications.set(notification.id, notification)
      return notification
    },

    readAll: async (recipientId: string): Promise<Notification[]> => {
      return Array.from(this.notifications.values()).filter(
        (n) => n.recipientId === recipientId
      )
    },

    markAsRead: async (id: string): Promise<boolean> => {
      const notification = this.notifications.get(id)
      if (!notification) return false
      notification.read = true
      return true
    },

    delete: async (id: string): Promise<boolean> => {
      return this.notifications.delete(id)
    },
  }

  pointTransaction = {
    create: async (transaction: PointTransaction): Promise<PointTransaction> => {
      this.pointTransactions.set(transaction.id, transaction)
      return transaction
    },

    getByStudent: async (studentId: string): Promise<PointTransaction[]> => {
      return Array.from(this.pointTransactions.values()).filter(
        (t) => t.studentId === studentId
      )
    },

    getTotalPoints: async (studentId: string): Promise<number> => {
      return Array.from(this.pointTransactions.values())
        .filter((t) => t.studentId === studentId)
        .reduce((sum, t) => sum + t.amount, 0)
    },
  }

  // ===== EVALUACIONES =====
  evaluation = {
    create: async (evaluation: EpicEvaluation): Promise<EpicEvaluation> => {
      this.evaluations.set(evaluation.id, evaluation)
      return evaluation
    },

    read: async (id: string): Promise<EpicEvaluation | null> => {
      return this.evaluations.get(id) || null
    },

    getByStudent: async (studentId: string): Promise<EpicEvaluation[]> => {
      return Array.from(this.evaluations.values()).filter(
        (e) => e.studentId === studentId
      )
    },

    getByCourse: async (courseId: string): Promise<EpicEvaluation[]> => {
      return Array.from(this.evaluations.values()).filter(
        (e) => e.courseId === courseId
      )
    },

    update: async (
      id: string,
      updates: Partial<EpicEvaluation>
    ): Promise<EpicEvaluation | null> => {
      const existing = this.evaluations.get(id)
      if (!existing) return null
      const updated = { ...existing, ...updates }
      this.evaluations.set(id, updated)
      return updated
    },
  }

  // ===== UTILIDADES =====
  async clear(): Promise<void> {
    this.students.clear()
    this.routes.clear()
    this.courses.clear()
    this.schools.clear()
    this.groups.clear()
    this.teachers.clear()
    this.parents.clear()
    this.notifications.clear()
    this.pointTransactions.clear()
    this.evaluations.clear()
  }

  async export(): Promise<Record<string, unknown>> {
    return {
      students: Array.from(this.students.values()),
      routes: Array.from(this.routes.values()),
      courses: Array.from(this.courses.values()),
      schools: Array.from(this.schools.values()),
      groups: Array.from(this.groups.values()),
      teachers: Array.from(this.teachers.values()),
      parents: Array.from(this.parents.values()),
      notifications: Array.from(this.notifications.values()),
      pointTransactions: Array.from(this.pointTransactions.values()),
      evaluations: Array.from(this.evaluations.values()),
    }
  }

  async import(data: Record<string, unknown>): Promise<void> {
    if (Array.isArray(data.students)) {
      for (const student of data.students as StudentProfile[]) {
        this.students.set(student.id, student)
      }
    }
    if (Array.isArray(data.routes)) {
      for (const route of data.routes as Route[]) {
        this.routes.set(route.id, route)
      }
    }
    if (Array.isArray(data.courses)) {
      for (const course of data.courses as LearningCourse[]) {
        this.courses.set(course.id, course)
      }
    }
    if (Array.isArray(data.schools)) {
      for (const school of data.schools as School[]) {
        this.schools.set(school.id, school)
      }
    }
    if (Array.isArray(data.groups)) {
      for (const group of data.groups as Group[]) {
        this.groups.set(group.id, group)
      }
    }
    if (Array.isArray(data.teachers)) {
      for (const teacher of data.teachers as Teacher[]) {
        this.teachers.set(teacher.id, teacher)
      }
    }
    if (Array.isArray(data.parents)) {
      for (const parent of data.parents as Parent[]) {
        this.parents.set(parent.id, parent)
      }
    }
    if (Array.isArray(data.notifications)) {
      for (const notification of data.notifications as Notification[]) {
        this.notifications.set(notification.id, notification)
      }
    }
    if (Array.isArray(data.pointTransactions)) {
      for (const transaction of data.pointTransactions as PointTransaction[]) {
        this.pointTransactions.set(transaction.id, transaction)
      }
    }
    if (Array.isArray(data.evaluations)) {
      for (const evaluation of data.evaluations as EpicEvaluation[]) {
        this.evaluations.set(evaluation.id, evaluation)
      }
    }
  }
}

// Instancia singleton
export const memoryDB = new MemoryDatabase()
