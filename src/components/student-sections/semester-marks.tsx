"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { Progress } from '../../ui/progress'
import { BarChart3, TrendingUp, Award, GraduationCap, BookOpen, Star, Trophy, Target } from "lucide-react"

interface SemesterMarksProps {
  registrationNumber: string
}

export default function SemesterMarks({}: SemesterMarksProps) {
  // Mock semester marks data - enhanced with more realistic data
  const semesterMarks = [
    {
      semester: 1,
      subjects: [
        {
          code: "CS101",
          name: "Programming Fundamentals",
          credits: 4,
          grade: "A",
        },
        {
          code: "MA101",
          name: "Engineering Mathematics I",
          credits: 4,
          grade: "B+",
        },
        {
          code: "PH101",
          name: "Engineering Physics",
          credits: 3,
          grade: "B",
        },
        {
          code: "CH101",
          name: "Engineering Chemistry",
          credits: 3,
          grade: "A",
        },
        {
          code: "EG101",
          name: "Engineering Graphics",
          credits: 2,
          grade: "A+",
        },
        {
          code: "EN101",
          name: "Technical English",
          credits: 3,
          grade: "A",
        },
      ],
      gpa: 8.2,
      cgpa: 8.2,
      status: "Completed",
    },
    {
      semester: 2,
      subjects: [
        {
          code: "CS102",
          name: "Data Structures",
          credits: 4,
          grade: "A+",
        },
        {
          code: "MA102",
          name: "Engineering Mathematics II",
          credits: 4,
          grade: "B+",
        },
        {
          code: "EC101",
          name: "Basic Electronics",
          credits: 3,
          grade: "A",
        },
        {
          code: "ME101",
          name: "Engineering Mechanics",
          credits: 3,
          grade: "B+",
        },
        {
          code: "CS103",
          name: "Programming Lab",
          credits: 2,
          grade: "A+",
        },
        {
          code: "EN102",
          name: "Communication Skills",
          credits: 2,
          grade: "A",
        },
      ],
      gpa: 8.7,
      cgpa: 8.45,
      status: "Completed",
    },
    {
      semester: 3,
      subjects: [
        {
          code: "CS201",
          name: "Object Oriented Programming",
          credits: 4,
          grade: "A+",
        },
        {
          code: "CS202",
          name: "Computer Organization",
          credits: 4,
          grade: "A",
        },
        {
          code: "MA201",
          name: "Discrete Mathematics",
          credits: 4,
          grade: "B+",
        },
        {
          code: "CS203",
          name: "Database Systems",
          credits: 3,
          grade: "A",
        },
        {
          code: "CS204",
          name: "Web Technologies",
          credits: 3,
          grade: "A+",
        },
      ],
      gpa: 9.1,
      cgpa: 8.6,
      status: "Current",
    },
    {
      semester: 4,
      subjects: [
        {
          code: "CS301",
          name: "Operating Systems",
          credits: 4,
          grade: "-",
        },
        {
          code: "CS302",
          name: "Computer Networks",
          credits: 4,
          grade: "-",
        },
        {
          code: "CS303",
          name: "Software Engineering",
          credits: 3,
          grade: "-",
        },
        {
          code: "CS304",
          name: "Algorithm Design",
          credits: 4,
          grade: "-",
        },
        {
          code: "CS305",
          name: "Machine Learning",
          credits: 3,
          grade: "-",
        },
      ],
      gpa: 0,
      cgpa: 8.6,
      status: "Upcoming",
    },
  ]

  const completedSemesters = semesterMarks.filter((sem) => sem.status === "Completed")
  const currentSemester = semesterMarks.find((sem) => sem.status === "Current")
  const latestCGPA = currentSemester?.cgpa || completedSemesters[completedSemesters.length - 1]?.cgpa || 0
  const totalCreditsCompleted = completedSemesters.reduce(
    (acc, sem) => acc + sem.subjects.reduce((subAcc, sub) => subAcc + sub.credits, 0),
    0,
  )
  const totalAGrades = completedSemesters.reduce(
    (acc, sem) => acc + sem.subjects.filter((sub) => sub.grade === "A+" || sub.grade === "A").length,
    0,
  )

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
      case "-":
        return "bg-slate-200 text-slate-500"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Current":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Upcoming":
        return "bg-slate-100 text-slate-600 border-slate-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getGPAProgress = (gpa: number) => (gpa / 10) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Academic Performance
            </h1>
            <p className="text-slate-600 mt-1">Your semester-wise academic results and grade point averages</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              {latestCGPA.toFixed(2)}
            </div>
            <div className="text-sm text-slate-500 font-medium">Current CGPA</div>
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
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {completedSemesters.length + (currentSemester ? 1 : 0)}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Semesters</div>
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
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{latestCGPA.toFixed(2)}</div>
                  <div className="text-sm text-slate-600 font-medium">CGPA</div>
                  <Progress value={getGPAProgress(latestCGPA)} className="h-1 mt-1" />
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
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{totalCreditsCompleted}</div>
                  <div className="text-sm text-slate-600 font-medium">Credits Earned</div>
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
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{totalAGrades}</div>
                  <div className="text-sm text-slate-600 font-medium">A Grades</div>
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
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              Semester-wise Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sem1" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-100 p-1 rounded-xl">
                {semesterMarks.map((semester) => (
                  <TabsTrigger
                    key={semester.semester}
                    value={`sem${semester.semester}`}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg font-medium transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <span>Semester {semester.semester}</span>
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(semester.status)}`}>
                        {semester.status}
                      </Badge>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {semesterMarks.map((semester) => (
                <TabsContent key={semester.semester} value={`sem${semester.semester}`} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Semester Header */}
                    <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Semester {semester.semester}</h3>
                        <p className="text-slate-600 text-sm">
                          {semester.subjects.length} subjects •{" "}
                          {semester.subjects.reduce((acc, sub) => acc + sub.credits, 0)} credits
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        {semester.status !== "Upcoming" && (
                          <>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{semester.gpa.toFixed(2)}</div>
                              <div className="text-xs text-slate-500 font-medium">GPA</div>
                              <Progress value={getGPAProgress(semester.gpa)} className="h-1 mt-1 w-16" />
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{semester.cgpa.toFixed(2)}</div>
                              <div className="text-xs text-slate-500 font-medium">CGPA</div>
                              <Progress value={getGPAProgress(semester.cgpa)} className="h-1 mt-1 w-16" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Subjects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {semester.subjects.map((subject, subIndex) => (
                        <motion.div
                          key={subject.code}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: subIndex * 0.05 }}
                        >
                          <Card className="relative overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-300" />
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-1">
                                    {subject.name}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className="font-medium">{subject.code}</span>
                                    <span>•</span>
                                    <span>{subject.credits} Credits</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge
                                    className={`text-sm font-bold px-4 py-2 ${getGradeColor(subject.grade)} shadow-sm`}
                                  >
                                    {subject.grade}
                                  </Badge>
                                </div>
                              </div>

                              {/* Subject Status Indicator */}
                              <div className="mt-3 flex items-center gap-2">
                                {subject.grade === "A+" || subject.grade === "A" ? (
                                  <div className="flex items-center gap-1 text-green-600">
                                    <Star className="h-3 w-3 fill-current" />
                                    <span className="text-xs font-medium">Excellent</span>
                                  </div>
                                ) : subject.grade === "B+" || subject.grade === "B" ? (
                                  <div className="flex items-center gap-1 text-blue-600">
                                    <Trophy className="h-3 w-3" />
                                    <span className="text-xs font-medium">Good</span>
                                  </div>
                                ) : subject.grade === "-" ? (
                                  <div className="flex items-center gap-1 text-slate-500">
                                    <Target className="h-3 w-3" />
                                    <span className="text-xs font-medium">Pending</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-orange-600">
                                    <Target className="h-3 w-3" />
                                    <span className="text-xs font-medium">Average</span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Semester Summary */}
                    {semester.status !== "Upcoming" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600">{semester.subjects.length}</div>
                            <div className="text-xs text-slate-600">Subjects</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">
                              {semester.subjects.reduce((acc, sub) => acc + sub.credits, 0)}
                            </div>
                            <div className="text-xs text-slate-600">Credits</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">
                              {semester.subjects.filter((sub) => sub.grade === "A+" || sub.grade === "A").length}
                            </div>
                            <div className="text-xs text-slate-600">A Grades</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-amber-600">
                              {
                                semester.subjects.filter(
                                  (sub) => sub.grade === "A+" || sub.grade === "A" || sub.grade === "B+",
                                ).length
                              }
                            </div>
                            <div className="text-xs text-slate-600">High Performers</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
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
