'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.08,
            duration: 0.5,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedHeading({ children, className = '', delay = 0 }: AnimatedHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className={className}
    >
      {children}
    </motion.h2>
  )
}

export function AnimatedParagraph({ children, className = '', delay = 0 }: AnimatedHeadingProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className={className}
    >
      {children}
    </motion.p>
  )
}
