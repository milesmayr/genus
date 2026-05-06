'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

type View = 'creators' | 'clients'

// ─── Animation helper ─────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
})

// ─── Shared primitives ────────────────────────────────────────────────────────

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

function Divider({ light = false }: { light?: boolean }) {
  return (
    <div
      className="w-8 mb-8 mt-1"
      style={{ height: 2, backgroundColor: light ? 'rgba(255,255,255,0.2)' : 'var(--yellow)', opacity: 0.7 }}
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

// ─── Placeholder components ───────────────────────────────────────────────────
// Three distinct visual textures:
//   EditorialSlot  → hatched diagonal pattern  (photographic / human moments)
//   ProductSlot    → fine grid pattern          (UI, diagrams, structured data)
//   [no component] → literal whitespace         (typography-only sections)

function EditorialSlot({
  label,
  sub,
  ratio = '16 / 6',
  dark = false,
}: {
  label: string
  sub?: string
  ratio?: string
  dark?: boolean
}) {
  const stripe = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-2 px-6"
      style={{
        aspectRatio: ratio,
        backgroundImage: `repeating-linear-gradient(45deg, ${stripe} 0px, ${stripe} 1px, transparent 1px, transparent 9px)`,
        borderRadius: '2px',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
          textAlign: 'center',
        }}
      >
        Editorial / Textural — {label}
      </span>
      {sub && (
        <span
          style={{
            fontFamily: 'var(--font-dmSans)',
            fontSize: '11px',
            fontWeight: 300,
            color: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)',
            textAlign: 'center',
            maxWidth: '360px',
          }}
        >
          {sub}
        </span>
      )}
    </div>
  )
}

