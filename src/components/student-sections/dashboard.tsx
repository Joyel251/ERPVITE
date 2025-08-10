"use client"

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
}

export default function Dashboard({ student }: DashboardProps) {
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
      {/* Enhanced Welcome Section */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <CardContent className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-3xl sm:text-4xl font-bold title-font">
                  Welcome back, {student.name.split(" ")[0]}!
                </h2>
              </div>
              <p className="text-blue-100 mb-4 text-lg sm:text-xl font-medium">
                {student.department} • Year {student.year} • Semester {student.semester}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">Section {student.section}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                  <GraduationCap className="h-4 w-4" />
                  <span className="font-medium">Roll No: {student.rollNumber}</span>
                </div>
              </div>
            </div>
            <div className="text-center bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="text-4xl sm:text-6xl font-bold mb-2">{new Date().getDate()}</div>
              <div className="text-blue-100 text-base font-medium">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <div className="text-sm text-blue-200 mt-1">
                {new Date().toLocaleDateString("en-US", { weekday: "long" })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <Card
            key={stat.title}
            className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl ${stat.bgColor} border ${stat.borderColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
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
                    className={`absolute inset-0 bg-gradient-to-r ${stat.gradientFrom} ${stat.gradientTo} rounded-full opacity-80`}
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 font-medium">{stat.progress.toFixed(0)}% Complete</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Activity className="h-6 w-6 text-blue-600" />
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
                  <div
                    key={index}
                    className={`group flex items-center gap-4 p-4 rounded-2xl hover:shadow-md transition-all duration-300 border ${activity.borderColor} bg-gradient-to-r ${activity.bgColor} hover:scale-[1.02]`}
                  >
                    <div
                      className={`p-3 rounded-2xl bg-white border ${activity.borderColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-800 text-sm truncate">{activity.title}</p>
                        <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>{activity.priority}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{activity.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Important Announcements */}
        <div>
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <Bell className="h-6 w-6 text-orange-600" />
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
                  <div
                    key={index}
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Performance Overview */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-green-100 rounded-xl">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            Academic Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {attendanceRecords.filter((r) => r.status === "Good").length}
              </div>
              <p className="text-sm text-emerald-700 font-semibold">Good Attendance</p>
              <p className="text-xs text-emerald-600 mt-1">Subjects</p>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {internalMarks.filter((m) => m.percentage >= 80).length}
              </div>
              <p className="text-sm text-blue-700 font-semibold">Above 80%</p>
              <p className="text-xs text-blue-600 mt-1">Subjects</p>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{achievements.length}</div>
              <p className="text-sm text-purple-700 font-semibold">Achievements</p>
              <p className="text-xs text-purple-600 mt-1">Earned</p>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{student.semester}</div>
              <p className="text-sm text-orange-700 font-semibold">Current</p>
              <p className="text-xs text-orange-600 mt-1">Semester</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
