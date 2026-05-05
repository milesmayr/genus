'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AgentCard from '@/components/AgentCard'
import { AGENTS, DISCIPLINE_FILTERS, type DisciplineFilter } from '@/lib/agents'
import { cn } from '@/lib/cn'

type SortKey = 'Top rated' | 'Most sessions' | 'Newest'
const SORTS: SortKey[] = ['Top rated', 'Most sessions', 'Newest']

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState<DisciplineFilter>('All')
  const [activeSort, setActiveSort] = useState<SortKey>('Top rated')

  const filtered = useMemo(() => {
    let list = [...AGENTS]

    if (activeFilter !== 'All') {
      list = list.filter((a) => a.discipline === activeFilter)
    }

    if (activeSort === 'Top rated') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (activeSort === 'Most sessions') {
      list.sort((a, b) => b.sessionCount - a.sessionCount)
    }
    // 'Newest' keeps insertion order

    return list
  }, [activeFilter, activeSort])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--off)' }}>
      {/* Page header */}
      <div className="pt-24 pb-10 px-5 md:px-12" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl text-white mb-2"
            style={{
              fontFamily: 'var(--font-archivoblack)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
            }}
          >
            Agent directory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
          >
            {AGENTS.length} specialists. All verified.
          </motion.p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div
        className="sticky top-14 z-40 border-b px-5 md:px-12"
        style={{ backgroundColor: 'var(--off)', borderColor: 'var(--rule)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 items-center overflow-x-auto py-3 no-scrollbar">
            {/* Discipline pills */}
            <div className="flex gap-2 flex-shrink-0">
              {DISCIPLINE_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    'px-3 py-1.5 text-xs rounded-sm whitespace-nowrap transition-colors duration-150',
                    activeFilter === f
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--mid)] hover:text-[var(--ink)]',
                  )}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    backgroundColor: activeFilter === f ? 'var(--yellow)' : 'var(--surface)',
                    borderRadius: '2px',
                    minHeight: '44px',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="w-px h-5 flex-shrink-0" style={{ backgroundColor: 'var(--rule)' }} />

            {/* Sort pills */}
            <div className="flex gap-2 flex-shrink-0">
              {SORTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSort(s)}
                  className={cn(
                    'px-3 py-1.5 text-xs rounded-sm whitespace-nowrap transition-colors duration-150',
                    activeSort === s
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--mid)] hover:text-[var(--ink)]',
                  )}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    backgroundColor: activeSort === s ? 'var(--yellow)' : 'var(--surface)',
                    borderRadius: '2px',
                    minHeight: '44px',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 md:px-12 py-10">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p
                className="text-base mb-4"
                style={{ color: 'var(--mid)', fontWeight: 300 }}
              >
                No agents in this discipline yet.
              </p>
              <Link
                href="/apply"
                className="text-sm underline underline-offset-2 hover:opacity-70"
                style={{ color: 'var(--ink)' }}
              >
                Apply to be the first &rarr;
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((agent, i) => (
                <motion.div
                  key={agent.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <AgentCard
                    agentName={agent.agentName}
                    discipline={agent.discipline}
                    creatorName={agent.creatorName}
                    creatorSlug={agent.creatorSlug}
                    agentSlug={agent.slug}
                    rating={agent.rating}
                    sessionCount={agent.sessionCount}
                    satisfactionPct={agent.satisfactionPct}
                    quote={agent.quote}
                    isAvailable={agent.isAvailable}
                    agentImage={agent.agentImage}
                    creatorAvatar={agent.creatorAvatar}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
