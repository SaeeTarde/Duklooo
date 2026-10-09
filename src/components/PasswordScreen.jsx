import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../data/memories'

export default function PasswordScreen({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [opening, setOpening] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (opening) return

    const correct =
      value.trim().toLowerCase() === config.password.trim().toLowerCase()

    if (correct) {
      setError('')
      setOpening(true)
      setTimeout(onUnlock, 1800) // let the "welcome" moment play
    } else {
      const msgs = config.wrongMessages
      setError(msgs[Math.floor(Math.random() * msgs.length)])
      setShaking(true)
      setTimeout(() => setShaking(false), 450)
      setValue('')
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 1 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-6"
    >
      <AnimatePresence mode="wait">
        {!opening ? (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md text-center"
          >
            {/* Beating heart */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
              className="mx-auto mb-8 w-14 h-14 heartbeat"
            >
              <svg viewBox="0 0 24 24" fill="#c9475f" className="drop-shadow-[0_0_18px_rgba(201,71,95,0.7)]">
                <path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2 0 3.7 1.1 5.4 3.2 1.7-2.1 3.4-3.2 5.4-3.2 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z" />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-4"
            >
              Private Collection
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="font-display text-5xl md:text-6xl text-cream glow-text mb-3"
            >
              Only for You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="font-serif italic text-blush text-xl mb-10"
            >
              Say the secret word to enter - 
              Song where it started...
            </motion.p>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <input
                type="password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="• • • • • •"
                autoFocus
                autoComplete="off"
                className={`w-full bg-wall/80 border border-frame focus:border-rose outline-none
                  rounded-full px-6 py-4 text-center text-cream tracking-[0.3em] text-lg
                  placeholder:text-frame transition-colors duration-300
                  focus:shadow-[0_0_30px_rgba(201,71,95,0.25)] ${shaking ? 'shake' : ''}`}
              />

              <button
                type="submit"
                className="mt-5 w-full rounded-full border border-rose/60 text-blush py-3
                  tracking-[0.3em] text-sm uppercase hover:bg-rose hover:text-cream
                  transition-all duration-500"
              >
                Unlock
              </button>
            </motion.form>

            {/* Error message */}
            <div className="h-8 mt-5">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    key={error + shaking}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-rose text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-2"
            >
              <button
                type="button"
                onClick={() => setShowHint((s) => !s)}
                className="text-gold/80 hover:text-gold text-xs tracking-[0.25em] uppercase transition-colors"
              >
                {showHint ? 'Hide hint' : 'Need a hint?'}
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-serif italic text-cream/80 text-lg mt-3 overflow-hidden"
                  >
                    {config.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          /* Shown for ~1.8s after the correct password */
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
              Access granted
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-cream glow-text">
              Welcome, {config.boyfriendName}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}