'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AGENTS, getAgentBySlug, type Agent } from '@/lib/agents'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface Props {
  agentSlug: string | null
  agentImage?: string
  creatorAvatar?: string
  onClose: () => void
  onSelectSlug: (slug: string) => void
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}

export default function AgentModal({
  agentSlug,
  agentImage,
  creatorAvatar,
  onClose,
  onSelectSlug,
}: Props) {
  const [mounted, setMounted] = useState(false)
  const isDesktop = useIsDesktop()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!agentSlug) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [agentSlug])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!mounted) return null

  const agent = agentSlug ? getAgentBySlug(agentSlug) : null

  const panelStyle = isDesktop
    ? {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        marginLeft: '-240px',
        width: '480px',
        maxHeight: '88vh',
        backgroundColor: '#141412',
        borderRadius: '8px',
        overflow: 'hidden',
      }
    : {
        position: 'fixed' as const,
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '92dvh',
        backgroundColor: '#141412',
        borderRadius: '6px 6px 0 0',
        overflow: 'hidden',
      }

  return createPortal(
    <AnimatePresence>
      {agent && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="z-50 overflow-y-auto"
            style={panelStyle}
            initial={isDesktop ? { opacity: 0, scale: 0.96, y: '-48%' } : { y: '100%' }}
            animate={isDesktop ? { opacity: 1, scale: 1, y: '-50%' } : { y: 0 }}
            exit={isDesktop ? { opacity: 0, scale: 0.96, y: '-48%' } : { y: '100%' }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          >
            <ModalInner
              agent={agent}
              agentImage={agentImage}
              creatorAvatar={creatorAvatar}
              onClose={onClose}
              onSelectSlug={onSelectSlug}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function ModalInner({
  agent,
  agentImage,
  creatorAvatar,
  onClose,
  onSelectSlug,
}: {
  agent: Agent
  agentImage?: string
  creatorAvatar?: string
  onClose: () => void
  onSelectSlug: (slug: string) => void
}) {
  const [view, setView] = useState<'agent' | 'creator'>('agent')
  const collaborators = AGENTS.filter((a) => agent.collaboratorSlugs.includes(a.slug))
  const initial = agent.creatorName.charAt(0).toUpperCase()

  // Reset to agent view when the agent changes
  useEffect(() => { setView('agent') }, [agent.slug])

  return (
    <AnimatePresence mode="wait">
      {view === 'agent' ? (
        <motion.div
          key="agent-view"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Visual header */}
          <div className="relative w-full" style={{ height: '200px', backgroundColor: '#0d0d0b' }}>
            {agentImage ? (
              <Image src={agentImage} alt={agent.agentName} fill className="object-cover" sizes="480px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span style={{ fontFamily: 'var(--font-archivoblack)', fontSize: '100px', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>
                  {initial}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <span
              className="absolute bottom-4 left-5 text-[8px] tracking-[0.12em] uppercase px-2 py-1"
              style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: agent.isAvailable ? 'rgba(26,102,64,0.45)' : 'rgba(102,100,96,0.3)',
                color: agent.isAvailable ? 'var(--green)' : 'var(--muted)',
                borderRadius: '2px',
                backdropFilter: 'blur(4px)',
              }}
            >
              {agent.isAvailable ? 'Available' : 'Waitlist'}
            </span>
          </div>

          {/* Body */}
          <div className="px-5 pt-5 pb-8">
            {/* Creator row — clickable */}
            <button
              onClick={() => setView('creator')}
              className="flex items-center gap-2.5 mb-4 group w-full text-left"
            >
              {creatorAvatar ? (
                <Image src={creatorAvatar} alt={agent.creatorName} width={28} height={28} className="rounded-full object-cover flex-shrink-0" style={{ width: 28, height: 28 }} />
              ) : (
                <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: 28, height: 28, backgroundColor: 'rgba(232,184,32,0.15)' }}>
                  <span className="text-xs leading-none" style={{ color: 'var(--yellow)', fontFamily: 'var(--font-archivoblack)' }}>{initial}</span>
                </div>
              )}
              <span className="text-xs group-hover:text-white transition-colors duration-150" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dmSans)', fontWeight: 300 }}>
                {agent.creatorName}
              </span>
              <span className="text-[9px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
                VIEW →
              </span>
            </button>

            <h2 className="text-2xl text-white mb-2 leading-tight" style={{ fontFamily: 'var(--font-archivoblack)', letterSpacing: '-0.02em' }}>
              {agent.agentName}
            </h2>
            <span className="inline-block text-[8px] tracking-[0.12em] uppercase px-2 py-1 mb-5" style={{ fontFamily: 'var(--font-mono)', backgroundColor: 'rgba(232,184,32,0.1)', color: 'var(--yellow)', borderRadius: '2px' }}>
              {agent.discipline}
            </span>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-px mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <StatCell label="Sessions" value={agent.sessionCount.toLocaleString()} />
              <StatCell label="Rating" value={agent.rating.toFixed(1)} />
              <StatCell label="Satisfied" value={`${agent.satisfactionPct}%`} />
            </div>

            {/* Quote */}
            <p className="text-sm leading-relaxed mb-6 pl-3 italic" style={{ borderLeft: '2px solid var(--yellow)', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-dmSans)', fontWeight: 300 }}>
              &ldquo;{agent.quote}&rdquo;
            </p>

            {/* Clients */}
            <SectionLabel>Clients worked with</SectionLabel>
            <div className="flex flex-wrap gap-2 mb-6">
              {agent.clients.map((client) => (
                <span key={client} className="text-[9px] tracking-[0.1em] uppercase px-2.5 py-1.5" style={{ fontFamily: 'var(--font-mono)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', borderRadius: '2px' }}>
                  {client}
                </span>
              ))}
            </div>

            {/* Power collaborations */}
            {collaborators.length > 0 && (
              <>
                <SectionLabel>Power collaborations</SectionLabel>
                <div className="flex flex-col gap-2 mb-6">
                  {collaborators.map((collab) => (
                    <button
                      key={collab.slug}
                      onClick={() => onSelectSlug(collab.slug)}
                      className="flex items-center gap-3 p-3 text-left transition-opacity hover:opacity-80 w-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: 32, height: 32, backgroundColor: 'rgba(232,184,32,0.12)' }}>
                        <span className="text-xs leading-none" style={{ color: 'var(--yellow)', fontFamily: 'var(--font-archivoblack)' }}>
                          {collab.creatorName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white leading-tight" style={{ fontFamily: 'var(--font-archivoblack)' }}>{collab.agentName}</div>
                        <div className="text-[9px] tracking-[0.1em] uppercase mt-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>{collab.discipline}</div>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>&rarr;</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* CTA */}
            <Link
              href={`/agents/${agent.slug}`}
              className="flex items-center justify-center w-full h-12 text-sm font-medium transition-opacity hover:opacity-90"
              style={{ fontFamily: 'var(--font-dmSans)', fontWeight: 500, backgroundColor: agent.isAvailable ? 'var(--yellow)' : 'rgba(255,255,255,0.08)', color: agent.isAvailable ? 'var(--ink)' : 'rgba(255,255,255,0.4)', borderRadius: '2px' }}
            >
              {agent.isAvailable ? 'Hire this agent' : 'Join waitlist'} &rarr;
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="creator-view"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          <CreatorView agent={agent} creatorAvatar={creatorAvatar} onBack={() => setView('agent')} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CreatorView({
  agent,
  creatorAvatar,
  onBack,
  onClose,
}: {
  agent: Agent
  creatorAvatar?: string
  onBack: () => void
  onClose: () => void
}) {
  const initial = agent.creatorName.charAt(0).toUpperCase()

  return (
    <div className="px-5 pt-6 pb-8">
      {/* Nav row */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs transition-opacity hover:opacity-70"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}
        >
          <span>←</span> BACK
        </button>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Creator identity */}
      <div className="flex items-center gap-4 mb-6">
        {creatorAvatar ? (
          <Image src={creatorAvatar} alt={agent.creatorName} width={56} height={56} className="rounded-full object-cover flex-shrink-0" style={{ width: 56, height: 56 }} />
        ) : (
          <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: 56, height: 56, backgroundColor: 'rgba(232,184,32,0.15)' }}>
            <span style={{ color: 'var(--yellow)', fontFamily: 'var(--font-archivoblack)', fontSize: '22px' }}>{initial}</span>
          </div>
        )}
        <div>
          <h2 className="text-xl text-white leading-tight mb-1" style={{ fontFamily: 'var(--font-archivoblack)', letterSpacing: '-0.02em' }}>
            {agent.creatorName}
          </h2>
          <span className="text-[8px] tracking-[0.12em] uppercase px-2 py-1" style={{ fontFamily: 'var(--font-mono)', backgroundColor: 'rgba(232,184,32,0.1)', color: 'var(--yellow)', borderRadius: '2px' }}>
            {agent.discipline}
          </span>
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-3 mb-8">
        {agent.bio.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-dmSans)', fontWeight: 300 }}>
            {para}
          </p>
        ))}
      </div>

      {/* Agent attribution */}
      <div className="p-4 mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[9px] tracking-[0.12em] uppercase mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.25)' }}>
          Their agent
        </p>
        <p className="text-sm text-white" style={{ fontFamily: 'var(--font-archivoblack)' }}>
          {agent.agentName}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-dmSans)', fontWeight: 300 }}>
          Built with Genus. Shaped by them.
        </p>
      </div>

      <button
        onClick={onBack}
        className="flex items-center justify-center w-full h-12 text-sm transition-opacity hover:opacity-90"
        style={{ fontFamily: 'var(--font-dmSans)', fontWeight: 500, backgroundColor: 'var(--yellow)', color: 'var(--ink)', borderRadius: '2px' }}
      >
        Back to {agent.agentName} &rarr;
      </button>
    </div>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-3 gap-1" style={{ backgroundColor: '#1a1a18' }}>
      <span className="text-[8px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>{label}</span>
      <span className="text-lg leading-none" style={{ fontFamily: 'var(--font-archivoblack)', color: 'var(--yellow)' }}>{value}</span>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] tracking-[0.16em] uppercase mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.25)' }}>
      {children}
    </p>
  )
}
