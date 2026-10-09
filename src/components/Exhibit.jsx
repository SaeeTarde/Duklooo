import { motion } from 'framer-motion'
import VinylPlayer from './VinylPlayer'

export default function Exhibit({ memory, index, isPlaying, onToggle, onEnded }) {
  const flip = index % 2 === 1 // alternate left/right on desktop
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative max-w-5xl mx-auto px-6 py-16 md:py-24"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* 🖼️ Framed photo (frame adapts to the photo's shape) */}
        <div className={`flex justify-center ${flip ? 'md:order-2' : ''}`}>
          <div className="relative w-fit max-w-full">
            {/* Gallery spotlight glow */}
            <div
              className="absolute -inset-10 -z-10 rounded-full blur-3xl transition-opacity duration-1000"
              style={{
                background:
                  'radial-gradient(circle, rgba(201,71,95,0.22), transparent 70%)',
                opacity: isPlaying ? 1 : 0.5,
              }}
            />

            {/* Frame */}
            <div className="bg-frame p-3 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-gold/30">
              {/* Mat */}
              <div className="bg-wall p-3 sm:p-4 border border-black/60 overflow-hidden">
                <img
                  src={memory.photo}
                  alt={memory.title}
                  loading="lazy"
                  className="block w-auto h-auto max-w-full max-h-[70vh] bg-ink
                    transition-transform duration-[1500ms] hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* Museum plaque */}
            <div className="mx-auto -mt-5 relative w-fit px-5 py-2 bg-ink border border-gold/40 text-center shadow-lg">
              <p className="text-gold text-[10px] tracking-[0.35em] uppercase">
                Exhibit {number}
              </p>
              <p className="text-cream/60 text-xs mt-0.5">{memory.date}</p>
            </div>
          </div>
        </div>

        {/* ✍️ Message + vinyl */}
        <div className={`text-center md:text-left ${flip ? 'md:order-1' : ''}`}>
          <h2 className="font-display text-4xl md:text-5xl text-cream glow-text mb-5">
            {memory.title}
          </h2>

          <div className="w-12 h-px bg-rose mx-auto md:mx-0 mb-6" />

          <p className="font-serif italic text-xl md:text-2xl text-blush/90 leading-relaxed mb-12">
            “{memory.message}”
          </p>

          <div className="flex justify-center md:justify-start">
            <VinylPlayer
              src={memory.song}
              songTitle={memory.songTitle}
              photo={memory.photo}
              isPlaying={isPlaying}
              onToggle={onToggle}
              onEnded={onEnded}
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}