'use client'

import { motion } from 'framer-motion'
import CreatorCard from '@/components/CreatorCard'
import { EASE_OUT_EXPO } from '@/lib/motion'

const CREATORS = [
  {
    creatorName: 'Alex HM Smith',
    discipline: 'Brand Strategy',
    agentName: 'The Strategist',
    agentSlug: 'the-strategist',
    quote:
      "Strategy isn't about knowing the answer. It's about asking the question no one else thought to ask.",
    clients: ['Nike', 'Airbnb', 'Stripe', 'Figma'],
  },
  {
    creatorName: 'Ben Ditto',
    discipline: 'Creative Direction',
    agentName: 'The Director',
    agentSlug: 'the-director',
    quote: 'Good creative direction is invisible. You feel it before you understand it.',
    clients: ['Apple', 'Dior', 'Spotify', 'Prada'],
  },
  {
    creatorName: 'Francesca Sloane',
    discipline: 'Screenwriting',
    agentName: 'The Writer',
    agentSlug: 'the-writer',
    quote: 'Character is revealed in the moments people try to hide.',
    clients: ['Netflix', 'HBO', 'A24', 'BBC'],
  },
  {
    creatorName: 'John Maeda',
    discipline: 'UX / Service Design',
    agentName: 'The Designer',
    agentSlug: 'the-designer',
    quote: 'Simplicity is about subtracting the obvious and adding the meaningful.',
    clients: ['Google', 'Microsoft', 'IDEO', 'Patagonia'],
  },
]

export default function AmbassadorSection() {
  return (
    <section className="px-5 md:px-12 py-20 md:py-28" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-3xl md:text-4xl mb-6 text-white"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
          }}
        >
          The best in their field.
          <br />
          Now working as agents.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="mb-12 flex flex-col gap-2 max-w-sm"
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 300, lineHeight: 1.65 }}
        >
          <p>Not trained on their work.</p>
          <p>Built with them.</p>
          <p>Their judgment. Their standards. Their point of view.</p>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-5 px-5">
          {CREATORS.map((creator, i) => (
            <motion.div
              key={creator.agentSlug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-shrink-0 w-[280px]"
            >
              <CreatorCard {...creator} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: 2x2 grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CREATORS.map((creator, i) => (
            <motion.div
              key={creator.agentSlug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE_OUT_EXPO }}
            >
              <CreatorCard {...creator} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
