'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type Agent } from '@/lib/agents'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface Props {
  agent: Agent
}

export default function AgentProfileClient({ agent }: Props) {
  const initial = agent.creatorName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--off)' }}>
      {/* Dark header band */}
      <div className="px-5 md:px-12 pt-24 pb-12" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0, ease: EASE_OUT_EXPO }}
            className="mb-8"
          >
            <Link
              href="/agents"
              className="text-xs hover:opacity-70 transition-opacity"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
              }}
            >
              &larr; ALL AGENTS
            </Link>
          </motion.div>

          {/* Discipline label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: EASE_OUT_EXPO }}
            className="mb-3"
          >
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--yellow)' }}
            >
              {agent.discipline}
            </span>
          </motion.div>

          {/* Agent name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="text-4xl md:text-6xl text-white mb-3"
            style={{
              fontFamily: 'var(--font-archivoblack)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
            }}
          >
            {agent.agentName}
          </motion.h1>

          {/* Creator attribution */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT_EXPO }}
            className="text-sm mb-10"
            style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
          >
            by {agent.creatorName}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT_EXPO }}
            className="flex gap-8"
          >
            <StatItem label="Sessions" value={agent.sessionCount.toLocaleString()} />
            <StatItem label="Rating" value={agent.rating.toFixed(1)} />
            <StatItem label="Satisfied" value={`${agent.satisfactionPct}%`} />
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 md:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Quote block */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT_EXPO }}
            className="pl-5 py-1 mb-12 text-xl md:text-2xl italic leading-relaxed"
            style={{
              borderLeft: '2px solid var(--yellow)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-dmSans)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
            }}
          >
            &ldquo;{agent.quote}&rdquo;
          </motion.blockquote>

          {/* About */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE_OUT_EXPO }}
            className="mb-12"
          >
            <SectionLabel>About this agent</SectionLabel>
            {/* [PLACEHOLDER] */}
            {agent.bio.map((para, i) => (
              <p
                key={i}
                className={i < agent.bio.length - 1 ? 'mb-4' : ''}
                style={{ color: 'var(--mid)', lineHeight: 1.65, fontSize: '15px', fontWeight: 300 }}
              >
                {para}
              </p>
            ))}
          </motion.section>

          {/* Methodology */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT_EXPO }}
            className="mb-12"
          >
            <SectionLabel>How they work</SectionLabel>
            {/* [PLACEHOLDER] */}
            {agent.methodology.map((para, i) => (
              <p
                key={i}
                className={i < agent.methodology.length - 1 ? 'mb-4' : ''}
                style={{ color: 'var(--mid)', lineHeight: 1.65, fontSize: '15px', fontWeight: 300 }}
              >
                {para}
              </p>
            ))}
          </motion.section>

          {/* Hire CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36, ease: EASE_OUT_EXPO }}
            className="mb-12"
          >
            <motion.button
              whileHover={{ filter: 'brightness(1.1)' }}
              className="w-full h-14 text-sm font-medium"
              style={{
                fontFamily: 'var(--font-dmSans)',
                fontWeight: 500,
                backgroundColor: agent.isAvailable ? 'var(--yellow)' : 'var(--surface)',
                color: agent.isAvailable ? 'var(--ink)' : 'var(--muted)',
                borderRadius: '2px',
                cursor: agent.isAvailable ? 'pointer' : 'default',
              }}
            >
              {agent.isAvailable ? 'Hire this agent' : 'Join waitlist'} &rarr;
            </motion.button>
          </motion.div>

          {/* Works well with */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT_EXPO }}
            className="mb-12 p-5 border"
            style={{ borderColor: 'var(--rule)', borderRadius: '2px', backgroundColor: 'white' }}
          >
            <SectionLabel>Works well with</SectionLabel>
            <p className="text-sm" style={{ color: 'var(--muted)', fontWeight: 300, lineHeight: 1.65 }}>
              {/* [PLACEHOLDER] */}
              Collaborators coming soon.
            </p>
          </motion.section>

          {/* Creator card */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44, ease: EASE_OUT_EXPO }}
            className="p-5"
            style={{ backgroundColor: '#1a1a18', borderRadius: '2px' }}
          >
            {/* [PLACEHOLDER] */}
            <SectionLabel light>Creator</SectionLabel>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--ink)', borderRadius: '1px' }}
              >
                <span
                  className="text-base font-bold"
                  style={{ color: 'var(--yellow)', fontFamily: 'var(--font-archivoblack)' }}
                >
                  {initial}
                </span>
              </div>
              <div>
                <p className="text-sm text-white" style={{ fontFamily: 'var(--font-archivoblack)' }}>
                  {agent.creatorName}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--yellow)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {agent.discipline.toUpperCase()}
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-[10px] tracking-[0.18em] uppercase mb-4"
      style={{
        fontFamily: 'var(--font-mono)',
        color: light ? 'rgba(255,255,255,0.3)' : 'var(--muted)',
      }}
    >
      {children}
    </p>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[9px] tracking-[0.14em] uppercase"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}
      >
        {label}
      </span>
      <span className="text-xl" style={{ fontFamily: 'var(--font-archivoblack)', color: 'var(--yellow)' }}>
        {value}
      </span>
    </div>
  )
}
