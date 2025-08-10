

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar'
import { Badge } from '../ui/badge'
import {
  LogOut,
  Home,
  Clock,
  Settings,
  User,
  FileText,
  Calendar,
  Trophy,
  BookOpen,
  GraduationCap,
  BarChart3,
  AlertTriangle,
  Bell,
  Edit,
} from "lucide-react"
import { getStudentData, type Student } from '../lib/student-data'
import StudentProfile from './student-sections/student-profile'
import InternalMarks from './student-sections/internal-marks'
import Attendance from './student-sections/attendance'
import StudentAchievements from './student-sections/student-achievements'
import AcademicCalendar from './student-sections/academic-calendar'
import LibraryBooks from './student-sections/library-books'
//import CourseList from './student-sections/course-list'
import SemesterMarks from './student-sections/semester-marks'
import ArrearDetails from './student-sections/arrear-details'
import Dashboard from './student-sections/dashboard'
import AnnouncementsSection from './student-sections/announcements-section'
import { useEffect, useRef, useState } from "react"

interface StudentPortalProps {
  registrationNumber: string
  onLogout: () => void
}

type ActiveSection =
  | "dashboard"
  | "profile"
  | "internal-marks"
  | "attendance"
  | "achievements"
  | "calendar"
  | "library"
  | "semester-marks"
  | "arrears"
  | "announcements"
  | "settings"

