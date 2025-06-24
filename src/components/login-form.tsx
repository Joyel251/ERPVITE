

import type React from "react"
import { motion } from "framer-motion"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { GraduationCap, Users, BookOpen, ArrowLeft, Loader2 } from "lucide-react"
import { useState } from "react"

type LoginType = "student" | "faculty" | "parent" | null

interface LoginFormProps {
  selectedLogin: LoginType
  onBack: () => void
  onLogin: (registrationNumber: string) => void
}

export default function LoginForm({ selectedLogin, onBack, onLogin }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    registrationNumber: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev : any) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful login
    if (selectedLogin === "student" && formData.registrationNumber) {
      onLogin(formData.registrationNumber)
    } else if ((selectedLogin === "faculty" || selectedLogin === "parent") && formData.email) {
      onLogin(formData.email)
    }

    setIsLoading(false)
  }

  const loginOptions = [
    {
      type: "student" as const,
      title: "Student Portal",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
    },
    {
      type: "faculty" as const,
      title: "Faculty Portal",
      icon: BookOpen,
      color: "from-indigo-500 to-purple-600",
    },
    {
      type: "parent" as const,
      title: "Parent Portal",
      icon: Users,
      color: "from-cyan-500 to-blue-600",
    },
  ]

  return (
    <motion.div
      key="login-form"
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      exit={{
        opacity: 0,
        x: 40,
        scale: 0.95,
        transition: { duration: 0.4, ease: [0.4, 0, 0.6, 1] },
      }}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <Card className="shadow-xl border-0 relative overflow-hidden bg-white/95 backdrop-blur-sm">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.4, 0, 0.6, 1],
          }}
        />

        <CardHeader className="space-y-4 relative z-10">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTimeout(() => onBack(), 50)}
                className="p-2 hover:bg-blue-50 rounded-full transition-all duration-300"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${loginOptions.find((opt) => opt.type === selectedLogin)?.color} flex items-center justify-center shadow-md`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              {(() => {
                const option = loginOptions.find((opt) => opt.type === selectedLogin)
                const IconComponent = option?.icon || GraduationCap
                return <IconComponent className="w-5 h-5 text-white" />
              })()}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <CardTitle className="text-2xl font-semibold text-slate-800">
              {loginOptions.find((opt) => opt.type === selectedLogin)?.title}
            </CardTitle>
            <CardDescription className="text-slate-600 font-medium">
              Enter your credentials to access the portal
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="relative z-10">
          <form onSubmit={handleLogin} className="space-y-5">
            {selectedLogin === "student" ? (
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Label htmlFor="registration" className="text-slate-700 font-medium">
                  Registration Number
                </Label>
                <Input
                  id="registration"
                  type="text"
                  placeholder="Enter your registration number"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border font-medium"
                />
              </motion.div>
            ) : (
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border font-medium"
                />
              </motion.div>
            )}

            <motion.div
              className="space-y-2 relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 pr-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <path
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 3l18 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <path
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold relative overflow-hidden group shadow-md transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
                  />
                  {isLoading ? (
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </motion.div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Forgot your password?
            </motion.a>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
