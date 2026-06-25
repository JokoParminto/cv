import { useEffect, useState } from 'react'

const LINES = [
  '> initializing portfolio...',
  '> loading experience...',
  '> compiling skills...',
  '> ready.',
]

export default function SplashScreen({ onDone }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [displayed, setDisplayed] = useState([])
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (lineIndex >= LINES.length) return

    const current = LINES[lineIndex]
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(c => c + 1), 28)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, current])
        setCharIndex(0)
        setLineIndex(l => l + 1)
        setProgress(Math.round(((lineIndex + 1) / LINES.length) * 100))
      }, 180)
      return () => clearTimeout(t)
    }
  }, [lineIndex, charIndex])

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(() => setFading(true), 400)
      return () => clearTimeout(t)
    }
  }, [lineIndex])

  useEffect(() => {
    if (fading) {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
  }, [fading, onDone])

  const currentTyping = lineIndex < LINES.length
    ? LINES[lineIndex].slice(0, charIndex)
    : ''

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-slate-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm px-6 space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl border border-primary/20 bg-white shadow-md mb-4">
            <span className="font-mono font-black text-xl text-gradient">HB</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 tracking-wider uppercase whitespace-nowrap">
            Heru Bagus · System Analyst & Backend Engineer
          </p>
        </div>

        {/* Terminal window — stays dark for terminal aesthetic */}
        <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
          {/* macOS-style title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a3a] bg-[#1a1a24]">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-[#4a4a6a]">portfolio.sh</span>
          </div>
          {/* Terminal body */}
          <div className="bg-[#111118] p-5 font-mono text-sm space-y-2 min-h-[130px]">
            {displayed.map((line, i) => (
              <div key={i} className="text-green-400/80">{line}</div>
            ))}
            {lineIndex < LINES.length && (
              <div className="text-green-400">
                {currentTyping}
                <span className="border-r-2 border-green-400 ml-0.5 animate-blink">&nbsp;</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
