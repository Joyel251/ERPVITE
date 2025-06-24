

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import {
  Trophy,
  Award,
  Medal,
  Star,
  Calendar,
  Plus,
  Trash2,
  Upload,
  Filter,
  Search,
  TrendingUp,
  Zap,
  Crown,
  CheckCircle,
} from "lucide-react"
import { getAchievements } from '../../lib/student-data'
import { useState } from "react"

interface StudentAchievementsProps {
  registrationNumber: string
}

// Enhanced Classic Confetti Animation
const ClassicConfettiCelebration = ({ isVisible, onComplete }: { isVisible: boolean; onComplete: () => void }) => {
  if (!isVisible) return null

  // Main confetti pieces
  const confettiPieces = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    color: [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#f0932b",
      "#eb4d4b",
      "#6c5ce7",
      "#a29bfe",
      "#fd79a8",
      "#00b894",
      "#00cec9",
      "#e17055",
      "#74b9ff",
      "#fd63a3",
      "#fdcb6e",
    ][i % 15],
    delay: Math.random() * 1.2,
    duration: 2.5 + Math.random() * 2,
    x: Math.random() * 100,
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 8,
    shape: i % 6,
    drift: (Math.random() - 0.5) * 120,
  }))

  // Additional burst confetti from center
  const burstConfetti = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1000,
    color: [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#f0932b",
      "#6c5ce7",
      "#fd79a8",
      "#00b894",
      "#74b9ff",
      "#fdcb6e",
    ][i % 10],
    angle: i * 9 + Math.random() * 20,
    distance: 100 + Math.random() * 150,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1.5,
    size: 4 + Math.random() * 6,
    shape: i % 4,
  }))

  // Side cannons confetti
  const leftCannonConfetti = Array.from({ length: 30 }, (_, i) => ({
    id: i + 2000,
    color: ["#ff6b6b", "#f9ca24", "#6c5ce7", "#00b894", "#45b7d1"][i % 5],
    delay: Math.random() * 0.8,
    duration: 3 + Math.random() * 1,
    size: 5 + Math.random() * 5,
    shape: i % 4,
  }))

  const rightCannonConfetti = Array.from({ length: 30 }, (_, i) => ({
    id: i + 3000,
    color: ["#4ecdc4", "#f0932b", "#fd79a8", "#74b9ff", "#fdcb6e"][i % 5],
    delay: Math.random() * 0.8,
    duration: 3 + Math.random() * 1,
    size: 5 + Math.random() * 5,
    shape: i % 4,
  }))

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => setTimeout(onComplete, 4000)}
    >
      {/* Main confetti fall from top */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: "-30px",
          }}
          initial={{
            y: -60,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: piece.rotation * 6,
            opacity: [0, 1, 1, 0.8, 0],
            x: [0, piece.drift * 0.3, piece.drift * 0.7, piece.drift],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        >
          {/* Enhanced confetti shapes */}
          {piece.shape === 0 && (
            <div
              className="rounded-sm shadow-sm"
              style={{
                width: piece.size,
                height: piece.size * 0.6,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === 1 && (
            <div
              className="rounded-full shadow-sm"
              style={{
                width: piece.size * 0.8,
                height: piece.size * 0.8,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === 2 && (
            <div
              className="transform rotate-45 shadow-sm"
              style={{
                width: piece.size * 0.7,
                height: piece.size * 0.7,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === 3 && (
            <div
              className="rounded-full shadow-sm"
              style={{
                width: piece.size,
                height: piece.size * 0.4,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === 4 && (
            <div
              className="shadow-sm"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${piece.size * 0.4}px solid transparent`,
                borderRight: `${piece.size * 0.4}px solid transparent`,
                borderBottom: `${piece.size}px solid ${piece.color}`,
              }}
            />
          )}
          {piece.shape === 5 && (
            <div
              className="rounded-lg shadow-sm transform rotate-12"
              style={{
                width: piece.size * 1.2,
                height: piece.size * 0.3,
                backgroundColor: piece.color,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Burst confetti from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {burstConfetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: Math.cos((piece.angle * Math.PI) / 180) * piece.distance,
              y: Math.sin((piece.angle * Math.PI) / 180) * piece.distance + 50,
              rotate: piece.angle * 2,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay + 0.3,
              ease: "easeOut",
            }}
          >
            {piece.shape === 0 && (
              <div
                className="rounded-sm shadow-sm"
                style={{
                  width: piece.size,
                  height: piece.size * 0.6,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 1 && (
              <div
                className="rounded-full shadow-sm"
                style={{
                  width: piece.size,
                  height: piece.size,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 2 && (
              <div
                className="transform rotate-45 shadow-sm"
                style={{
                  width: piece.size * 0.8,
                  height: piece.size * 0.8,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 3 && (
              <div
                className="rounded-full shadow-sm"
                style={{
                  width: piece.size * 1.2,
                  height: piece.size * 0.4,
                  backgroundColor: piece.color,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Left cannon confetti */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        {leftCannonConfetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              x: 200 + Math.random() * 300,
              y: (Math.random() - 0.5) * 200,
              rotate: 360 + Math.random() * 360,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay + 0.5,
              ease: "easeOut",
            }}
          >
            {piece.shape === 0 && (
              <div
                className="rounded-sm shadow-sm"
                style={{
                  width: piece.size,
                  height: piece.size * 0.6,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 1 && (
              <div
                className="rounded-full shadow-sm"
                style={{
                  width: piece.size,
                  height: piece.size,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 2 && (
              <div
                className="transform rotate-45 shadow-sm"
                style={{
                  width: piece.size * 0.8,
                  height: piece.size * 0.8,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 3 && (
              <div
                className="rounded-full shadow-sm"
                style={{
                  width: piece.size * 1.2,
                  height: piece.size * 0.4,
                  backgroundColor: piece.color,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Right cannon confetti */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        {rightCannonConfetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              x: -(200 + Math.random() * 300),
              y: (Math.random() - 0.5) * 200,
              rotate: -(360 + Math.random() * 360),
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay + 0.5,
              ease: "easeOut",
            }}
          >
            {piece.shape === 0 && (
              <div
                className="rounded-sm shadow-sm"
                style={{
                  width: piece.size,
                  height: piece.size * 0.6,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 1 && (
              <div
                className="rounded-full shadow-sm"
                style={{
                  width: piece.size,
                  height: piece.size,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 2 && (
              <div
                className="transform rotate-45 shadow-sm"
                style={{
                  width: piece.size * 0.8,
                  height: piece.size * 0.8,
                  backgroundColor: piece.color,
                }}
              />
            )}
            {piece.shape === 3 && (
              <div
                className="rounded-full shadow-sm"
                style={{
                  width: piece.size * 1.2,
                  height: piece.size * 0.4,
                  backgroundColor: piece.color,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Central success message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center max-w-sm mx-auto px-6"
          initial={{ scale: 0, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Success icon with enhanced glow */}
          <motion.div
            className="relative mx-auto mb-4"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2,
              repeat: 2,
              ease: "easeInOut",
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-green-400 blur-xl opacity-60"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl border-2 border-white">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-3"
          >
            <motion.h2
              className="text-3xl font-bold text-slate-800"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: 1,
                delay: 1,
              }}
            >
              Achievement Added!
            </motion.h2>
            <p className="text-slate-600 font-medium">Your accomplishment has been successfully recorded</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced burst rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute border-2 border-green-400/20 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 3 + ring * 0.5, 4 + ring * 0.5],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2,
              delay: ring * 0.15,
              ease: "easeOut",
            }}
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        ))}
      </div>

      {/* Floating sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2 + 1,
            repeat: 1,
          }}
        >
          <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-sm" />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function StudentAchievements({ registrationNumber }: StudentAchievementsProps) {
  const [achievements, setAchievements] = useState(getAchievements(registrationNumber))
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    level: "college",
    certificateFile: null as File | null,
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic":
        return Award
      case "Sports":
        return Trophy
      case "Cultural":
        return Star
      case "Technical":
        return Medal
      default:
        return Trophy
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "Sports":
        return "bg-green-50 text-green-600 border-green-200"
      case "Cultural":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "Technical":
        return "bg-orange-50 text-orange-600 border-orange-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const getLevelBadge = (level: string) => {
    const levels = {
      college: { label: "College Level", color: "bg-blue-100 text-blue-800" },
      district: { label: "District Level", color: "bg-green-100 text-green-800" },
      state: { label: "State Level", color: "bg-purple-100 text-purple-800" },
      national: { label: "National Level", color: "bg-red-100 text-red-800" },
      international: { label: "International Level", color: "bg-yellow-100 text-yellow-800" },
    }
    return levels[level as keyof typeof levels] || levels.college
  }

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.category && newAchievement.date) {
      const achievement = {
        id: `ach_${Date.now()}`,
        title: newAchievement.title,
        description: newAchievement.description,
        category: newAchievement.category as "Academic" | "Sports" | "Cultural" | "Technical",
        date: newAchievement.date,
        level: newAchievement.level,
        certificateFile: newAchievement.certificateFile?.name,
      }
      setAchievements([achievement, ...achievements])
      setNewAchievement({ title: "", description: "", category: "", date: "", level: "college", certificateFile: null })
      setIsAddDialogOpen(false)

      // Trigger spectacular confetti celebration
      setShowCelebration(true)
    }
  }

  const handleDeleteAchievement = (id: string) => {
    // Set the deleting ID to trigger card-specific animation
    setDeletingId(id)

    // Remove achievement after animation completes
    setTimeout(() => {
      setAchievements(achievements.filter((achievement) => achievement.id !== id))
      setDeletingId(null)
    }, 600)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewAchievement({ ...newAchievement, certificateFile: file })
    }
  }

  // Filter and sort achievements
  const filteredAchievements = achievements
    .filter((achievement) => {
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || achievement.category === filterCategory
      return matchesSearch && matchesCategory
    })
    .sort((a: any, b:any) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category)
      }
      return 0
    })

  // Achievement statistics
  const stats = {
    total: achievements.length,
    academic: achievements.filter((a) => a.category === "Academic").length,
    sports: achievements.filter((a) => a.category === "Sports").length,
    cultural: achievements.filter((a) => a.category === "Cultural").length,
    technical: achievements.filter((a) => a.category === "Technical").length,
    thisYear: achievements.filter((a) => new Date(a.date).getFullYear() === new Date().getFullYear()).length,
  }

  return (
    <div className="space-y-6 relative">
      {/* Spectacular Confetti Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <ClassicConfettiCelebration isVisible={showCelebration} onComplete={() => setShowCelebration(false)} />
        )}
      </AnimatePresence>

      {/* Floating Add Button - Mobile & Desktop */}
      {/* Floating Add Button - Small & Static with Hover Tooltip */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <div className="relative group">
              <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200">
                <Plus className="w-5 h-5" />
              </button>

              {/* Hover Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-slate-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                  Add Achievement
                  {/* Arrow pointing to button */}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-slate-800"></div>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Add New Achievement
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Achievement Title *</Label>
                <Input
                  id="title"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  placeholder="Enter achievement title"
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  placeholder="Describe your achievement in detail"
                  className="border-2 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newAchievement.category}
                    onValueChange={(value) => setNewAchievement({ ...newAchievement, category: value })}
                  >
                    <SelectTrigger className="border-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={newAchievement.level}
                    onValueChange={(value) => setNewAchievement({ ...newAchievement, level: value })}
                  >
                    <SelectTrigger className="border-2">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="college">College Level</SelectItem>
                      <SelectItem value="district">District Level</SelectItem>
                      <SelectItem value="state">State Level</SelectItem>
                      <SelectItem value="national">National Level</SelectItem>
                      <SelectItem value="international">International Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificate">Certificate/Document</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                  <input
                    id="certificate"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="certificate" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      {newAchievement.certificateFile
                        ? newAchievement.certificateFile.name
                        : "Click to upload certificate"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleAddAchievement}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <motion.div
                className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                animate={{
                  boxShadow: [
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    "0 10px 15px -3px rgba(251, 191, 36, 0.4)",
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Trophy className="h-6 w-6 text-white" />
              </motion.div>
              My Achievements
            </h1>
            <p className="text-slate-600 mt-1">Showcase your awards, certificates, and recognitions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{achievements.length}</div>
              <div className="text-sm text-slate-500">Total Achievements</div>
            </div>
            {/* Desktop Add Button */}
            <div className="hidden sm:block">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Achievement
                    </Button>
                  </motion.div>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: Trophy,
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
          },
          {
            label: "Academic",
            value: stats.academic,
            icon: Award,
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
          },
          {
            label: "Sports",
            value: stats.sports,
            icon: Medal,
            color: "green",
            gradient: "from-green-500 to-green-600",
          },
          {
            label: "Cultural",
            value: stats.cultural,
            icon: Star,
            color: "pink",
            gradient: "from-pink-500 to-pink-600",
          },
          {
            label: "Technical",
            value: stats.technical,
            icon: Zap,
            color: "orange",
            gradient: "from-orange-500 to-orange-600",
          },
          {
            label: "This Year",
            value: stats.thisYear,
            icon: TrendingUp,
            color: "indigo",
            gradient: "from-indigo-500 to-indigo-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div
                    className={`mx-auto w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search achievements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40 border-2">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements List with Enhanced Card Animations */}
      {filteredAchievements.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Your Achievements ({filteredAchievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div layout className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredAchievements.map((achievement, index) => {
                    const Icon = getCategoryIcon(achievement.category)
                    const levelInfo = getLevelBadge(achievement.level || "college")
                    const isDeleting = deletingId === achievement.id

                    return (
                      <motion.div
                        key={achievement.id}
                        layout
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                          y: 50,
                          rotateX: -15,
                        }}
                        animate={{
                          opacity: isDeleting ? 0.3 : 1,
                          scale: isDeleting ? 0.95 : 1,
                          y: 0,
                          rotateX: 0,
                          filter: isDeleting ? "blur(2px)" : "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.8,
                          x: -100,
                          rotateY: -15,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{
                          scale: isDeleting ? 0.95 : 1.02,
                          y: isDeleting ? 0 : -2,
                          transition: { duration: 0.2 },
                        }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          layout: { duration: 0.3 },
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 group bg-gradient-to-r from-white to-slate-50/50 ${
                          isDeleting
                            ? "shadow-none border-red-200 bg-red-50/30"
                            : "hover:shadow-lg hover:border-purple-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <motion.div
                              className={`p-3 rounded-xl border-2 ${getCategoryColor(achievement.category)} transition-transform duration-300 ${
                                isDeleting ? "scale-90 opacity-50" : "group-hover:scale-110"
                              }`}
                              whileHover={isDeleting ? {} : { rotate: 10 }}
                              animate={
                                isDeleting
                                  ? {
                                      rotate: [0, -5, 5, -5, 0],
                                      scale: [1, 0.9, 0.9, 0.9, 0.9],
                                    }
                                  : {}
                              }
                              transition={
                                isDeleting
                                  ? {
                                      duration: 0.5,
                                      repeat: 1,
                                    }
                                  : {}
                              }
                            >
                              <Icon className="h-6 w-6" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <motion.h3
                                className={`font-semibold text-lg mb-2 transition-colors ${
                                  isDeleting
                                    ? "text-slate-400 line-through"
                                    : "text-slate-800 group-hover:text-purple-600"
                                }`}
                                animate={
                                  isDeleting
                                    ? {
                                        opacity: [1, 0.5, 0.5, 0.5],
                                      }
                                    : {}
                                }
                              >
                                {achievement.title}
                              </motion.h3>
                              <motion.p
                                className={`text-sm mb-3 leading-relaxed transition-colors ${
                                  isDeleting ? "text-slate-400" : "text-slate-600"
                                }`}
                                animate={
                                  isDeleting
                                    ? {
                                        opacity: [1, 0.4, 0.4, 0.4],
                                      }
                                    : {}
                                }
                              >
                                {achievement.description}
                              </motion.p>
                              <div className="flex flex-wrap items-center gap-3">
                                <div
                                  className={`flex items-center gap-1 text-sm transition-colors ${
                                    isDeleting ? "text-slate-400" : "text-slate-500"
                                  }`}
                                >
                                  <Calendar className="h-4 w-4" />
                                  {new Date(achievement.date).toLocaleDateString()}
                                </div>
                                <motion.div animate={isDeleting ? { opacity: 0.4, scale: 0.9 } : {}}>
                                  <Badge variant="outline" className="border-2">
                                    {achievement.category}
                                  </Badge>
                                </motion.div>
                                <motion.div animate={isDeleting ? { opacity: 0.4, scale: 0.9 } : {}}>
                                  <Badge className={`${levelInfo.color} border-2`}>{levelInfo.label}</Badge>
                                </motion.div>
                                {achievement.certificate && (
                                  <motion.div animate={isDeleting ? { opacity: 0.4, scale: 0.9 } : {}}>
                                    <Badge variant="secondary" className="border-2">
                                      Certificate Available
                                    </Badge>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-2 ml-4 transition-opacity ${
                              isDeleting ? "opacity-30" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            <motion.div
                              whileHover={isDeleting ? {} : { scale: 1.1 }}
                              whileTap={isDeleting ? {} : { scale: 0.9 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => !isDeleting && handleDeleteAchievement(achievement.id)}
                                disabled={isDeleting}
                                className={`border-2 transition-all ${
                                  isDeleting
                                    ? "text-red-400 border-red-200 cursor-not-allowed"
                                    : "text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                }`}
                              >
                                <motion.div
                                  animate={
                                    isDeleting
                                      ? {
                                          rotate: [0, 10, -10, 10, 0],
                                          scale: [1, 1.1, 1.1, 1.1, 1],
                                        }
                                      : {}
                                  }
                                  transition={
                                    isDeleting
                                      ? {
                                          duration: 0.6,
                                          repeat: 1,
                                        }
                                      : {}
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.div>
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ) : achievements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-2">
            <CardContent className="p-12 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Trophy className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No Achievements Yet</h3>
              <p className="text-slate-500 mb-4">Start adding your achievements to showcase your accomplishments!</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Achievement
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-2">
            <CardContent className="p-12 text-center">
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No Matching Achievements</h3>
              <p className="text-slate-500 mb-4">Try adjusting your search or filter criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
