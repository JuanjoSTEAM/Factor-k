"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Users, 
  Plus, 
  Trash2, 
  Search,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface TeacherDashboardProps {
  translations: {
    welcome: string
    studentManagement: string
    addStudent: string
    analytics: string
    searchStudents: string
    name: string
    email: string
    level: string
    progress: string
    actions: string
    totalStudents: string
    avgProgress: string
    activeNow: string
    hoursLearned: string
    progressByArea: string
    weeklyActivity: string
    levelDistribution: string
  }
}

interface Student {
  id: number
  name: string
  email: string
  level: string
  progress: number
  avatar: string
}

const initialStudents: Student[] = [
  { id: 1, name: "Emma Watson", email: "emma@school.edu", level: "Advanced", progress: 87, avatar: "EW" },
  { id: 2, name: "James Chen", email: "james@school.edu", level: "Intermediate", progress: 64, avatar: "JC" },
  { id: 3, name: "Sofia Rodriguez", email: "sofia@school.edu", level: "Beginner", progress: 32, avatar: "SR" },
  { id: 4, name: "Liam Johnson", email: "liam@school.edu", level: "Advanced", progress: 91, avatar: "LJ" },
  { id: 5, name: "Olivia Brown", email: "olivia@school.edu", level: "Intermediate", progress: 73, avatar: "OB" },
  { id: 6, name: "Noah Davis", email: "noah@school.edu", level: "Beginner", progress: 45, avatar: "ND" },
]

const areaProgressData = [
  { name: "Quantum Lab", avgProgress: 67 },
  { name: "Digital Arts", avgProgress: 54 },
  { name: "Advanced Logic", avgProgress: 72 },
  { name: "Ethics", avgProgress: 48 },
]

const weeklyActivityData = [
  { day: "Mon", hours: 4.2 },
  { day: "Tue", hours: 5.1 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 6.2 },
  { day: "Fri", hours: 4.9 },
  { day: "Sat", hours: 2.3 },
  { day: "Sun", hours: 1.8 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export function TeacherDashboard({ translations }: TeacherDashboardProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({ name: "", email: "", level: "Beginner" })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      const student: Student = {
        id: Date.now(),
        name: newStudent.name,
        email: newStudent.email,
        level: newStudent.level,
        progress: 0,
        avatar: newStudent.name.split(" ").map(n => n[0]).join("").toUpperCase(),
      }
      setStudents([...students, student])
      setNewStudent({ name: "", email: "", level: "Beginner" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  const totalStudents = students.length
  const avgProgress = Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-semibold mb-1">
            {translations.welcome}, <span className="text-primary">Dr. Smith</span>
          </h1>
          <p className="text-muted-foreground text-sm">Manage your students and track their progress</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-4 gap-3 mb-10"
        >
          <StatCard label={translations.totalStudents} value={totalStudents.toString()} />
          <StatCard label={translations.avgProgress} value={`${avgProgress}%`} />
          <StatCard label={translations.activeNow} value="18" />
          <StatCard label={translations.hoursLearned} value="1,247" />
        </motion.div>

        {/* Student Management */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="rounded-xl border border-border/50 bg-card/50 p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                {translations.studentManagement}
              </h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={translations.searchStudents}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-xl">
                    <DialogHeader>
                      <DialogTitle>{translations.addStudent}</DialogTitle>
                      <DialogDescription>Enter the student details below</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="student-name" className="text-sm">{translations.name}</Label>
                        <Input
                          id="student-name"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                          className="mt-1.5"
                          placeholder="Enter student name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-email" className="text-sm">{translations.email}</Label>
                        <Input
                          id="student-email"
                          type="email"
                          value={newStudent.email}
                          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                          className="mt-1.5"
                          placeholder="student@school.edu"
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-level" className="text-sm">{translations.level}</Label>
                        <Select
                          value={newStudent.level}
                          onValueChange={(value) => setNewStudent({ ...newStudent, level: value })}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddStudent} className="w-full bg-primary text-primary-foreground">
                        {translations.addStudent}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-xs font-medium">{translations.name}</TableHead>
                    <TableHead className="text-xs font-medium hidden sm:table-cell">{translations.email}</TableHead>
                    <TableHead className="text-xs font-medium">{translations.level}</TableHead>
                    <TableHead className="text-xs font-medium">{translations.progress}</TableHead>
                    <TableHead className="text-xs font-medium text-right">{translations.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-border/30"
                    >
                      <TableCell className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                            {student.avatar}
                          </div>
                          <span className="text-sm font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">{student.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          student.level === "Advanced" 
                            ? "bg-primary/10 text-primary" 
                            : student.level === "Intermediate"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {student.level}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.section>

        {/* Analytics Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            {translations.analytics}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Progress by Area */}
            <motion.div variants={itemVariants} className="rounded-xl border border-border/50 bg-card/50 p-4">
              <h3 className="text-sm font-medium mb-3">{translations.progressByArea}</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaProgressData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" fontSize={10} />
                    <YAxis dataKey="name" type="category" width={90} stroke="var(--muted-foreground)" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "var(--card)", 
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "12px"
                      }} 
                    />
                    <Bar dataKey="avgProgress" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div variants={itemVariants} className="rounded-xl border border-border/50 bg-card/50 p-4">
              <h3 className="text-sm font-medium mb-3">{translations.weeklyActivity}</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={10} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "var(--card)", 
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "12px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="var(--primary)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--primary)", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="p-3 rounded-xl border border-border/50 bg-card/50 text-center"
    >
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  )
}
