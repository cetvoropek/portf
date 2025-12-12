'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'

interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
}

const sections = ['home', 'work', 'process', 'about', 'contact'] as const

export function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { theme, setTheme } = useTheme()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const dockItems: DockItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      onClick: () => scrollToSection('home'),
    },
    {
      id: 'work',
      label: 'Work',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      onClick: () => scrollToSection('work'),
    },
    {
      id: 'process',
      label: 'Process',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      onClick: () => scrollToSection('process'),
    },
    {
      id: 'about',
      label: 'About',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      onClick: () => scrollToSection('about'),
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
          <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      onClick: () => scrollToSection('contact'),
    },
  ]

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="dock flex items-center gap-1">
        {dockItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={item.onClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors hover:bg-[var(--bg-tertiary)]"
            animate={{
              scale: hoveredIndex === index ? 1.3 :
                     hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1 ? 1.15 :
                     hoveredIndex !== null && Math.abs(hoveredIndex - index) === 2 ? 1.05 : 1,
              y: hoveredIndex === index ? -8 :
                 hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1 ? -4 : 0,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className="text-[var(--text-primary)]">{item.icon}</span>

            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                {item.label}
              </motion.div>
            )}
          </motion.button>
        ))}

        <div className="w-px h-8 bg-[var(--border)] mx-1" />

        <motion.button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-xl transition-colors hover:bg-[var(--bg-tertiary)]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[var(--text-primary)]">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[var(--text-primary)]">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  )
}
