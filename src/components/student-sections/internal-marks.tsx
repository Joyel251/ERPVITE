"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Progress } from '../../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { FileText, TrendingUp, Award, AlertCircle, Upload, Calculator, Target, BookOpen, BarChart3 } from "lucide-react"
import { getInternalMarksEnhanced } from '../../lib/student-data'

interface InternalMarksProps {
  registrationNumber: string
}

export default function InternalMarks({ registrationNumber }: InternalMarksProps) {
  const internalData = getInternalMarksEnhanced(registrationNumber)
  const finalAverage =
    internalData.subjects.reduce((acc : any, subject : any ) => acc + subject.finalMarks, 0) / internalData.subjects.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <motion.div
                className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
                animate={{
                  boxShadow: [
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    "0 10px 15px -3px rgba(59, 130, 246, 0.4)",
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <FileText className="h-6 w-6 text-white" />
              </motion.div>
              Internal Assessment
            </h1>
            <p className="text-slate-600 mt-1">Upload-wise test scores and continuous assessment marks</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{finalAverage.toFixed(1)}/50</div>
            <div className="text-sm text-slate-500">Final Average</div>
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
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{internalData.subjects.length}</div>
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
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {internalData.subjects.filter((s : any) => s.finalMarks >= 40).length}
                  </div>
                  <div className="text-sm text-slate-600">Above 40/50</div>
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
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {Math.max(...internalData.subjects.map((s : any) => s.finalMarks)).toFixed(1)}
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
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {internalData.subjects.filter((s : any) => s.finalMarks < 30).length}
                  </div>
                  <div className="text-sm text-slate-600">Below 30/50</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Calculation Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Calculator className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">Assessment Calculation Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div className="space-y-2">
                    <p>
                      <strong>Each Upload (per subject):</strong>
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Concept Test: 30 marks</li>
                      <li>• CAT: 60 marks</li>
                      <li>
                        • <strong>Test Total: 90 marks → converted to 75 marks</strong>
                      </li>
                      <li>• Assignment: 25 marks (added as is)</li>
                      <li>
                        • <strong>Upload Total: 100 marks → converted to 25 marks</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>Final Calculation:</strong>
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Upload 1: 25 marks</li>
                      <li>• Upload 2: 25 marks</li>
                      <li>
                        • <strong>Final Internal: 50 marks</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs for Upload 1 and Upload 2 */}
      <Tabs defaultValue="upload1" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="upload1" className="flex items-center gap-2 rounded-lg">
            <Upload className="h-4 w-4" />
            Upload 1
          </TabsTrigger>
          <TabsTrigger value="upload2" className="flex items-center gap-2 rounded-lg">
            <Upload className="h-4 w-4" />
            Upload 2
          </TabsTrigger>
          <TabsTrigger value="final" className="flex items-center gap-2 rounded-lg">
            <BarChart3 className="h-4 w-4" />
            Final Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload1" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Upload 1 Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {internalData.subjects.map((subject : any, index : any) => (
                    <motion.div
                      key={subject.subjectCode}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 rounded-xl border hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-slate-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-800">{subject.subject}</h3>
                          <p className="text-sm text-slate-600">{subject.subjectCode}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {subject.upload1.finalMarks.toFixed(1)}/25
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-lg font-semibold text-green-600">{subject.upload1.conceptTest}/30</div>
                          <div className="text-xs text-green-600 font-medium">Concept Test 1</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-lg font-semibold text-blue-600">{subject.upload1.cat}/60</div>
                          <div className="text-xs text-blue-600 font-medium">CAT 1</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="text-lg font-semibold text-orange-600">
                            {subject.upload1.testConverted.toFixed(1)}/75
                          </div>
                          <div className="text-xs text-orange-600 font-medium">Test Total</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-lg font-semibold text-purple-600">{subject.upload1.assignment}/25</div>
                          <div className="text-xs text-purple-600 font-medium">Assignment 1</div>
                        </div>
                        <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="text-lg font-semibold text-indigo-600">
                            {subject.upload1.uploadTotal.toFixed(1)}/100
                          </div>
                          <div className="text-xs text-indigo-600 font-medium">Upload Total</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Upload 1 Progress</span>
                          <span className="text-slate-800 font-medium">{subject.upload1.finalMarks.toFixed(1)}/25</span>
                        </div>
                        <Progress value={(subject.upload1.finalMarks / 25) * 100} className="h-3" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="upload2" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-600" />
                  Upload 2 Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {internalData.subjects.map((subject : any, index : any) => (
                    <motion.div
                      key={subject.subjectCode}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 rounded-xl border hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-slate-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-800">{subject.subject}</h3>
                          <p className="text-sm text-slate-600">{subject.subjectCode}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {subject.upload2.finalMarks.toFixed(1)}/25
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-lg font-semibold text-green-600">{subject.upload2.conceptTest}/30</div>
                          <div className="text-xs text-green-600 font-medium">Concept Test 2</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-lg font-semibold text-blue-600">{subject.upload2.cat}/60</div>
                          <div className="text-xs text-blue-600 font-medium">CAT 2</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="text-lg font-semibold text-orange-600">
                            {subject.upload2.testConverted.toFixed(1)}/75
                          </div>
                          <div className="text-xs text-orange-600 font-medium">Test Total</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-lg font-semibold text-purple-600">{subject.upload2.assignment}/25</div>
                          <div className="text-xs text-purple-600 font-medium">Assignment 2</div>
                        </div>
                        <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="text-lg font-semibold text-indigo-600">
                            {subject.upload2.uploadTotal.toFixed(1)}/100
                          </div>
                          <div className="text-xs text-indigo-600 font-medium">Upload Total</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Upload 2 Progress</span>
                          <span className="text-slate-800 font-medium">{subject.upload2.finalMarks.toFixed(1)}/25</span>
                        </div>
                        <Progress value={(subject.upload2.finalMarks / 25) * 100} className="h-3" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="final" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Final Internal Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {internalData.subjects.map((subject : any , index : any) => (
                    <motion.div
                      key={subject.subjectCode}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 rounded-xl border hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-purple-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-800">{subject.subject}</h3>
                          <p className="text-sm text-slate-600">{subject.subjectCode}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">{subject.finalMarks.toFixed(1)}/50</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-xl font-semibold text-blue-600">
                            {subject.upload1.finalMarks.toFixed(1)}
                          </div>
                          <div className="text-sm text-blue-600 font-medium">Upload 1</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-xl font-semibold text-green-600">
                            {subject.upload2.finalMarks.toFixed(1)}
                          </div>
                          <div className="text-sm text-green-600 font-medium">Upload 2</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-xl font-semibold text-purple-600">{subject.finalMarks.toFixed(1)}</div>
                          <div className="text-sm text-purple-600 font-medium">Final Total</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Overall Performance</span>
                          <span className="text-slate-800 font-medium">{subject.finalMarks.toFixed(1)}/50</span>
                        </div>
                        <Progress value={(subject.finalMarks / 50) * 100} className="h-3" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
