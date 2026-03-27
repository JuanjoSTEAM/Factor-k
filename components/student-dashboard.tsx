"use client"

import { motion } from "framer-motion"
import { 
  Atom, 
  Palette, 
  Brain, 
  Scale, 
  Play, 
  Clock,
  Trophy,
  Flame,
  BookOpen,
  ArrowRight,
  Star
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface StudentDashboardProps {
  translations: {
    welcome: string
    continuelearning: string
    innovativeAreas: string
    quantumLab: string
    digitalArts: string
    advancedLogic: string
    ethicsPhilosophy: string
    videoLessons: string
    viewAll: string
    progress: string
    streak: string
    achievements: string
    recentActivity: string
  }
}

const areas = [
  {
    id: "quantum",
    icon: Atom,
    gradient: "from-primary to-primary/60",
    progress: 67,
  },
  {
    id: "arts",
    icon: Palette,
    gradient: "from-secondary to-secondary/60",
    progress: 45,
  },
  {
    id: "logic",
    icon: Brain,
    gradient: "from-accent to-accent/60",
    progress: 82,
  },
  {
    id: "ethics",
    icon: Scale,
    gradient: "from-chart-4 to-chart-4/60",
    progress: 34,
  },
]

const videos = [
  {
    id: 1,
    title: "Quantum Superposition Explained",
    area: "Quantum Lab",
    duration: "12:34",
    progress: 75,
    thumbnail: "quantum",
  },
  {
    id: 2,
    title: "Digital Painting Masterclass",
    area: "Digital Arts",
    duration: "24:15",
    progress: 30,
    thumbnail: "arts",
  },
  {
    id: 3,
    title: "Advanced Logical Reasoning",
    area: "Advanced Logic",
    duration: "18:42",
    progress: 100,
    thumbnail: "logic",
  },
  {
    id: 4,
    title: "The Ethics of AI",
    area: "Ethics & Philosophy",
    duration: "15:20",
    progress: 0,
    thumbnail: "ethics",
  },
  {
    id: 5,
    title: "Wave-Particle Duality",
    area: "Quantum Lab",
    duration: "20:11",
    progress: 50,
    thumbnail: "quantum",
  },
  {
    id: 6,
    title: "3D Modeling Basics",
    area: "Digital Arts",
    duration: "32:00",
    progress: 15,
    thumbnail: "arts",
  },
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

export function StudentDashboard({ translations }: StudentDashboardProps) {
  const areaNames: Record<string, string> = {
    quantum: translations.quantumLab,
    arts: translations.digitalArts,
    logic: translations.advancedLogic,
    ethics: translations.ethicsPhilosophy,
  }

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
            {translations.welcome}, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Alex</span>
          </h1>
          <p className="text-muted-foreground">{translations.continuelearning}</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard icon={<BookOpen className="w-5 h-5" />} label={translations.progress} value="67%" color="primary" />
          <StatCard icon={<Flame className="w-5 h-5" />} label={translations.streak} value="12 days" color="secondary" />
          <StatCard icon={<Trophy className="w-5 h-5" />} label={translations.achievements} value="24" color="accent" />
          <StatCard icon={<Star className="w-5 h-5" />} label="XP Points" value="2,450" color="chart-4" />
        </motion.div>

        {/* Innovative Areas */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">{translations.innovativeAreas}</h2>
            <Button variant="ghost" className="text-primary">
              {translations.viewAll}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {areas.map((area) => (
              <AreaCard
                key={area.id}
                icon={<area.icon className="w-8 h-8" />}
                title={areaNames[area.id]}
                progress={area.progress}
                gradient={area.gradient}
              />
            ))}
          </div>
        </motion.section>

        {/* Video Lessons */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">{translations.videoLessons}</h2>
            <Button variant="ghost" className="text-primary">
              {translations.viewAll}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
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
  color 
}: { 
  icon: React.ReactNode
  label: string
  value: string
  color: string 
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className={`w-10 h-10 rounded-xl bg-${color}/10 text-${color} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}

function AreaCard({
  icon,
  title,
  progress,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  progress: number
  gradient: string
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -5 }}
      className="glass-card rounded-2xl p-6 cursor-pointer group"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 group-hover:shadow-lg transition-shadow`}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </motion.div>
  )
}

function VideoCard({ video }: { video: typeof videos[0] }) {
  const thumbnailGradients: Record<string, string> = {
    quantum: "from-primary/80 to-primary/40",
    arts: "from-secondary/80 to-secondary/40",
    logic: "from-accent/80 to-accent/40",
    ethics: "from-chart-4/80 to-chart-4/40",
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -3 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className={`relative aspect-video bg-gradient-to-br ${thumbnailGradients[video.thumbnail]} flex items-center justify-center`}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
        >
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        </motion.div>
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
        {video.progress > 0 && video.progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-white/80 transition-all"
              style={{ width: `${video.progress}%` }}
            />
          </div>
        )}
        {video.progress === 100 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            Completed
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-primary font-medium mb-1">{video.area}</p>
        <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h4>
      </div>
    </motion.div>
  )
}
