'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ControlStrip from '@/components/ControlStrip'
import { EASE_OUT_EXPO } from '@/lib/motion'

type View = 'creators' | 'clients'

// ─── Shared animation ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
})

// ─── Shared primitives ───────────────────────────────────────────────────────

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className="mb-5"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: light ? 'rgba(255,255,255,0.3)' : 'var(--yellow)',
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading({
  children,
  dark = false,
  size = 'md',
}: {
  children: React.ReactNode
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const fontSize =
    size === 'lg'
      ? 'clamp(32px, 5vw, 64px)'
      : size === 'md'
      ? 'clamp(26px, 3.5vw, 44px)'
      : 'clamp(20px, 2.5vw, 32px)'

  return (
    <h2
      style={{
        fontFamily: 'var(--font-archivoblack)',
        fontSize,
        color: dark ? 'white' : 'var(--ink)',
        letterSpacing: '-0.04em',
        lineHeight: 1.0,
      }}
    >
      {children}
    </h2>
  )
}

function Body({
  children,
  dark = false,
  className = '',
}: {
  children: React.ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <p
      className={className}
      style={{
        fontSize: '15px',
        fontWeight: 300,
        color: dark ? 'rgba(255,255,255,0.5)' : 'var(--mid)',
        lineHeight: 1.75,
        fontFamily: 'var(--font-dmSans)',
      }}
    >
      {children}
    </p>
  )
}

function Divider() {
  return (
    <div
      className="w-8 mb-8 mt-1"
      style={{ height: 2, backgroundColor: 'var(--yellow)', opacity: 0.7 }}
    />
  )
}

function Dot({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className="flex-shrink-0 mt-[7px]"
      style={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        backgroundColor: dark ? 'rgba(255,255,255,0.3)' : 'var(--yellow)',
        display: 'block',
      }}
    />
  )
}

// ─── Illustration placeholder ─────────────────────────────────────────────────

