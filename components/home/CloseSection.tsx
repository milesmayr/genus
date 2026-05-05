'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

export default function CloseSection() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Closing line */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0, ease: EASE_OUT_EXPO }}
          className="text-3xl md:text-5xl text-white mb-6 max-w-2xl"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
          }}
        >
          Your genius should be doing more.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.07, ease: EASE_OUT_EXPO }}
          className="flex flex-col gap-1 mb-14"
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', fontWeight: 300, lineHeight: 1.65 }}
        >
          <p>More work. More often. On your terms.</p>
          <p>Build it once. Let it run. Keep control.</p>
        </motion.div>

        {/* Two CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Creator card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="flex flex-col justify-between p-7"
            style={{ backgroundColor: '#1a1a18', borderRadius: '2px', minHeight: '220px' }}
          >
            <p
              className="text-base text-white mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-dmSans)', fontWeight: 300 }}
            >
              Protect your IP.
              <br />
              Build your Genus.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center h-12 px-6 text-sm font-medium w-full transition-opacity hover:opacity-90"
              style={{
                fontFamily: 'var(--font-dmSans)',
                fontWeight: 500,
                backgroundColor: 'var(--yellow)',
                color: 'var(--ink)',
                borderRadius: '2px',
              }}
            >
              Apply as a creator &rarr;
            </Link>
          </motion.div>

          {/* Client card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT_EXPO }}
            className="flex flex-col justify-between p-7 border"
            style={{
              backgroundColor: '#242422',
              borderColor: 'rgba(255,255,255,0.08)',
              borderRadius: '2px',
              minHeight: '220px',
            }}
          >
            <p
              className="text-base text-white mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-dmSans)', fontWeight: 300 }}
            >
              Hire the thinking behind the work.
            </p>
            <Link
              href="/agents"
              className="inline-flex items-center justify-center h-12 px-6 text-sm w-full border transition-colors hover:border-white/50"
              style={{
                fontFamily: 'var(--font-dmSans)',
                fontWeight: 400,
                color: 'white',
                borderColor: 'rgba(255,255,255,0.25)',
                borderRadius: '2px',
              }}
            >
              Find your Genus &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
