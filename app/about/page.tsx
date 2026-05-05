'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import { EASE_OUT_EXPO } from '@/lib/motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const BELIEFS = [
  {
    title: 'Genius is specific.',
    body: "The most valuable creative intelligence isn't general. It's particular. It's yours. That's what makes it worth protecting.",
  },
  {
    title: 'Ownership matters.',
    body: "IP without enforcement is just hope. We're building real attribution, real credit, real earnings — baked into the infrastructure.",
  },
  {
    title: 'AI should extend, not replace.',
    body: 'The best version of this technology puts remarkable minds in more rooms, not out of the picture entirely.',
  },
]

const TEAM = [
  {
    name: 'Name',
    role: 'Co-founder & CEO',
    line: 'One honest line about why they are here.',
    avatar: null,
  },
  {
    name: 'Name',
    role: 'Co-founder & CTO',
    line: 'One honest line about why they are here.',
    avatar: null,
  },
  {
    name: 'Name',
    role: 'Head of Design',
    line: 'One honest line about why they are here.',
    avatar: null,
  },
  {
    name: 'Name',
    role: 'Head of Partnerships',
    line: 'One honest line about why they are here.',
    avatar: null,
  },
]

const PRESS = ['Forbes', 'Wired', 'Fast Company', 'Dezeen', "It's Nice That", 'Monocle']

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <MissionBreaker />
      <WhatWeBelieve />
      <HowItWorksSection />
      <WhoWeAre />
      <AsSeenIn />
      <ContactBreaker />
      <Footer />
    </main>
  )
}

// ─── 01 Hero ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-5 md:px-12 pt-32 pb-20"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="mb-8 flex items-center gap-2"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--yellow)',
            }}
          >
            About Genus
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT_EXPO }}
          className="mb-6"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: 'clamp(40px, 7vw, 88px)',
            color: 'white',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
          }}
        >
          The most valuable
          <br />
          thing in the world
          <br />
          is how you think.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="mb-12 max-w-xl"
          style={{
            fontSize: '17px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65,
          }}
        >
          We build the infrastructure for human expertise to work at scale —
          owned, attributed, and paid.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/apply"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-sm transition-opacity hover:opacity-90"
            style={{
              fontFamily: 'var(--font-dmSans)',
              backgroundColor: 'var(--yellow)',
              color: 'var(--ink)',
            }}
          >
            Get early access &rarr;
          </Link>
          <a
            href="mailto:hello@genus.so"
            className="inline-flex items-center px-6 py-3 text-sm rounded-sm border transition-colors hover:border-white/40 hover:text-white"
            style={{
              fontFamily: 'var(--font-dmSans)',
              color: 'rgba(255,255,255,0.55)',
              borderColor: 'rgba(255,255,255,0.18)',
            }}
          >
            Talk to us
          </a>
        </motion.div>
      </div>

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </section>
  )
}

// ─── 02 Mission Breaker ───────────────────────────────────────────────────────

function MissionBreaker() {
  return (
    <section
      className="px-5 md:px-12 py-24 md:py-32"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="max-w-3xl mx-auto text-center"
        style={{
          fontFamily: 'var(--font-archivoblack)',
          fontSize: 'clamp(22px, 3.5vw, 38px)',
          color: 'white',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
        }}
      >
        &ldquo;We got tired of watching real genius get flattened.
        <br />
        So we built something to protect it.&rdquo;
      </motion.blockquote>
    </section>
  )
}

// ─── 03 What We Believe ──────────────────────────────────────────────────────

function WhatWeBelieve() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-14"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'var(--ink)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
          }}
        >
          What we believe.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {BELIEFS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE_OUT_EXPO }}
            >
              <div
                className="mb-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--yellow)',
                }}
              >
                0{i + 1}
              </div>
              <h3
                className="mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  fontSize: '20px',
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 300,
                  color: 'var(--mid)',
                  lineHeight: 1.7,
                }}
              >
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 05 Who We Are ───────────────────────────────────────────────────────────

