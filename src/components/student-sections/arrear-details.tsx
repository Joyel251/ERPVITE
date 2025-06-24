

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { AlertTriangle, CheckCircle, Calendar, BookOpen, FileText } from "lucide-react"

interface ArrearDetailsProps {
  registrationNumber: string
}

export default function ArrearDetails({ registrationNumber }: ArrearDetailsProps) {
  // Mock arrear data - most students won't have arrears
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1
  const hasArrears = studentNumber % 7 === 0 // Only some students have arrears

  const arrearDetails = hasArrears
    ? [
        {
          semester: 2,
          subjectCode: "MA102",
          subjectName: "Engineering Mathematics II",
          credits: 4,
          examDate: "2024-08-15",
          status: "Pending" as const,
          attempts: 1,
        },
        {
          semester: 1,
          subjectCode: "PH101",
          subjectName: "Engineering Physics",
          credits: 3,
          examDate: "2024-07-20",
          status: "Cleared" as const,
          attempts: 2,
        },
      ]
    : []

  const pendingArrears = arrearDetails.filter((arrear) => arrear.status === "Pending")
  const clearedArrears = arrearDetails.filter((arrear) => arrear.status === "Cleared")

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Arrear Details</h1>
            <p className="text-slate-600 mt-1">Track your pending and cleared arrear subjects</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${pendingArrears.length > 0 ? "text-red-600" : "text-green-600"}`}>
              {pendingArrears.length}
            </div>
            <div className="text-sm text-slate-500">Pending Arrears</div>
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
                <div className="p-2 rounded-lg bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{pendingArrears.length}</div>
                  <div className="text-sm text-slate-600">Pending</div>
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
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{clearedArrears.length}</div>
                  <div className="text-sm text-slate-600">Cleared</div>
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
                <div className="p-2 rounded-lg bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{arrearDetails.length}</div>
                  <div className="text-sm text-slate-600">Total Arrears</div>
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
                <div className="p-2 rounded-lg bg-purple-50">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {pendingArrears.reduce((acc, arrear) => acc + arrear.credits, 0)}
                  </div>
                  <div className="text-sm text-slate-600">Pending Credits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Arrear Details */}
      {arrearDetails.length > 0 ? (
        <div className="space-y-6">
          {/* Pending Arrears */}
          {pendingArrears.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Pending Arrears
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingArrears.map((arrear, index) => (
                      <motion.div
                        key={`${arrear.subjectCode}-${arrear.semester}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-red-200 bg-red-50/50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-red-100">
                              <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 mb-1">{arrear.subjectName}</h3>
                              <p className="text-sm text-slate-600 mb-2">
                                {arrear.subjectCode} • Semester {arrear.semester} • {arrear.credits} Credits
                              </p>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Exam: {new Date(arrear.examDate).toLocaleDateString()}
                                </span>
                                <span>Attempts: {arrear.attempts}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="destructive">Pending</Badge>
                            <Button variant="outline" size="sm">
                              Register for Exam
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Cleared Arrears */}
          {clearedArrears.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Cleared Arrears
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clearedArrears.map((arrear, index) => (
                      <motion.div
                        key={`${arrear.subjectCode}-${arrear.semester}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-green-200 bg-green-50/50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-green-100">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 mb-1">{arrear.subjectName}</h3>
                              <p className="text-sm text-slate-600 mb-2">
                                {arrear.subjectCode} • Semester {arrear.semester} • {arrear.credits} Credits
                              </p>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Cleared: {new Date(arrear.examDate).toLocaleDateString()}
                                </span>
                                <span>Attempts: {arrear.attempts}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Cleared
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No Arrears!</h3>
              <p className="text-slate-500">
                Congratulations! You have no pending or cleared arrear subjects. Keep up the excellent work!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
