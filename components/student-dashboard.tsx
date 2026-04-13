"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Play, 
  BookOpen,
  ArrowRight,
  ExternalLink
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroScanModal, AdventurerProfile } from "./hero-scan-modal"

interface StudentDashboardProps {
  translations: {
    welcome: string
    continuelearning: string
    innovativeAreas: string
    greatLibrary: string
    cosmosLab: string
    ethicsSandbox: string
    videoLessons: string
    viewAll: string
    progress: string
    streak: string
    achievements: string
    recentActivity: string
  }
}

// YouTube videos organized by grade
const videosByGrade = {
  "Grade 1-2": [
    {
      id: "UCVrlNt2IUs",
      title: "Introduction to Numbers",
      youtubeId: "UCVrlNt2IUs",
      url: "https://www.youtube.com/watch?v=UCVrlNt2IUs",
    },
    {
      id: "p4fEAIpuqHU",
      title: "Basic Shapes & Colors",
      youtubeId: "p4fEAIpuqHU",
      url: "https://www.youtube.com/watch?v=p4fEAIpuqHU",
    },
  ],
  "Grade 3-4": [
    {
      id: "c9cTIjBqFTw",
      title: "Multiplication Mastery",
      youtubeId: "c9cTIjBqFTw",
      url: "https://www.youtube.com/watch?v=c9cTIjBqFTw",
    },
    {
      id: "OYjW1gV8SJU",
      title: "Introduction to Fractions",
      youtubeId: "OYjW1gV8SJU",
      url: "https://www.youtube.com/watch?v=OYjW1gV8SJU",
    },
  ],
  "Grade 5-6": [
    {
      id: "Lqf5WmulMYI",
      title: "Pre-Algebra Concepts",
      youtubeId: "Lqf5WmulMYI",
      url: "https://www.youtube.com/watch?v=Lqf5WmulMYI",
    },
    {
      id: "7c8OtBpLCj8",
      title: "Geometry Foundations",
      youtubeId: "7c8OtBpLCj8",
      url: "https://www.youtube.com/watch?v=7c8OtBpLCj8",
    },
  ],
  "Grade 7-8": [
    {
      id: "sqdlZ0AYyW4",
      title: "Algebra Essentials",
      youtubeId: "sqdlZ0AYyW4",
      url: "https://www.youtube.com/watch?v=sqdlZ0AYyW4",
    },
    {
      id: "QqqYP5JT7A4",
      title: "Advanced Problem Solving",
      youtubeId: "QqqYP5JT7A4",
      url: "https://www.youtube.com/watch?v=QqqYP5JT7A4",
    },
  ],
}

const areas = [
  {
    id: "library",
    name: "The Great Library",
    progress: 67,
  },
  {
    id: "cosmos",
    name: "Cosmos Lab",
    progress: 45,
  },
  {
    id: "ethics",
    name: "Ethics Sandbox",
    progress: 82,
  },
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

export function StudentDashboard({ translations }: StudentDashboardProps) {
  const [selectedGrade, setSelectedGrade] = useState("Grade 1-2")
  const [heroProfile, setHeroProfile] = useState<AdventurerProfile | null>(null)

  const handleHeroScanComplete = (profile: AdventurerProfile) => {
    setHeroProfile(profile)
  }
  
  const areaNames: Record<string, string> = {
    library: translations.greatLibrary,
    cosmos: translations.cosmosLab,
    ethics: translations.ethicsSandbox,
  }

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
            ¡Bienvenido, valiente aventurero! 🚀
          </h1>
          {heroProfile && (
            <div className="mb-2">
              <p className="text-primary font-medium">
                Eres un {heroProfile.adventurerClass} {heroProfile.classEmoji}
              </p>
              <p className="text-sm text-muted-foreground">
                {heroProfile.classDescription}
              </p>
            </div>
          )}
          <p className="text-muted-foreground text-sm">¡Prepárate para tus Misiones de Héroe! 💪</p>
        </motion.div>

        {/* Stats Row - Epic Mode */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-4 gap-3 mb-10"
        >
          <StatCard label="Poder Acumulado" value="67%" />
          <StatCard label="Racha Épica" value="12 días 🔥" />
          <StatCard label="Logros Legendarios" value="24 🏆" />
          <StatCard label="XP Total" value="2,450 ⭐" />
        </motion.div>

        {/* Learning Areas - Hero Missions */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">¡Misiones de Héroe! ⚔️</h2>
            <Button variant="ghost" size="sm" className="text-primary text-sm">
              Ver Todas
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {areas.map((area) => (
              <motion.div
                key={area.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl border border-border/50 bg-card/50 cursor-pointer hover:border-primary/30 transition-colors"
              >
                <h3 className="font-medium text-sm mb-2">{areaNames[area.id]}</h3>
                <div className="flex items-center gap-2">
                  <Progress value={area.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground">{area.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Video Lessons - Final Boss Challenges */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">¡Desafíos del Jefe Final! 👹</h2>
          </div>
          
          <Tabs value={selectedGrade} onValueChange={setSelectedGrade} className="w-full">
            <TabsList className="mb-4 bg-muted/50">
              {Object.keys(videosByGrade).map((grade) => (
                <TabsTrigger 
                  key={grade} 
                  value={grade}
                  className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {grade}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(videosByGrade).map(([grade, videos]) => (
              <TabsContent key={grade} value={grade}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.section>
      </div>

      {/* Hero Scan Modal */}
      <HeroScanModal
        isOpen={!heroProfile}
        onComplete={handleHeroScanComplete}
      />
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

function VideoCard({ video }: { video: { id: string; title: string; youtubeId: string; url: string } }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className="block rounded-xl border border-border/50 bg-card/50 overflow-hidden hover:border-primary/30 transition-colors group"
    >
      {/* YouTube Thumbnail */}
      <div className="relative aspect-video bg-muted">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault doesn't exist
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
          </div>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
            {video.title}
          </h4>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
    </motion.a>
  )
}
