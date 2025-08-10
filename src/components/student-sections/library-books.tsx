"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Input } from "../../ui/input"
import { BookOpen, Search, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { getLibraryBooks } from "../../lib/student-data"
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

  // Filter books based on search term
  const filterBooks = (books: typeof libraryBooks) => {
    if (!searchTerm) return books

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const filteredAllBooks = filterBooks(libraryBooks)
  const filteredIssuedBooks = filterBooks(issuedBooks)
  const filteredReturnedBooks = filterBooks(returnedBooks)

  const libraryStats = [
    {
      title: "Books Issued",
      value: issuedBooks.length.toString(),
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Books Returned",
      value: returnedBooks.length.toString(),
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Overdue Books",
      value: overdueBooks.length.toString(),
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Total Books",
      value: libraryBooks.length.toString(),
      icon: Clock,
      color: "from-purple-500 to-purple-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Issued":
        return "bg-blue-100 text-blue-800"
      case "Returned":
        return "bg-green-100 text-green-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const BookCard = ({ book, index }: { book: any; index: number }) => {
    const isOverdue = new Date(book.dueDate) < new Date() && book.status === "Issued"
    const daysRemaining = getDaysRemaining(book.dueDate)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-slate-600 mb-2">{book.author}</p>
                  <p className="text-xs text-slate-500 font-mono bg-gray-100 px-2 py-1 rounded">ISBN: {book.isbn}</p>
                </div>
                <Badge className={`text-xs ml-2 ${getStatusColor(book.status)}`}>{book.status}</Badge>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-blue-500" />
                  <span>Issued: {formatDate(book.issueDate)}</span>
                </div>
                {book.status === "Issued" && (
                  <div className="flex items-center gap-2">
                    <Clock className={`h-3 w-3 ${isOverdue ? "text-red-500" : "text-orange-500"}`} />
                    <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
                      Due: {formatDate(book.dueDate)}
                    </span>
                  </div>
                )}
                {book.status === "Returned" && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Returned: {formatDate(book.dueDate)}</span>
                  </div>
                )}
              </div>

              {book.status === "Issued" && (
                <div
                  className={`text-xs p-2 rounded ${
                    daysRemaining < 0
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : daysRemaining <= 3
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-green-50 text-green-700 border border-green-200"
                  }`}
                >
                  {daysRemaining < 0
                    ? `${Math.abs(daysRemaining)} days overdue`
                    : daysRemaining === 0
                      ? "Due today"
                      : `${daysRemaining} days remaining`}
                </div>
              )}

              {book.fine && (
                <div className="text-xs p-2 bg-red-50 text-red-700 border border-red-200 rounded">
                  Fine: ₹{book.fine}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const EmptyState = ({ message, submessage }: { message: string; submessage: string }) => (
    <div className="text-center py-12">
      <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 text-lg font-medium">{message}</p>
      <p className="text-gray-400 text-sm">{submessage}</p>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Library Books</h1>
            <p className="text-slate-600 mt-1">Track your issued and returned books</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {libraryStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search books by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {searchTerm && (
              <div className="mt-3 text-sm text-slate-600">
                Showing results for "{searchTerm}" - {filteredAllBooks.length} book(s) found
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Books Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              My Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">All Books ({filteredAllBooks.length})</TabsTrigger>
                <TabsTrigger value="issued">Issued ({filteredIssuedBooks.length})</TabsTrigger>
                <TabsTrigger value="returned">Returned ({filteredReturnedBooks.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {filteredAllBooks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAllBooks.map((book, index) => (
                      <BookCard key={book.id} book={book} index={index} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message={searchTerm ? "No books found" : "No books available"}
                    submessage={
                      searchTerm ? "Try adjusting your search terms" : "Visit the library to borrow some books!"
                    }
                  />
                )}
              </TabsContent>

              <TabsContent value="issued">
                {filteredIssuedBooks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredIssuedBooks.map((book, index) => (
                      <BookCard key={book.id} book={book} index={index} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message={searchTerm ? "No issued books found" : "No books currently issued"}
                    submessage={
                      searchTerm ? "Try adjusting your search terms" : "Visit the library to borrow some books!"
                    }
                  />
                )}
              </TabsContent>

              <TabsContent value="returned">
                {filteredReturnedBooks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredReturnedBooks.map((book, index) => (
                      <BookCard key={book.id} book={book} index={index} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message={searchTerm ? "No returned books found" : "No returned books"}
                    submessage={searchTerm ? "Try adjusting your search terms" : "Books you return will appear here"}
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
