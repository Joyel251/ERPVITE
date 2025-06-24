

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  BarChart3,
  Grid3X3,
  TrendingUp,
  BookOpen,
  Target,
  Award,
} from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  Legend,
} from "recharts"
import { getAttendanceData } from '../../lib/student-data'

interface AttendanceProps {
  registrationNumber: string
}

const COLORS = {
  present: "#10b981",
  absent: "#ef4444",
  od: "#f59e0b",
  break: "#6b7280",
  lunch: "#8b5cf6",
}

const PERIOD_SCHEDULE = [
  { period: 1, time: "8:00 - 9:00 AM", type: "class" },
  { period: 2, time: "9:00 - 9:50 AM", type: "class" },
  { period: "Break", time: "9:50 - 10:10 AM", type: "break" },
  { period: 3, time: "10:10 - 11:00 AM", type: "class" },
  { period: 4, time: "11:00 - 11:50 AM", type: "class" },
  { period: 5, time: "11:50 - 12:40 PM", type: "class" },
  { period: "Lunch", time: "12:40 - 1:30 PM", type: "lunch" },
  { period: 6, time: "1:30 - 2:20 PM", type: "class" },
  { period: 7, time: "2:20 - 3:10 PM", type: "class" },
  { period: 8, time: "3:10 - 4:00 PM", type: "class" },
]

