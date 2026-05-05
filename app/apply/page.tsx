'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { EASE_OUT_EXPO } from '@/lib/motion'

type Step = 1 | 2 | 3 | 4
const TOTAL_STEPS = 4

const DISCIPLINES = [
  'UX / Service Design',
  'Brand Strategy',
  'Creative Direction',
  'Screenwriting',
  'Other',
]

const EXPERIENCE = ['2–5 years', '5–10 years', '10–20 years', '20+ years']

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
}

export default function ApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(1)
  const [discipline, setDiscipline] = useState('')
  const [experience, setExperience] = useState('')
  const [differentiator, setDifferentiator] = useState('')
  const [portfolio, setPortfolio] = useState('')

  const progress = ((step - 1) / TOTAL_STEPS) * 100

  function goNext() {
    if (step < TOTAL_STEPS) {
      setDirection(1)
      setStep((s) => (s + 1) as Step)
    } else {
      router.push('/apply/accepted')
    }
  }

  function goBack() {
    if (step > 1) {
      setDirection(-1)
      setStep((s) => (s - 1) as Step)
    }
  }

  const canProceed =
    (step === 1 && discipline !== '') ||
    (step === 2 && experience !== '') ||
    (step === 3 && differentiator.trim().length > 0) ||
    (step === 4 && portfolio.trim().length > 0)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--off)' }}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5" style={{ backgroundColor: 'var(--rule)' }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: 'var(--yellow)' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4 max-w-lg mx-auto w-full">
        <button
          onClick={goBack}
          className={cn(
            'text-sm transition-opacity',
            step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100',
          )}
          style={{ fontFamily: 'var(--font-dmSans)', color: 'var(--ink)', minHeight: '44px', minWidth: '44px' }}
        >
          &larr; Back
        </button>
        <span
          className="text-[10px] tracking-[0.16em] uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
        >
          {step} / {TOTAL_STEPS}
        </span>
        <div className="w-11" />
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="max-w-lg mx-auto w-full px-5 pb-10">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            >
              {step === 1 && <StepOne value={discipline} onChange={setDiscipline} />}
              {step === 2 && <StepTwo value={experience} onChange={setExperience} />}
              {step === 3 && <StepThree value={differentiator} onChange={setDifferentiator} />}
              {step === 4 && <StepFour value={portfolio} onChange={setPortfolio} />}
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={goNext}
            disabled={!canProceed}
            className={cn(
              'mt-8 w-full h-14 text-sm font-medium transition-opacity duration-200',
              canProceed ? 'opacity-100' : 'opacity-40 cursor-not-allowed',
            )}
            style={{
              fontFamily: 'var(--font-dmSans)',
              fontWeight: 500,
              backgroundColor: 'var(--yellow)',
              color: 'var(--ink)',
              borderRadius: '2px',
            }}
            whileHover={canProceed ? { filter: 'brightness(1.1)' } : {}}
          >
            {step === TOTAL_STEPS ? 'Submit application' : 'Continue'} &rarr;
          </motion.button>
        </div>
      </div>
    </div>
  )
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] tracking-[0.18em] uppercase mb-4"
      style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
    >
      {children}
    </p>
  )
}

function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl md:text-3xl mb-8"
      style={{
        fontFamily: 'var(--font-archivoblack)',
        color: 'var(--ink)',
        letterSpacing: '-0.03em',
        lineHeight: 1.05,
      }}
    >
      {children}
    </h2>
  )
}

function RadioCard({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-5 py-4 border transition-all duration-150',
        selected
          ? 'border-[var(--yellow)] bg-[var(--yellow-pale)]'
          : 'border-[var(--rule)] bg-white hover:border-[var(--muted)]',
      )}
      style={{ minHeight: '56px', borderRadius: '2px' }}
    >
      <span
        className="text-sm"
        style={{
          fontFamily: 'var(--font-dmSans)',
          color: selected ? 'var(--ink)' : 'var(--mid)',
          fontWeight: selected ? 500 : 300,
        }}
      >
        {label}
      </span>
    </button>
  )
}

function StepOne({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepLabel>Step 1</StepLabel>
      <StepHeading>What&rsquo;s your discipline?</StepHeading>
      <div className="flex flex-col gap-2">
        {DISCIPLINES.map((d) => (
          <RadioCard key={d} label={d} selected={value === d} onClick={() => onChange(d)} />
        ))}
      </div>
    </div>
  )
}

function StepTwo({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepLabel>Step 2</StepLabel>
      <StepHeading>How long have you been doing this?</StepHeading>
      <div className="flex flex-col gap-2">
        {EXPERIENCE.map((e) => (
          <RadioCard key={e} label={e} selected={value === e} onClick={() => onChange(e)} />
        ))}
      </div>
    </div>
  )
}

function StepThree({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const MAX = 280
  return (
    <div>
      <StepLabel>Step 3</StepLabel>
      <StepHeading>What would a client say makes you different?</StepHeading>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX))}
        rows={5}
        className="w-full resize-none border p-4 text-sm outline-none transition-colors duration-200"
        style={{
          fontFamily: 'var(--font-dmSans)',
          fontWeight: 300,
          color: 'var(--ink)',
          backgroundColor: 'white',
          borderColor: value.length > 0 ? 'var(--yellow)' : 'var(--rule)',
          lineHeight: 1.65,
          borderRadius: '2px',
        }}
        placeholder="They'd say I ask the questions no one else thinks to ask, then build frameworks that actually survive contact with reality."
      />
      <p
        className="mt-2 text-right text-xs"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
      >
        {value.length} / {MAX}
      </p>
    </div>
  )
}

function StepFour({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepLabel>Step 4</StepLabel>
      <StepHeading>Share your portfolio</StepHeading>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-4 text-sm outline-none transition-colors duration-200"
        style={{
          fontFamily: 'var(--font-dmSans)',
          fontWeight: 300,
          color: 'var(--ink)',
          backgroundColor: 'white',
          borderColor: value.length > 0 ? 'var(--yellow)' : 'var(--rule)',
          height: '56px',
          borderRadius: '2px',
        }}
        placeholder="https://yourportfolio.com"
      />
      <p
        className="mt-6 text-sm leading-relaxed"
        style={{ color: 'var(--mid)', fontWeight: 300, lineHeight: 1.65 }}
      >
        We review every application within 48 hours. We&rsquo;re looking for depth of thinking, not
        volume of work.
      </p>
    </div>
  )
}
