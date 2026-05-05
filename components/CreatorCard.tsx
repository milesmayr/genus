'use client'

import Image from 'next/image'

export interface CreatorCardProps {
  creatorName: string
  discipline: string
  quote: string
  clients: string[]
  agentName: string
  creatorAvatar?: string
}

export default function CreatorCard({
  creatorName,
  discipline,
  quote,
  clients,
  agentName,
  creatorAvatar,
}: CreatorCardProps) {
  const initial = creatorName.charAt(0).toUpperCase()

  return (
    <div
      style={{
        backgroundColor: '#161614',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Identity block */}
      <div className="p-6 flex-1">
        {/* Avatar */}
        <div className="mb-5">
          {creatorAvatar ? (
            <Image
              src={creatorAvatar}
              alt={creatorName}
              width={88}
              height={88}
              className="rounded-full object-cover"
              style={{ width: 88, height: 88 }}
            />
          ) : (
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 88,
                height: 88,
                backgroundColor: 'rgba(232,184,32,0.08)',
                border: '1px solid rgba(232,184,32,0.18)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-archivoblack)',
                  fontSize: '36px',
                  color: 'var(--yellow)',
                  lineHeight: 1,
                }}
              >
                {initial}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <div
          className="mb-1 leading-tight"
          style={{
            fontFamily: 'var(--font-archivoblack)',
            fontSize: '18px',
            color: 'white',
            letterSpacing: '-0.02em',
          }}
        >
          {creatorName}
        </div>

        {/* Discipline */}
        <div
          className="mb-6"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--yellow)',
          }}
        >
          {discipline}
        </div>

        {/* Quote — the testimonial */}
        <p
          style={{
            fontFamily: 'var(--font-dmSans)',
            fontSize: '15px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Clients */}
      <div
        className="px-6 py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="mb-2.5"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
          }}
        >
          Worked with
        </div>
        <div className="flex flex-wrap gap-1.5">
          {clients.slice(0, 4).map((client) => (
            <span
              key={client}
              style={{
                fontFamily: 'var(--font-dmSans)',
                fontSize: '11px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.38)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '2px',
                padding: '3px 8px',
              }}
            >
              {client}
            </span>
          ))}
        </div>
      </div>

      {/* Agent attribution */}
      <div
        className="px-6 py-3.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dmSans)',
            fontSize: '12px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.28)',
          }}
        >
          Their agent:{' '}
          <span style={{ color: 'var(--yellow)', fontWeight: 400 }}>{agentName}</span>
        </span>
      </div>
    </div>
  )
}
