import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CLICKABLE = 'a, button, input, textarea, select, [role="button"], [data-clickable]'

function Heart({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#c9475f">
      <path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2 0 3.7 1.1 5.4 3.2 1.7-2.1 3.4-3.2 5.4-3.2 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

export default function HeartCursor() {
  // Only show on devices with a real mouse (not phones/tablets)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [trail, setTrail] = useState([])

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Spring = smooth following
  const sx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 38, mass: 0.5 })

  const lastSpawn = useRef(0)
  const idCounter = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHovering(!!e.target.closest?.(CLICKABLE))

      // Spawn a trail heart every ~70ms
      const now = performance.now()
      if (now - lastSpawn.current > 70) {
        lastSpawn.current = now
        const id = idCounter.current++
        setTrail((t) => [...t.slice(-12), { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => setTrail((t) => t.filter((h) => h.id !== id)), 900)
      }
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      {/* Trail */}
      {trail.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 0.55, scale: 0.7, y: 0 }}
          animate={{ opacity: 0, scale: 0.3, y: 14 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="fixed top-0 left-0 pointer-events-none z-[99] -ml-2 -mt-2"
          style={{ left: h.x, top: h.y }}
        >
          <Heart size={16} />
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] -ml-3 -mt-3"
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{ scale: pressed ? 0.85 : hovering ? 1.7 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="drop-shadow-[0_0_10px_rgba(201,71,95,0.8)]"
        >
          <Heart size={24} />
        </motion.div>
      </motion.div>
    </>
  )
}