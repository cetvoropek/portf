'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WindowCardProps {
  title: string
  children: React.ReactNode
  className?: string
  delay?: number
  expandable?: boolean
}

export function WindowCard({ title, children, className = '', delay = 0, expandable = false }: WindowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      layoutId={expandable ? `window-${title}` : undefined}
      onClick={expandable ? () => setIsExpanded(!isExpanded) : undefined}
      className={`window ${expandable ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="window-header">
        <div className="traffic-lights">
          <div className="traffic-light red" />
          <div className="traffic-light yellow" />
          <div className="traffic-light green" />
        </div>
        <span className="ml-3 text-sm font-medium text-[var(--text-secondary)]">{title}</span>
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  )
}
