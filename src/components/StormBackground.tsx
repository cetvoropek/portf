'use client'

import { useEffect, useState } from 'react'

export function StormBackground() {
  const [lightning, setLightning] = useState(false)

  useEffect(() => {
    const triggerLightning = () => {
      setLightning(true)
      setTimeout(() => setLightning(false), 150)

      // Random interval between 4-12 seconds
      const nextFlash = Math.random() * 8000 + 4000
      setTimeout(triggerLightning, nextFlash)
    }

    const timeout = setTimeout(triggerLightning, 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[var(--bg-primary)]">
      {/* Deep gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(30, 58, 138, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Moving fog layers for depth */}
      <div className="absolute inset-0 opacity-30">
        <div className="fog-layer fog-1" />
        <div className="fog-layer fog-2" />
      </div>

      {/* Rain container */}
      <div className="rain-container">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${(i * 1.03) % 100}%`,
              animationDelay: `${(i * 0.1) % 2}s`,
              animationDuration: `${0.5 + (i % 5) * 0.1}s`,
              opacity: 0.3 + (i % 4) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Lightning flash */}
      <div
        className={`absolute inset-0 bg-white/20 pointer-events-none transition-opacity duration-75 ${
          lightning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating particles for depth */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(i * 5.3) % 100}%`,
              top: `${(i * 7.1) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow animation-delay-2000" />
    </div>
  )
}
