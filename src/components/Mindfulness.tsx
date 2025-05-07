// src/components/Mindfulness.tsx
'use client'

import { useState, useEffect, MouseEvent } from 'react'
import { supabase } from '../lib/supabase'
import ResponsesDisplay from './ResponsesDisplay'
import { motion, AnimatePresence } from 'framer-motion'

interface MindfulnessProps {
  address: string
}

export default function Mindfulness({ address }: MindfulnessProps) {
  // ─── Phase & form state ────────────────────────────────
  const [phase, setPhase] = useState<'ready'|'timer'|'form'|'complete'>('ready')
  const [timeLeft, setTimeLeft] = useState(1800)     // countdown
  const [how, setHow]     = useState('')          // select value
  const [what, setWhat]   = useState('')          // textarea value

  // ─── Begin overlay animation ──────────────────────────
  const [beginPos, setBeginPos]   = useState<{ x:number; y:number }|null>(null)
  const [expanding, setExpanding] = useState(false)

  // ─── Spinner delay for “Analyzing…” ──────────────────
  const [showResults, setShowResults] = useState(false)

  // ─── Countdown effect ─────────────────────────────────
  useEffect(() => {
    if (phase !== 'timer') return
    if (timeLeft <= 0) {
      setPhase('form')
      return
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [phase, timeLeft])

  // ─── Trigger spinner when we hit complete ─────────────
  useEffect(() => {
    if (phase === 'complete') {
      setShowResults(false)
      const id = setTimeout(() => setShowResults(true), 1000)
      return () => clearTimeout(id)
    }
    // reset if we ever leave complete
    setShowResults(false)
  }, [phase])

  // ─── Handlers ─────────────────────────────────────────
  function handleBeginClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setBeginPos({ x: rect.x + rect.width/2, y: rect.y + rect.height/2 })
    setExpanding(true)
  }
  async function handleSubmit() {
    const { error } = await supabase
      .from('AYAN_ANSWERS')
      .insert({
        wallet_addr: address,
        how_response: how,
        what_response: what,
      })
    if (!error) {
      setPhase('complete')
    } else {
      alert(`Error saving your response: ${error.message}`)
    }
  }

  // ─── Common background + overlay wrapper ───────────────
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/tranquil.mp4" type="video/mp4" />
      </video>
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* expanding circle for “Begin” → timer */}
      <AnimatePresence>
        {expanding && beginPos && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-20 bg-black"
            initial={{ clipPath: `circle(0px at ${beginPos.x}px ${beginPos.y}px)` }}
            animate={{ clipPath: `circle(150% at ${beginPos.x}px ${beginPos.y}px)` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              setExpanding(false)
              setPhase('timer')
            }}
          />
        )}
      </AnimatePresence>

      {/* phase content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* ─── Ready ───────────────────────────────────────── */}
        {phase === 'ready' && (
          <>
            <img
              src="/poem.png"
              alt="Poem"
              className="max-w-md w-full h-auto object-contain drop-shadow-lg mb-8"
            />
            <button
              onClick={handleBeginClick}
              className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition"
            >
              Begin
            </button>
          </>
        )}

        {/* ─── Timer ───────────────────────────────────────── */}
        {phase === 'timer' && (
          <>
            <h2 className="text-3xl font-semibold text-white mb-4">Time remaining</h2>
            <div className="text-6xl font-mono text-white">
              {String(Math.floor(timeLeft/60)).padStart(2,'0')}:
              {String(timeLeft%60).padStart(2,'0')}
            </div>
          </>
        )}

        {/* ─── Form ────────────────────────────────────────── */}
        {phase === 'form' && (
          <div className="max-w-lg w-full bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Congrats, you made it. Just one more thing:
            </h2>
            <div className="space-y-1">
              <label htmlFor="how" className="block text-sm font-medium text-gray-700">How do you feel?</label>
              <select
                id="how" value={how}
                onChange={e => setHow(e.target.value)}
                className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>Select one…</option>
                <option value="I feel much worse">I feel much worse</option>
                <option value="I feel worse">I feel worse</option>
                <option value="I feel about the same">I feel about the same</option>
                <option value="I feel lighter">I feel lighter</option>
                <option value="I feel insightful">I feel insightful</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="what" className="block text-sm font-medium text-gray-700">What do you feel?</label>
              <textarea
                id="what" rows={4} value={what}
                onChange={e => setWhat(e.target.value)}
                placeholder="Describe your thoughts…"
                className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!how || !what.trim()}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              Submit
            </button>
          </div>
        )}

        {/* ─── Complete ─────────────────────────────────────── */}
        {phase === 'complete' && (
          <>
            {!showResults ? (
              // spinner + message
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"/>
                <motion.span
                  className="text-lg text-white"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration:1, repeat:Infinity }}
                >
                  Analyzing your silence…
                </motion.span>
              </div>
            ) : (
              // final message + responses
              <>
                <h2 className="text-3xl font-semibold text-center text-white mb-4">
                  {new Set(['I feel much worse','I feel worse','I feel about the same']).has(how)
                    ? "Looks like you’re an NPC. So sorry."
                    : "Looks like you’re a human. The world needs you."}
                </h2>
                <p className="max-w-lg text-center text-white mb-6">
                  Here’s what everyone else has shared:
                </p>
                <div className="w-full max-w-4xl overflow-visible">
                  <ResponsesDisplay />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
