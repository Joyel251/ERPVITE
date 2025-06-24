

import { motion } from "framer-motion"

// Smooth Bubble animations - responsive
export const BubbleAnimations = () => {
  // Reduce bubbles on smaller screens
  const bubbleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 15
  const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    size: Math.random() * (typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 60) + 20,
    delay: Math.random() * 6,
    duration: Math.random() * 12 + 18,
    x: Math.random() * 100,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-200/25 to-blue-400/20 backdrop-blur-sm border border-blue-200/20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
          }}
          initial={{
            y: "100vh",
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.6, 0.4, 0],
            scale: [0, 1, 1.1, 0],
            x: [0, Math.random() * 80 - 40],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  )
}

// Smooth floating particles - responsive
export const FloatingParticles = () => {
  // Reduce particles on smaller screens
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 10 : 20
  const particles = Array.from({ length: particleCount }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-300/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Smooth background shapes - responsive
export const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-200/15 to-blue-300/10 rounded-full blur-xl sm:blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 h-32 sm:w-56 sm:h-56 bg-gradient-to-br from-indigo-200/15 to-purple-200/10 rounded-full blur-xl sm:blur-2xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 sm:left-1/3 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-200/15 to-blue-200/10 rounded-full blur-lg sm:blur-xl"
        animate={{
          y: [-20, 20, -20],
          x: [-15, 15, -15],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
    </div>
  )
}