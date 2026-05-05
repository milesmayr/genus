'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

export default function ProblemSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="px-5 md:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16">
            {/* Text */}
            <motion.div
              className="flex-1 md:max-w-sm order-2 md:order-1 mt-10 md:mt-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <p
                className="mb-3 uppercase tracking-[0.18em] text-[9px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--yellow)' }}
              >
                The problem
              </p>
              <h2
                className="mb-5 text-2xl md:text-3xl"
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                }}
              >
                AI makes the work cheap.
                <br />
                It doesn&rsquo;t make it yours.
              </h2>
              <div
                className="flex flex-col gap-3"
                style={{ color: 'var(--mid)', lineHeight: 1.7, fontSize: '15px', fontWeight: 300 }}
              >
                <p>The output is getting easier to reproduce.</p>
                <p>
                  What isn&rsquo;t is the thinking behind it.
                  How you frame a problem. Where you push. What you refuse.
                </p>
                <p>That&rsquo;s the part people actually pay for.</p>
                <p>Until now, it&rsquo;s been locked to your time.</p>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              className="order-1 md:order-2 flex-shrink-0 w-full md:w-[520px]"
              style={{ backgroundColor: 'var(--white)' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              <Image
                src="/illustrations/HomepageProblem.png"
                alt="Fragmented expertise being extracted"
                width={1536}
                height={1024}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
