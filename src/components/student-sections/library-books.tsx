"use client"

import { Card, CardContent } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Input } from '../../ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { BookOpen, AlertCircle, CheckCircle, Clock, Search, Calendar, User } from "lucide-react"
import { getLibraryBooks } from '../../lib/student-data'
import { useState } from "react"

interface LibraryBooksProps {
  registrationNumber: string
}

export default function LibraryBooks({ registrationNumber }: LibraryBooksProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const libraryBooks = getLibraryBooks(registrationNumber)
  const issuedBooks = libraryBooks.filter((book) => book.status === "Issued")
  const returnedBooks = libraryBooks.filter((book) => book.status === "Returned")
  const overdueBooks = libraryBooks.filter((book) => book.status === "Overdue")

  const filteredBooks = libraryBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Issued":
        return "default"
      case "Returned":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Issued":
        return Clock
      case "Returned":
        return CheckCircle
      case "Overdue":
        return AlertCircle
      default:
        return BookOpen
    }
  }

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-8">
      {/* Simple Header */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <CardContent className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-3xl sm:text-4xl font-bold title-font">Library Books</h2>
              </div>
              <p className="text-blue-100 mb-4 text-lg sm:text-xl font-medium">
                Your borrowed books and reading history
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                  <User className="h-4 w-4" />
                  <span className="font-medium">ID: {registrationNumber}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Academic Year 2024-25</span>
                </div>
              </div>
            </div>
            <div className="text-center bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="text-4xl sm:text-6xl font-bold mb-2">{issuedBooks.length}</div>
              <div className="text-blue-100 text-base font-medium">Currently Reading</div>
              <div className="text-sm text-blue-200 mt-1">Active Books</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Books",
            value: libraryBooks.length,
            icon: BookOpen,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            description: "All time borrowed",
          },
          {
            title: "Currently Issued",
            value: issuedBooks.length,
            icon: Clock,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200",
            description: "Active borrowings",
          },
          {
            title: "Successfully Returned",
            value: returnedBooks.length,
            icon: CheckCircle,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
            description: "Completed reads",
          },
          {
            title: "Overdue Items",
            value: overdueBooks.length,
            icon: AlertCircle,
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            description: "Need attention",
          },
        ].map((stat) => (
          <Card
            key={stat.title}
            className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl ${stat.bgColor} border ${stat.borderColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-800 text-lg">{stat.title}</h3>
                <p className="text-sm text-slate-600 font-medium">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search books by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-white shadow-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Books Display */}
      {filteredBooks.length > 0 ? (
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-2 h-14 p-2 bg-gray-100 rounded-2xl">
            <TabsTrigger value="grid" className="px-8 py-3 rounded-xl font-semibold">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" className="px-8 py-3 rounded-xl font-semibold">
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => {
                const StatusIcon = getStatusIcon(book.status)
                const isOverdue = new Date(book.dueDate) < new Date() && book.status === "Issued"
                const daysRemaining = getDaysRemaining(book.dueDate)

                return (
                  <Card
                    key={book.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`p-3 rounded-2xl ${book.status === "Issued" ? "bg-blue-50 border-blue-200" : book.status === "Returned" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"} border group-hover:scale-110 transition-transform duration-300`}
                        >
                          <BookOpen
                            className={`h-6 w-6 ${book.status === "Issued" ? "text-blue-600" : book.status === "Returned" ? "text-emerald-600" : "text-red-600"}`}
                          />
                        </div>
                        <Badge variant={getStatusColor(book.status)} className="text-sm px-3 py-1">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {book.status}
                        </Badge>
                      </div>

                      <div className="space-y-4 mb-6">
                        <h3 className="font-bold text-slate-800 text-xl line-clamp-2 leading-tight">{book.title}</h3>
                        <p className="text-slate-600 font-semibold text-lg">by {book.author}</p>
                        <p className="text-xs text-slate-500 font-mono bg-gray-100 px-3 py-2 rounded-lg border">
                          ISBN: {book.isbn}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                            <span className="text-blue-600 font-semibold block mb-2">Issue Date</span>
                            <div className="font-bold text-slate-800 text-lg">
                              {new Date(book.issueDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div
                            className={`p-4 rounded-2xl border ${
                              isOverdue ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                            }`}
                          >
                            <span
                              className={`font-semibold block mb-2 ${isOverdue ? "text-red-600" : "text-green-600"}`}
                            >
                              Due Date
                            </span>
                            <div className={`font-bold text-lg ${isOverdue ? "text-red-700" : "text-slate-800"}`}>
                              {new Date(book.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {book.status === "Issued" && (
                          <div
                            className={`p-4 rounded-2xl text-center border ${
                              daysRemaining < 0
                                ? "bg-red-100 border-red-300"
                                : daysRemaining <= 3
                                  ? "bg-amber-100 border-amber-300"
                                  : "bg-green-100 border-green-300"
                            }`}
                          >
                            <span
                              className={`text-sm font-bold ${
                                daysRemaining < 0
                                  ? "text-red-700"
                                  : daysRemaining <= 3
                                    ? "text-amber-700"
                                    : "text-green-700"
                              }`}
                            >
                              {daysRemaining < 0
                                ? `${Math.abs(daysRemaining)} days overdue`
                                : daysRemaining === 0
                                  ? "Due today"
                                  : `${daysRemaining} days remaining`}
                            </span>
                          </div>
                        )}

                        {book.fine && (
                          <div className="p-4 bg-red-100 border border-red-300 rounded-2xl text-center">
                            <span className="text-red-700 font-bold text-lg">Fine: ₹{book.fine}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {filteredBooks.map((book) => {
                    const StatusIcon = getStatusIcon(book.status)
                    const isOverdue = new Date(book.dueDate) < new Date() && book.status === "Issued"
                    const daysRemaining = getDaysRemaining(book.dueDate)

                    return (
                      <div
                        key={book.id}
                        className="group p-6 rounded-2xl border hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 hover:scale-[1.02] border-gray-200"
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`p-4 rounded-2xl ${book.status === "Issued" ? "bg-blue-50 border-blue-200" : book.status === "Returned" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"} border group-hover:scale-110 transition-transform duration-300`}
                          >
                            <BookOpen
                              className={`h-8 w-8 ${book.status === "Issued" ? "text-blue-600" : book.status === "Returned" ? "text-emerald-600" : "text-red-600"}`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-bold text-slate-800 text-2xl mb-2">{book.title}</h3>
                                <p className="text-slate-600 font-semibold text-lg mb-1">by {book.author}</p>
                                <p className="text-sm text-slate-500 font-mono bg-gray-100 px-3 py-1 rounded-lg inline-block">
                                  ISBN: {book.isbn}
                                </p>
                              </div>
                              <Badge variant={getStatusColor(book.status)} className="text-sm px-4 py-2">
                                <StatusIcon className="h-4 w-4 mr-2" />
                                {book.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                                <span className="text-blue-600 font-semibold text-sm block mb-1">Issue Date</span>
                                <div className="font-bold text-slate-800 text-lg">
                                  {new Date(book.issueDate).toLocaleDateString()}
                                </div>
                              </div>
                              <div
                                className={`p-4 rounded-2xl border ${
                                  isOverdue ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                                }`}
                              >
                                <span
                                  className={`font-semibold text-sm block mb-1 ${isOverdue ? "text-red-600" : "text-green-600"}`}
                                >
                                  Due Date
                                </span>
                                <div className={`font-bold text-lg ${isOverdue ? "text-red-700" : "text-slate-800"}`}>
                                  {new Date(book.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                              {book.status === "Issued" && (
                                <div
                                  className={`p-4 rounded-2xl border ${
                                    daysRemaining < 0
                                      ? "bg-red-100 border-red-300"
                                      : daysRemaining <= 3
                                        ? "bg-amber-100 border-amber-300"
                                        : "bg-green-100 border-green-300"
                                  }`}
                                >
                                  <span
                                    className={`text-sm font-bold ${
                                      daysRemaining < 0
                                        ? "text-red-700"
                                        : daysRemaining <= 3
                                          ? "text-amber-700"
                                          : "text-green-700"
                                    }`}
                                  >
                                    {daysRemaining < 0
                                      ? `${Math.abs(daysRemaining)} days overdue`
                                      : daysRemaining === 0
                                        ? "Due today"
                                        : `${daysRemaining} days remaining`}
                                  </span>
                                </div>
                              )}
                              {book.fine && (
                                <div className="p-4 bg-red-100 border border-red-300 rounded-2xl">
                                  <span className="text-red-700 font-bold text-lg">Fine: ₹{book.fine}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-16 text-center">
            <div className="p-8 bg-gray-100 rounded-full w-40 h-40 mx-auto mb-8 flex items-center justify-center">
              <BookOpen className="h-20 w-20 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-slate-700 mb-4">No Books Found</h3>
            <p className="text-slate-500 text-xl mb-8 max-w-md mx-auto">
              {searchTerm
                ? "No books match your search criteria. Try adjusting your search."
                : "Visit the library to start your reading journey and discover amazing books."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
