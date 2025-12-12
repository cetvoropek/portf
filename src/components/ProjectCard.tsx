'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  features: string[]
  tone: string
  icon: React.ReactNode
  gradient: string
  index: number
}

export function ProjectCard({ title, description, features, tone, icon, gradient, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="window group cursor-pointer"
    >
      <div className="window-header">
        <div className="traffic-lights">
          <div className="traffic-light red" />
          <div className="traffic-light yellow" />
          <div className="traffic-light green" />
        </div>
        <span className="ml-3 text-sm font-medium text-[var(--text-secondary)]">{title}</span>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-start gap-5 mb-6">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`ios-icon shrink-0 ${gradient}`}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="heading-md mb-2">{title}</h3>
            <p className="body-md">{description}</p>
          </div>
        </div>

        <div className="grid gap-3 mb-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.05 + 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
            {tone}
          </span>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
          >

          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
