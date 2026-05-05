'use client'

export default function ControlStrip() {
  return (
    <div className="w-full bg-[var(--ink2)] py-3 px-4 overflow-x-auto">
      <div className="flex items-center gap-6 min-w-max mx-auto max-w-5xl">
        <Item color="yellow" label="ENCRYPTED" />
        <Item color="yellow" label="ATTRIBUTED" />
        <Item color="yellow" label="TRACEABLE" />
        <Item color="red" label="PULL THE PLUG ANYTIME" />
      </div>
    </div>
  )
}

function Item({ color, label }: { color: 'yellow' | 'red'; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color === 'yellow' ? 'var(--yellow)' : 'var(--red)' }}
      />
      <span
        className="text-[9px] tracking-[0.12em] uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          color: color === 'yellow' ? 'var(--yellow)' : 'var(--red)',
        }}
      >
        {label}
      </span>
    </span>
  )
}
