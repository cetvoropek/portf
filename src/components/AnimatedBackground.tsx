'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        animate={{
          x: mounted ? `calc(${mousePosition.x}vw - 400px)` : 'calc(50vw - 400px)',
          y: mounted ? `calc(${mousePosition.y}vh - 400px)` : 'calc(50vh - 400px)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        style={{
          background: 'radial-gradient(circle, rgba(41, 151, 255, 0.15) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Primary blob - Blue */}
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Secondary blob - Purple */}
      <motion.div
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[30%] -right-[150px] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Tertiary blob - Cyan */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[5%] left-[10%] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Fourth blob - Pink/Magenta */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -60, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Slow rotating glow ring */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmax] h-[120vmax]"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(59, 130, 246, 0.08) 25%, transparent 50%, rgba(168, 85, 247, 0.08) 75%, transparent 100%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Ambient glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50vh]"
        style={{
          background: 'linear-gradient(to top, rgba(59, 130, 246, 0.05) 0%, transparent 100%)',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.2) 100%)',
        }}
      />
    </div>
  )
}
