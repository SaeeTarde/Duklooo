import { useState } from 'react'
import { motion } from 'framer-motion'
import { config, memories } from '../data/memories'
import Exhibit from './Exhibit'

export default function Museum() {
  const [playingId, setPlayingId] = useState(null)

  const toggle = (id) => setPlayingId((cur) => (cur === id ? null : id))
  const ended = (id) => setPlayingId((cur) => (cur === id ? null : cur))

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
      className="relative z-10"
    >
      {/* 🏛️ Entrance hall */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.4 }}
          className="font-display text-5xl sm:text-6xl md:text-8xl text-cream glow-text leading-tight"
        >
          {config.museumTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="font-serif italic text-blush text-xl md:text-3xl mt-6"
        >
          {config.museumSubtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="text-cream/60 text-sm tracking-[0.3em] uppercase mt-4"
        >
          Curated for {config.boyfriendName}
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-3 text-gold/80"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="block w-px h-10 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </header>

      {/* 🖼️ Exhibits */}
      {memories.map((memory, i) => (
        <Exhibit
          key={memory.id}
          memory={memory}
          index={i}
          isPlaying={playingId === memory.id}
          onToggle={() => toggle(memory.id)}
          onEnded={() => ended(memory.id)}
        />
      ))}

      {/* 💌 Exit hall */}
      <footer className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-12 h-12 heartbeat mb-8"
        >
          <svg viewBox="0 0 24 24" fill="#c9475f" className="drop-shadow-[0_0_18px_rgba(201,71,95,0.7)]">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2 0 3.7 1.1 5.4 3.2 1.7-2.1 3.4-3.2 5.4-3.2 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z" />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-display text-3xl md:text-5xl text-cream glow-text max-w-2xl leading-snug"
        >
          {config.closingNote}
        </motion.p>
      </footer>
    </motion.main>
  )
}