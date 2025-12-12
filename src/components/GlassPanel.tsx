'use client'

import { motion } from 'framer-motion'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function GlassPanel({ children, className = '', delay = 0 }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
