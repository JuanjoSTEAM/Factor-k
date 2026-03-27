"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  Search,
  BarChart3,
  TrendingUp,
  BookOpen,
  Clock,
  ChevronDown
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"

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
  { name: "Quantum Lab", students: 42, avgProgress: 67 },
  { name: "Digital Arts", students: 38, avgProgress: 54 },
  { name: "Advanced Logic", students: 45, avgProgress: 72 },
  { name: "Ethics", students: 30, avgProgress: 48 },
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

const levelDistributionData = [
  { name: "Beginner", value: 25, color: "oklch(0.55 0.25 270)" },
  { name: "Intermediate", value: 45, color: "oklch(0.65 0.2 200)" },
  { name: "Advanced", value: 30, color: "oklch(0.7 0.18 180)" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.welcome}, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dr. Smith</span>
          </h1>
          <p className="text-muted-foreground">Manage your students and track their progress</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard 
            icon={<Users className="w-5 h-5" />} 
            label={translations.totalStudents} 
            value={totalStudents.toString()} 
            trend="+12%"
            color="primary" 
          />
          <StatCard 
            icon={<TrendingUp className="w-5 h-5" />} 
            label={translations.avgProgress} 
            value={`${avgProgress}%`}
            trend="+5%"
            color="secondary" 
          />
          <StatCard 
            icon={<BookOpen className="w-5 h-5" />} 
            label={translations.activeNow} 
            value="18"
            trend=""
            color="accent" 
          />
          <StatCard 
            icon={<Clock className="w-5 h-5" />} 
            label={translations.hoursLearned} 
            value="1,247"
            trend="+23%"
            color="chart-4" 
          />
        </motion.div>

        {/* Student Management */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {translations.studentManagement}
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={translations.searchStudents}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 rounded-xl"
                  />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-xl gradient-bg text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      {translations.addStudent}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card rounded-2xl border-border/50">
                    <DialogHeader>
                      <DialogTitle>{translations.addStudent}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="student-name">{translations.name}</Label>
                        <Input
                          id="student-name"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                          className="mt-1.5 rounded-xl"
                          placeholder="Enter student name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-email">{translations.email}</Label>
                        <Input
                          id="student-email"
                          type="email"
                          value={newStudent.email}
                          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                          className="mt-1.5 rounded-xl"
                          placeholder="student@school.edu"
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-level">{translations.level}</Label>
                        <Select
                          value={newStudent.level}
                          onValueChange={(value) => setNewStudent({ ...newStudent, level: value })}
                        >
                          <SelectTrigger className="mt-1.5 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddStudent} className="w-full rounded-xl gradient-bg text-white">
                        {translations.addStudent}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-semibold">{translations.name}</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">{translations.email}</TableHead>
                    <TableHead className="font-semibold">{translations.level}</TableHead>
                    <TableHead className="font-semibold">{translations.progress}</TableHead>
                    <TableHead className="font-semibold text-right">{translations.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/30 hover:bg-muted/20"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-semibold">
                            {student.avatar}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden sm:table-cell">{student.email}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          student.level === "Advanced" 
                            ? "bg-primary/10 text-primary" 
                            : student.level === "Intermediate"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-accent/10 text-accent"
                        }`}>
                          {student.level}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full gradient-bg transition-all"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg text-destructive hover:text-destructive"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            {translations.analytics}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress by Area */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">{translations.progressByArea}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaProgressData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" />
                    <YAxis dataKey="name" type="category" width={100} stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "var(--card)", 
                        border: "1px solid var(--border)",
                        borderRadius: "12px"
                      }} 
                    />
                    <Bar dataKey="avgProgress" fill="url(#colorGradient)" radius={[0, 8, 8, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="oklch(0.55 0.25 270)" />
                        <stop offset="100%" stopColor="oklch(0.7 0.18 180)" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">{translations.weeklyActivity}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "var(--card)", 
                        border: "1px solid var(--border)",
                        borderRadius: "12px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="oklch(0.55 0.25 270)" 
                      strokeWidth={3}
                      dot={{ fill: "oklch(0.55 0.25 270)", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "oklch(0.65 0.2 200)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Level Distribution */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 lg:col-span-2">
              <h3 className="font-semibold mb-4">{translations.levelDistribution}</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="h-64 w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={levelDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {levelDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--card)", 
                          border: "1px solid var(--border)",
                          borderRadius: "12px"
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-3">
                  {levelDistributionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-semibold ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

function StatCard({ 
  icon, 
  label, 
  value,
  trend,
  color 
}: { 
  icon: React.ReactNode
  label: string
  value: string
  trend: string
  color: string 
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-${color}/10 text-${color} flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}
