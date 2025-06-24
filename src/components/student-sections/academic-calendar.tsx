

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Calendar, Clock, BookOpen, FileText, Users, Trophy } from "lucide-react"

export default function AcademicCalendar() {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  {/*const currentYear = currentDate.getFullYear()*/}

  const events = [
    {
      id: 1,
      title: "Mid-term Examinations",
      date: "2024-07-15",
      endDate: "2024-07-25",
      type: "exam",
      description: "Mid-semester examinations for all subjects",
      icon: FileText,
    },
    {
      id: 2,
      title: "Project Submission Deadline",
      date: "2024-07-10",
      type: "assignment",
      description: "Final project submission for Software Engineering",
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Sports Day",
      date: "2024-07-20",
      type: "event",
      description: "Annual college sports competition",
      icon: Trophy,
    },
    {
      id: 4,
      title: "Technical Symposium",
      date: "2024-08-05",
      endDate: "2024-08-07",
      type: "event",
      description: "Inter-college technical symposium and competitions",
      icon: Users,
    },
    {
      id: 5,
      title: "Semester End Examinations",
      date: "2024-08-15",
      endDate: "2024-08-30",
      type: "exam",
      description: "Final semester examinations",
      icon: FileText,
    },
    {
      id: 6,
      title: "Library Book Return Due",
      date: "2024-07-08",
      type: "library",
      description: "Return borrowed books to avoid fine",
      icon: BookOpen,
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "destructive"
      case "assignment":
        return "default"
      case "event":
        return "secondary"
      case "library":
        return "outline"
      default:
        return "secondary"
    }
  }

  // const getEventTypeIcon = (type: string) => {
  //   switch (type) {
  //     case "exam":
  //       return FileText
  //     case "assignment":
  //       return BookOpen
  //     case "event":
  //       return Users
  //     case "library":
  //       return BookOpen
  //     default:
  //       return Calendar
  //   }
  // }

  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const upcomingEvents = sortedEvents.filter((event) => new Date(event.date) >= currentDate)
  const pastEvents = sortedEvents.filter((event) => new Date(event.date) < currentDate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Academic Calendar</h1>
            <p className="text-slate-600 mt-1">Important dates and events for the academic year</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{upcomingEvents.length}</div>
            <div className="text-sm text-slate-500">Upcoming Events</div>
          </div>
        </div>
      </motion.div>

      {/* Current Month Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h2>
                <p className="text-blue-100">
                  {upcomingEvents.filter((event) => new Date(event.date).getMonth() === currentMonth).length} events
                  this month
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{currentDate.getDate()}</div>
                <div className="text-sm text-blue-100">
                  {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => {
                    const Icon = event.icon
                    const daysUntil = Math.ceil(
                      (new Date(event.date).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
                    )

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-50">
                            <Icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-slate-800">{event.title}</h3>
                              <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(event.date).toLocaleDateString()}
                                {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                              </span>
                              <span className="text-blue-600 font-medium">
                                {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No upcoming events</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Past Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-600" />
                Recent Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastEvents.length > 0 ? (
                  pastEvents
                    .slice(-5)
                    .reverse()
                    .map((event, index) => {
                      const Icon = event.icon

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 rounded-lg border opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-slate-50">
                              <Icon className="h-4 w-4 text-slate-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-700">{event.title}</h3>
                                <Badge variant="outline">{event.type}</Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(event.date).toLocaleDateString()}
                                  {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No recent events</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
