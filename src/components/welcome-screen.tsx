

import { motion } from "framer-motion"
import { Card, CardContent } from '../ui/card'
import { GraduationCap, Users, BookOpen } from "lucide-react"

type LoginType = "student" | "faculty" | "parent" | null

interface WelcomeScreenProps {
  onSelectLogin: (type: LoginType) => void
}

export default function WelcomeScreen({ onSelectLogin }: WelcomeScreenProps) {
  const loginOptions = [
    {
      type: "student" as const,
      title: "Student Portal",
      description: "Access your academic records, assignments, and more",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
    },
    {
      type: "faculty" as const,
      title: "Faculty Portal",
      description: "Manage courses, grades, and student information",
      icon: BookOpen,
      color: "from-indigo-500 to-purple-600",
    },
    {
      type: "parent" as const,
      title: "Parent Portal",
      description: "Monitor your child's academic progress",
      icon: Users,
      color: "from-cyan-500 to-blue-600",
    },
  ]

  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.95,
        transition: { duration: 0.4, ease: [0.4, 0, 0.6, 1] },
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="text-center space-y-6 sm:space-y-8 lg:space-y-10 w-full max-w-lg mx-auto px-2"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="space-y-4 sm:space-y-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800 mb-4 sm:mb-6 leading-tight tracking-tight"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.4, 0, 0.6, 1],
            }}
          >
            Welcome to
          </motion.h1>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.h2
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-700 leading-tight mb-2 sm:mb-3"
              animate={{
                color: ["#374151", "#1e40af", "#374151"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.4, 0, 0.6, 1],
              }}
            >
              Loyola ICAM College
            </motion.h2>

            <motion.h3
              className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-600 leading-tight mb-3 sm:mb-4"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.4, 0, 0.6, 1],
              }}
            >
              of Engineering & Technology
            </motion.h3>

            <motion.p
              className="text-2xl sm:text-3xl font-bold tracking-wider text-blue-600"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.4, 0, 0.6, 1],
              }}
            >
              LICET
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {loginOptions.map((option, index) => (
          <motion.div
            key={option.type}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: -30,
              opacity: 0,
              transition: { duration: 0.3, delay: index * 0.05 },
            }}
            transition={{
              delay: 0.6 + index * 0.1,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
              transition: { duration: 0.2, ease: [0.4, 0, 0.6, 1] },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            <Card
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-200 border relative overflow-hidden group bg-white/90 backdrop-blur-sm"
              onClick={() => {
                setTimeout(() => onSelectLogin(option.type), 100)
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-blue-100/50 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
              />
              <CardContent className="p-4 sm:p-6 relative z-10">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-md flex-shrink-0`}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <option.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 text-base sm:text-lg">
                      {option.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">{option.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