export default function StudentPortal({ registrationNumber, onLogout }: StudentPortalProps) {
  const [student, setStudent] = useState<Student | null>(null)
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const studentData = getStudentData(registrationNumber)
    setStudent(studentData)
  }, [registrationNumber])

  // Scroll to top when section changes
  const handleSectionChange = (section: ActiveSection) => {
    setActiveSection(section)
    // Scroll to top immediately
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0
    }
    // Also scroll window to top as backup
    window.scrollTo(0, 0)
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      category: "main",
      notifications: 0,
      gradient: "from-blue-500 to-blue-600",
      hoverColor: "hover:bg-blue-100",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      category: "personal",
      notifications: 0,
      gradient: "from-purple-500 to-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
    {
      id: "internal-marks",
      label: "Internal Assessment",
      icon: FileText,
      category: "academic",
      notifications: 2,
      gradient: "from-green-500 to-green-600",
      hoverColor: "hover:bg-green-100",
    },
    {
      id: "attendance",
      label: "Attendance Record",
      icon: Clock,
      category: "academic",
      notifications: 1,
      gradient: "from-orange-500 to-orange-600",
      hoverColor: "hover:bg-orange-100",
    },
    {
      id: "semester-marks",
      label: "Semester Results",
      icon: BarChart3,
      category: "academic",
      notifications: 0,
      gradient: "from-indigo-500 to-indigo-600",
      hoverColor: "hover:bg-indigo-100",
    },
    {
      id: "calendar",
      label: "Academic Calendar",
      icon: Calendar,
      category: "information",
      notifications: 3,
      gradient: "from-pink-500 to-pink-600",
      hoverColor: "hover:bg-pink-100",
    },
    {
      id: "announcements",
      label: "College Announcements",
      icon: Bell,
      category: "information",
      notifications: 5,
      gradient: "from-yellow-500 to-yellow-600",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      id: "library",
      label: "Library Services",
      icon: BookOpen,
      category: "services",
      notifications: 1,
      gradient: "from-teal-500 to-teal-600",
      hoverColor: "hover:bg-teal-100",
    },
    {
      id: "achievements",
      label: "My Achievements",
      icon: Trophy,
      category: "personal",
      notifications: 0,
      gradient: "from-amber-500 to-amber-600",
      hoverColor: "hover:bg-amber-100",
      editable: true,
    },
    {
      id: "arrears",
      label: "Arrear Management",
      icon: AlertTriangle,
      category: "academic",
      notifications: 0,
      gradient: "from-red-500 to-red-600",
      hoverColor: "hover:bg-red-100",
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: Settings,
      category: "system",
      notifications: 0,
      gradient: "from-slate-500 to-slate-600",
      hoverColor: "hover:bg-slate-100",
    },
  ]

  const renderActiveSection = () => {
    if (!student) return null

    switch (activeSection) {
      case "dashboard":
        return <Dashboard student={student} />
      case "profile":
        return <StudentProfile student={student} />
      case "internal-marks":
        return <InternalMarks registrationNumber={registrationNumber} />
      case "attendance":
        return <Attendance registrationNumber={registrationNumber} />
      case "achievements":
        return <StudentAchievements registrationNumber={registrationNumber} />
      case "calendar":
        return <AcademicCalendar />
      case "library":
        return <LibraryBooks registrationNumber={registrationNumber} />
      case "semester-marks":
        return <SemesterMarks registrationNumber={registrationNumber} />
      case "arrears":
        return <ArrearDetails registrationNumber={registrationNumber} />
      case "announcements":
        return <AnnouncementsSection />
      default:
        return <Dashboard student={student} />
    }
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-slate-600 font-medium text-sm sm:text-base">Loading your portal...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <AppSidebar
          student={student}
          menuItems={menuItems}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onLogout={onLogout}
        />
        <div className="flex-1 flex flex-col min-h-screen w-full">
          <Header student={student} activeSection={activeSection} />
          <div ref={mainContentRef} className="flex-1 overflow-auto" style={{ scrollBehavior: "auto" }}>
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {renderActiveSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar({
  student,
  menuItems,
  activeSection,
  onSectionChange,
  onLogout,
}: {
  student: Student
  menuItems: Array<{
    id: string
    label: string
    icon: any
    category: string
    notifications: number
    gradient: string
    hoverColor: string
    editable?: boolean
  }>
  activeSection: ActiveSection
  onSectionChange: (section: ActiveSection) => void
  onLogout: () => void
}) {
  const { state, isMobile, setOpen } = useSidebar()

  const categories = {
    main: "Overview",
    personal: "Personal",
    academic: "Academics",
    information: "Information",
    services: "Services",
    system: "System",
  }

  const handleMenuItemClick = (section: ActiveSection) => {
    onSectionChange(section)
    // Close sidebar on mobile after selecting an item
    if (isMobile) {
      setOpen(false)
    }
  }

  return (
    <motion.div initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <Sidebar
        collapsible="icon"
        className="border-r-2 border-slate-200/60 shadow-2xl z-50"
        style={
          {
            "--sidebar-width": isMobile ? "18rem" : "16rem",
            "--sidebar-width-icon": "4rem",
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <SidebarHeader className="border-b-2 border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50">
          <motion.div
            className="px-3 sm:px-4 py-3 sm:py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* College Info and Mobile Sidebar Toggle */}
            <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </motion.div>
                <div className="group-data-[collapsible=icon]:hidden">
                  <motion.h1
                    className="font-bold text-base sm:text-lg text-slate-800 title-font"
                    animate={{ opacity: state === "expanded" ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    LICET Portal
                  </motion.h1>
                  <motion.p
                    className="text-slate-500 text-xs font-medium"
                    animate={{ opacity: state === "expanded" ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Student Dashboard
                  </motion.p>
                </div>
              </div>

              {/* Mobile Sidebar Toggle - Only show on mobile when sidebar is open */}
              {isMobile && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <SidebarTrigger className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg transition-colors md:hidden flex-shrink-0 border border-slate-200" />
                </motion.div>
              )}
            </div>

            {/* Student Info Card */}
            <div className="md:group-data-[collapsible=icon]:hidden">
              <motion.div
                className="relative p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-100/60 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <div className="relative flex items-center gap-2 sm:gap-3">
                  <motion.div
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    {/* Separate animation for student name */}
                    <motion.p
                      className="font-semibold text-slate-800 text-xs sm:text-sm truncate"
                      animate={{
                        color: ["#1e293b", "#3b82f6", "#1e293b"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {student.name}
                    </motion.p>
                    <p className="text-slate-500 text-xs truncate">{student.registrationNumber}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <motion.div
                        className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </SidebarHeader>

        {/* Navigation Menu */}
        <SidebarContent className="bg-white px-1 sm:px-2 py-2 sm:py-3">
          {Object.entries(categories).map(([categoryKey, categoryLabel], categoryIndex) => {
            const categoryItems = menuItems.filter((item) => item.category === categoryKey)
            if (categoryItems.length === 0) return null

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="mb-4 sm:mb-6"
              >
                <motion.div className="px-2 sm:px-3 mb-1 sm:mb-2 md:group-data-[collapsible=icon]:hidden">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{categoryLabel}</h3>
                </motion.div>

                <SidebarMenu>
                  {categoryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + index * 0.05,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <SidebarMenuItem>
                        <motion.div
                          whileHover={{
                            x: isMobile ? 2 : 4,
                            scale: 1.02,
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="rounded-xl relative"
                        >
                          <SidebarMenuButton
                            isActive={activeSection === item.id}
                            onClick={() => handleMenuItemClick(item.id as ActiveSection)}
                            className={`w-full justify-start transition-all duration-300 rounded-xl mb-1 h-10 sm:h-12 relative overflow-hidden group ${
                              activeSection === item.id
                                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split("-")[1]}-500/25`
                                : `text-slate-700 ${item.hoverColor} hover:shadow-md`
                            }`}
                          >
                            {/* Animated background for active item */}
                            {activeSection === item.id && (
                              <motion.div
                                className="absolute inset-0 bg-white/10"
                                animate={{
                                  x: ["-100%", "100%"],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                              />
                            )}

                            <motion.div
                              animate={{
                                scale: activeSection === item.id ? 1.1 : 1,
                                rotate: activeSection === item.id ? 5 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center justify-center relative z-10 min-w-[16px] sm:min-w-[20px]"
                            >
                              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.div>

                            <span className="font-medium text-xs sm:text-sm relative z-10 md:group-data-[collapsible=icon]:hidden truncate">
                              {item.label}
                            </span>

                            {/* Editable indicator - only show when expanded */}
                            {item.editable && state === "expanded" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto relative z-10"
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                              </motion.div>
                            )}

                            {/* Notification Badge - only show when expanded */}
                            {item.notifications > 0 && state === "expanded" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto relative z-10"
                              >
                                <motion.div
                                  className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                    activeSection === item.id ? "bg-white/20 text-white" : "bg-red-500 text-white"
                                  }`}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  {item.notifications}
                                </motion.div>
                              </motion.div>
                            )}

                            {/* Active glow effect */}
                            {activeSection === item.id && (
                              <motion.div
                                className="absolute inset-0 rounded-xl"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(59, 130, 246, 0)",
                                    "0 0 0 4px rgba(59, 130, 246, 0.1)",
                                    "0 0 0 0 rgba(59, 130, 246, 0)",
                                  ],
                                }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              />
                            )}
                          </SidebarMenuButton>

                          {/* Red dot for notifications when collapsed - positioned outside the button */}
                          {item.notifications > 0 && state === "collapsed" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 z-30"
                            >
                              <motion.div
                                className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500 border-2 border-white shadow-sm"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              />
                            </motion.div>
                          )}
                        </motion.div>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
                </SidebarMenu>
              </motion.div>
            )
          })}
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t-2 border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-1 sm:p-2">
          <SidebarMenu>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <SidebarMenuItem>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="rounded-xl"
                >
                  <SidebarMenuButton
                    onClick={onLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 font-medium rounded-xl h-10 sm:h-12 group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div whileHover={{ rotate: 10 }} className="relative z-10 min-w-[16px] sm:min-w-[20px]">
                      <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                    <span className="relative z-10 md:group-data-[collapsible=icon]:hidden text-xs sm:text-sm">
                      Sign Out
                    </span>
                  </SidebarMenuButton>
                </motion.div>
              </SidebarMenuItem>
            </motion.div>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  )
}

function Header({ student, activeSection }: { student: Student; activeSection: ActiveSection }) {
  const getSectionTitle = (section: ActiveSection) => {
    const titles = {
      dashboard: "Dashboard Overview",
      profile: "Student Profile",
      "internal-marks": "Internal Assessment",
      attendance: "Attendance Record",
      achievements: "My Achievements",
      calendar: "Academic Calendar",
      library: "Library Services",
      "semester-marks": "Semester Results",
      arrears: "Arrear Management",
      announcements: "College Announcements",
      settings: "Account Settings",
    }
    return titles[section] || "Student Portal"
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-slate-200/60 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <SidebarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors h-8 w-8 sm:h-10 sm:w-10 rounded-xl shadow-md border-2 border-slate-200" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <motion.h1
              key={activeSection}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 title-font truncate"
            >
              {getSectionTitle(activeSection)}
            </motion.h1>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm truncate">
              {student.department} • Year {student.year} • Section {student.section}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Academic Year Badge - Hidden on mobile */}
          <Badge variant="outline" className="px-2 sm:px-3 py-1 font-medium border-2 hidden sm:inline-flex text-xs">
            Academic Year 2024-25
          </Badge>

          {/* Student Info - Responsive */}
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-800 truncate max-w-32 lg:max-w-none">{student.name}</p>
            <p className="text-xs text-slate-500 font-medium truncate">{student.registrationNumber}</p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1 sm:gap-2">
            <motion.div
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-xs text-slate-600 font-medium hidden sm:inline">Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}
