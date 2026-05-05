'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const DESKTOP_LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/agents', label: 'All agents' },
  { href: '/about', label: 'About' },
]

const MOBILE_NAV_LINKS = [
  { href: '/how-it-works', label: 'How it works', primary: true },
  { href: '/agents', label: 'All agents', primary: true },
  { href: '/about', label: 'About', primary: true },
  { href: '/agents', label: 'Sign in', primary: false },
]

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showWordmark, setShowWordmark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setIsScrolled(y > 20)
      setShowWordmark(y > 160)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'backdrop-blur-md' : '',
        )}
        style={{
          backgroundColor: isScrolled ? 'rgba(17,17,16,0.95)' : 'transparent',
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-16 max-w-7xl mx-auto">
          {/* Wordmark — fades in after hero logo scrolls away (homepage), always visible elsewhere */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Genus home"
            style={{
              opacity: isHomepage ? (showWordmark ? 1 : 0) : 1,
              transition: 'opacity 0.35s ease',
              pointerEvents: isHomepage ? (showWordmark ? 'auto' : 'none') : 'auto',
            }}
          >
            <Wordmark />
          </Link>

          {/* Desktop centre links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {DESKTOP_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors duration-150 hover:text-white"
                style={{ fontFamily: 'var(--font-dmSans)', color: 'rgba(255,255,255,0.55)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/agents"
              className="text-sm px-4 py-2 border rounded-sm transition-colors duration-150 hover:border-white/40 hover:text-white"
              style={{
                fontFamily: 'var(--font-dmSans)',
                color: 'rgba(255,255,255,0.6)',
                borderColor: 'rgba(255,255,255,0.2)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Sign in
            </Link>
            <Link
              href="/apply"
              className="text-sm font-medium px-4 py-2 rounded-sm transition-opacity duration-150 hover:opacity-90"
              style={{
                fontFamily: 'var(--font-dmSans)',
                backgroundColor: 'var(--yellow)',
                color: 'var(--ink)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Apply &rarr;
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ backgroundColor: 'var(--ink)' }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-5 h-14">
              <Wordmark />
              <button
                className="flex items-center justify-center w-11 h-11 text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-5 pt-8 flex-1">
              {MOBILE_NAV_LINKS.map(({ href, label, primary }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-5 border-b"
                    style={{
                      borderColor: 'rgba(255,255,255,0.08)',
                      ...(primary
                        ? {
                            fontFamily: 'var(--font-archivoblack)',
                            fontSize: '24px',
                            color: 'white',
                          }
                        : {
                            fontFamily: 'var(--font-dmSans)',
                            fontSize: '15px',
                            fontWeight: 300,
                            color: 'rgba(255,255,255,0.4)',
                          }),
                    }}
                  >
                    {label}
                    {primary && (
                      <span style={{ color: 'var(--yellow)', fontSize: '20px' }}>&rarr;</span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              className="px-5 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.25 }}
            >
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-4 rounded-sm text-sm font-medium"
                style={{
                  fontFamily: 'var(--font-dmSans)',
                  backgroundColor: 'var(--yellow)',
                  color: 'var(--ink)',
                }}
              >
                Apply as a creator &rarr;
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2 select-none">
      <Image src="/Logo.png" alt="" width={36} height={36} priority />
      <span
        className="text-xl tracking-[-0.02em] text-white"
        style={{ fontFamily: 'var(--font-archivoblack)' }}
      >
        <span style={{ color: 'var(--yellow)' }}>G</span>ENUS
      </span>
    </span>
  )
}