export default function Attendance({ registrationNumber }: AttendanceProps) {
  const attendanceData = getAttendanceData(registrationNumber)

  const overallStats = {
    totalHours: attendanceData.mainfile.totalHours,
    presentHours: attendanceData.mainfile.presentHours,
    absentHours: attendanceData.mainfile.absentHours,
    odHours: attendanceData.mainfile.odHours,
    percentage: attendanceData.mainfile.percentage,
  }

  const pieData = [
    { name: "Present", value: overallStats.presentHours, color: COLORS.present },
    { name: "Absent", value: overallStats.absentHours, color: COLORS.absent },
    { name: "OD", value: overallStats.odHours, color: COLORS.od },
  ]

  const weeklyData = attendanceData.weeklySchedule.map((day) => ({
    day: day.day.slice(0, 3),
    present: day.periods.filter((p) => p.status === "present" && p.type === "class").length,
    absent: day.periods.filter((p) => p.status === "absent" && p.type === "class").length,
    od: day.periods.filter((p) => p.status === "od" && p.type === "class").length,
    percentage: (day.periods.filter((p) => p.status === "present" && p.type === "class").length / 8) * 100,
  }))

  // Generate date-wise attendance grid with proper mixed attendance
  const generateDateWiseGrid = () => {
    const startDate = new Date(2024, 0, 15) // January 15, 2024
    const days = 40 // Show 8 weeks (40 working days)
    const gridData = []
    const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      // Skip weekends
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        continue
      }

      const dayData = {
        date: currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        periods: [] as { period: number; status: string; subject: string; }[]
      }

      for (let period = 1; period <= 8; period++) {
        // Create a more complex seed for better randomization
        const seed = (studentNumber * 7 + i * 13 + period * 17) % 100
        let status = "present"

        // Realistic attendance distribution: 75% present, 20% absent, 5% OD
        if (seed < 20) status = "absent"
        else if (seed < 25) status = "od"
        // else present (75%)

        dayData.periods.push({
          period,
          status,
          subject: attendanceData.subjects[period % attendanceData.subjects.length]?.name || "Subject",
        })
      }
      gridData.push(dayData)
    }
    return gridData
  }

  const dateWiseGridData = generateDateWiseGrid()

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black">
              Attendance Analytics
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
            See how you're doing
            </p>
          </div>
          <div className="text-right">
            <motion.div
              className={`text-3xl font-bold ${overallStats.percentage >= 75 ? "text-green-600" : "text-red-600"}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {overallStats.percentage.toFixed(1)}%
            </motion.div>
            <div className="text-sm text-slate-500 font-medium">Overall Attendance</div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Clock, label: "Total Hours", value: overallStats.totalHours, color: "blue", delay: 0.1 },
          { icon: CheckCircle, label: "Present Hours", value: overallStats.presentHours, color: "green", delay: 0.2 },
          { icon: XCircle, label: "Absent Hours", value: overallStats.absentHours, color: "red", delay: 0.3 },
          { icon: AlertTriangle, label: "OD Hours", value: overallStats.odHours, color: "yellow", delay: 0.4 },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stat.delay }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group"
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`p-3 rounded-xl bg-${stat.color}-50 group-hover:bg-${stat.color}-100 transition-colors`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </motion.div>
                  <div>
                    <motion.div
                      className="text-3xl font-bold text-slate-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="grid" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="grid" className="flex items-center gap-2 rounded-lg">
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">Attendance Grid</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 rounded-lg">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2 rounded-lg">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Subjects</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2 rounded-lg">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-8">
          {/* Enhanced Date-wise Attendance Grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
              <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-blue-50">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Grid3X3 className="h-6 w-6 text-white" />
                  </motion.div>
                  Daily Attendance Pattern
                </CardTitle>
                <p className="text-slate-600 text-lg">
                  Visual representation of your daily attendance across all periods
                </p>
              </CardHeader>
              <CardContent className="p-6">
                {/* Period Headers */}
                <div className="mb-6">
                  <div className="grid grid-cols-9 gap-2 mb-6">
                    <div className="text-center p-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-bold text-sm">
                      Date
                    </div>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((period) => (
                      <motion.div
                        key={period}
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: period * 0.05,
                          type: "spring",
                          stiffness: 300,
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        P{period}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Optimized Date-wise Grid */}
                <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                  {dateWiseGridData.map((day, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: dayIndex * 0.02,
                        ease: "easeOut",
                      }}
                      whileHover={{ scale: 1.01, x: 3 }}
                      className="grid grid-cols-9 gap-2 p-2 rounded-xl bg-white/60 hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {/* Date Column */}
                      <motion.div
                        className="flex items-center justify-center p-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg font-semibold text-sm text-slate-700 min-h-[3rem]"
                        whileHover={{ scale: 1.02 }}
                        title={day.fullDate}
                      >
                        {day.date}
                      </motion.div>

                      {/* Period Columns */}
                      {day.periods.map((period, periodIndex) => (
                        <motion.div
                          key={`${dayIndex}-${periodIndex}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: dayIndex * 0.02 + periodIndex * 0.01,
                            type: "spring",
                            stiffness: 400,
                          }}
                          whileHover={{
                            scale: 1.15,
                            zIndex: 10,
                            rotate: 2,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                          }}
                          className={`
                            aspect-square rounded-xl flex items-center justify-center text-sm font-bold text-white cursor-pointer
                            transition-all duration-200 shadow-md hover:shadow-lg relative overflow-hidden
                            ${
                              period.status === "present"
                                ? "bg-gradient-to-br from-emerald-400 via-green-500 to-green-600"
                                : period.status === "absent"
                                  ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
                                  : "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500"
                            }
                          `}
                          title={`${day.fullDate} - Period ${period.period}: ${period.status.toUpperCase()}\nSubject: ${period.subject}`}
                        >
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.15 }}>
                            {period.status === "present" ? "P" : period.status === "absent" ? "A" : "OD"}
                          </motion.div>

                          {/* Subtle shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-white/10 rounded-xl"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Legend */}
                <motion.div
                  className="flex justify-center gap-8 mt-8 p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl shadow-inner"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {[
                    { label: "Present", color: "from-emerald-400 via-green-500 to-green-600", symbol: "P" },
                    { label: "Absent", color: "from-red-400 via-red-500 to-red-600", symbol: "A" },
                    { label: "On Duty", color: "from-amber-400 via-yellow-500 to-orange-500", symbol: "OD" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 300,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.4 }}
                      >
                        {item.symbol}
                      </motion.div>
                      <span className="text-lg font-semibold text-slate-700">{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Attendance Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <TrendingUp className="h-5 w-5 text-white" />
                    </motion.div>
                    Attendance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1000}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} hours`, "Hours"]} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Trends */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <BarChart3 className="h-5 w-5 text-white" />
                    </motion.div>
                    Weekly Attendance Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="percentage"
                          stroke="#10b981"
                          fill="url(#colorGradient)"
                          strokeWidth={3}
                          animationDuration={1500}
                        />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <CardTitle>Attendance Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-semibold">Overall Attendance</span>
                    <Badge
                      variant={overallStats.percentage >= 75 ? "default" : "destructive"}
                      className="text-sm px-3 py-1"
                    >
                      {overallStats.percentage.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={overallStats.percentage} className="h-4 rounded-full" />
                  {overallStats.percentage < 75 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-600 mt-3 p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      ⚠️ Attendance below 75% - Risk of debarment from examinations
                    </motion.p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-8">
          {/* Subject Performance Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className="h-5 w-5 text-white" />
                  </motion.div>
                  Subject-wise Attendance Performance
                </CardTitle>
                <p className="text-slate-600">Detailed breakdown of attendance across all subjects</p>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Enhanced Subject Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendanceData.subjects.map((subject, index) => (
              <motion.div
                key={subject.code}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 300,
                }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 overflow-hidden relative">
                  {/* Status Indicator */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${
                      subject.percentage >= 85
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : subject.percentage >= 75
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                  />

                  <CardContent className="p-6">
                    <div className="space-y-5">
                      {/* Subject Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800 text-lg leading-tight">{subject.name}</h3>
                          <p className="text-sm text-slate-600 font-medium mt-1">{subject.code}</p>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.08 + 0.2 }}
                          className="ml-3"
                        >
                          <Badge
                            variant={subject.percentage >= 75 ? "default" : "destructive"}
                            className="text-sm px-3 py-1 font-bold"
                          >
                            {subject.percentage.toFixed(1)}%
                          </Badge>
                        </motion.div>
                      </div>

                      {/* Progress Section */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600 font-medium">Attendance Progress</span>
                          <span className="text-slate-800 font-semibold">
                            {subject.present}/{subject.total} classes
                          </span>
                        </div>

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
                        >
                          <Progress value={subject.percentage} className="h-3 rounded-full" />
                        </motion.div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <motion.div
                          className="text-center p-3 bg-green-50 rounded-lg border border-green-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center justify-center mb-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="text-lg font-bold text-green-700">{subject.present}</div>
                          <div className="text-xs text-green-600 font-medium">Present</div>
                        </motion.div>

                        <motion.div
                          className="text-center p-3 bg-red-50 rounded-lg border border-red-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center justify-center mb-1">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="text-lg font-bold text-red-700">{subject.total - subject.present}</div>
                          <div className="text-xs text-red-600 font-medium">Absent</div>
                        </motion.div>

                        <motion.div
                          className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center justify-center mb-1">
                            <Target className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-lg font-bold text-blue-700">{subject.total}</div>
                          <div className="text-xs text-blue-600 font-medium">Total</div>
                        </motion.div>
                      </div>

                      {/* Performance Indicator */}
                      <motion.div
                        className={`flex items-center gap-2 p-3 rounded-lg ${
                          subject.percentage >= 85
                            ? "bg-green-50 border border-green-200"
                            : subject.percentage >= 75
                              ? "bg-yellow-50 border border-yellow-200"
                              : "bg-red-50 border border-red-200"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.08 + 0.5 }}
                      >
                        {subject.percentage >= 85 ? (
                          <>
                            <Award className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Excellent Attendance</span>
                          </>
                        ) : subject.percentage >= 75 ? (
                          <>
                            <Target className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-700">Good Attendance</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-700">Needs Improvement</span>
                          </>
                        )}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="h-5 w-5 text-white" />
                  </motion.div>
                  Daily Class Schedule
                </CardTitle>
                <p className="text-slate-600">Complete schedule from 8:00 AM to 4:00 PM</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PERIOD_SCHEDULE.map((period, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                        period.type === "break"
                          ? "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                          : period.type === "lunch"
                            ? "bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200"
                            : "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 hover:from-blue-100 hover:to-blue-150"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${
                            period.type === "break"
                              ? "bg-gradient-to-br from-gray-400 to-gray-600 text-white"
                              : period.type === "lunch"
                                ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white"
                                : "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                          }`}
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.4 }}
                        >
                          {period.type === "break" ? "B" : period.type === "lunch" ? "L" : period.period}
                        </motion.div>
                        <div>
                          <div className="font-bold text-slate-800 text-lg">
                            {period.type === "break"
                              ? "Morning Break"
                              : period.type === "lunch"
                                ? "Lunch Break"
                                : `Period ${period.period}`}
                          </div>
                          <div className="text-slate-600 font-medium">{period.time}</div>
                        </div>
                      </div>
                      {period.type === "class" && (
                        <div className="text-right">
                          <div className="text-sm text-slate-600 font-medium">Class Period</div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #94a3b8, #64748b);
        }
      `}</style>
    </div>
  )
}
