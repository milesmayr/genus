import { type Transition } from 'framer-motion'

// Cubic bezier typed as tuple to satisfy Framer Motion's Easing type
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const fadeUp = (delay = 0): { initial: object; animate: object; transition: Transition } => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: EASE_OUT_EXPO },
})

export const fadeUpInView = (delay = 0): {
  initial: object
  whileInView: object
  viewport: object
  transition: Transition
} => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
})
