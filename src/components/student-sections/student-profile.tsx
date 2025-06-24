

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Badge } from "../../ui/badge"
import { Separator } from "../../ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  Heart,
  Home,
  Briefcase,
  DollarSign,
  Globe,
  UserCheck,
  Star,
  Award,
  Building,
  AlertCircle,
  BookOpen,
  Trophy,
  Target,
  School,
} from "lucide-react"
import type { Student } from '../../lib/student-data'

interface StudentProfileProps {
  student: Student
}

export default function StudentProfile({ student }: StudentProfileProps) {
  const personalInfo = [
    { label: "Full Name", value: student.name, icon: User, color: "blue" },
    { label: "Roll Number", value: student.rollNumber, icon: GraduationCap, color: "green" },
    { label: "Registration Number", value: student.registrationNumber, icon: GraduationCap, color: "green" },
    { label: "Mode of Admission", value: student.mode, icon: School, color: "purple" },
    { label: "Branch", value: student.department, icon: Building, color: "indigo" },
    { label: "Email ID of Student", value: student.studentEmail, icon: Mail, color: "blue" },
    { label: "Mobile No of Student", value: student.studentContactNo, icon: Phone, color: "green" },
    {
      label: "Date of Birth",
      value: new Date(student.dateOfBirth).toLocaleDateString(),
      icon: Calendar,
      color: "purple",
    },
    { label: "HSC Total Marks", value: student.totalMarks, icon: Target, color: "orange" },
    { label: "HSC Overall Percentage", value: student.overallPercentage, icon: Award, color: "yellow" },
    { label: "HSC Cut-off Marks", value: student.cutoffMarks, icon: Star, color: "pink" },
    {
      label: "Date of Joining",
      value: new Date(student.dateOfJoining).toLocaleDateString(),
      icon: Calendar,
      color: "cyan",
    },
    {
      label: "Day Scholar/Hosteller",
      value: student.hosteller === "Yes" ? "Hosteller" : "Day Scholar",
      icon: Home,
      color: "indigo",
    },
    { label: "Management/Counseling", value: student.managementCounseling, icon: BookOpen, color: "teal" },
    { label: "First Graduate (Y/N)", value: student.firstGraduate, icon: Trophy, color: "yellow" },
    { label: "State", value: student.state, icon: MapPin, color: "red" },
    { label: "Religion", value: student.religion, icon: Globe, color: "indigo" },
    { label: "Community", value: student.community, icon: Users, color: "orange" },
    { label: "Sub Caste", value: student.subCaste, icon: Users, color: "purple" },
    { label: "Sex", value: student.gender, icon: UserCheck, color: "pink" },
    { label: "Blood Group", value: student.bloodGroup, icon: Heart, color: "red" },
    { label: "Mother Tongue", value: student.motherTongue, icon: Globe, color: "blue" },
    { label: "Native Place", value: student.nativePlace, icon: MapPin, color: "green" },
    { label: "Nationality", value: student.nationality, icon: Globe, color: "indigo" },
  ]

  // Add Catholic Parish if applicable
  if (student.catholicParish) {
    personalInfo.splice(17, 0, {
      label: "Catholic Parish",
      value: student.catholicParish,
      icon: Building,
      color: "purple",
    })
  }

  // Add Dalit Catholic status
  personalInfo.splice(student.catholicParish ? 18 : 17, 0, {
    label: "Dalit Catholic (Y/N)",
    value: student.dalitCatholic,
    icon: Users,
    color: "orange",
  })

  const academicInfo = [
    { label: "Course", value: student.course, icon: Award, color: "blue" },
    { label: "Department", value: student.department, icon: Building, color: "green" },
    { label: "Batch", value: student.batch, icon: Users, color: "purple" },
    { label: "Academic Year", value: student.academicYear, icon: Calendar, color: "orange" },
    { label: "Current Year", value: `${student.year} Year`, icon: Star, color: "yellow" },
    { label: "Current Semester", value: `Semester ${student.semester}`, icon: Star, color: "yellow" },
    { label: "Section", value: `Section ${student.section}`, icon: Users, color: "cyan" },
    {
      label: "Date of Admission",
      value: new Date(student.admissionDate).toLocaleDateString(),
      icon: Calendar,
      color: "pink",
    },
  ]

  const contactInfo = [
    { label: "Student Contact No", value: student.studentContactNo, icon: Phone, color: "green" },
    { label: "Student Email", value: student.studentEmail, icon: Mail, color: "blue" },
    { label: "Residential Address", value: student.residentialAddress, icon: Home, color: "purple" },
  ]

  const parentInfo = [
    { label: "Father's Name", value: student.fatherName, icon: Users, color: "blue" },
    { label: "Mother's Name", value: student.motherName, icon: Users, color: "pink" },
    { label: "Father's Occupation", value: student.fatherOccupation, icon: Briefcase, color: "green" },
    { label: "Mother's Occupation", value: student.motherOccupation, icon: Briefcase, color: "purple" },
    { label: "Annual Income", value: student.annualIncome, icon: DollarSign, color: "yellow" },
    { label: "Parent Contact No", value: student.parentContactNo, icon: Phone, color: "orange" },
    { label: "Parent Email", value: student.parentEmail, icon: Mail, color: "cyan" },
  ]

  const schoolActivities = [
    { label: "Co-Curricular Activities in School", value: student.coCurricularActivities, icon: Trophy, color: "blue" },
    {
      label: "Extra-Curricular Activities in School",
      value: student.extraCurricularActivities,
      icon: Star,
      color: "purple",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      green: "bg-green-50 text-green-600 border-green-100",
      purple: "bg-purple-50 text-purple-600 border-purple-100",
      orange: "bg-orange-50 text-orange-600 border-orange-100",
      pink: "bg-pink-50 text-pink-600 border-pink-100",
      red: "bg-red-50 text-red-600 border-red-100",
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
      teal: "bg-teal-50 text-teal-600 border-teal-100",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
      cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl opacity-5" />
        <div className="relative p-8 rounded-2xl border-2 border-slate-100 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Student Profile</h1>
              <p className="text-slate-600 text-lg">Complete personal and academic information</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Enhanced Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="xl:col-span-1"
        >
          <Card className="overflow-hidden border-2 border-slate-100 shadow-xl">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black/10" />
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                    "linear-gradient(45deg, #8b5cf6, #6366f1)",
                    "linear-gradient(45deg, #6366f1, #3b82f6)",
                  ],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            <CardContent className="relative -mt-16 p-6">
              {/* Profile Picture */}
              <motion.div
                className="relative mx-auto w-32 h-32 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Avatar className="w-32 h-32 ring-4 ring-white shadow-2xl">
                  <AvatarImage src={student.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Student Info */}
              <div className="text-center space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">{student.name}</h2>
                  <p className="text-slate-600 font-medium">{student.registrationNumber}</p>
                </div>

                <div className="space-y-3">
                  <Badge
                    variant="secondary"
                    className="text-sm px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 border border-blue-200"
                  >
                    {student.course}
                  </Badge>

                  <div className="flex justify-center gap-2 flex-wrap">
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      Year {student.year}
                    </Badge>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Sem {student.semester}
                    </Badge>
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      Sec {student.section}
                    </Badge>
                  </div>

                  <Badge
                    variant={student.hosteller === "Yes" ? "default" : "outline"}
                    className={
                      student.hosteller === "Yes"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "border-orange-200 text-orange-700"
                    }
                  >
                    {student.hosteller === "Yes" ? "🏠 Hosteller" : "🚌 Day Scholar"}
                  </Badge>
                </div>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">{student.year}</div>
                    <div className="text-xs text-blue-600 font-medium">Current Year</div>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 border border-green-100">
                    <div className="text-2xl font-bold text-green-600">{student.semester}</div>
                    <div className="text-xs text-green-600 font-medium">Semester</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Information Cards */}
        <div className="xl:col-span-3 space-y-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-2 border-slate-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-xl bg-blue-500 text-white">
                    <User className="h-5 w-5" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {personalInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 bg-white hover:bg-slate-50/50">
                        <div
                          className={`p-3 rounded-xl border ${getColorClasses(info.color)} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                            {info.label}
                          </p>
                          <p className="text-sm font-semibold text-slate-800">{info.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Academic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-2 border-slate-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-xl bg-green-500 text-white">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {academicInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 bg-white hover:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg border ${getColorClasses(info.color)} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <info.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                              {info.label}
                            </p>
                            <p className="text-sm font-semibold text-slate-800">{info.value}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-2 border-slate-100 shadow-lg h-full">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-100">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-xl bg-purple-500 text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 bg-white hover:bg-slate-50/50">
                          <div
                            className={`p-3 rounded-xl border ${getColorClasses(info.color)} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <info.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                              {info.label}
                            </p>
                            <p className="text-sm font-semibold text-slate-800 break-words">{info.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Parent/Guardian Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-2 border-slate-100 shadow-lg h-full">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-slate-100">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-xl bg-orange-500 text-white">
                      <Users className="h-5 w-5" />
                    </div>
                    Parent/Guardian Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {parentInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 bg-white hover:bg-slate-50/50">
                          <div
                            className={`p-2 rounded-lg border ${getColorClasses(info.color)} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <info.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                              {info.label}
                            </p>
                            <p className="text-sm font-semibold text-slate-800">{info.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* School Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-2 border-slate-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-xl bg-yellow-500 text-white">
                    <Trophy className="h-5 w-5" />
                  </div>
                  School Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {schoolActivities.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 bg-white hover:bg-slate-50/50">
                        <div
                          className={`p-3 rounded-xl border ${getColorClasses(info.color)} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                            {info.label}
                          </p>
                          <p className="text-sm font-semibold text-slate-800 leading-relaxed">{info.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Information Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8"
      >
        <Card className="border-2 border-amber-100 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">Profile Information</h4>
                <p className="text-sm text-amber-700">
                  This information is managed by the college administration. For any updates or corrections, please
                  contact the Academic Office or submit a request through the official channels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