function IllustrationPlaceholder({
  label,
  ratio = '2 / 1',
  dark = false,
}: {
  label: string
  ratio?: string
  dark?: boolean
}) {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        aspectRatio: ratio,
        border: `2px dashed ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
        borderRadius: '3px',
        backgroundColor: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        [ {label} ]
      </span>
    </div>
  )
}

// ─── Sticky pill toggle (on scroll) ──────────────────────────────────────────

function PillToggle({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <div
      className="inline-flex"
      style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: '4px',
        padding: '4px',
      }}
    >
      {(['creators', 'clients'] as View[]).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '10px 20px',
            borderRadius: '3px',
            transition: 'background-color 0.15s ease, color 0.15s ease',
            backgroundColor: view === v ? 'var(--yellow)' : 'transparent',
            color: view === v ? 'var(--ink)' : 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
          }}
        >
          For {v === 'creators' ? 'Creators' : 'Clients'}
        </button>
      ))}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const [view, setView] = useState<View>('creators')
  const [showStickyToggle, setShowStickyToggle] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyToggle(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* Sticky toggle bar — appears after header scrolls away */}
      <AnimatePresence>
        {showStickyToggle && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            className="fixed top-16 left-0 right-0 z-40 flex justify-center py-3"
            style={{
              backgroundColor: 'rgba(17,17,16,0.96)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <PillToggle view={view} setView={setView} />
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader view={view} setView={setView} headerRef={headerRef} />

      <AnimatePresence mode="wait">
        {view === 'creators' ? (
          <motion.div
            key="creators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <CreatorView />
          </motion.div>
        ) : (
          <motion.div
            key="clients"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ClientView />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// ─── Page header (compact — toggle is the headline) ──────────────────────────

function PageHeader({
  view,
  setView,
  headerRef,
}: {
  view: View
  setView: (v: View) => void
  headerRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <section
      ref={headerRef}
      className="px-5 md:px-12 pt-32 pb-14"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <Label light>System</Label>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: 'clamp(36px, 6vw, 80px)',
            color: 'white',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
          }}
        >
          How it works for
          <br />
          <button
            onClick={() => setView('creators')}
            style={{
              fontFamily: 'inherit',
              fontSize: 'inherit',
              letterSpacing: 'inherit',
              lineHeight: 'inherit',
              color: view === 'creators' ? 'var(--yellow)' : 'rgba(255,255,255,0.22)',
              transition: 'color 0.18s ease',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            Creators
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 0.2em' }}>/</span>
          <button
            onClick={() => setView('clients')}
            style={{
              fontFamily: 'inherit',
              fontSize: 'inherit',
              letterSpacing: 'inherit',
              lineHeight: 'inherit',
              color: view === 'clients' ? 'var(--yellow)' : 'rgba(255,255,255,0.22)',
              transition: 'color 0.18s ease',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            Clients
          </button>
        </motion.h1>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CREATOR VIEW
// ═══════════════════════════════════════════════════════════════════════════

function CreatorView() {
  return (
    <>
      <CreatorReframe />
      <CreatorOnboarding />
      <CreatorAgent />
      <CreatorShadow />
      <CreatorPerformance />
      <CreatorIP />
      <CreatorMonetisation />
      <CreatorClose />
    </>
  )
}

// C1 — Reframe ───────────────────────────────────────────────────────────────

function CreatorReframe() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-14">
          <motion.div {...fadeUp(0)}>
            <Label>What this is</Label>
            <SectionHeading size="lg">
              You&rsquo;re not building a tool.
              <br />
              You&rsquo;re codifying how you think.
            </SectionHeading>
            <Divider />
            <div
              className="flex flex-col gap-2"
              style={{
                fontFamily: 'var(--font-dmSans)',
                fontSize: '17px',
                fontWeight: 300,
                color: 'var(--mid)',
                lineHeight: 1.75,
              }}
            >
              <p>This isn&rsquo;t prompts.</p>
              <p>It&rsquo;s not content.</p>
              <p>It&rsquo;s not training data.</p>
              <br />
              <p>It&rsquo;s your judgment.</p>
              <p>Your taste.</p>
              <p>Your decisions under pressure.</p>
              <br />
              <p style={{ color: 'var(--ink)', fontWeight: 400 }}>Structured. Captured. Working.</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <IllustrationPlaceholder label="Illustration — what gets captured" ratio="3 / 4" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// C2 — Onboarding ────────────────────────────────────────────────────────────

function CreatorOnboarding() {
  const sessions = [
    {
      num: '01',
      title: 'Mapping how you approach problems.',
      detail: 'We surface your instincts, defaults, and the heuristics you apply before you even notice you are applying them.',
    },
    {
      num: '02',
      title: 'Pressure testing decisions and edge cases.',
      detail: 'Where do you hold the line? What would you never do? What does good enough look like versus genuinely right?',
    },
    {
      num: '03',
      title: 'Refining until it sounds like you.',
      detail: 'Iteration with you in the room. Not until it is accurate — until it is indistinguishable.',
    },
  ]

  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-16">
          <Label>The process</Label>
          <SectionHeading size="md">
            We don&rsquo;t upload your work.
            <br />
            We extract how you think.
          </SectionHeading>
          <Divider />
          <div
            className="flex flex-col gap-2 mb-8"
            style={{ fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75 }}
          >
            <p>You don&rsquo;t fill in forms.</p>
            <p>You don&rsquo;t dump files.</p>
            <br />
            <p>We work with you directly.</p>
            <p>Three focused sessions designed to surface:</p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              'How you make decisions',
              'What you optimise for',
              'Where you draw the line',
              'What you would never do',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Dot />
                <span style={{ fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Session cards — horizontal scroll on mobile, grid on desktop */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-5 px-5">
          {sessions.map((s, i) => (
            <motion.div
              key={s.num}
              {...fadeUp(i * 0.08)}
              className="flex-shrink-0 w-[280px]"
              style={{
                backgroundColor: 'var(--ink)',
                borderRadius: '3px',
                padding: '28px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <SessionCardInner s={s} />
            </motion.div>
          ))}
        </div>

        <div className="hidden md:grid grid-cols-3 gap-4 mb-14">
          {sessions.map((s, i) => (
            <motion.div
              key={s.num}
              {...fadeUp(i * 0.08)}
              style={{
                backgroundColor: 'var(--ink)',
                borderRadius: '3px',
                padding: '28px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <SessionCardInner s={s} />
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)}>
          <IllustrationPlaceholder label="Illustration — the extraction session" ratio="16 / 6" />
        </motion.div>
      </div>
    </section>
  )
}

function SessionCardInner({ s }: { s: { num: string; title: string; detail: string } }) {
  return (
    <>
      <div
        className="mb-6"
        style={{
          fontFamily: 'var(--font-archivoblack)',
          fontSize: '48px',
          color: 'var(--yellow)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        {s.num}
      </div>
      <div
        className="mb-3"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        Session
      </div>
      <h3
        className="mb-4 leading-snug"
        style={{
          fontFamily: 'var(--font-archivoblack)',
          fontSize: '17px',
          color: 'white',
          letterSpacing: '-0.02em',
        }}
      >
        {s.title}
      </h3>
      <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
        {s.detail}
      </p>
    </>
  )
}

// C3 — The Agent ─────────────────────────────────────────────────────────────

function CreatorAgent() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-16">
          <Label light>The output</Label>
          <SectionHeading size="lg" dark>
            This is your agent.
          </SectionHeading>
          <Divider />
          <p
            style={{
              fontSize: '17px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-dmSans)',
            }}
          >
            Not shared. Not blended. Not generic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-14">
          <motion.div {...fadeUp(0.06)}>
            <div
              className="mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              Architecture
            </div>
            <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
              Your agent is built as your layer.
              <br />
              Separate from the base model.
              <br />
              Never merged.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.12)}>
            <div
              className="mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              Behaviour
            </div>
            <div className="flex flex-col gap-3">
              {[
                'Makes similar calls to you',
                'Prioritises the same things',
                'Rejects what you would reject',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Dot dark />
                  <span style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.15)}>
          <IllustrationPlaceholder label="Illustration — agent architecture / your layer" ratio="16 / 5" dark />
        </motion.div>
      </div>
    </section>
  )
}

// C4 — Shadow Agent ──────────────────────────────────────────────────────────

function CreatorShadow() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: '#0d0d0b' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-12">
          <Label light>Quality system</Label>
          <SectionHeading size="md" dark>
            And the system that watches it.
          </SectionHeading>
          <Divider />
          <Body dark className="mb-8">
            Alongside your agent is a second layer.
            <br />
            A shadow system that runs in parallel.
          </Body>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Tracks outputs', sub: 'Every session logged against your baseline.' },
            { label: 'Detects drift', sub: 'Flags when responses diverge from your pattern.' },
            { label: 'Surfaces weak spots', sub: 'Identifies where the model hesitates or hedges.' },
            { label: 'Highlights failure cases', sub: 'Shows you what it got wrong and why.' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(i * 0.07)}
              className="p-5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: '3px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  fontSize: '13px',
                  color: 'white',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.label}
              </div>
              <p style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.1)}>
          <p
            style={{
              fontFamily: 'var(--font-archivoblack)',
              fontSize: 'clamp(22px, 3.5vw, 40px)',
              color: 'white',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            It doesn&rsquo;t just run.
            <br />
            <span style={{ color: 'var(--yellow)' }}>It gets better.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// C5 — Performance ───────────────────────────────────────────────────────────

function CreatorPerformance() {
  const cards = [
    { label: 'Sessions', body: 'Every interaction logged.' },
    { label: 'Edge cases', body: 'Where it fails. Where it needs work.' },
    { label: 'Benchmark', body: 'Compared against industry-level outputs.' },
  ]

  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>Performance</Label>
          <SectionHeading size="md">
            You see how your thinking performs.
          </SectionHeading>
          <Divider />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              {...fadeUp(i * 0.08)}
              className="p-6"
              style={{
                backgroundColor: 'var(--off)',
                borderRadius: '3px',
                border: '1px solid var(--rule)',
              }}
            >
              <div
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--yellow)',
                }}
              >
                {c.label}
              </div>
              <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp(0.1)}
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: 'var(--muted)',
            fontFamily: 'var(--font-dmSans)',
          }}
        >
          Not vanity metrics. Actual performance.
        </motion.p>
      </div>
    </section>
  )
}

// C6 — IP Protection ─────────────────────────────────────────────────────────

function CreatorIP() {
  const blocks = [
    { num: '01', label: 'Separation', body: 'Your model layer stays isolated (LoRA adapter structure).' },
    { num: '02', label: 'Access', body: 'Inference-only. No weight exposure.' },
    { num: '03', label: 'Attribution', body: 'Every session tied to your agent.' },
    { num: '04', label: 'Control', body: 'Pause. Restrict. Remove.' },
    { num: '05', label: 'Structure', body: 'Protected as a trade secret.' },
  ]

  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>IP protection</Label>
          <SectionHeading size="md">
            Your IP. Protected by design.
          </SectionHeading>
          <Divider />
        </motion.div>

        <div className="flex flex-col mb-10">
          {blocks.map((b, i) => (
            <motion.div
              key={b.num}
              {...fadeUp(i * 0.06)}
              className="flex items-start gap-6 py-5"
              style={{ borderBottom: '1px solid var(--rule)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  color: 'var(--yellow)',
                  flexShrink: 0,
                  paddingTop: '3px',
                }}
              >
                {b.num}
              </span>
              <div>
                <div
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--font-archivoblack)',
                    fontSize: '14px',
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                  }}
                >
                  {b.label}
                </div>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.1)}>
          <ControlStrip />
        </motion.div>
      </div>
    </section>
  )
}

// C7 — Monetisation ──────────────────────────────────────────────────────────

function CreatorMonetisation() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12">
          <Label light>Revenue</Label>
          <SectionHeading size="md" dark>
            It works. You earn.
          </SectionHeading>
          <Divider />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <motion.div {...fadeUp(0.06)}>
            <div className="flex flex-col gap-2" style={{ fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
              <p>Your agent is hired.</p>
              <p>Sessions run.</p>
              <p>You get paid.</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <div className="flex flex-col gap-2" style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>
              <p>You set pricing.</p>
              <p>Platform takes a percentage.</p>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.12)}>
          <p
            style={{
              fontFamily: 'var(--font-archivoblack)',
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              color: 'white',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
            }}
          >
            Your thinking.
            <br />
            <span style={{ color: 'var(--yellow)' }}>Working without you.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// C8 — Creator Close ─────────────────────────────────────────────────────────

function CreatorClose() {
  return (
    <section className="px-5 md:px-12 py-24 md:py-36" style={{ backgroundColor: '#0d0d0b' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <p
            className="mb-12"
            style={{
              fontFamily: 'var(--font-archivoblack)',
              fontSize: 'clamp(32px, 5.5vw, 72px)',
              color: 'white',
              letterSpacing: '-0.04em',
              lineHeight: 0.97,
            }}
          >
            Your genius
            <br />
            belongs to you.
            <br />
            <span style={{ color: 'var(--yellow)' }}>Now it works like it.</span>
          </p>

          <Link
            href="/apply"
            className="inline-flex items-center px-8 py-4 rounded-sm text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              fontFamily: 'var(--font-dmSans)',
              backgroundColor: 'var(--yellow)',
              color: 'var(--ink)',
            }}
          >
            Apply as a creator &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CLIENT VIEW
// ═══════════════════════════════════════════════════════════════════════════

function ClientView() {
  return (
    <>
      <ClientReframe />
      <ClientValue />
      <ClientUsage />
      <ClientUseCases />
      <ClientTeamModel />
      <ClientMentorship />
      <ClientIntegration />
      <ClientClose />
    </>
  )
}

// CL1 — Reframe ──────────────────────────────────────────────────────────────

function ClientReframe() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div {...fadeUp(0)}>
            <Label>What this is</Label>
            <SectionHeading size="lg">
              You&rsquo;re not hiring AI.
              <br />
              You&rsquo;re hiring how someone thinks.
            </SectionHeading>
            <Divider />
            <div
              className="flex flex-col gap-2"
              style={{ fontSize: '17px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75 }}
            >
              <p>Not generic outputs.</p>
              <p>Not anonymous systems.</p>
              <br />
              <p style={{ color: 'var(--ink)', fontWeight: 400 }}>
                Named expertise. Structured and usable.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <IllustrationPlaceholder label="Illustration — named expertise" ratio="3 / 4" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CL2 — Value ────────────────────────────────────────────────────────────────

function ClientValue() {
  const cards = [
    { label: 'Clarity', body: 'Cut through noise. Get to what matters.' },
    { label: 'Direction', body: 'Work through ideas. Make progress.' },
    { label: 'Judgment', body: 'Real decisions, not a list of options.' },
  ]

  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>What you get</Label>
          <SectionHeading size="md">
            A point of view you can use.
          </SectionHeading>
          <Divider />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              {...fadeUp(i * 0.08)}
              className="p-7"
              style={{
                backgroundColor: 'var(--ink)',
                borderRadius: '3px',
              }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  fontSize: '20px',
                  color: 'var(--yellow)',
                  letterSpacing: '-0.02em',
                }}
              >
                {c.label}
              </div>
              <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CL3 — Usage ────────────────────────────────────────────────────────────────

function ClientUsage() {
  const steps = ['Ask', 'Push', 'Refine', 'Decide']

  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-16">
          <Label light>How it feels</Label>
          <SectionHeading size="md" dark>
            Work with it like you would them.
          </SectionHeading>
          <Divider />
        </motion.div>

        <motion.div {...fadeUp(0.08)} className="flex flex-wrap items-center gap-3 mb-12">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  fontSize: 'clamp(20px, 3vw, 32px)',
                  color: i === 3 ? 'var(--yellow)' : 'white',
                  letterSpacing: '-0.03em',
                }}
              >
                {step}
              </span>
              {i < steps.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '20px' }}>&rarr;</span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.12)} className="mb-10">
          <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-dmSans)' }}>
            Session-based. Direct. No friction.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.16)}>
          <IllustrationPlaceholder label="Illustration — a session in action" ratio="16 / 6" dark />
        </motion.div>
      </div>
    </section>
  )
}

// CL4 — Use Cases ────────────────────────────────────────────────────────────

function ClientUseCases() {
  const cases = [
    { discipline: 'Brand Strategy', uses: 'Positioning, naming, critique' },
    { discipline: 'Creative Direction', uses: 'Concepts, refinement, review' },
    { discipline: 'UX / Product', uses: 'Flows, systems, edge cases' },
    { discipline: 'Screenwriting', uses: 'Structure, character, voice' },
  ]

  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>Disciplines</Label>
          <SectionHeading size="md">Where it shows up.</SectionHeading>
          <Divider />
        </motion.div>

        <div className="flex flex-col">
          {cases.map((c, i) => (
            <motion.div
              key={c.discipline}
              {...fadeUp(i * 0.06)}
              className="flex items-start md:items-center justify-between py-6 gap-4"
              style={{ borderBottom: '1px solid var(--rule)' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  fontSize: '18px',
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {c.discipline}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 300, color: 'var(--mid)' }}>
                {c.uses}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CL5 — Team Model ───────────────────────────────────────────────────────────

function ClientTeamModel() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div {...fadeUp(0)}>
            <Label>Combination</Label>
            <SectionHeading size="md">
              Hire one mind.
              <br />
              Or a system of them.
            </SectionHeading>
            <Divider />
            <Body>
              Combine agents across disciplines.
              Strategy, creative, product — working together on the same brief.
              Each bringing their own point of view.
            </Body>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <IllustrationPlaceholder label="Illustration — agent combinations" ratio="4 / 3" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CL6 — Mentorship ───────────────────────────────────────────────────────────

function ClientMentorship() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Label>For teams</Label>
          <SectionHeading size="md">Your team gets better.</SectionHeading>
          <Divider />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">
          <motion.div {...fadeUp(0.06)}>
            <Body>
              Juniors learn by working alongside real expertise.
              Not approximations. Not averages. The actual thinking of people who have done this for decades.
            </Body>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <div className="flex flex-col gap-3">
              {['The decisions being made', 'The trade-offs being weighed', 'The thinking in action'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Dot />
                  <span style={{ fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.12)}>
          <p
            style={{
              fontFamily: 'var(--font-archivoblack)',
              fontSize: 'clamp(22px, 3.5vw, 40px)',
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            This is how you
            <br />
            <span style={{ color: 'var(--yellow)' }}>scale taste.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// CL7 — Integration ──────────────────────────────────────────────────────────

function ClientIntegration() {
  const tools = ['Slack', 'Notion', 'API']

  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Label>Integration</Label>
          <SectionHeading size="md">Works where you work.</SectionHeading>
          <Divider />
        </motion.div>

        <motion.div {...fadeUp(0.06)} className="max-w-lg mb-10">
          <Body>
            Start inside Genus. Then extend into the tools your team already uses.
          </Body>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-3">
          {tools.map((t) => (
            <span
              key={t}
              className="px-4 py-2.5"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--mid)',
                backgroundColor: 'var(--surface)',
                borderRadius: '3px',
                border: '1px solid var(--rule)',
              }}
            >
              {t === 'API' ? `${t} [PLACEHOLDER]` : t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// CL8 — Client Close ─────────────────────────────────────────────────────────

function ClientClose() {
  return (
    <section className="px-5 md:px-12 py-24 md:py-36" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <p
            className="mb-12"
            style={{
              fontFamily: 'var(--font-archivoblack)',
              fontSize: 'clamp(32px, 5.5vw, 72px)',
              color: 'white',
              letterSpacing: '-0.04em',
              lineHeight: 0.97,
            }}
          >
            Not a chatbot.
            <br />
            <span style={{ color: 'var(--yellow)' }}>
              The thinking behind the work.
            </span>
          </p>

          <Link
            href="/agents"
            className="inline-flex items-center px-8 py-4 rounded-sm text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              fontFamily: 'var(--font-dmSans)',
              backgroundColor: 'var(--yellow)',
              color: 'var(--ink)',
            }}
          >
            Find your Genus &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
