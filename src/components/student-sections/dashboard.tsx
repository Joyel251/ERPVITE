"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Progress } from '../../ui/progress'
import {
  BookOpen,
  Clock,
  Trophy,
  Calendar,
  Users,
  FileText,
  GraduationCap,
  Bell,
  Star,
  Target,
  Award,
  BookMarked,
  CheckCircle,
  Activity,
  Zap,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
} from "lucide-react"
import {
  type Student,
  getAttendanceRecords,
  getInternalMarks,
  getAchievements,
  getLibraryBooks,
} from '../../lib/student-data'

interface DashboardProps {
  student: Student
  onSectionChange: (section: any) => void
}

export default function Dashboard({ student, onSectionChange }: DashboardProps) {
  const attendanceRecords = getAttendanceRecords(student.registrationNumber)
  const internalMarks = getInternalMarks(student.registrationNumber)
  const achievements = getAchievements(student.registrationNumber)
  const libraryBooks = getLibraryBooks(student.registrationNumber)

  const overallAttendance =
    attendanceRecords.reduce((acc, record) => acc + record.percentage, 0) / attendanceRecords.length
  const averageMarks = internalMarks.reduce((acc, mark) => acc + mark.percentage, 0) / internalMarks.length
  const issuedBooks = libraryBooks.filter((book) => book.status === "Issued").length
  const overdueBooks = libraryBooks.filter((book) => book.status === "Overdue").length

  const quickStats = [
    {
      title: "Overall Attendance",
      value: `${overallAttendance.toFixed(1)}%`,
      icon: Clock,
      color: overallAttendance >= 75 ? "text-emerald-600" : "text-red-500",
      bgColor: overallAttendance >= 75 ? "bg-emerald-50" : "bg-red-50",
      borderColor: overallAttendance >= 75 ? "border-emerald-200" : "border-red-200",
      gradientFrom: overallAttendance >= 75 ? "from-emerald-500" : "from-red-500",
      gradientTo: overallAttendance >= 75 ? "to-emerald-600" : "to-red-600",
      progress: overallAttendance,
      status: overallAttendance >= 75 ? "Excellent" : "Needs Attention",
      trend: overallAttendance >= 80 ? "up" : overallAttendance >= 70 ? "stable" : "down",
      change: "+2.5%",
    },
    {
      title: "Academic Performance",
      value: `${averageMarks.toFixed(1)}%`,
      icon: FileText,
      color: averageMarks >= 80 ? "text-blue-600" : averageMarks >= 60 ? "text-amber-600" : "text-red-500",
      bgColor: averageMarks >= 80 ? "bg-blue-50" : averageMarks >= 60 ? "bg-amber-50" : "bg-red-50",
      borderColor: averageMarks >= 80 ? "border-blue-200" : averageMarks >= 60 ? "border-amber-200" : "border-red-200",
      gradientFrom: averageMarks >= 80 ? "from-blue-500" : averageMarks >= 60 ? "from-amber-500" : "from-red-500",
      gradientTo: averageMarks >= 80 ? "to-blue-600" : averageMarks >= 60 ? "to-amber-600" : "to-red-600",
      progress: averageMarks,
      status: averageMarks >= 80 ? "Outstanding" : averageMarks >= 60 ? "Good" : "Needs Improvement",
      trend: averageMarks >= 75 ? "up" : averageMarks >= 65 ? "stable" : "down",
      change: "+5.2%",
    },
    {
      title: "Achievements Earned",
      value: achievements.length.toString(),
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      progress: (achievements.length / 5) * 100,
      status: achievements.length > 2 ? "Outstanding" : "Good",
      trend: "up",
      change: "+1",
    },
    {
      title: "Library Status",
      value: `${issuedBooks} Books`,
      icon: BookOpen,
      color: overdueBooks > 0 ? "text-red-500" : "text-emerald-600",
      bgColor: overdueBooks > 0 ? "bg-red-50" : "bg-emerald-50",
      borderColor: overdueBooks > 0 ? "border-red-200" : "border-emerald-200",
      gradientFrom: overdueBooks > 0 ? "from-red-500" : "from-emerald-500",
      gradientTo: overdueBooks > 0 ? "to-red-600" : "to-emerald-600",
      progress: (issuedBooks / 3) * 100,
      status: overdueBooks > 0 ? "Overdue Items" : "All Clear",
      trend: overdueBooks > 0 ? "down" : "stable",
      change: "0",
    },
  ]

  const recentActivities = [
    {
      type: "assignment",
      title: "Database Management Assignment Submitted",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      priority: "high",
    },
    {
      type: "attendance",
      title: "Computer Networks Lecture Attended",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      priority: "medium",
    },
    {
      type: "exam",
      title: "Mid-Semester Exam Schedule Released",
      time: "2 days ago",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      priority: "high",
    },
    {
      type: "library",
      title: 'Borrowed "Advanced Data Structures"',
      time: "3 days ago",
      icon: BookMarked,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      priority: "low",
    },
    {
      type: "achievement",
      title: "Programming Lab Excellence Award",
      time: "1 week ago",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      priority: "high",
    },
  ]


  const importantAnnouncements = [
    {
      title: "Mid-Semester Exam Guidelines",
      content:
        "Important instructions for upcoming mid-semester examinations. Please review the exam schedule and guidelines.",
      priority: "high",
      time: "1 hour ago",
      category: "Academic",
    },
    {
      title: "Library Renovation Notice",
      content: "Central library will be closed for renovation from July 8-12. Digital resources remain available.",
      priority: "medium",
      time: "3 hours ago",
      category: "Facility",
    },
    {
      title: "Scholarship Application Deadline",
      content: "Merit scholarship applications due by July 15th. Submit all required documents.",
      priority: "high",
      time: "1 day ago",
      category: "Financial",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-emerald-600" />
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Enhanced Welcome Section with Library Gradient Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-8 rounded-3xl border-2 border-blue-100/60 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-4 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl shadow-xl shadow-blue-500/25"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <GraduationCap className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Welcome back, {student.name.split(" ")[0]}!
                  </motion.h1>
                  <motion.p
                    className="text-slate-600 text-lg font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {student.department} • Year {student.year} • Semester {student.semester}
                  </motion.p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.div
                  className="flex items-center gap-2 bg-white/80 px-4 py-3 rounded-full border-2 border-blue-200/60 backdrop-blur-sm shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-slate-700">Section {student.section}</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 bg-white/80 px-4 py-3 rounded-full border-2 border-purple-200/60 backdrop-blur-sm shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-slate-700">Roll No: {student.rollNumber}</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 bg-white/80 px-4 py-3 rounded-full border-2 border-indigo-200/60 backdrop-blur-sm shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                  <span className="font-semibold text-slate-700">Active Student</span>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="text-center bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 p-8 rounded-3xl text-white shadow-2xl border-4 border-white/20"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="text-6xl font-bold mb-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {new Date().getDate()}
              </motion.div>
              <div className="text-blue-100 text-lg font-semibold mb-1">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <div className="text-xs text-blue-200 font-medium">
                {new Date().toLocaleDateString("en-US", { weekday: "long" })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Quick Stats with Library Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl hover:scale-105 hover:-translate-y-3 bg-gradient-to-br from-white to-gray-50 overflow-hidden relative cursor-pointer"
              onClick={() => {
                if (stat.title === "Overall Attendance") {
                  onSectionChange("attendance")
                } else if (stat.title === "Academic Performance") {
                  onSectionChange("internal-marks")
                } else if (stat.title === "Achievements Earned") {
                  onSectionChange("achievements")
                } else if (stat.title === "Library Status") {
                  onSectionChange("library")
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="p-4 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="text-right">
                    <motion.div
                      className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="flex items-center gap-1 justify-end">
                      {getTrendIcon(stat.trend)}
                      <span className="text-xs text-gray-500">{stat.change}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold text-sm">{stat.title}</span>
                    <Badge variant="outline" className="text-xs font-medium">
                      {stat.status}
                    </Badge>
                  </div>
                  <div className="relative">
                    <Progress value={stat.progress} className="h-3 bg-gray-100" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full opacity-80"
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 font-medium">
                    {stat.progress.toFixed(0)}% Complete
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                Recent Academic Activities
                <Badge variant="secondary" className="ml-auto">
                  {recentActivities.length} Updates
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group flex items-center gap-4 p-4 rounded-2xl hover:shadow-md transition-all duration-300 border border-gray-200/60 bg-gradient-to-r from-white to-gray-50 hover:scale-[1.02] cursor-pointer"
                    onClick={() => {
                      if (activity.type === "assignment") {
                        onSectionChange("assignments")
                      } else if (activity.type === "attendance") {
                        onSectionChange("attendance")
                      } else if (activity.type === "exam") {
                        onSectionChange("exams")
                      } else if (activity.type === "library") {
                        onSectionChange("library")
                      } else if (activity.type === "achievement") {
                        onSectionChange("achievements")
                      }
                    }}
                  >
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <activity.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-800 text-sm truncate">{activity.title}</p>
                        <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>{activity.priority}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{activity.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Important Announcements */}
        <div>
          <Card
            className="shadow-xl border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 cursor-pointer hover:shadow-2xl transition-all duration-300"
            onClick={() => onSectionChange("announcements")}
          >
            <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                Important Notices
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Live</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {importantAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group p-4 rounded-2xl border hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 pr-2">{announcement.title}</h4>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant={announcement.priority === "high" ? "destructive" : "secondary"}
                          className="text-xs shrink-0"
                        >
                          {announcement.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {announcement.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-3">{announcement.content}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400 font-medium">{announcement.time}</p>
                      <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Performance Overview */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            Academic Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="group text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => onSectionChange("attendance")}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {attendanceRecords.filter((r) => r.status === "Good").length}
              </div>
              <p className="text-sm text-emerald-700 font-semibold">Good Attendance</p>
              <p className="text-xs text-emerald-600 mt-1">Subjects</p>
            </motion.div>
            <motion.div
              className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {internalMarks.filter((m) => m.percentage >= 80).length}
              </div>
              <p className="text-sm text-blue-700 font-semibold">Above 80%</p>
              <p className="text-xs text-blue-600 mt-1">Subjects</p>
            </motion.div>
            <motion.div
              className="group text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{achievements.length}</div>
              <p className="text-sm text-purple-700 font-semibold">Achievements</p>
              <p className="text-xs text-purple-600 mt-1">Earned</p>
            </motion.div>
            <motion.div
              className="group text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{student.semester}</div>
              <p className="text-sm text-orange-700 font-semibold">Current</p>
              <p className="text-xs text-orange-600 mt-1">Semester</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
