

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Megaphone, Calendar, FileText, AlertCircle, Users, Clock, Pin } from "lucide-react"

export default function AnnouncementsSection() {
  const announcements = [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule",
      content:
        "The mid-semester examinations will be conducted from July 15th to July 25th, 2024. Students are advised to check their individual exam schedules on the portal and prepare accordingly.",
      category: "Academic",
      priority: "high",
      timestamp: "2024-07-01T10:30:00Z",
      author: "Academic Office",
      pinned: true,
    },
    {
      id: 2,
      title: "Library Renovation Notice",
      content:
        "The central library will be closed for renovation from July 8th to July 12th, 2024. Students can access digital resources through the online portal during this period.",
      category: "Facility",
      priority: "medium",
      timestamp: "2024-07-01T09:15:00Z",
      author: "Library Administration",
      pinned: false,
    },
    {
      id: 3,
      title: "Technical Symposium 2024 - Call for Papers",
      content:
        "The annual technical symposium 'TechFest 2024' will be held on August 5-7, 2024. Students are invited to submit their research papers and project presentations. Registration deadline: July 20th, 2024.",
      category: "Event",
      priority: "medium",
      timestamp: "2024-06-30T14:20:00Z",
      author: "Student Activities",
      pinned: true,
    },
    {
      id: 4,
      title: "Scholarship Application Deadline Extended",
      content:
        "The deadline for merit-based scholarship applications has been extended to July 15th, 2024. Eligible students can apply through the student portal under the 'Financial Aid' section.",
      category: "Financial",
      priority: "high",
      timestamp: "2024-06-29T11:45:00Z",
      author: "Financial Aid Office",
      pinned: false,
    },
    {
      id: 5,
      title: "Campus Placement Drive - July 2024",
      content:
        "Leading companies including TCS, Infosys, and Wipro will be conducting campus interviews from July 22nd to July 30th, 2024. Final year students should register through the placement portal.",
      category: "Placement",
      priority: "high",
      timestamp: "2024-06-28T16:30:00Z",
      author: "Placement Cell",
      pinned: true,
    },
    {
      id: 6,
      title: "New Course Registration Open",
      content:
        "Registration for elective courses for the upcoming semester is now open. Students can select their preferred electives through the academic portal. Last date for registration: July 10th, 2024.",
      category: "Academic",
      priority: "medium",
      timestamp: "2024-06-27T13:20:00Z",
      author: "Academic Office",
      pinned: false,
    },
  ]

  const pinnedAnnouncements = announcements.filter((a) => a.pinned)
  const regularAnnouncements = announcements.filter((a) => !a.pinned)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic":
        return FileText
      case "Event":
        return Calendar
      case "Facility":
        return AlertCircle
      case "Financial":
        return Users
      case "Placement":
        return Users
      default:
        return Megaphone
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "Event":
        return "bg-green-50 text-green-600 border-green-200"
      case "Facility":
        return "bg-orange-50 text-orange-600 border-orange-200"
      case "Financial":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "Placement":
        return "bg-indigo-50 text-indigo-600 border-indigo-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">College Announcements</h1>
            <p className="text-slate-600 mt-1">Stay updated with important college news and announcements</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{pinnedAnnouncements.length}</div>
            <div className="text-sm text-slate-500">Pinned</div>
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
                  <Megaphone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{announcements.length}</div>
                  <div className="text-sm text-slate-600">Total</div>
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
                <div className="p-2 rounded-lg bg-red-50">
                  <Pin className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{pinnedAnnouncements.length}</div>
                  <div className="text-sm text-slate-600">Pinned</div>
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
                <div className="p-2 rounded-lg bg-orange-50">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {announcements.filter((a) => a.priority === "high").length}
                  </div>
                  <div className="text-sm text-slate-600">High Priority</div>
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
                <div className="p-2 rounded-lg bg-green-50">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {announcements.filter((a) => a.category === "Academic").length}
                  </div>
                  <div className="text-sm text-slate-600">Academic</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Pin className="h-5 w-5" />
                Pinned Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pinnedAnnouncements.map((announcement, index) => {
                  const Icon = getCategoryIcon(announcement.category)

                  return (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg border ${getCategoryColor(announcement.category)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-2 mb-2">
                              <h3 className="font-semibold text-slate-900">{announcement.title}</h3>
                              <Pin className="h-4 w-4 text-amber-600 mt-0.5" />
                            </div>
                            <p className="text-sm text-slate-600 mb-3 leading-relaxed">{announcement.content}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTimestamp(announcement.timestamp)}
                              </span>
                              <span>By {announcement.author}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                            {announcement.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {announcement.category}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Regular Announcements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regularAnnouncements.map((announcement, index) => {
                const Icon = getCategoryIcon(announcement.category)

                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg border ${getCategoryColor(announcement.category)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-2">{announcement.title}</h3>
                          <p className="text-sm text-slate-600 mb-3 leading-relaxed">{announcement.content}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(announcement.timestamp)}
                            </span>
                            <span>By {announcement.author}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                          {announcement.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {announcement.category}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
