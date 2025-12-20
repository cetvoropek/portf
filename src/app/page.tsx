'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Dock } from '@/components/Dock'
import { StormBackground } from '@/components/StormBackground'
import { Section } from '@/components/Section'
import { ProjectCard } from '@/components/ProjectCard'
import { WindowCard } from '@/components/WindowCard'
import { GlassPanel } from '@/components/GlassPanel'
import { AnimatedText, AnimatedHeading, AnimatedParagraph } from '@/components/AnimatedText'

const projects = [
  {
    title: 'Digital Permit Book',
    description: 'Fleet compliance platform for trucking companies. Everything inspectors need, nothing they don\'t.',
    features: [
      'DOT compliance & permit management',
      'Offline-first architecture',
      'Inspector-ready document retrieval',
      'Real-world compliance problem solving',
    ],
    tone: 'Industrial / Trusted',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'TruckRecruit / ChatterHire',
    description: 'AI-assisted recruiting and candidate evaluation. Decisions backed by data, not gut feelings.',
    features: [
      'Intelligent candidate screening',
      'Custom skill assessments',
      'Admin-only analytics dashboard',
      'Automated decision workflows',
    ],
    tone: 'Sharp / Efficient',
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Construction Expense Tracker',
    description: 'CEO-level visibility into every dollar. Know your real margins, not your imaginary ones.',
    features: [
      'Worker profiles & salary tracking',
      'Real-time profit visibility',
      'Waste-exposing analytics',
      'Project-level cost breakdown',
    ],
    tone: 'Analytical / Confident',
    gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Impulse Purchase Firewall',
    description: 'A 48-hour barrier between you and regret. Your wallet\'s new best friend.',
    features: [
      '48-hour purchase cooling period',
      'Decision-challenging prompts',
      'Brutally honest feedback loop',
      'Behavioral pattern insights',
    ],
    tone: 'Bold / Provocative',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const philosophy = [
  {
    title: 'Real Problems First',
    description: 'Every project starts with a problem someone actually has. No solutions looking for problems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Clarity Over Features',
    description: 'The best feature is the one you don\'t need to build. Complexity is easy. Simplicity is hard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 6h16M4 12h16M4 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Systems Over Hacks',
    description: 'Quick fixes compound into debt. Proper architecture pays dividends for years.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: 'Respect the User',
    description: 'Time is finite. Attention is scarce. Design for humans, not engagement metrics.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  return (
    <div ref={containerRef} className="relative">
      <StormBackground />
      <Dock />

      {/* Hero Section */}
      <Section id="home" className="relative overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">Available for projects</span>
            </div>
          </motion.div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            <AnimatedText text="Building systems that" delay={0.3} />
            <br />
            <span className="text-[var(--accent)]">
              <AnimatedText text="solve real problems." delay={0.5} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="body-lg max-w-2xl mb-12"
          >
            Developer and founder focused on building products people actually depend on.
            Not hobby projects. Not experiments. Real tools for real businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-[var(--text-tertiary)]"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </Section>

      {/* Work Section */}
      <Section id="work">
        <AnimatedHeading className="heading-lg mb-4">
          Work
        </AnimatedHeading>
        <AnimatedParagraph className="body-lg mb-16 max-w-2xl" delay={0.1}>
          Products built to solve specific problems for specific people.
          Each one designed like it matters — because it does.
        </AnimatedParagraph>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </Section>

      {/* How I Build Section */}
      <Section id="process">
        <AnimatedHeading className="heading-lg mb-4">
          How I Build
        </AnimatedHeading>
        <AnimatedParagraph className="body-lg mb-16 max-w-2xl" delay={0.1}>
          Philosophy matters more than process. These principles guide every decision.
        </AnimatedParagraph>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophy.map((item, index) => (
            <GlassPanel key={item.title} delay={index * 0.1}>
              <div className="flex items-center gap-3 mb-4 text-[var(--accent)]">
                {item.icon}
                <h3 className="font-semibold text-[var(--text-primary)]">{item.title}</h3>
              </div>
              <p className="body-sm">{item.description}</p>
            </GlassPanel>
          ))}
        </div>

        <WindowCard title="approach.md" className="mt-12" delay={0.4}>
          <div className="font-mono text-sm space-y-2">
            <p className="text-[var(--text-tertiary)]"># The approach</p>
            <p className="text-[var(--text-secondary)]">
              Every product starts with one question: <span className="text-[var(--text-primary)]">Who needs this, and why?</span>
            </p>
            <p className="text-[var(--text-secondary)]">
              If the answer isn't crystal clear, the project doesn't start.
            </p>
            <p className="text-[var(--text-secondary)]">
              No vanity features. No bloat. No "what if we also added..."
            </p>
            <p className="text-[var(--accent)]">
              Just tools that work, for people who need them.
            </p>
          </div>
        </WindowCard>
      </Section>

      {/* About Section */}
      <Section id="about">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedHeading className="heading-lg mb-6">
              Developer. Product thinker. Founder mindset.
            </AnimatedHeading>
            <div className="space-y-4">
              <AnimatedParagraph className="body-md" delay={0.1}>
                I build software that businesses depend on. Not apps that get downloaded and forgotten.
                Not features that look good in demos. Tools that become part of how people work.
              </AnimatedParagraph>
              <AnimatedParagraph className="body-md" delay={0.2}>
                The products above aren't portfolio pieces — they're running systems handling real data
                for real companies. Fleet managers checking compliance. Recruiters evaluating candidates.
                Business owners understanding their margins.
              </AnimatedParagraph>
              <AnimatedParagraph className="body-md" delay={0.3}>
                I care about the details because the details matter. A loading state that doesn't frustrate.
                An error message that actually helps. A workflow that respects someone's time.
              </AnimatedParagraph>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border)]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          <WindowCard title="stats.json" delay={0.2}>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[var(--border)]">
                <span className="body-sm">Products shipped</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">25+</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[var(--border)]">
                <span className="body-sm">Active users</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">25,000+</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[var(--border)]">
                <span className="body-sm">Uptime commitment</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-sm">Response time</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">&lt;24h</span>
              </div>
            </div>
          </WindowCard>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedHeading className="heading-lg mb-6">
            Let's build something.
          </AnimatedHeading>
          <AnimatedParagraph className="body-lg mb-12" delay={0.1}>
            Have a project that needs serious engineering? A business problem that needs a real solution?
            I'm selective about projects — but if there's a fit, let's talk.
          </AnimatedParagraph>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <WindowCard title="contact.sh" className="text-left">
              <div className="font-mono text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-tertiary)]">$</span>
                  <span className="text-[var(--text-secondary)]">email</span>
                  <a href="mailto:meekeelangelo@gmail.com" className="text-[var(--accent)] hover:underline transition-all">meekeelangelo@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-tertiary)]">$</span>
                  <span className="text-[var(--text-secondary)]">github</span>
                  <a href="https://github.com/cetvoropek" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline transition-all">github.com/cetvoropek</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-tertiary)]">$</span>
                  <span className="text-[var(--text-secondary)]">linkedin</span>
                  <a href="https://linkedin.com/in/meekeelangelo" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline transition-all">@meekeelangelo</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-tertiary)]">$</span>
                  <span className="text-[var(--text-secondary)]">discord</span>
                  <a href="https://discord.com/users/fsocietydev" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline transition-all">@fsocietydev</a>
                </div>
              </div>
            </WindowCard>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="body-sm mt-8"
          >
            Response within 24 hours. No automated replies.
          </motion.p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="body-sm">
            Designed and built with precision.
          </p>
          <p className="body-sm">
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Spacer for dock */}
      <div className="h-24" />
    </div>
  )
}
