'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const logoOpacity = useTransform(scrollY, [0, 240], [1, 0])
  const logoScale = useTransform(scrollY, [0, 240], [1, 0.65])

  return (
    <section
      className="relative flex flex-col justify-center min-h-screen px-5 md:px-12 pt-20 pb-16 overflow-hidden"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      {/* Ghost G */}
      <div
        className="absolute right-[-60px] top-[-40px] pointer-events-none select-none leading-none"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-archivoblack)',
          fontSize: 'clamp(320px, 55vw, 680px)',
          color: 'white',
          opacity: 0.025,
          lineHeight: 1,
        }}
      >
        G
      </div>

      <div className="relative z-10 max-w-3xl">

        {/* Hero logomark — fades + scales into nav wordmark on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT_EXPO }}
          className="mb-10"
        >
          <motion.div style={{ opacity: logoOpacity, scale: logoScale, transformOrigin: 'left center' }}>
            <Image src="/Logo.png" alt="Genus" width={80} height={80} priority />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="text-white mb-6 md:mb-8"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: 'clamp(48px, 5.5vw, 80px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
          }}
        >
          YOUR GENIUS
          <br />
          IS WORKING.
          <br />
          JUST NOT
          <br />
          FOR YOU.
        </motion.h1>

        {/* Sub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="mb-10 max-w-md flex flex-col gap-4"
          style={{
            fontFamily: 'var(--font-dmSans)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65,
            fontSize: '15px',
          }}
        >
          <p>AI can already do the work.</p>
          <p>
            What it can&rsquo;t fake is where the work comes from.
            Your taste. Your judgment. Your way of seeing.
          </p>
          <p>Genus turns that into something that works for you.</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-6 h-12 text-sm font-medium rounded-sm transition-opacity duration-150 hover:opacity-90"
            style={{
              fontFamily: 'var(--font-dmSans)',
              fontWeight: 500,
              backgroundColor: 'var(--yellow)',
              color: 'var(--ink)',
              minWidth: '44px',
            }}
          >
            Apply as a creator &rarr;
          </Link>
          <Link
            href="/agents"
            className="inline-flex items-center justify-center px-6 h-12 text-sm rounded-sm border transition-colors duration-150 hover:border-white/50"
            style={{
              fontFamily: 'var(--font-dmSans)',
              fontWeight: 400,
              color: 'white',
              borderColor: 'rgba(255,255,255,0.25)',
            }}
          >
            Hire an agent
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