function ProductSlot({
  label,
  sub,
  items,
  ratio,
  dark = false,
  tall = false,
}: {
  label: string
  sub?: string
  items?: string[]
  ratio?: string
  dark?: boolean
  tall?: boolean
}) {
  const gridLine = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
  return (
    <div
      className="w-full"
      style={{
        aspectRatio: ratio,
        minHeight: tall ? '320px' : undefined,
        backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
        backgroundSize: '22px 22px',
        borderRadius: '3px',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
        }}
      >
        Product / Structural — {label}
      </div>
      {sub && (
        <p
          style={{
            fontFamily: 'var(--font-dmSans)',
            fontSize: '12px',
            fontWeight: 300,
            color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.22)',
            lineHeight: 1.6,
            maxWidth: '480px',
          }}
        >
          {sub}
        </p>
      )}
      {items && items.length > 0 && (
        <ul className="flex flex-col gap-2 mt-1">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2"
              style={{ fontFamily: 'var(--font-dmSans)', fontSize: '11px', fontWeight: 300, color: dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.22)', lineHeight: 1.55 }}
            >
              <span style={{ flexShrink: 0, color: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)' }}>–</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Small abstract pricing diagrams ─────────────────────────────────────────

function WaveLine({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'
  return (
    <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
      <path d="M 0 18 Q 6 6 12 14 Q 18 22 24 10 Q 30 0 36 8 Q 42 16 48 4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FlatBar({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'
  return (
    <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
      <line x1="0" y1="11" x2="48" y2="11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FloorAndPeak({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'
  return (
    <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
      <path d="M 0 16 H 16 L 20 4 L 24 16 H 48" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Sticky pill toggle (visible after header scrolls away) ───────────────────

function PillToggle({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <div
      className="inline-flex"
      style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '4px', padding: '4px' }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

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
          <motion.div key="creators" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <CreatorView />
          </motion.div>
        ) : (
          <motion.div key="clients" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <ClientView />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// ─── Page header — typography-only, toggle is the headline ───────────────────

function PageHeader({
  view,
  setView,
  headerRef,
}: {
  view: View
  setView: (v: View) => void
  headerRef: React.RefObject<HTMLDivElement>
}) {
  const subtitles: Record<View, string> = {
    creators: 'A system built around how you actually think — shaped with you, owned by you.',
    clients: 'Real expertise, structured into agents you can actually work with.',
  }
  return (
    <section
      ref={headerRef}
      className="px-5 md:px-12 pt-32 pb-14"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}>
          <Label light>System</Label>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE_OUT_EXPO }}
          className="mb-5"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: 'clamp(36px, 6vw, 80px)',
            color: 'white',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
          }}
        >
          How Genus works for
          <br />
          <button
            onClick={() => setView('creators')}
            style={{
              fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit',
              color: view === 'creators' ? 'var(--yellow)' : 'rgba(255,255,255,0.22)',
              transition: 'color 0.18s ease', cursor: 'pointer', background: 'none', border: 'none', padding: 0,
            }}
          >
            Creators
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 0.2em' }}>/</span>
          <button
            onClick={() => setView('clients')}
            style={{
              fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit',
              color: view === 'clients' ? 'var(--yellow)' : 'rgba(255,255,255,0.22)',
              transition: 'color 0.18s ease', cursor: 'pointer', background: 'none', border: 'none', padding: 0,
            }}
          >
            Clients
          </button>
        </motion.h1>
        <AnimatePresence mode="wait">
          <motion.p
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            style={{ fontFamily: 'var(--font-dmSans)', fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: '480px' }}
          >
            {subtitles[view]}
          </motion.p>
        </AnimatePresence>
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
      <CreatorBelief />
      <CreatorWorkshop />
      <CreatorSystem />
      <CreatorCritiqueLoop />
      <CreatorProtection />
      <CreatorEarnings />
      <CreatorDeployment />
      <CreatorClose />
    </>
  )
}

// C1 — Belief — TYPOGRAPHY-ONLY ───────────────────────────────────────────────

function CreatorBelief() {
  return (
    <section className="bg-white px-5 md:px-12 py-24 md:py-36">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-20">
          <SectionHeading size="lg">
            Great work isn&rsquo;t just output.
            <br />
            It&rsquo;s judgment.
          </SectionHeading>
          <Divider />
          <div
            className="flex flex-col gap-4"
            style={{ fontFamily: 'var(--font-dmSans)', fontSize: '17px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.8 }}
          >
            <p>
              The best people in any field aren&rsquo;t following a process.
              They&rsquo;re applying years of instinct, taste, and decisions made under pressure.
              That&rsquo;s the part that&rsquo;s hard to see, hard to teach, and impossible for generic AI to fake.
            </p>
            <p>It&rsquo;s also the part Genus is built around.</p>
          </div>
        </motion.div>

        {/* Pull-quote breaker — typography only */}
        <motion.div
          {...fadeUp(0.1)}
          className="py-14 md:py-20"
          style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-archivoblack)',
              fontSize: 'clamp(22px, 3.5vw, 44px)',
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '700px',
            }}
          >
            Your value isn&rsquo;t just what you make.
            <br />
            <span style={{ color: 'var(--yellow)' }}>It&rsquo;s how you think through things.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// C2 — Workshop — EDITORIAL / TEXTURAL ────────────────────────────────────────

const WORKSHOP_PHASES = [
  {
    num: '01', week: 'Week one', title: 'Discover',
    body: 'Two afternoons of conversation. We map your references, your instincts, the moves you make without thinking. The first surprise is usually your own.',
    texture: 'Discover phase — scanned page of handwritten mapping notes, slightly rotated, partial visibility',
  },
  {
    num: '02', week: 'Week two', title: 'Challenge',
    body: 'Custom exercises built on what we heard. This-or-that decisions. Live critiques. Edge cases. Where do you draw the line, and why?',
    texture: 'Challenge phase — two reference images pinned side-by-side with a marker arrow between them',
  },
  {
    num: '03', week: 'Week three', title: 'Refine',
    body: 'Pressure-testing the system against real briefs. You see how it reasons. You correct it. It learns the why, not just the what.',
    texture: 'Refine phase — transcript fragment with one line highlighted, the rest faded',
  },
  {
    num: '04', week: 'Ongoing', title: 'Calibrate',
    body: "The system stays in dialogue with you. Live feedback, comparison rounds, refinement. It doesn't drift — because you're still in the loop.",
    texture: 'Calibrate phase — annotated calibration log or screenshot fragment',
  },
]

function CreatorWorkshop() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>The process</Label>
          <SectionHeading size="md">
            We build it with you.
            <br />
            Over weeks, not minutes.
          </SectionHeading>
          <Divider />
          <div
            className="flex flex-col gap-3 max-w-xl"
            style={{ fontFamily: 'var(--font-dmSans)', fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75 }}
          >
            <p>No uploads. No scraping. No &ldquo;connect your Drive.&rdquo;</p>
            <p>
              Genus starts with conversations — the kind of structured, reflective work most experts have never been asked to do on themselves.
              Most of our creators tell us the workshop revealed as much to them as it did to us.
            </p>
            <p>
              Our team comes from UX, service design and research — designing systems around how people actually work is what we do.
              Genus applies that to expertise itself.
            </p>
          </div>
        </motion.div>

        {/* Section opener image — editorial / textural */}
        <motion.div {...fadeUp(0.06)} className="mb-14">
          <EditorialSlot
            label="Workshop atmosphere — photographic, editorial, human"
            sub="A studio table with notebooks and references, or hands annotating a printed brief. Black-and-white or muted colour. Commissioned, not stock."
            ratio="16 / 7"
          />
        </motion.div>

        {/* Four phases */}
        <div className="flex flex-col gap-0">
          {WORKSHOP_PHASES.map((phase, i) => (
            <motion.div
              key={phase.num}
              {...fadeUp(i * 0.07)}
              className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-8 py-10"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <div>
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    style={{
                      fontFamily: 'var(--font-archivoblack)', fontSize: '32px',
                      color: 'var(--yellow)', letterSpacing: '-0.04em', lineHeight: 1,
                    }}
                  >
                    {phase.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px',
                      letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)',
                    }}
                  >
                    {phase.week}
                  </span>
                </div>
                <h3
                  className="mb-3"
                  style={{ fontFamily: 'var(--font-archivoblack)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}
                >
                  {phase.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.7, maxWidth: '520px' }}>
                  {phase.body}
                </p>
              </div>
              <div className="hidden md:block self-center">
                <EditorialSlot label={phase.texture} ratio="4 / 3" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote slot */}
        <motion.div
          {...fadeUp(0.1)}
          className="mt-14 px-7 py-8"
          style={{ borderLeft: '2px solid var(--yellow)', backgroundColor: 'white' }}
        >
          <p
            style={{ fontFamily: 'var(--font-dmSans)', fontSize: '16px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.7, fontStyle: 'italic' }}
          >
            &ldquo;I learned things about how I work that I&rsquo;d never put into words before.&rdquo;
          </p>
          <p
            className="mt-3"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--yellow)' }}
          >
            Creator quote + portrait — placeholder until first creator is live
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// C3 — What gets built — PRODUCT / STRUCTURAL (animated diagram) ───────────────

const SIGNAL_INPUTS = ['References', 'Process', 'Taste', 'Decisions', 'Critique', 'Edge cases']

function CreatorSystem() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label light>The output</Label>
          <SectionHeading size="lg" dark>
            Not a clone.
            <br />
            A working model of your judgment.
          </SectionHeading>
          <Divider light />
          <p
            className="max-w-xl"
            style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontFamily: 'var(--font-dmSans)' }}
          >
            The system holds the things that make your work yours: the references you reach for,
            the decisions you make under pressure, the things you&rsquo;d never do, and the reasons behind all of it.
            It uses those to think through new problems — not to imitate past ones.
          </p>
        </motion.div>

        {/* Signal diagram — editorial line work, staggered pulse on arrows */}
        <motion.div {...fadeUp(0.1)} className="mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-0 py-10 px-8 md:px-12"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Input labels */}
            <div className="flex flex-col justify-center gap-[18px] md:mr-10">
              {SIGNAL_INPUTS.map((input, i) => (
                <div key={input} className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-dmSans)', fontSize: '13px', fontWeight: 300,
                      color: 'rgba(255,255,255,0.4)', minWidth: '88px', textAlign: 'right',
                    }}
                  >
                    {input}
                  </span>
                  {/* Pulsing arrow */}
                  <motion.span
                    animate={{ opacity: [0.15, 0.8, 0.15] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.32, ease: 'easeInOut' }}
                    style={{ color: 'rgba(255,200,0,0.6)', fontSize: '11px', letterSpacing: '-0.02em' }}
                  >
                    ──→
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Central node — subtle pulse glow */}
            <div className="flex items-center">
              <motion.div
                animate={{ boxShadow: ['0 0 0px rgba(255,200,0,0)', '0 0 24px rgba(255,200,0,0.12)', '0 0 0px rgba(255,200,0,0)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center justify-center px-8 py-6"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,200,0,0.25)',
                  borderRadius: '3px',
                  minWidth: '130px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-archivoblack)', fontSize: '13px',
                    color: 'var(--yellow)', letterSpacing: '-0.01em', textAlign: 'center', lineHeight: 1.4,
                  }}
                >
                  GENUS
                  <br />
                  SYSTEM
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          <p
            style={{ fontFamily: 'var(--font-archivoblack)', fontSize: 'clamp(18px, 2.5vw, 28px)', color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.02em' }}
          >
            Not a replacement for you.{' '}
            <span style={{ color: 'white' }}>An extension of how you think.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// C4 — Critique loop — PRODUCT / STRUCTURAL ───────────────────────────────────

const LOOP_SEQUENCE = [0, 1, 2, 3, 2, 3, 2, 3, 4]
const LOOP_STEPS = ['Brief', 'Draft', 'Critique', 'Refine', 'Deliver']

function CritiqueLoopVisual() {
  const [seqIdx, setSeqIdx] = useState(0)
  const active = LOOP_SEQUENCE[seqIdx]
  const isLooping = seqIdx >= 2 && seqIdx <= 7 && (active === 2 || active === 3)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeqIdx((i) => {
        // Pause at end for ~2s before restarting (2000ms / 820ms ≈ 2.4 ticks, use 2)
        if (i === LOOP_SEQUENCE.length - 1) return 0
        return i + 1
      })
    }, 820)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-1">
      {LOOP_STEPS.map((step, i) => {
        const isActive = active === i
        const isLoopStep = i === 2 || i === 3
        return (
          <div key={step} className="flex items-center gap-1 md:gap-1">
            <motion.span
              animate={{
                color: isActive ? 'var(--ink)' : isLoopStep && isLooping ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)',
                backgroundColor: isActive ? 'var(--yellow)' : 'transparent',
              }}
              transition={{ duration: 0.22 }}
              style={{
                fontFamily: 'var(--font-archivoblack)',
                fontSize: 'clamp(15px, 2vw, 20px)',
                letterSpacing: '-0.02em',
                padding: '4px 10px',
                borderRadius: '3px',
                display: 'inline-block',
                border: `1px solid ${isActive ? 'var(--yellow)' : isLoopStep && isLooping ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
                whiteSpace: 'nowrap',
              }}
            >
              {step}
            </motion.span>
            {i < LOOP_STEPS.length - 1 && (
              <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '13px', margin: '0 2px' }}>→</span>
            )}
          </div>
        )
      })}
      <AnimatePresence>
        {isLooping && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--yellow)' }}
          >
            ↺ critique loop
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function CreatorCritiqueLoop() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: '#0d0d0b' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label light>The critique loop</Label>
          <SectionHeading size="md" dark>
            The point isn&rsquo;t what it generates.
            <br />
            It&rsquo;s what it rejects.
          </SectionHeading>
          <Divider light />
          <p
            className="max-w-xl"
            style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontFamily: 'var(--font-dmSans)' }}
          >
            Most AI systems produce. A Genus system produces, then critiques itself against your standards —
            the same way you would in a review. That loop is what makes the output feel like yours, not like everyone else&rsquo;s.
          </p>
        </motion.div>

        {/* Animated loop diagram */}
        <motion.div
          {...fadeUp(0.08)}
          className="mb-14 p-7 md:p-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="mb-5"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}
          >
            Product / Structural — animated process diagram, loop cycles 2–3× before resolving to Deliver
          </div>
          <CritiqueLoopVisual />
        </motion.div>

        {/* Before / after cards */}
        <motion.div {...fadeUp(0.12)} className="mb-4">
          <div
            style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '14px' }}
          >
            Same brief. Two responses.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
                Generic AI
              </div>
              <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, fontStyle: 'italic' }}>
                &ldquo;Here are five potential directions for the campaign, ranging from minimalist to bold...&rdquo;
              </p>
            </div>
            <div
              className="p-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '3px', border: '1px solid rgba(255,200,0,0.2)' }}
            >
              <div className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--yellow)' }}>
                Genus agent — [Expert name]
              </div>
              <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic' }}>
                &ldquo;I&rsquo;d push the editorial direction, not the typographic one. The type approach leans on a trend that&rsquo;ll date by Q3 — I&rsquo;ve seen this exact treatment three times this year. The editorial route holds longer and gives the brand somewhere to grow into.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// C5 — Protection — PRODUCT / STRUCTURAL (load-bearing screenshot) ────────────

const PROTECTION_PILLARS = [
  { label: 'Separated', body: "Your layer is structurally distinct from any base model. It doesn't get absorbed." },
  { label: 'Attributed', body: 'Every session traces back to your system. You see what was generated, for whom, and when.' },
  { label: 'Controlled', body: 'Pause it, refine it, retire it. One switch.' },
  { label: 'Transparent', body: 'A live dashboard of usage, performance, and earnings.' },
]

function CreatorProtection() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>Protection and control</Label>
          <SectionHeading size="md">Your expertise stays yours.</SectionHeading>
          <Divider />
          <p className="max-w-lg" style={{ fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75, fontFamily: 'var(--font-dmSans)' }}>
            You see how it&rsquo;s used. You decide who uses it. You can pause or pull it at any time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {PROTECTION_PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              {...fadeUp(i * 0.07)}
              className="p-6"
              style={{ backgroundColor: 'var(--off)', borderRadius: '3px', border: '1px solid var(--rule)' }}
            >
              <div className="mb-3" style={{ fontFamily: 'var(--font-archivoblack)', fontSize: '14px', color: 'var(--ink)', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                {p.label}
              </div>
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Creator dashboard — highest-priority mockup */}
        <motion.div {...fadeUp(0.12)}>
          <ProductSlot
            label="Creator dashboard — annotated product screenshot"
            sub="Layout: top bar (Genus logo / Your Genus — [Creator name] / nav tabs) → metrics row (Sessions / Active clients / Earnings) → left ⅔: usage graph + activity feed → right ⅓: calibration queue + pause control + status."
            items={[
              'Annotation → "Real-time usage" (pointing at usage graph, last 30 days, line chart with yellow accent)',
              'Annotation → "Earnings, attributed to you" (pointing at top metrics tile)',
              'Annotation → "Calibration queue — your agent only acts after you review" (pointing at calibration tile: "3 outputs flagged for your review →")',
              'Annotation → "One-tap pause. Always." (pointing at availability toggle in control panel)',
              'Activity feed entries: "Brand strategy session with [client]. 14 exchanges. 2 critique cycles. → Review"',
              'Small status indicator: green dot · Live',
            ]}
            tall
          />
          <p className="mt-3" style={{ fontFamily: 'var(--font-dmSans)', fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>
            Live preview
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// C6 — Earnings — PRODUCT / STRUCTURAL (cards + abstract diagrams) ─────────────

const EARNING_MODELS = [
  {
    label: 'Revenue share',
    body: 'You earn a percentage of every session your agent runs. Higher upside, variable month to month. Suits creators who want their agent working at scale.',
    Diagram: WaveLine,
  },
  {
    label: 'Licensing',
    body: 'A fixed fee per client engagement, agreed up front. Predictable, closer to how consulting already works. Suits creators who want fewer, deeper relationships.',
    Diagram: FlatBar,
  },
  {
    label: 'Retainer',
    body: 'A monthly base for keeping your agent live and calibrated, with session fees on top. Suits creators who want a stable floor under the variable income.',
    Diagram: FloorAndPeak,
  },
]

function CreatorEarnings() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>How creators earn</Label>
          <SectionHeading size="md">
            We&rsquo;re still figuring this part out
            <br />
            — with you.
          </SectionHeading>
          <Divider />
          <div
            className="flex flex-col gap-3 max-w-xl"
            style={{ fontFamily: 'var(--font-dmSans)', fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75 }}
          >
            <p>Different creators want different things. Some want the predictability of a retainer. Some want upside on every session. Some want to license their agent to specific clients and stay close to the work.</p>
            <p>We&rsquo;re building the model in conversation with the people on the platform. Here are the directions we&rsquo;re exploring.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {EARNING_MODELS.map(({ label, body, Diagram }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.08)}
              className="p-7"
              style={{ backgroundColor: 'var(--ink)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Abstract mini-diagram */}
              <div className="mb-5 opacity-60">
                <Diagram dark />
              </div>
              <div className="mb-4" style={{ fontFamily: 'var(--font-archivoblack)', fontSize: '17px', color: 'var(--yellow)', letterSpacing: '-0.02em' }}>
                {label}
              </div>
              <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp(0.1)} className="mb-8" style={{ fontSize: '14px', fontWeight: 300, color: 'var(--mid)', fontFamily: 'var(--font-dmSans)' }}>
          Most creators we&rsquo;ve spoken to want a mix. We&rsquo;re designing for that.
        </motion.p>
        <motion.div {...fadeUp(0.12)}>
          <Link href="/apply" style={{ fontFamily: 'var(--font-dmSans)', fontSize: '14px', fontWeight: 300, color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Tell us what would work for you &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// C7 — Deployment — TYPOGRAPHY-ONLY ──────────────────────────────────────────

function CreatorDeployment() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Label light>Deployment</Label>
          <SectionHeading size="lg" dark>
            Your thinking. Working further
            <br />
            than your hours allow.
          </SectionHeading>
          <Divider light />
        </motion.div>
        <motion.div {...fadeUp(0.08)} className="flex flex-col gap-4 mb-12">
          {['Your agent is hired.', 'Sessions run.', 'You stay in the loop.'].map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-archivoblack)',
                fontSize: 'clamp(20px, 3vw, 32px)',
                color: i === 2 ? 'var(--yellow)' : 'white',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              {line}
            </p>
          ))}
        </motion.div>
        <motion.p
          {...fadeUp(0.12)}
          style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '440px', fontFamily: 'var(--font-dmSans)' }}
        >
          The point isn&rsquo;t to replace your work. It&rsquo;s to let your judgment scale past the bottleneck of your own time.
        </motion.p>
      </div>
    </section>
  )
}

// C8 — Creator close — TYPOGRAPHY-ONLY ────────────────────────────────────────

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
            <span style={{ color: 'var(--yellow)' }}>Now it can scale with you.</span>
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center px-8 py-4 rounded-sm text-sm font-medium transition-opacity hover:opacity-90"
            style={{ fontFamily: 'var(--font-dmSans)', backgroundColor: 'var(--yellow)', color: 'var(--ink)' }}
          >
            Apply as a creator &rarr;
          </Link>
          <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>
            We review applications weekly. If we&rsquo;re a fit, we&rsquo;ll be in touch within seven days.
          </p>
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
      <ClientShift />
      <ClientValue />
      <ClientHowItWorks />
      <ClientTeamEffect />
      <ClientDisciplines />
      <ClientCombination />
      <ClientIntegration />
      <ClientClose />
    </>
  )
}

// CL1 — The shift — PRODUCT / STRUCTURAL ─────────────────────────────────────

function ClientShift() {
  return (
    <section className="bg-white px-5 md:px-12 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <SectionHeading size="lg">
            You&rsquo;re not hiring AI.
            <br />
            You&rsquo;re hiring how
            <br />
            someone thinks.
          </SectionHeading>
          <Divider />
          <p className="max-w-lg" style={{ fontSize: '17px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75, fontFamily: 'var(--font-dmSans)' }}>
            Generic models give you generic answers. Genus agents are built around named experts —
            their judgment, their standards, their refusals. You get a point of view, not a probability distribution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div {...fadeUp(0.08)} className="p-7" style={{ backgroundColor: 'var(--off)', borderRadius: '3px', border: '1px solid var(--rule)' }}>
            <div className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Generic AI
            </div>
            <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '14px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.7, fontStyle: 'italic' }}>
              &ldquo;Here are five potential approaches you could consider, each with different trade-offs...&rdquo;
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.12)} className="p-7" style={{ backgroundColor: 'var(--ink)', borderRadius: '3px', border: '1px solid rgba(255,200,0,0.15)' }}>
            <div className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--yellow)' }}>
              Genus agent
            </div>
            <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic' }}>
              &ldquo;Two of these are wrong for your stage. The third is the one. Here&rsquo;s why, and here&rsquo;s what to watch for.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CL2 — What you get — PRODUCT / STRUCTURAL (editorial marks inside cards) ────

// Small editorial mark SVGs — pulled from a notebook, not a UI kit
function ArrowMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="13,7 18,12 13,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AnnotationMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.15" />
      <path d="M6 15 L18 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function RefusalMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const VALUE_CARDS = [
  { label: 'A position', body: "It picks a direction and tells you why. Not five options to choose between.", Mark: ArrowMark },
  { label: 'A critique', body: 'It pressure-tests your thinking before your team does.', Mark: AnnotationMark },
  { label: 'A refusal', body: "It tells you when something's wrong — and what to do instead.", Mark: RefusalMark },
]

function ClientValue() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label>What you get</Label>
          <SectionHeading size="md">A working partner, not a generator.</SectionHeading>
          <Divider />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VALUE_CARDS.map(({ label, body, Mark }, i) => (
            <motion.div key={label} {...fadeUp(i * 0.08)} className="p-7" style={{ backgroundColor: 'var(--ink)', borderRadius: '3px' }}>
              <div className="mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
                <Mark />
              </div>
              <div className="mb-3" style={{ fontFamily: 'var(--font-archivoblack)', fontSize: '20px', color: 'var(--yellow)', letterSpacing: '-0.02em' }}>
                {label}
              </div>
              <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CL3 — How you work with it — PRODUCT / STRUCTURAL (load-bearing screenshot) ─

const CLIENT_STEPS = [
  { label: 'Ask', detail: 'bring a brief, a draft, a problem' },
  { label: 'Push', detail: 'it responds with a position, not a menu' },
  { label: 'Refine', detail: "you challenge it, it adjusts using the expert's reasoning" },
  { label: 'Decide', detail: 'you walk away with something usable' },
]

function ClientHowItWorks() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-14">
          <Label light>How it feels</Label>
          <SectionHeading size="md" dark>Work with it the way you&rsquo;d work with them.</SectionHeading>
          <Divider light />
          <p className="max-w-lg" style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontFamily: 'var(--font-dmSans)' }}>
            Sessions, not chats. You bring a brief. The agent diagnoses the problem, pulls relevant references,
            generates directions, critiques them against the expert&rsquo;s standards, and delivers a position you can act on.
          </p>
        </motion.div>

        {/* Process strip — product/structural, static */}
        <motion.div {...fadeUp(0.08)} className="flex flex-col gap-0 mb-14">
          {CLIENT_STEPS.map((step, i) => (
            <div
              key={step.label}
              className="flex items-start md:items-center gap-5 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span style={{ fontFamily: 'var(--font-archivoblack)', fontSize: 'clamp(18px, 2.5vw, 26px)', color: i === 3 ? 'var(--yellow)' : 'white', letterSpacing: '-0.03em', minWidth: '90px', flexShrink: 0 }}>
                {step.label}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-dmSans)' }}>
                — {step.detail}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Session view mockup — highest-priority client screenshot */}
        <motion.div {...fadeUp(0.12)}>
          <ProductSlot
            label="Session view — annotated product screenshot"
            dark
            sub="Layout: left rail (active session, named expert with portrait, session timer) → main panel (real exchange: client brief, agent position + rationale + reference cards, 'Challenge this' button) → right rail (brief, references in play, prior decisions)."
            items={[
              'Annotation → "Named expert, with face and reputation" (pointing at expert portrait in left rail)',
              'Annotation → "Reasoning shown, not hidden" (pointing at rationale paragraph in agent response)',
              'Annotation → "References pulled from the expert\'s archive" (pointing at reference cards below response)',
              'Annotation → "Push back. The agent adjusts." (pointing at \'Challenge this\' button)',
            ]}
            tall
          />
        </motion.div>
      </div>
    </section>
  )
}

// CL4 — Team effect — EDITORIAL / TEXTURAL ───────────────────────────────────

const TEAM_SCENARIOS = [
  {
    body: "A junior strategist drafts a positioning brief. The brand strategy agent pushes back on the wedge and explains why. The strategist rewrites — sharper than they would have alone.",
    texture: 'Junior strategist scenario — marked-up positioning document fragment, one line crossed out and rewritten',
  },
  {
    body: "A product designer runs a flow past the UX agent. It flags three edge cases their PM missed. The team ships a stronger spec.",
    texture: 'Product designer scenario — flow diagram fragment with three edge cases circled in red',
  },
  {
    body: "A new hire ramps in weeks instead of months by working alongside an agent built on your discipline's best thinking.",
    texture: 'New hire scenario — condensed onboarding document or calendar fragment',
  },
]

function ClientTeamEffect() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12">
          <Label>For teams</Label>
          <SectionHeading size="md">
            Your team gets the senior reviewer
            <br />
            they don&rsquo;t have yet.
          </SectionHeading>
          <Divider />
          <p className="max-w-lg" style={{ fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75, fontFamily: 'var(--font-dmSans)' }}>
            Junior team members don&rsquo;t just get answers. They see how a senior expert reasons through a problem —
            what gets prioritised, what gets rejected, why. Over time, that exposure shapes how they think.
          </p>
        </motion.div>

        <div className="flex flex-col gap-0 mb-16">
          {TEAM_SCENARIOS.map(({ body, texture }, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.07)}
              className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-6 py-8"
              style={{ borderBottom: '1px solid var(--rule)' }}
            >
              <div className="flex items-start gap-5">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--yellow)', flexShrink: 0, paddingTop: '4px', letterSpacing: '0.1em' }}>
                  0{i + 1}
                </span>
                <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75 }}>
                  {body}
                </p>
              </div>
              <div className="hidden md:block self-center">
                <EditorialSlot label={texture} ratio="4 / 3" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.1)}>
          <p style={{ fontFamily: 'var(--font-archivoblack)', fontSize: 'clamp(22px, 3.5vw, 40px)', color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            This is how taste scales.
            <br />
            <span style={{ color: 'var(--yellow)' }}>Not through process documents. Through exposure.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// CL5 — Disciplines — TYPOGRAPHY-ONLY ────────────────────────────────────────

const DISCIPLINES = [
  { name: 'Brand Strategy', use: 'Pressure-test positioning before you commit' },
  { name: 'Creative Direction', use: 'Sharpen concepts before review rounds' },
  { name: 'UX / Product', use: 'Surface edge cases before they ship' },
  { name: 'Editorial', use: 'Get a second read with a real point of view' },
]

function ClientDisciplines() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12">
          <Label>Where it shows up</Label>
          <SectionHeading size="md">Built for the work where judgment actually matters.</SectionHeading>
          <Divider />
        </motion.div>
        <div className="flex flex-col mb-8">
          {DISCIPLINES.map((d, i) => (
            <motion.div
              key={d.name}
              {...fadeUp(i * 0.06)}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 py-6"
              style={{ borderBottom: '1px solid var(--rule)' }}
            >
              <div style={{ fontFamily: 'var(--font-archivoblack)', fontSize: '18px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                {d.name}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 300, color: 'var(--mid)', fontFamily: 'var(--font-dmSans)' }}>
                {d.use}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p {...fadeUp(0.1)} style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', fontFamily: 'var(--font-dmSans)' }}>
          More disciplines added as we onboard new creators.
        </motion.p>
      </div>
    </section>
  )
}

// CL6 — Combination — PRODUCT / STRUCTURAL ────────────────────────────────────

function ClientCombination() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div {...fadeUp(0)}>
            <Label>Combination</Label>
            <SectionHeading size="md">
              Hire one mind.
              <br />
              Or a system of them.
            </SectionHeading>
            <Divider />
            <div className="flex flex-col gap-4" style={{ fontFamily: 'var(--font-dmSans)', fontSize: '15px', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75 }}>
              <p>Most real briefs need more than one perspective. A launch needs strategy, creative, and product thinking — each pulling against the others.</p>
              <p>In Genus, you can run multiple agents on the same brief and let the disagreements surface. That&rsquo;s where the useful answer usually is.</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <ProductSlot
              label="Multi-agent disagreement diagram"
              sub="Three named agents (Strategist, Creative Director, Product Lead) as portrait/named nodes on the left. Each agent's position shown as a short distinct text fragment — they visibly disagree. All three positions feed into a central 'Brief' panel. Disagreement is the feature, not a bug."
              ratio="4 / 3"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CL7 — Integration — PRODUCT / STRUCTURAL (minimal) ─────────────────────────

function ClientIntegration() {
  const tools = ['Slack', 'Notion', 'API']
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--off)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Label>Integrations</Label>
          <SectionHeading size="md">Works where you work.</SectionHeading>
          <Divider />
        </motion.div>
        <motion.div {...fadeUp(0.06)} className="max-w-lg mb-10">
          <Body>Start inside Genus. Extend into Slack, Notion, or your own tools when you&rsquo;re ready.</Body>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-3">
          {tools.map((t) => (
            <span
              key={t}
              className="px-4 py-2.5"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--mid)', backgroundColor: 'var(--surface)',
                borderRadius: '3px', border: '1px solid var(--rule)',
              }}
            >
              {t === 'API' ? 'API — [placeholder]' : t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// CL8 — Client close — TYPOGRAPHY-ONLY ────────────────────────────────────────

function ClientClose() {
  return (
    <section className="px-5 md:px-12 py-24 md:py-36" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <p
            className="mb-12"
            style={{ fontFamily: 'var(--font-archivoblack)', fontSize: 'clamp(32px, 5.5vw, 72px)', color: 'white', letterSpacing: '-0.04em', lineHeight: 0.97 }}
          >
            Not a chatbot.
            <br />
            <span style={{ color: 'var(--yellow)' }}>The thinking behind the work.</span>
          </p>
          <Link
            href="/agents"
            className="inline-flex items-center px-8 py-4 rounded-sm text-sm font-medium transition-opacity hover:opacity-90"
            style={{ fontFamily: 'var(--font-dmSans)', backgroundColor: 'var(--yellow)', color: 'var(--ink)' }}
          >
            Find your Genus &rarr;
          </Link>
          <p style={{ fontFamily: 'var(--font-dmSans)', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>
            Tell us what you&rsquo;re working on. We&rsquo;ll match you with the right agent — or build a shortlist — within a week.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
