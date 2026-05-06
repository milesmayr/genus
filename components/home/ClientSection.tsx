'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

function ChatGPTIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 41 41" fill="currentColor" aria-label="ChatGPT">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L16.32 33.2a7.504 7.504 0 0 1-9.928-2.194zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.051-4.645a7.497 7.497 0 0 1 11.133 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z" />
    </svg>
  )
}

function NotionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 100 100" fill="none" aria-label="Notion">
      <rect width="100" height="100" rx="18" fill="#000" />
      <path
        d="M28 22h11.5l23 37.5h.5V22H74v56H62.5L39.5 40.5H39V78H28V22z"
        fill="#fff"
      />
    </svg>
  )
}

function SlackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 54 54" fill="none" aria-label="Slack">
      <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0" />
      <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D" />
      <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386H34.048a5.381 5.381 0 0 0-5.376 5.386 5.381 5.381 0 0 0 5.376 5.387" fill="#E01E5A" />
      <path d="M0 34.248a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387v-5.386H5.376A5.381 5.381 0 0 0 0 34.248m14.336 0v14.365A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.248a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386" fill="#ECB22E" />
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg width="13" height="19" viewBox="0 0 200 300" fill="none" aria-label="Figma">
      {/* Red — top-left cell */}
      <path d="M100 0H50C22.4 0 0 22.4 0 50v50h100V0z" fill="#F24E1E" />
      {/* Purple — top-right cell */}
      <path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50H100V0z" fill="#A259FF" />
      {/* Orange — middle-left cell */}
      <path d="M0 100h100v100H50c-27.6 0-50-22.4-50-50V100z" fill="#FF7262" />
      {/* Blue — middle-right circle */}
      <circle cx="150" cy="150" r="50" fill="#1ABCFE" />
      {/* Green — bottom-left semicircle */}
      <path d="M0 200h100v50c0 27.6-22.4 50-50 50S0 277.6 0 250v-50z" fill="#0ACF83" />
    </svg>
  )
}

const INTEGRATIONS = [
  { name: 'ChatGPT', icon: <ChatGPTIcon /> },
  { name: 'Figma', icon: <FigmaIcon /> },
  { name: 'Notion', icon: <NotionIcon /> },
  { name: 'Slack', icon: <SlackIcon /> },
  { name: 'API', icon: null },
]

export default function ClientSection() {
  return (
    <section id="clients" className="bg-white px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0, ease: EASE_OUT_EXPO }}
          className="text-3xl md:text-4xl mb-6"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            color: 'var(--ink)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
          }}
        >
          Not a chatbot.
          <br />
          A point of view you can use.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.07, ease: EASE_OUT_EXPO }}
          className="flex flex-col gap-3 mb-10"
          style={{ color: 'var(--mid)', lineHeight: 1.65, fontSize: '15px', fontWeight: 300 }}
        >
          <p>You&rsquo;re not buying answers.</p>
          <p>You&rsquo;re bringing in how someone thinks.</p>
          <p>Use one agent. Or combine several. Strategy. Creative. Design.</p>
          <p>They work alongside your team. In the tools you already use.</p>
        </motion.div>

        {/* Integration logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center gap-3"
        >
          {INTEGRATIONS.map(({ name, icon }) => (
            <div
              key={name}
              className="flex items-center gap-2 px-3 py-2"
              style={{
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '6px',
                backgroundColor: '#fafaf8',
              }}
            >
              {icon && <span className="flex-shrink-0">{icon}</span>}
              <span
                style={{
                  fontFamily: 'var(--font-dmSans)',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'var(--ink)',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
