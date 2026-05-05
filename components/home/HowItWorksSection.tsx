'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

const STEPS = [
  {
    num: '01',
    title: 'Built from how you think. Not how AI defaults.',
    body: 'Your process. Your standards. Your judgment calls.',
    detail: 'Trained end to end on how you actually work. Not on generic prompts.',
    image: '/illustrations/HomepageProcess1.png',
  },
  {
    num: '02',
    title: 'Put to work across real clients.',
    body: 'It joins briefs, produces output, and contributes where it matters.',
    detail: 'Not a demo. Not a one-off. A working version of your expertise, deployed at scale.',
    image: '/illustrations/HomepageProcess2.png',
  },
  {
    num: '03',
    title: 'Every use is attributed. Every session earns.',
    body: 'Built to be hired, not copied.',
    detail: 'Your agent works across clients, and every engagement comes back to you. Credited and paid.',
    image: '/illustrations/HomepageProcess3.png',
  },
  {
    num: '04',
    title: 'Yours to control. Yours to keep.',
    body: 'Your IP. Your data. Your call.',
    detail: "Refine it as you go. Pause it when you need to. Remove it entirely if you want. What it produces and what it’s worth stays with you.",
    image: '/illustrations/HomepageProcess4.png',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0, ease: EASE_OUT_EXPO }}
          className="text-3xl md:text-5xl mb-14 md:mb-20"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            color: 'var(--ink)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
          }}
        >
          From your process
          <br />
          to a working agent.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT_EXPO }}
            >
              {/* Illustration */}
              <div className="mb-6 h-44 relative">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div
                className="text-6xl md:text-7xl leading-none mb-4"
                style={{ fontFamily: 'var(--font-archivoblack)', color: 'var(--yellow)' }}
              >
                {step.num}
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
                {step.title}
              </h3>
              <p
                className="text-sm mb-2"
                style={{ color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300 }}
              >
                {step.body}
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300, opacity: 0.6 }}
              >
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
