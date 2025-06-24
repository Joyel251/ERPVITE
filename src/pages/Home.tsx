import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BubbleAnimations, FloatingParticles, BackgroundShapes } from "../components/background-animations"
import WelcomeScreen from "../components/welcome-screen"
import LoginForm from "../components/login-form"
import StudentPortal from "../components/student-portal"

type LoginType = "student" | "faculty" | "parent" | null

export default function Home() {
  const [selectedLogin, setSelectedLogin] = useState<LoginType>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRegistrationNumber, setUserRegistrationNumber] = useState<string>("")

  if (isLoggedIn && selectedLogin === "student") {
    return (
      <StudentPortal
        registrationNumber={userRegistrationNumber}
        onLogout={() => {
          setIsLoggedIn(false)
          setSelectedLogin(null)
          setUserRegistrationNumber("")
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50 overflow-hidden relative">
      <BackgroundShapes />
      <FloatingParticles />
      <BubbleAnimations />
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />

      <div className="relative min-h-screen flex">
        {/* Left Side - College Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex lg:w-1/2 relative"
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-transparent z-10"
              animate={{ opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
            />
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-slate-50 z-20" />
            <img
              src="https://ik.imagekit.io/kfeapecpv/Screenshot%202025-06-15%20110729.jpg?updatedAt=1749966299413"
              alt="Loyola ICAM College of Engineering and Technology"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Right Side - Login Content */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
          {/* Background Animations - same as before */}
          {/* ...keep same background shape code... */}
          <div className="w-full max-w-md relative z-10">
            <AnimatePresence mode="wait">
              {!selectedLogin ? (
                <WelcomeScreen onSelectLogin={setSelectedLogin} />
              ) : (
                <LoginForm
                  selectedLogin={selectedLogin}
                  onBack={() => setSelectedLogin(null)}
                  onLogin={(regNumber) => {
                    setUserRegistrationNumber(regNumber)
                    setIsLoggedIn(true)
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
