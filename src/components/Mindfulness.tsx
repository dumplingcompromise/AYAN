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
        <h2 className="text-3xl font-semibold text-center">
            The challenge has but one task<br/>
            To do nothing is what I ask<br/>
            ~<br/>
            Can you sit for 30 minutes and be still?<br/>
            Do you hear the silent voice within?<br/>
            ~<br/>
            If you truly believe that you're alive<br/>
            press Begin and let's find out
            </h2>
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
 // inside Mindfulness.tsx…

// 2) Form screen (styled card)
if (phase === 'form') {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="
          max-w-lg w-full
          bg-white bg-opacity-80
          backdrop-blur-md
          rounded-2xl shadow-xl
          p-8 space-y-6
        ">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Congrats, you made it. Just one more thing:
          </h2>
  
          {/* “How do you feel?” */}
          <div className="space-y-1">
            <label
              htmlFor="how"
              className="block text-sm font-medium text-gray-700"
            >
              How do you feel?
            </label>
            <select
              id="how"
              value={how}
              onChange={e => setHow(e.target.value)}
              className="
                block w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              <option value="" disabled>
                Select one…
              </option>
              <option value="I feel much worse">I feel much worse</option>
              <option value="I feel worse">I feel worse</option>
              <option value="I feel about the same">I feel about the same</option>
              <option value="I feel lighter">I feel lighter</option>
              <option value="I feel insightful">I feel insightful</option>
            </select>
          </div>
  
          {/* “What do you feel?” */}
          <div className="space-y-1">
            <label
              htmlFor="what"
              className="block text-sm font-medium text-gray-700"
            >
              What do you feel?
            </label>
            <textarea
              id="what"
              rows={4}
              value={what}
              onChange={e => setWhat(e.target.value)}
              placeholder="Describe your thoughts…"
              className="
                block w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                resize-none
              "
            />
          </div>
  
          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!how || !what.trim()}
            className="
              w-full py-3
              bg-indigo-600 text-white
              font-semibold rounded-lg shadow
              hover:bg-indigo-700
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            Submit
          </button>
        </div>
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