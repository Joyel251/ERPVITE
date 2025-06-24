

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { BookOpen, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { getLibraryBooks } from "../../lib/student-data"

interface LibraryBooksProps {
  registrationNumber: string
}

export default function LibraryBooks({ registrationNumber }: LibraryBooksProps) {
  const libraryBooks = getLibraryBooks(registrationNumber)
  const issuedBooks = libraryBooks.filter((book) => book.status === "Issued")
  const returnedBooks = libraryBooks.filter((book) => book.status === "Returned")
  const overdueBooks = libraryBooks.filter((book) => book.status === "Overdue")

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Library Books</h1>
            <p className="text-slate-600 mt-1">Manage your borrowed books and reading history</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{issuedBooks.length}</div>
            <div className="text-sm text-slate-500">Currently Issued</div>
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
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{libraryBooks.length}</div>
                  <div className="text-sm text-slate-600">Total Books</div>
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
                <div className="p-2 rounded-lg bg-yellow-50">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{issuedBooks.length}</div>
                  <div className="text-sm text-slate-600">Currently Issued</div>
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
                <div className="p-2 rounded-lg bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{returnedBooks.length}</div>
                  <div className="text-sm text-slate-600">Returned</div>
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
                  <div className="text-2xl font-bold text-slate-800">{overdueBooks.length}</div>
                  <div className="text-sm text-slate-600">Overdue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Books List */}
      {libraryBooks.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Library Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {libraryBooks.map((book, index) => {
                  const StatusIcon = getStatusIcon(book.status)
                  const isOverdue = new Date(book.dueDate) < new Date() && book.status === "Issued"

                  return (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-blue-50">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1">{book.title}</h3>
                            <p className="text-sm text-slate-600 mb-2">by {book.author}</p>
                            <p className="text-xs text-slate-500 mb-3">ISBN: {book.isbn}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500">Issue Date:</span>
                                <div className="font-medium">{new Date(book.issueDate).toLocaleDateString()}</div>
                              </div>
                              <div>
                                <span className="text-slate-500">Due Date:</span>
                                <div className={`font-medium ${isOverdue ? "text-red-600" : ""}`}>
                                  {new Date(book.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            {book.fine && (
                              <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-700">Fine: ₹{book.fine}</div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={getStatusColor(book.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {book.status}
                          </Badge>

                          {book.status === "Issued" && (
                            <Button variant="outline" size="sm">
                              Renew Book
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No Books Borrowed</h3>
              <p className="text-slate-500">Visit the library to borrow books for your studies.</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
