

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import {
  BookOpen,
  Clock,
  Trophy,
  Calendar,
  TrendingUp,
  Users,
  FileText,
  GraduationCap,
  Bell,
  AlertCircle,
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
  if (!student || !student.registrationNumber) {
    return <div>Loading student data...</div>;
  }
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
      color: overallAttendance >= 75 ? "text-green-600" : "text-red-600",
      bgColor: overallAttendance >= 75 ? "bg-green-50" : "bg-red-50",
      borderColor: overallAttendance >= 75 ? "border-green-200" : "border-red-200",
      progress: overallAttendance,
      status: overallAttendance >= 75 ? "Good" : "Needs Attention",
    },
    {
      title: "Academic Performance",
      value: `${averageMarks.toFixed(1)}%`,
      icon: FileText,
      color: averageMarks >= 80 ? "text-blue-600" : averageMarks >= 60 ? "text-yellow-600" : "text-red-600",
      bgColor: averageMarks >= 80 ? "bg-blue-50" : averageMarks >= 60 ? "bg-yellow-50" : "bg-red-50",
      borderColor: averageMarks >= 80 ? "border-blue-200" : averageMarks >= 60 ? "border-yellow-200" : "border-red-200",
      progress: averageMarks,
      status: averageMarks >= 80 ? "Excellent" : averageMarks >= 60 ? "Good" : "Needs Improvement",
    },
    {
      title: "Achievements Earned",
      value: achievements.length.toString(),
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      progress: (achievements.length / 5) * 100,
      status: achievements.length > 2 ? "Outstanding" : "Good",
    },
    {
      title: "Library Status",
      value: `${issuedBooks} Books`,
      icon: BookOpen,
      color: overdueBooks > 0 ? "text-red-600" : "text-green-600",
      bgColor: overdueBooks > 0 ? "bg-red-50" : "bg-green-50",
      borderColor: overdueBooks > 0 ? "border-red-200" : "border-green-200",
      progress: (issuedBooks / 3) * 100,
      status: overdueBooks > 0 ? "Overdue Items" : "All Clear",
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
    },
    {
      type: "attendance",
      title: "Computer Networks Lecture Attended",
      time: "1 day ago",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      type: "exam",
      title: "Mid-Semester Exam Schedule Released",
      time: "2 days ago",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      type: "library",
      title: 'Borrowed "Advanced Data Structures"',
      time: "3 days ago",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      type: "achievement",
      title: "Programming Lab Excellence Award",
      time: "1 week ago",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  const upcomingEvents = [
    { title: "Mid-Semester Examinations", date: "2024-07-15", type: "exam", priority: "high" },
    { title: "Software Engineering Project Demo", date: "2024-07-10", type: "assignment", priority: "high" },
    { title: "Technical Symposium Registration", date: "2024-07-20", type: "event", priority: "medium" },
    { title: "Library Book Return Deadline", date: "2024-07-08", type: "library", priority: "medium" },
    { title: "Campus Placement Drive - TCS", date: "2024-07-22", type: "placement", priority: "high" },
  ]

  const importantAnnouncements = [
    {
      title: "Mid-Semester Exam Guidelines",
      content: "Important instructions for upcoming mid-semester examinations.",
      priority: "high",
      time: "1 hour ago",
    },
    {
      title: "Library Renovation Notice",
      content: "Central library will be closed for renovation from July 8-12.",
      priority: "medium",
      time: "3 hours ago",
    },
    {
      title: "Scholarship Application Deadline",
      content: "Merit scholarship applications due by July 15th.",
      priority: "high",
      time: "1 day ago",
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border shadow-xl">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 title-font">
                Welcome back, {student.name.split(" ")[0]}!
              </h2>
              <p className="text-blue-100 mb-3 sm:mb-4 text-base sm:text-lg">
                {student.department} • Year {student.year} • Semester {student.semester}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-sm">
                <span className="flex items-center gap-2 bg-white/20 px-2 sm:px-3 py-1 rounded-full border border-white/20">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  Section {student.section}
                </span>
                <span className="flex items-center gap-2 bg-white/20 px-2 sm:px-3 py-1 rounded-full border border-white/20">
                  <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                  Roll No: {student.rollNumber}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">{new Date().getDate()}</div>
              <div className="text-blue-100 text-sm sm:text-base">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">
                {new Date().toLocaleDateString("en-US", { weekday: "long" })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickStats.map((stat) => (
          <Card
            key={stat.title}
            className={`hover:shadow-lg transition-all duration-300 border ${stat.borderColor} hover:scale-105`}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
                  <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {stat.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 font-medium truncate">{stat.title}</span>
                  <span className="text-slate-500">{stat.progress.toFixed(0)}%</span>
                </div>
                <Progress value={stat.progress} className="h-2 sm:h-3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Recent Academic Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-slate-50 transition-colors border"
                  >
                    <div className={`p-2 sm:p-3 rounded-xl ${activity.bgColor} border`}>
                      <activity.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">{activity.title}</p>
                      <p className="text-xs sm:text-sm text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Announcements */}
        <div>
          <Card className="shadow-lg border">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                Important Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {importantAnnouncements.map((announcement, index) => (
                  <div key={index} className="p-3 sm:p-4 rounded-xl border hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 text-sm truncate pr-2">{announcement.title}</h4>
                      <Badge
                        variant={announcement.priority === "high" ? "destructive" : "secondary"}
                        className="text-xs shrink-0"
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mb-2 line-clamp-2">{announcement.content}</p>
                    <p className="text-xs text-slate-400">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <Card className="shadow-lg border">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            Upcoming Academic Events
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-3 sm:p-4 rounded-xl border hover:shadow-md transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <Badge
                    variant={
                      event.type === "exam"
                        ? "destructive"
                        : event.type === "assignment"
                          ? "default"
                          : event.priority === "high"
                            ? "destructive"
                            : "secondary"
                    }
                    className="text-xs"
                  >
                    {event.type}
                  </Badge>
                  {event.priority === "high" && <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />}
                </div>
                <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base line-clamp-2">{event.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card className="shadow-lg border">
        <CardHeader className="border-b">
          <CardTitle className="text-lg sm:text-xl">Academic Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-green-50 border border-green-200">
              <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
                {attendanceRecords.filter((r) => r.status === "Good").length}
              </div>
              <p className="text-xs sm:text-sm text-green-700 font-medium">Subjects with Good Attendance</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-blue-50 border border-blue-200">
              <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                {internalMarks.filter((m) => m.percentage >= 80).length}
              </div>
              <p className="text-xs sm:text-sm text-blue-700 font-medium">Subjects Above 80%</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-purple-50 border border-purple-200">
              <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">{achievements.length}</div>
              <p className="text-xs sm:text-sm text-purple-700 font-medium">Total Achievements</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-orange-50 border border-orange-200">
              <div className="text-2xl sm:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">{student.semester}</div>
              <p className="text-xs sm:text-sm text-orange-700 font-medium">Current Semester</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
