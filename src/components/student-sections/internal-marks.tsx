

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import { FileText, TrendingUp, Award, AlertCircle } from "lucide-react"
import { getInternalMarks } from "../../lib/student-data"

interface InternalMarksProps {
  registrationNumber: string
}

export default function InternalMarks({ registrationNumber }: InternalMarksProps) {
  const internalMarks = getInternalMarks(registrationNumber)
  const averagePercentage = internalMarks.reduce((acc, mark) => acc + mark.percentage, 0) / internalMarks.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Internal Marks</h1>
            <p className="text-slate-600 mt-1">View your test scores and assignment marks</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{averagePercentage.toFixed(1)}%</div>
            <div className="text-sm text-slate-500">Overall Average</div>
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
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{internalMarks.length}</div>
                  <div className="text-sm text-slate-600">Total Subjects</div>
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
                  <div className="text-2xl font-bold text-slate-800">
                    {internalMarks.filter((m) => m.percentage >= 80).length}
                  </div>
                  <div className="text-sm text-slate-600">Above 80%</div>
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
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {Math.max(...internalMarks.map((m) => m.percentage)).toFixed(1)}%
                  </div>
                  <div className="text-sm text-slate-600">Highest Score</div>
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
                <div className="p-2 rounded-lg bg-red-50">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {internalMarks.filter((m) => m.percentage < 60).length}
                  </div>
                  <div className="text-sm text-slate-600">Below 60%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Marks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Internal Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {internalMarks.map((mark, index) => (
                <motion.div
                  key={mark.subjectCode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-800">{mark.subject}</h3>
                      <p className="text-sm text-slate-600">{mark.subjectCode}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-800">
                        {mark.total}/{mark.maxMarks}
                      </div>
                      <Badge
                        variant={
                          mark.percentage >= 80 ? "default" : mark.percentage >= 60 ? "secondary" : "destructive"
                        }
                      >
                        {mark.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{mark.test1}/20</div>
                      <div className="text-xs text-slate-500">Test 1</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{mark.test2}/20</div>
                      <div className="text-xs text-slate-500">Test 2</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">{mark.assignment}/10</div>
                      <div className="text-xs text-slate-500">Assignment</div>
                    </div>
                  </div>

                  <Progress value={mark.percentage} className="h-2" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