function WhoWeAre() {
  return (
    <section className="bg-white px-5 md:px-12 py-20 md:py-28" style={{ borderTop: '1px solid var(--rule)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-6"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'var(--ink)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
          }}
        >
          Who we are.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.07, ease: EASE_OUT_EXPO }}
          className="mb-14 max-w-2xl"
          style={{
            fontSize: '16px',
            fontWeight: 300,
            color: 'var(--mid)',
            lineHeight: 1.7,
          }}
        >
          We&rsquo;re designers, creative directors, and technologists. We&rsquo;ve spent years inside the
          industry &mdash; building things, protecting things, watching what goes wrong when
          craft meets scale.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: EASE_OUT_EXPO }}
            >
              {/* Photo placeholder */}
              <div
                className="mb-4 w-full"
                style={{
                  aspectRatio: '3/4',
                  backgroundColor: 'var(--surface)',
                  borderRadius: '3px',
                }}
              />
              <div
                className="mb-0.5 leading-tight"
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  fontSize: '16px',
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {person.name}
              </div>
              <div
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--yellow)',
                }}
              >
                {person.role}
              </div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  color: 'var(--mid)',
                  lineHeight: 1.6,
                }}
              >
                {person.line}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 06 As Seen In ───────────────────────────────────────────────────────────

function AsSeenIn() {
  return (
    <section
      className="px-5 md:px-12 py-16"
      style={{ backgroundColor: 'var(--off)', borderTop: '1px solid var(--rule)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          As seen in
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4"
        >
          {PRESS.map((name) => (
            <span
              key={name}
              style={{
                fontFamily: 'var(--font-archivoblack)',
                fontSize: '15px',
                color: 'var(--muted)',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 07 Contact Breaker ──────────────────────────────────────────────────────

function ContactBreaker() {
  return (
    <section
      className="px-5 md:px-12 py-20 md:py-28"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-16 flex flex-col gap-12">

          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div
              className="mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--yellow)',
              }}
            >
              For creators
            </div>
            <h3
              className="mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-archivoblack)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: 'white',
                letterSpacing: '-0.03em',
              }}
            >
              Be part of what
              <br />
              we&rsquo;re building.
            </h3>
            <p
              className="mb-8"
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
              }}
            >
              Get early access and help shape the platform from the inside.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-sm transition-opacity hover:opacity-90"
              style={{
                fontFamily: 'var(--font-dmSans)',
                backgroundColor: 'var(--yellow)',
                color: 'var(--ink)',
              }}
            >
              Apply as a creator &rarr;
            </Link>
          </motion.div>

          {/* Investors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="md:border-l md:pl-16"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              For investors
            </div>
            <h3
              className="mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-archivoblack)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: 'white',
                letterSpacing: '-0.03em',
              }}
            >
              A market without
              <br />
              a rights layer.
            </h3>
            <p
              className="mb-8"
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
              }}
            >
              We&rsquo;re building infrastructure for a market that doesn&rsquo;t have one yet.
              Let&rsquo;s talk.
            </p>
            <a
              href="mailto:hello@genus.so"
              className="inline-flex items-center px-6 py-3 text-sm rounded-sm border transition-colors hover:border-white/40 hover:text-white"
              style={{
                fontFamily: 'var(--font-dmSans)',
                color: 'rgba(255,255,255,0.55)',
                borderColor: 'rgba(255,255,255,0.18)',
              }}
            >
              hello@genus.so
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── 08 Footer ───────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="px-5 md:px-12 py-10"
      style={{ backgroundColor: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <span
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: '16px',
            color: 'white',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: 'var(--yellow)' }}>G</span>ENUS
        </span>

        <nav className="flex flex-wrap gap-6">
          {[
            { label: 'All agents', href: '/agents' },
            { label: 'Apply', href: '/apply' },
            { label: 'About', href: '/about' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm transition-opacity hover:opacity-80"
              style={{ fontFamily: 'var(--font-dmSans)', color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <span
          style={{ fontFamily: 'var(--font-dmSans)', fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.22)' }}
        >
          &copy; {new Date().getFullYear()} Genus. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
