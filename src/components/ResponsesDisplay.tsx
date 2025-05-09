'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

interface ResponseRow {
  how_response: string
  what_response: string
}

interface PositionedRow extends ResponseRow {
  x: number
}

export default function ResponsesDisplay() {
  const [rows, setRows] = useState<ResponseRow[]>([])

  useEffect(() => {
    async function fetchResponses() {
      const { data, error } = await supabase
        .from('AYAN_ANSWERS')
        .select('how_response, what_response, created_at')
        .order('created_at', { ascending: false })
        .limit(5000)
      if (error) {
        console.error('Fetch error:', error)
      } else {
        setRows(data)
        console.log('loaded responses:', data)
      }
    }
    fetchResponses()
  }, [])

  const npcs: PositionedRow[] = useMemo(
    () =>
      rows
        .filter(r =>
          ['I feel much worse', 'I feel about the same', 'I feel worse']
            .includes(r.how_response)
        )
        .map(r => ({ ...r, x: Math.random() * 80 + 10 })),
    [rows]
  )

  const humans: PositionedRow[] = useMemo(
    () =>
      rows
        .filter(r =>
          ['I feel lighter', 'I feel insightful'].includes(r.how_response)
        )
        .map(r => ({ ...r, x: Math.random() * 80 + 10 })),
    [rows]
  )

  return (
    <div className="grid grid-cols-2 gap-6 p-6 font-displayMono">
      {[
        { title: 'What NPCs Have Said', items: npcs },
        { title: 'What Humans Have Said', items: humans },
      ].map(({ title, items }, col) => (
        <div
          key={col}
          className="
            relative h-96 overflow-hidden
            bg-white bg-opacity-80
            backdrop-blur-sm
            rounded-lg
            shadow-md
            border border-gray-200
            p-4
          "
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3 tracking-wide border-b pb-2">
            {title}
          </h3>

          {items.map((r, i) => {
            // clamp to [10%, 90%]
            const clampedX = Math.min(Math.max(r.x, 10), 90)
            return (
              <motion.p
                key={`${col}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 1, 0], y: [20, 0, -300, -300] }}
                transition={{
                  duration: 13,
                  delay: i * 1.5,
                  ease: 'easeInOut',
                  times: [0, 0.1, 0.9, 1],
                }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${clampedX}%`,
                  transform: 'translateX(-50%)',
                }}
                className="
                  text-sm text-gray-700 font-medium
                  break-words max-w-xs text-center
                "
              >
                {r.what_response}
              </motion.p>
            )
          })}
        </div>
      ))}
    </div>
  )
}
