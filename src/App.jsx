import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PasswordScreen from './components/PasswordScreen'
import Museum from './components/Museum'
import HeartCursor from './components/HeartCursor'

function App() {
  const [unlocked, setUnlocked] = useState(false)

  return (
    <>
      <HeartCursor />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <PasswordScreen key="lock" onUnlock={() => setUnlocked(true)} />
        ) : (
          <Museum key="museum" />
        )}
      </AnimatePresence>
    </>
  )
}

export default App