'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ResponsesDisplay from './ResponsesDisplay'

interface MindfulnessProps {
  address: string
}

export default function Mindfulness({ address }: MindfulnessProps) {
  // Added 'ready' as the initial phase
  const [phase, setPhase] = useState<'ready'|'timer'|'form'|'complete'>('ready')
  const [timeLeft, setTimeLeft] = useState(5)   // 5s for testing
  const [how, setHow]   = useState('')
  const [what, setWhat] = useState('')

  // Countdown effect only runs when phase === 'timer'
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
        how_response: how,
        what_response: what,
      })
    if (!error) {
      setPhase('complete')
    } else {
      alert(`Error saving your response: ${error.message}`)
    }
  }

  // 0) Ready screen
  if (phase === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <h2 className="text-3xl font-semibold">Find a quiet room… then start</h2>
        <button
          className="px-6 py-3 bg-black text-white rounded"
          onClick={() => setPhase('timer')}
        >
          Start
        </button>
      </div>
    )
  }

  // 1) Timer screen
  if (phase === 'timer') {
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
    const secs = String(timeLeft % 60).padStart(2, '0')
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <h2 className="text-3xl font-semibold">Time remaining</h2>
        <div className="text-6xl font-mono">{mins}:{secs}</div>
      </div>
    )
  }

  // 2) Form screen
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
            <option value="I feel about the same">I feel about the same</option>
            <option value="I feel lighter">I feel lighter</option>
            <option value="I feel insightful">I feel insightful</option>
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
  const npcLabels = new Set([
    'I feel much worse',
    'I feel worse',
    'I feel about the same',
  ])
  const userIsNpc = npcLabels.has(how)

  // 3) Complete screen
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        {userIsNpc ? (
          <h2 className="text-2xl font-semibold text-red-600">
            Looks like you’re an NPC. So sorry.
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold text-green-600">
            Looks like you’re a human. The world needs you.
          </h2>
        )}
        <p className="text-gray-700">
          Here’s what everyone else has shared, too:
        </p>
      </div>

      {/* Ephemeral two-column animated feed */}
      <ResponsesDisplay />
    </div>
  )
}