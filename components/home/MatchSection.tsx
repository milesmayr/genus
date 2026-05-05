'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import AgentCard from '@/components/AgentCard'
import AgentModal from '@/components/AgentModal'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { AGENTS } from '@/lib/agents'

const SUGGESTED = AGENTS.filter((a) =>
  ['the-strategist', 'the-director', 'the-alchemist'].includes(a.slug)
).sort((a, b) =>
  ['the-strategist', 'the-director', 'the-alchemist'].indexOf(a.slug) -
  ['the-strategist', 'the-director', 'the-alchemist'].indexOf(b.slug)
)

type ModalState = { slug: string; agentImage?: string; creatorAvatar?: string } | null

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            display: 'block',
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.35)',
          }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function MatchSection() {
  const [text, setText] = useState('')
  const [showTyping, setShowTyping] = useState(false)
  const [modal, setModal] = useState<ModalState>(null)

  useEffect(() => {
    if (text.trim().length > 0) {
      setShowTyping(true)
      const timer = setTimeout(() => setShowTyping(false), 900)
      return () => clearTimeout(timer)
    } else {
      setShowTyping(false)
    }
  }, [text])

  return (
    <section style={{ backgroundColor: 'var(--off)' }} className="px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">

        {/* Heading + illustration row */}
        <div className="md:flex md:items-center md:gap-12 mb-10">
          <div className="md:flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: 'var(--font-archivoblack)',
                color: 'var(--ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Find the right thinking
              <br />
              for your brief.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.07, ease: EASE_OUT_EXPO }}
              style={{
                color: 'var(--mid)',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.65,
              }}
            >
              Describe what you&rsquo;re working on &mdash; one agent or a combination you&rsquo;d never assemble in real life.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="hidden md:block flex-shrink-0"
            style={{ width: 280 }}
          >
            <Image
              src="/illustrations/HomepageTeam.png"
              alt=""
              width={560}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Chat widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT_EXPO }}
          className="max-w-2xl mx-auto mb-8"
          style={{
            backgroundColor: 'var(--ink)',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Chat header — logo icon only, no wordmark */}
          <div
            className="flex items-center gap-2.5 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Image src="/Logo.png" alt="Genus" width={22} height={22} priority />
            <div className="ml-auto flex items-center gap-1.5">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'var(--green)',
                  display: 'block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--green)',
                }}
              >
                Active
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Image src="/Logo.png" alt="" width={30} height={30} />
              </div>
              <div
                style={{
                  backgroundColor: '#1c1c1a',
                  borderRadius: '2px 10px 10px 10px',
                  padding: '10px 14px',
                  maxWidth: '420px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-dmSans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                  }}
                >
                  Tell me what you&rsquo;re working on and I&rsquo;ll find the right thinking for you.
                  One agent, or an unexpected combination &mdash; whatever fits the brief.
                </p>
              </div>
            </div>

            <AnimatePresence>
              {showTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Image src="/Logo.png" alt="" width={30} height={30} />
                  </div>
                  <div
                    style={{
                      backgroundColor: '#1c1c1a',
                      borderRadius: '2px 10px 10px 10px',
                      padding: '10px 14px',
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div
            className="flex items-end gap-2 p-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              className="flex-1 resize-none outline-none bg-transparent"
              style={{
                fontFamily: 'var(--font-dmSans)',
                fontSize: '14px',
                fontWeight: 300,
                color: 'white',
                lineHeight: 1.55,
              }}
              placeholder="e.g. We're launching a fintech product and need to stress-test our brand positioning..."
            />
            <button
              className="flex-shrink-0 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
              style={{
                width: 32,
                height: 32,
                backgroundColor: text.trim() ? 'var(--yellow)' : 'rgba(255,255,255,0.1)',
                color: text.trim() ? 'var(--ink)' : 'rgba(255,255,255,0.3)',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
              aria-label="Send"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M6.5 11V2M6.5 2L2.5 6M6.5 2L10.5 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Agent cards — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {SUGGESTED.map((agent, i) => (
            <motion.div
              key={agent.agentSlug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: EASE_OUT_EXPO }}
            >
              <AgentCard
                agentName={agent.agentName}
                discipline={agent.discipline}
                creatorName={agent.creatorName}
                creatorSlug={agent.creatorSlug}
                agentSlug={agent.slug}
                rating={agent.rating}
                sessionCount={agent.sessionCount}
                satisfactionPct={agent.satisfactionPct}
                quote={agent.quote}
                isAvailable={agent.isAvailable}
                agentImage={agent.agentImage}
                creatorAvatar={agent.creatorAvatar}
                onClick={() => setModal({ slug: agent.slug })}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Explore CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            href="/agents"
            className="text-sm transition-opacity hover:opacity-60"
            style={{
              color: 'var(--ink)',
              fontFamily: 'var(--font-dmSans)',
              fontWeight: 400,
            }}
          >
            Explore all agents &rarr;
          </Link>
        </motion.div>
      </div>

      <AgentModal
        agentSlug={modal?.slug ?? null}
        agentImage={modal?.agentImage}
        creatorAvatar={modal?.creatorAvatar}
        onClose={() => setModal(null)}
        onSelectSlug={(slug) => setModal({ slug })}
      />
    </section>
  )
}
