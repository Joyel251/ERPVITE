"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { Progress } from '../../ui/progress'
import { AlertTriangle, CheckCircle, Calendar, BookOpen, FileText, Trophy, Target } from "lucide-react"

interface ArrearDetailsProps {
  registrationNumber: string
}

interface ArrearSubject {
  subjectCode: string
  subjectName: string
  credits: number
  examDate: string
  status: "Pending" | "Cleared"
  attempts: number
  clearedInSemester?: number
  grade?: string
}

interface SemesterArrears {
  semester: number
  subjects: ArrearSubject[]
  status: "Completed" | "Current" | "Upcoming"
}

export default function ArrearDetails({ registrationNumber }: ArrearDetailsProps) {
  // Mock arrear data - most students won't have arrears
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1
  const hasArrears = studentNumber % 7 === 0 // Only some students have arrears

  // Generate semester-wise arrear data
  const generateSemesterArrears = (): SemesterArrears[] => {
    if (!hasArrears) return []

    const semesters: SemesterArrears[] = []

    // Semester 1 arrears
    if (studentNumber % 14 === 0) {
      semesters.push({
        semester: 1,
        status: "Completed",
        subjects: [
          {
            subjectCode: "MA101",
            subjectName: "Engineering Mathematics I",
            credits: 4,
            examDate: "2024-07-15",
            status: "Cleared",
            attempts: 2,
            clearedInSemester: 3,
            grade: "B",
          },
          {
            subjectCode: "PH101",
            subjectName: "Engineering Physics",
            credits: 3,
            examDate: "2024-07-18",
            status: "Cleared",
            attempts: 1,
            clearedInSemester: 2,
            grade: "B+",
          },
        ],
      })
    }

    // Semester 2 arrears
    if (studentNumber % 21 === 0) {
      semesters.push({
        semester: 2,
        status: "Completed",
        subjects: [
          {
            subjectCode: "MA102",
            subjectName: "Engineering Mathematics II",
            credits: 4,
            examDate: "2024-08-15",
            status: "Pending",
            attempts: 2,
          },
          {
            subjectCode: "CH101",
            subjectName: "Engineering Chemistry",
            credits: 3,
            examDate: "2024-08-18",
            status: "Cleared",
            attempts: 1,
            clearedInSemester: 4,
            grade: "A",
          },
        ],
      })
    }

    // Semester 3 arrears
    if (studentNumber % 28 === 0) {
      semesters.push({
        semester: 3,
        status: "Current",
        subjects: [
          {
            subjectCode: "CS301",
            subjectName: "Data Structures and Algorithms",
            credits: 4,
            examDate: "2024-12-10",
            status: "Pending",
            attempts: 1,
          },
        ],
      })
    }

    return semesters
  }

  const semesterArrears = generateSemesterArrears()
  const allArrears = semesterArrears.flatMap((sem) => sem.subjects)
  const pendingArrears = allArrears.filter((arrear) => arrear.status === "Pending")
  const clearedArrears = allArrears.filter((arrear) => arrear.status === "Cleared")
  const totalCredits = allArrears.reduce((acc, arrear) => acc + arrear.credits, 0)
  const pendingCredits = pendingArrears.reduce((acc, arrear) => acc + arrear.credits, 0)
  const clearanceRate = allArrears.length > 0 ? (clearedArrears.length / allArrears.length) * 100 : 0

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "A":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "B+":
        return "bg-gradient-to-r from-purple-500 to-violet-500 text-white"
      case "B":
        return "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
      case "C":
        return "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getSemesterStatus = (semester: number) => {
    const currentSem = 5 // Assuming current semester
    if (semester < currentSem) return "Completed"
    if (semester === currentSem) return "Current"
    return "Upcoming"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Arrear Management
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your arrear subjects across semesters</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${pendingArrears.length > 0 ? "text-red-600" : "text-green-600"}`}>
              {pendingArrears.length}
            </div>
            <div className="text-sm text-slate-500">Pending Arrears</div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{pendingArrears.length}</div>
                  <div className="text-sm text-slate-600">Pending Arrears</div>
                  <Progress value={pendingArrears.length > 0 ? 100 : 0} className="w-16 h-1 mt-1" />
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
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{clearedArrears.length}</div>
                  <div className="text-sm text-slate-600">Cleared Arrears</div>
                  <Progress value={clearanceRate} className="w-16 h-1 mt-1" />
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
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{pendingCredits}</div>
                  <div className="text-sm text-slate-600">Pending Credits</div>
                  <Progress value={(pendingCredits / Math.max(totalCredits, 1)) * 100} className="w-16 h-1 mt-1" />
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
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{Math.round(clearanceRate)}%</div>
                  <div className="text-sm text-slate-600">Clearance Rate</div>
                  <Progress value={clearanceRate} className="w-16 h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Semester-wise Arrear Details */}
      {semesterArrears.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Semester-wise Arrear Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="sem1" className="w-full">
                <TabsList className="grid w-full grid-cols-8 rounded-none border-b bg-slate-50">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
                    const semesterData = semesterArrears.find((s) => s.semester === sem)
                    const status = getSemesterStatus(sem)
                    const hasData = !!semesterData

                    return (
                      <TabsTrigger
                        key={sem}
                        value={`sem${sem}`}
                        className="flex flex-col gap-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        disabled={!hasData}
                      >
                        <span className="font-medium">Sem {sem}</span>
                        <div className="flex items-center gap-1">
                          {hasData && (
                            <div
                              className={`w-2 h-2 rounded-full ${
                                semesterData.subjects.some((s) => s.status === "Pending")
                                  ? "bg-red-500"
                                  : "bg-green-500"
                              }`}
                            />
                          )}
                        </div>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
                  const semesterData = semesterArrears.find((s) => s.semester === sem)

                  return (
                    <TabsContent key={sem} value={`sem${sem}`} className="p-6">
                      {semesterData ? (
                        <div className="space-y-6">
                          {/* Semester Header */}
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-800">Semester {sem} Arrears</h3>
                              <p className="text-slate-600">
                                {semesterData.subjects.length} subject{semesterData.subjects.length !== 1 ? "s" : ""} •
                                {semesterData.subjects.reduce((acc, s) => acc + s.credits, 0)} credits
                              </p>
                            </div>
                            <Badge
                              variant={semesterData.status === "Current" ? "default" : "secondary"}
                              className="px-3 py-1"
                            >
                              {semesterData.status}
                            </Badge>
                          </div>

                          {/* Semester Summary */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-600" />
                                  <div>
                                    <div className="text-lg font-bold text-red-700">
                                      {semesterData.subjects.filter((s) => s.status === "Pending").length}
                                    </div>
                                    <div className="text-xs text-red-600">Pending</div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <div>
                                    <div className="text-lg font-bold text-green-700">
                                      {semesterData.subjects.filter((s) => s.status === "Cleared").length}
                                    </div>
                                    <div className="text-xs text-green-600">Cleared</div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-blue-600" />
                                  <div>
                                    <div className="text-lg font-bold text-blue-700">
                                      {semesterData.subjects.reduce((acc, s) => acc + s.credits, 0)}
                                    </div>
                                    <div className="text-xs text-blue-600">Total Credits</div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <Target className="h-4 w-4 text-purple-600" />
                                  <div>
                                    <div className="text-lg font-bold text-purple-700">
                                      {Math.round(
                                        (semesterData.subjects.filter((s) => s.status === "Cleared").length /
                                          semesterData.subjects.length) *
                                          100,
                                      )}
                                      %
                                    </div>
                                    <div className="text-xs text-purple-600">Clear Rate</div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Subject List - Table Design */}
                          <div className="space-y-3">
                            {semesterData.subjects.map((subject, index) => (
                              <motion.div
                                key={`${subject.subjectCode}-${sem}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-slate-200">
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4 flex-1">
                                        <div
                                          className={`w-3 h-3 rounded-full ${
                                            subject.status === "Pending" ? "bg-red-500" : "bg-green-500"
                                          }`}
                                        />

                                        <div className="flex-1">
                                          <div className="flex items-start justify-between">
                                            <div>
                                              <h4 className="font-semibold text-slate-800 text-lg">
                                                {subject.subjectName}
                                              </h4>
                                              <p className="text-sm text-slate-600 mt-1">
                                                {subject.subjectCode} • {subject.credits} Credits • {subject.attempts}{" "}
                                                attempt{subject.attempts !== 1 ? "s" : ""}
                                              </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                              <Badge
                                                variant={subject.status === "Pending" ? "destructive" : "secondary"}
                                                className={`${subject.status === "Cleared" ? "bg-green-100 text-green-800 border-green-300" : ""} px-3 py-1`}
                                              >
                                                {subject.status}
                                              </Badge>

                                              {subject.status === "Cleared" && subject.grade && (
                                                <Badge
                                                  className={`${getGradeColor(subject.grade)} font-semibold px-3 py-1`}
                                                >
                                                  {subject.grade}
                                                </Badge>
                                              )}
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-6 mt-3 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                              <Calendar className="h-3 w-3" />
                                              {subject.status === "Pending" ? "Next Exam" : "Cleared"}:{" "}
                                              {new Date(subject.examDate).toLocaleDateString()}
                                            </span>

                                            {subject.status === "Cleared" && subject.clearedInSemester && (
                                              <span className="flex items-center gap-1">
                                                <CheckCircle className="h-3 w-3" />
                                                Cleared in Semester {subject.clearedInSemester}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-slate-600 mb-2">No Arrears in Semester {sem}</h3>
                          <p className="text-slate-500">Great job! You have no arrear subjects in this semester.</p>
                        </div>
                      )}
                    </TabsContent>
                  )
                })}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-slate-600 mb-3">Excellent Academic Record!</h3>
              <p className="text-slate-500 text-lg">
                Congratulations! You have no arrear subjects across all semesters. Keep up the outstanding work!
              </p>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 font-medium">Perfect Academic Journey</p>
                <p className="text-green-600 text-sm mt-1">You've successfully cleared all subjects on time!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
