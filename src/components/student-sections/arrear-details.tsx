"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { Progress } from '../../ui/progress'
import { AlertTriangle, CheckCircle, Calendar, BookOpen,Target, TrendingUp } from "lucide-react"

interface ArrearDetailsProps {
  registrationNumber: string
}

interface ArrearDetail {
  subjectCode: string
  subjectName: string
  credits: number
  semester: number
  status: "Pending" | "Cleared"
  attempts: number
  nextExamDate?: string
  clearedInSemester?: number
  clearedGrade?: string
}

export default function ArrearDetails({ registrationNumber }: ArrearDetailsProps) {
  // Extract student number from registration number
  const studentNumber = Number.parseInt(registrationNumber.slice(-2))

  // Generate arrears based on student number
  const generateArrears = (): ArrearDetail[] => {
    const arrears: ArrearDetail[] = []

    // Basic arrears for students where studentNumber % 7 === 0
    if (studentNumber % 7 === 0) {
      arrears.push(
        {
          subjectCode: "MA201",
          subjectName: "Advanced Mathematics",
          credits: 4,
          semester: 3,
          status: "Pending",
          attempts: 2,
          nextExamDate: "2024-03-15",
        },
        {
          subjectCode: "CS202",
          subjectName: "Data Structures",
          credits: 4,
          semester: 3,
          status: "Cleared",
          attempts: 2,
          clearedInSemester: 4,
          clearedGrade: "B+",
        },
      )
    }

    // Additional arrears for semester 1 (studentNumber % 14 === 0)
    if (studentNumber % 14 === 0) {
      arrears.push(
        {
          subjectCode: "PH101",
          subjectName: "Engineering Physics",
          credits: 3,
          semester: 1,
          status: "Pending",
          attempts: 1,
          nextExamDate: "2024-02-20",
        },
        {
          subjectCode: "CH101",
          subjectName: "Engineering Chemistry",
          credits: 3,
          semester: 1,
          status: "Cleared",
          attempts: 3,
          clearedInSemester: 3,
          clearedGrade: "C",
        },
      )
    }

    // Additional arrears for semester 2 (studentNumber % 21 === 0)
    if (studentNumber % 21 === 0) {
      arrears.push(
        {
          subjectCode: "MA102",
          subjectName: "Engineering Mathematics II",
          credits: 4,
          semester: 2,
          status: "Pending",
          attempts: 1,
          nextExamDate: "2024-04-10",
        },
        {
          subjectCode: "EC101",
          subjectName: "Basic Electronics",
          credits: 3,
          semester: 2,
          status: "Cleared",
          attempts: 2,
          clearedInSemester: 4,
          clearedGrade: "B",
        },
      )
    }

    // Additional arrears for semester 3 (studentNumber % 28 === 0)
    if (studentNumber % 28 === 0) {
      arrears.push({
        subjectCode: "CS301",
        subjectName: "Operating Systems",
        credits: 4,
        semester: 3,
        status: "Pending",
        attempts: 1,
        nextExamDate: "2024-05-05",
      })
    }

    return arrears
  }

  const arrears = generateArrears()

  // Group arrears by semester
  const arrearsBySemester = arrears.reduce(
    (acc, arrear) => {
      if (!acc[arrear.semester]) {
        acc[arrear.semester] = []
      }
      acc[arrear.semester].push(arrear)
      return acc
    },
    {} as Record<number, ArrearDetail[]>,
  )

  // Calculate statistics
  const pendingArrears = arrears.filter((a) => a.status === "Pending").length
  const clearedArrears = arrears.filter((a) => a.status === "Cleared").length
  const totalArrears = arrears.length
  const pendingCredits = arrears.filter((a) => a.status === "Pending").reduce((sum, a) => sum + a.credits, 0)
  const clearanceRate = totalArrears > 0 ? Math.round((clearedArrears / totalArrears) * 100) : 0

  // If no arrears, show empty state
  if (totalArrears === 0) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Arrear Management
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your pending and cleared arrear subjects</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-12 text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">No Arrears Found!</h2>
              <p className="text-slate-600 text-lg">
                Congratulations! You have successfully cleared all your subjects with no pending arrears.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "A":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "B+":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      case "B":
        return "bg-gradient-to-r from-orange-500 to-red-500 text-white"
      case "C":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Arrear Management
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your pending and cleared arrear subjects</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
              {pendingArrears}
            </div>
            <div className="text-sm text-slate-500 font-medium">Pending Arrears</div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-100">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{pendingArrears}</div>
                  <div className="text-sm text-slate-600 font-medium">Pending Arrears</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{clearedArrears}</div>
                  <div className="text-sm text-slate-600 font-medium">Cleared Arrears</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{pendingCredits}</div>
                  <div className="text-sm text-slate-600 font-medium">Pending Credits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{clearanceRate}%</div>
                  <div className="text-sm text-slate-600 font-medium">Clearance Rate</div>
                  <Progress value={clearanceRate} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Semester Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-600">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              Semester-wise Arrears
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={`sem${Math.min(...Object.keys(arrearsBySemester).map(Number))}`} className="w-full">
              <TabsList className="grid w-full grid-cols-8 mb-6 bg-slate-100 p-1 rounded-xl">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
                  const semesterArrears = arrearsBySemester[sem] || []
                  const hasArrears = semesterArrears.length > 0
                  const pendingCount = semesterArrears.filter((a) => a.status === "Pending").length
                  const clearedCount = semesterArrears.filter((a) => a.status === "Cleared").length

                  return (
                    <TabsTrigger
                      key={sem}
                      value={`sem${sem}`}
                      disabled={!hasArrears}
                      className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg font-medium transition-all duration-200 disabled:opacity-30"
                    >
                      <div className="flex items-center gap-2">
                        <span>Sem {sem}</span>
                        {hasArrears && (
                          <div className="flex items-center gap-1">
                            {pendingCount > 0 && <div className="w-2 h-2 rounded-full bg-red-500" />}
                            {clearedCount > 0 && <div className="w-2 h-2 rounded-full bg-green-500" />}
                          </div>
                        )}
                      </div>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {Object.entries(arrearsBySemester).map(([semester, semesterArrears]) => (
                <TabsContent key={semester} value={`sem${semester}`} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Semester Header */}
                    <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-red-50 border border-slate-200">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Semester {semester}</h3>
                        <p className="text-slate-600 text-sm">
                          {semesterArrears.length} arrear subjects •{" "}
                          {semesterArrears.reduce((acc, sub) => acc + sub.credits, 0)} credits
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {semesterArrears.filter((a) => a.status === "Pending").length}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">Pending</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {semesterArrears.filter((a) => a.status === "Cleared").length}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">Cleared</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {semesterArrears.reduce((acc, sub) => acc + sub.credits, 0)}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">Credits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.round(
                              (semesterArrears.filter((a) => a.status === "Cleared").length / semesterArrears.length) *
                                100,
                            )}
                            %
                          </div>
                          <div className="text-xs text-slate-500 font-medium">Clear Rate</div>
                        </div>
                      </div>
                    </div>

                    {/* Subjects List */}
                    <div className="space-y-3">
                      {semesterArrears.map((arrear, index) => (
                        <motion.div
                          key={arrear.subjectCode}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card
                            className={`relative overflow-hidden border-l-4 hover:shadow-lg transition-all duration-300 ${
                              arrear.status === "Pending"
                                ? "border-l-red-500 bg-red-50/30"
                                : "border-l-green-500 bg-green-50/30"
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div
                                      className={`w-3 h-3 rounded-full ${
                                        arrear.status === "Pending" ? "bg-red-500" : "bg-green-500"
                                      }`}
                                    />
                                    <h4 className="font-semibold text-slate-800">{arrear.subjectName}</h4>
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        arrear.status === "Pending"
                                          ? "border-red-200 text-red-700 bg-red-50"
                                          : "border-green-200 text-green-700 bg-green-50"
                                      }`}
                                    >
                                      {arrear.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-slate-600">
                                    <span className="font-medium">{arrear.subjectCode}</span>
                                    <span>•</span>
                                    <span>{arrear.credits} Credits</span>
                                    <span>•</span>
                                    <span>{arrear.attempts} Attempts</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  {arrear.status === "Cleared" && arrear.clearedGrade && (
                                    <div className="text-center">
                                      <Badge className={`text-sm font-bold ${getGradeColor(arrear.clearedGrade)}`}>
                                        {arrear.clearedGrade}
                                      </Badge>
                                      <div className="text-xs text-slate-500 mt-1">
                                        Cleared in Sem {arrear.clearedInSemester}
                                      </div>
                                    </div>
                                  )}

                                  {arrear.status === "Pending" && arrear.nextExamDate && (
                                    <div className="text-center">
                                      <div className="flex items-center gap-1 text-blue-600">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm font-medium">{arrear.nextExamDate}</span>
                                      </div>
                                      <div className="text-xs text-slate-500 mt-1">Next Exam</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
