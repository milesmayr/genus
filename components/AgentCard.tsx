'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export interface AgentCardProps {
  agentName: string
  discipline: string
  creatorName: string
  creatorSlug: string
  agentSlug: string
  rating: number
  sessionCount: number
  satisfactionPct: number
  quote: string
  isAvailable?: boolean
  agentImage?: string
  creatorAvatar?: string
  onClick?: () => void
  className?: string
}

export default function AgentCard({
  agentName,
  discipline,
  creatorName,
  agentSlug,
  quote,
  isAvailable = true,
  agentImage,
  creatorAvatar,
  onClick,
  className,
}: AgentCardProps) {
  const initial = creatorName.charAt(0).toUpperCase()

  const cardClass = cn(
    'block overflow-hidden transition-opacity duration-200 hover:opacity-90',
    onClick ? 'cursor-pointer text-left w-full' : '',
    className,
  )
  const cardStyle = {
    backgroundColor: '#1a1a18',
    borderRadius: '3px',
    border: '1px solid rgba(255,255,255,0.07)',
  }

  const body = (
    <>
      {/* Visual area */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: '200px', backgroundColor: '#111110' }}
      >
        {agentImage ? (
          <Image
            src={agentImage}
            alt={agentName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-archivoblack)',
              fontSize: '80px',
              color: 'rgba(255,255,255,0.04)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {initial}
          </span>
        )}

        {/* Available badge */}
        <span
          className="absolute top-3 right-3 text-[8px] tracking-[0.12em] uppercase px-2 py-1"
          style={{
            fontFamily: 'var(--font-mono)',
            backgroundColor: isAvailable ? 'rgba(26,102,64,0.35)' : 'rgba(102,100,96,0.25)',
            color: isAvailable ? 'var(--green)' : 'var(--muted)',
            borderRadius: '2px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {isAvailable ? 'Available' : 'Waitlist'}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Creator row */}
        <div className="flex items-center gap-2.5 mb-4">
          {creatorAvatar ? (
            <Image
              src={creatorAvatar}
              alt={creatorName}
              width={28}
              height={28}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: 28, height: 28 }}
            />
          ) : (
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{ width: 28, height: 28, backgroundColor: 'rgba(232,184,32,0.15)' }}
            >
              <span
                className="text-xs leading-none"
                style={{ color: 'var(--yellow)', fontFamily: 'var(--font-archivoblack)' }}
              >
                {initial}
              </span>
            </div>
          )}
          <span
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dmSans)', fontWeight: 300 }}
          >
            {creatorName}
          </span>
        </div>

        {/* Agent name */}
        <div
          className="text-xl leading-tight text-white mb-2"
          style={{ fontFamily: 'var(--font-archivoblack)', letterSpacing: '-0.02em' }}
        >
          {agentName}
        </div>

        {/* Discipline tag — once */}
        <div className="mb-4">
          <span
            className="text-[8px] tracking-[0.12em] uppercase px-2 py-1"
            style={{
              fontFamily: 'var(--font-mono)',
              backgroundColor: 'rgba(232,184,32,0.1)',
              color: 'var(--yellow)',
              borderRadius: '2px',
            }}
          >
            {discipline}
          </span>
        </div>

        {/* Quote */}
        <p
          className="text-sm leading-relaxed"
          style={{
            color: 'rgba(255,255,255,0.38)',
            fontFamily: 'var(--font-dmSans)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={cardClass} style={cardStyle}>
        {body}
      </button>
    )
  }

  return (
    <Link href={`/agents/${agentSlug}`} className={cardClass} style={cardStyle}>
      {body}
    </Link>
  )
}
