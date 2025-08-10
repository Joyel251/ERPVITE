"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card'
import { Progress } from '../../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { Badge } from '../../ui/badge'
import { FileText, TrendingUp, Award, Upload, Calculator,BookOpen, } from "lucide-react"
import { getInternalMarksEnhanced } from '../../lib/student-data'
import type { InternalAssessmentData } from '../../lib/student-data'
interface InternalMarksProps {
  registrationNumber: string
}

export default function InternalMarks({ registrationNumber }: InternalMarksProps) {
  const [, setSelectedSubject] = useState<string | null>(null)
  const internalData: InternalAssessmentData = getInternalMarksEnhanced(registrationNumber)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Internal Assessment Marks</CardTitle>
                <CardDescription className="text-purple-100">
                  Comprehensive view of your internal assessment performance
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Calculation Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Assessment Calculation Method</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Per Upload Calculation:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Concept Test:</span>
                    <span className="font-medium">Out of 30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CAT (Continuous Assessment):</span>
                    <span className="font-medium">Out of 60</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Test Total:</span>
                    <span className="font-medium">Out of 90</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Test Converted:</span>
                    <span className="font-medium">Out of 75 (90 → 75)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assignment:</span>
                    <span className="font-medium">Out of 25</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Upload Total:</span>
                    <span>Out of 100</span>
                  </div>
                  <div className="flex justify-between text-blue-600 font-semibold">
                    <span>Final Marks per Upload:</span>
                    <span>Out of 25 (100 → 25)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Final Assessment:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Upload 1 Final:</span>
                    <span className="font-medium">Out of 25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upload 2 Final:</span>
                    <span className="font-medium">Out of 25</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold text-green-600">
                    <span>Total Internal Assessment:</span>
                    <span>Out of 50</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Overall Average:</strong> {internalData.overallAverage.toFixed(2)}/50
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Assessment Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="detailed" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Detailed View</span>
            </TabsTrigger>
            <TabsTrigger value="uploads" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Wise</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {internalData.subjects.map((subject, index) => (
                <motion.div
                  key={subject.subjectCode}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedSubject(subject.subjectCode)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold">{subject.subject}</CardTitle>
                          <CardDescription className="text-sm">{subject.subjectCode}</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {subject.finalMarks.toFixed(1)}/50
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Final Marks</span>
                          <span className="font-semibold">{subject.finalMarks.toFixed(2)}/50</span>
                        </div>
                        <Progress value={(subject.finalMarks / 50) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <div className="space-y-4">
              {internalData.subjects.map((subject, index) => (
                <motion.div
                  key={subject.subjectCode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{subject.subject}</CardTitle>
                          <CardDescription>{subject.subjectCode}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{subject.finalMarks.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">out of 50</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Upload 1 */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-green-600 flex items-center space-x-2">
                            <Upload className="w-4 h-4" />
                            <span>Upload 1</span>
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Concept Test:</span>
                              <span>{subject.upload1.conceptTest}/30</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CAT:</span>
                              <span>{subject.upload1.cat}/60</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span>Test Total:</span>
                              <span>{subject.upload1.testTotal}/90</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Test Converted:</span>
                              <span>{subject.upload1.testConverted.toFixed(2)}/75</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Assignment:</span>
                              <span>{subject.upload1.assignment}/25</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span>Upload Total:</span>
                              <span>{subject.upload1.uploadTotal.toFixed(2)}/100</span>
                            </div>
                            <div className="flex justify-between font-semibold text-green-600 border-t pt-2">
                              <span>Final Marks:</span>
                              <span>{subject.upload1.finalMarks.toFixed(2)}/25</span>
                            </div>
                          </div>
                        </div>

                        {/* Upload 2 */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-purple-600 flex items-center space-x-2">
                            <Upload className="w-4 h-4" />
                            <span>Upload 2</span>
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Concept Test:</span>
                              <span>{subject.upload2.conceptTest}/30</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CAT:</span>
                              <span>{subject.upload2.cat}/60</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span>Test Total:</span>
                              <span>{subject.upload2.testTotal}/90</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Test Converted:</span>
                              <span>{subject.upload2.testConverted.toFixed(2)}/75</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Assignment:</span>
                              <span>{subject.upload2.assignment}/25</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span>Upload Total:</span>
                              <span>{subject.upload2.uploadTotal.toFixed(2)}/100</span>
                            </div>
                            <div className="flex justify-between font-semibold text-purple-600 border-t pt-2">
                              <span>Final Marks:</span>
                              <span>{subject.upload2.finalMarks.toFixed(2)}/25</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="uploads" className="space-y-6">
            <Tabs defaultValue="upload1" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload1">Upload 1</TabsTrigger>
                <TabsTrigger value="upload2">Upload 2</TabsTrigger>
              </TabsList>

              <TabsContent value="upload1" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {internalData.subjects.map((subject, index) => (
                    <motion.div
                      key={`upload1-${subject.subjectCode}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border-green-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{subject.subject}</CardTitle>
                          <CardDescription>{subject.subjectCode}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Concept Test:</span>
                              <span className="font-medium">{subject.upload1.conceptTest}/30</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CAT:</span>
                              <span className="font-medium">{subject.upload1.cat}/60</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Assignment:</span>
                              <span className="font-medium">{subject.upload1.assignment}/25</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-semibold text-green-600">
                              <span>Final:</span>
                              <span>{subject.upload1.finalMarks.toFixed(2)}/25</span>
                            </div>
                          </div>
                          <Progress value={(subject.upload1.finalMarks / 25) * 100} className="mt-3 h-2" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upload2" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {internalData.subjects.map((subject, index) => (
                    <motion.div
                      key={`upload2-${subject.subjectCode}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border-purple-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{subject.subject}</CardTitle>
                          <CardDescription>{subject.subjectCode}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Concept Test:</span>
                              <span className="font-medium">{subject.upload2.conceptTest}/30</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CAT:</span>
                              <span className="font-medium">{subject.upload2.cat}/60</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Assignment:</span>
                              <span className="font-medium">{subject.upload2.assignment}/25</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-semibold text-purple-600">
                              <span>Final:</span>
                              <span>{subject.upload2.finalMarks.toFixed(2)}/25</span>
                            </div>
                          </div>
                          <Progress value={(subject.upload2.finalMarks / 25) * 100} className="mt-3 h-2" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-blue-800">Assessment Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{internalData.subjects.length}</div>
                <div className="text-sm text-gray-600">Total Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{internalData.overallAverage.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Average Marks (out of 50)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
