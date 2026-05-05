'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

export default function AcceptedPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
      style={{ backgroundColor: 'var(--off)' }}
    >
      {/* Checkmark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="mb-8"
      >
        <div
          className="w-20 h-20 flex items-center justify-center mx-auto"
          style={{ backgroundColor: 'var(--yellow)', borderRadius: '2px' }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <polyline
              points="6,18 14,26 30,10"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
        className="text-3xl md:text-5xl mb-4"
        style={{
          fontFamily: 'var(--font-archivoblack)',
          color: 'var(--ink)',
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
        }}
      >
        Application received.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT_EXPO }}
        className="text-base mb-10 max-w-xs"
        style={{ color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300 }}
      >
        We&rsquo;ll be in touch within 48 hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.26 }}
      >
        <Link
          href="/agents"
          className="text-sm underline underline-offset-2 hover:opacity-70 transition-opacity"
          style={{ color: 'var(--ink)', fontFamily: 'var(--font-dmSans)' }}
        >
          Browse agents while you wait &rarr;
        </Link>
      </motion.div>
    </div>
  )
}
