'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

export default function SolutionSection() {
  return (
    <section id="creators" style={{ backgroundColor: 'var(--off)' }}>
      <div className="px-5 md:px-12 py-20 md:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:gap-16 md:items-center">
            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              className="flex-shrink-0 w-full md:w-[440px] mb-12 md:mb-0"
              style={{ backgroundColor: 'var(--off)' }}
            >
              <Image
                src="/illustrations/HomepageSolution.png"
                alt="Connected expertise radiating attribution"
                width={1402}
                height={1122}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Text side */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_EXPO }}
                className="text-3xl md:text-4xl mb-6"
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                }}
              >
                Turn your way of working into something that runs.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
                className="flex flex-col gap-3"
                style={{ color: 'var(--mid)', lineHeight: 1.65, fontSize: '15px', fontWeight: 300 }}
              >
                <p>
                  Build a bespoke agent trained on how you actually work.
                  Not prompts. Not summaries. Your real process.
                </p>
                <p>
                  It takes on briefs.
                  It contributes inside real workflows.
                  It produces work that carries your thinking.
                </p>
                <p>You get paid when it does.</p>
                <p>
                  It plugs into where work already happens.
                  Slack. Notion. ChatGPT. Your stack.
                </p>
                <p>
                  Not a chatbot.
                  The actual thinking of someone exceptional, applied to the job.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
