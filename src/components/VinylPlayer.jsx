import { useEffect, useRef, useState } from 'react'

const fmt = (s) => {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

export default function VinylPlayer({
  src,
  songTitle,
  photo,
  isPlaying,
  onToggle,
  onEnded,
}) {
  const audioRef = useRef(null)
  const [error, setError] = useState('')
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  const fail = (why) => {
    console.error('Song problem:', src, why)
    setError('Song file not found or unreadable. Check its name in public/songs/')
    onEnded?.()
  }

  // Play or pause the audio whenever isPlaying changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      setError('')
      audio.play().catch((err) => {
        if (err.name === 'AbortError') return
        fail(err)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the audio element's volume in sync
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  const seek = (value) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = value
    setCurrent(value)
  }

  const skip = (secs) => {
    const audio = audioRef.current
    if (!audio) return
    seek(Math.min(Math.max(audio.currentTime + secs, 0), duration || 0))
  }

  const progress = duration ? (current / duration) * 100 : 0
  const volPct = (muted ? 0 : volume) * 100

  return (
    <div className="flex flex-col items-center">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={() => {
          setCurrent(0)
          onEnded?.()
        }}
        onError={() => fail('load error')}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Turntable */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48">
        {/* Tonearm */}
        <div
          className="absolute -top-2 -right-4 z-10 w-1.5 h-28 origin-top rounded-full
            bg-gradient-to-b from-gold to-frame transition-transform duration-[900ms] ease-in-out"
          style={{ transform: `rotate(${isPlaying ? 24 : -10}deg)` }}
        >
          <div className="absolute -bottom-2 -left-1 w-4 h-5 rounded-sm bg-gold" />
        </div>

        {/* Record */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? 'Pause song' : 'Play song'}
          className={`relative w-full h-full rounded-full vinyl-spin ${isPlaying ? '' : 'paused'}`}
          style={{
            background:
              'repeating-radial-gradient(circle at center, #0a0a0a 0, #0a0a0a 2px, #1a1216 3px, #0a0a0a 4px)',
            boxShadow: isPlaying
              ? '0 0 40px rgba(201,71,95,0.35), 0 10px 30px rgba(0,0,0,0.6)'
              : '0 10px 30px rgba(0,0,0,0.6)',
            transition: 'box-shadow 0.8s',
          }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.12) 40deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.09) 220deg, transparent 270deg)',
            }}
          />
          <span
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cover bg-center border-2 border-rose/70"
            style={{ backgroundImage: `url(${photo})` }}
          >
            <span className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-ink" />
          </span>
        </button>
      </div>

      {/* Play/pause pill */}
      <button
        type="button"
        onClick={onToggle}
        className="mt-6 flex items-center gap-3 rounded-full border border-rose/50 px-5 py-2
          text-blush text-xs tracking-[0.2em] uppercase hover:bg-rose hover:text-cream
          transition-all duration-500"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
          </svg>
        )}
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <p className="mt-3 font-serif italic text-cream/70 text-center text-base">
        ♪ {songTitle}
      </p>

      {/* 🎚️ Controls strip */}
      <div className="mt-5 w-64 sm:w-72">
        {/* Seek bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={current}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          className="seek w-full"
          style={{ '--fill': `${progress}%` }}
        />
        <div className="flex justify-between text-[11px] text-cream/50 mt-2 tabular-nums tracking-wider">
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* Skip + volume */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-blush/80">
            <button
              type="button"
              onClick={() => skip(-10)}
              aria-label="Back 10 seconds"
              className="text-[11px] tracking-widest hover:text-rose transition-colors"
            >
              ⟲ 10s
            </button>
            <button
              type="button"
              onClick={() => skip(10)}
              aria-label="Forward 10 seconds"
              className="text-[11px] tracking-widest hover:text-rose transition-colors"
            >
              10s ⟳
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="text-blush/80 hover:text-rose transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 9v6h4l5 4V5L7 9H3z" />
                {muted || volume === 0 ? (
                  <path
                    d="M16 9l5 6M21 9l-5 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M15.5 8.5a5 5 0 0 1 0 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value))
                setMuted(false)
              }}
              aria-label="Volume"
              className="seek w-16"
              style={{ '--fill': `${volPct}%` }}
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-rose text-xs text-center max-w-[16rem]">{error}</p>
      )}
    </div>
  )
}