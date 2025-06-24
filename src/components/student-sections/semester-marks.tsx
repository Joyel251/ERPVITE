

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import { BarChart3, TrendingUp, Award, GraduationCap } from "lucide-react"

interface SemesterMarksProps {
  registrationNumber: string
}

export default function SemesterMarks({ }: SemesterMarksProps) {
  // Mock semester marks data
  const semesterMarks = [
    {
      semester: 1,
      subjects: [
        {
          code: "CS101",
          name: "Programming Fundamentals",
          credits: 4,
          internalMarks: 45,
          externalMarks: 78,
          totalMarks: 123,
          grade: "A",
          gradePoints: 9,
        },
        {
          code: "MA101",
          name: "Engineering Mathematics I",
          credits: 4,
          internalMarks: 42,
          externalMarks: 72,
          totalMarks: 114,
          grade: "B+",
          gradePoints: 8,
        },
        {
          code: "PH101",
          name: "Engineering Physics",
          credits: 3,
          internalMarks: 38,
          externalMarks: 68,
          totalMarks: 106,
          grade: "B",
          gradePoints: 7,
        },
        {
          code: "CH101",
          name: "Engineering Chemistry",
          credits: 3,
          internalMarks: 44,
          externalMarks: 76,
          totalMarks: 120,
          grade: "A",
          gradePoints: 9,
        },
        {
          code: "EG101",
          name: "Engineering Graphics",
          credits: 2,
          internalMarks: 46,
          externalMarks: 82,
          totalMarks: 128,
          grade: "A+",
          gradePoints: 10,
        },
      ],
      sgpa: 8.2,
      cgpa: 8.2,
    },
    {
      semester: 2,
      subjects: [
        {
          code: "CS102",
          name: "Data Structures",
          credits: 4,
          internalMarks: 47,
          externalMarks: 81,
          totalMarks: 128,
          grade: "A+",
          gradePoints: 10,
        },
        {
          code: "MA102",
          name: "Engineering Mathematics II",
          credits: 4,
          internalMarks: 40,
          externalMarks: 70,
          totalMarks: 110,
          grade: "B+",
          gradePoints: 8,
        },
        {
          code: "EC101",
          name: "Basic Electronics",
          credits: 3,
          internalMarks: 43,
          externalMarks: 75,
          totalMarks: 118,
          grade: "A",
          gradePoints: 9,
        },
        {
          code: "ME101",
          name: "Engineering Mechanics",
          credits: 3,
          internalMarks: 41,
          externalMarks: 73,
          totalMarks: 114,
          grade: "B+",
          gradePoints: 8,
        },
        {
          code: "CS103",
          name: "Programming Lab",
          credits: 2,
          internalMarks: 48,
          externalMarks: 85,
          totalMarks: 133,
          grade: "A+",
          gradePoints: 10,
        },
      ],
      sgpa: 8.7,
      cgpa: 8.45,
    },
  ]

  const currentSemester = Math.max(...semesterMarks.map((s) => s.semester))
  const latestCGPA = semesterMarks[semesterMarks.length - 1]?.cgpa || 0
  const totalCredits = semesterMarks.reduce(
    (acc, sem) => acc + sem.subjects.reduce((subAcc, sub) => subAcc + sub.credits, 0),
    0,
  )

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800"
      case "A":
        return "bg-blue-100 text-blue-800"
      case "B+":
        return "bg-yellow-100 text-yellow-800"
      case "B":
        return "bg-orange-100 text-orange-800"
      case "C":
        return "bg-red-100 text-red-800"
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
            <h1 className="text-3xl font-bold text-slate-800">Semester Marks</h1>
            <p className="text-slate-600 mt-1">Your academic performance across all semesters</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{latestCGPA.toFixed(2)}</div>
            <div className="text-sm text-slate-500">Current CGPA</div>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{currentSemester}</div>
                  <div className="text-sm text-slate-600">Current Semester</div>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{latestCGPA.toFixed(2)}</div>
                  <div className="text-sm text-slate-600">CGPA</div>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{totalCredits}</div>
                  <div className="text-sm text-slate-600">Total Credits</div>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Award className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {semesterMarks.reduce(
                      (acc, sem) => acc + sem.subjects.filter((sub) => sub.grade === "A+" || sub.grade === "A").length,
                      0,
                    )}
                  </div>
                  <div className="text-sm text-slate-600">A Grades</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Semester-wise Results */}
      <div className="space-y-6">
        {semesterMarks.map((semester, semIndex) => (
          <motion.div
            key={semester.semester}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + semIndex * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Semester {semester.semester}</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-slate-500">SGPA</div>
                      <div className="text-lg font-bold text-blue-600">{semester.sgpa}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">CGPA</div>
                      <div className="text-lg font-bold text-green-600">{semester.cgpa}</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {semester.subjects.map((subject, subIndex) => (
                    <motion.div
                      key={subject.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: subIndex * 0.05 }}
                      className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-800">{subject.name}</h3>
                          <p className="text-sm text-slate-600">
                            {subject.code} • {subject.credits} Credits
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-lg font-bold text-slate-800">{subject.totalMarks}/150</div>
                            <div className="text-sm text-slate-500">Total Marks</div>
                          </div>
                          <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{subject.internalMarks}/50</div>
                          <div className="text-xs text-slate-500">Internal</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{subject.externalMarks}/100</div>
                          <div className="text-xs text-slate-500">External</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-purple-600">{subject.gradePoints}/10</div>
                          <div className="text-xs text-slate-500">Grade Points</div>
                        </div>
                      </div>

                      <Progress value={(subject.totalMarks / 150) * 100} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
