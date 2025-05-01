'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ResponsesDisplay from './ResponsesDisplay'

interface MindfulnessProps {
  address: string
}

export default function Mindfulness({ address }: MindfulnessProps) {
  const [phase, setPhase] = useState<'timer'|'form'|'complete'>('timer')
  const [timeLeft, setTimeLeft] = useState(5)   // still 5s for testing
  const [how, setHow]   = useState('')          // now a string
  const [what, setWhat] = useState('')

  // Countdown
  useEffect(() => {
    if (phase !== 'timer') return
    if (timeLeft <= 0) {
      setPhase('form')
      return
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [phase, timeLeft])

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('AYAN_ANSWERS')
      .insert({
        wallet_addr: address,
        how_response: how,      // now stores the text
        what_response: what,
      })
    if (!error) {
      setPhase('complete')
    } else {
      alert('Error saving your response')
    }
  }

  if (phase === 'timer') {
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
    const secs = String(timeLeft % 60).padStart(2, '0')
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <h2 className="text-3xl font-semibold">Find a quiet room… then start</h2>
        <div className="text-6xl font-mono">{mins}:{secs}</div>
      </div>
    )
  }

  if (phase === 'form') {
    return (
      <div className="max-w-md mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-semibold">
          Congrats, you made it. Just one more thing:
        </h2>

        <div>
          <label className="block mb-1">How do you feel?</label>
          <select
            className="w-full border p-2 rounded"
            value={how}
            onChange={e => setHow(e.target.value)}
          >
            <option value="" disabled>Select one…</option>
            <option value="I feel much worse">I feel much worse</option>
            <option value="I feel worse">I feel worse</option>
            <option value="I feel better">I feel better</option>
            <option value="I feel much better">I feel much better</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">What do you feel?</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={what}
            onChange={e => setWhat(e.target.value)}
          />
        </div>

        <button
          className="w-full py-2 bg-black text-white rounded"
          onClick={handleSubmit}
          disabled={!how || !what.trim()}
        >
          Submit
        </button>
      </div>
    )
  }

  return (
      <div className="px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4 mb-6">
          <h2 className="text-2xl font-semibold">Thank you!</h2>
          <p>Your responses have been saved.</p>
        </div>
        <ResponsesDisplay />
      </div>
    )
}
