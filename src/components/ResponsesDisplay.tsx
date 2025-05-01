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
      if (error) console.error('Fetch error:', error)
      else setRows(data)
    }
    fetchResponses()
  }, [])

  const npcs: PositionedRow[] = useMemo(
    () =>
      rows
        .filter(r =>
          r.how_response === 'I feel much worse' ||
          r.how_response === 'I feel worse'
        )
        .map(r => ({ ...r, x: Math.random() * 80 + 10 })),
    [rows]
  )

  const humans: PositionedRow[] = useMemo(
    () =>
      rows
        .filter(r =>
          r.how_response === 'I feel better' ||
          r.how_response === 'I feel much better'
        )
        .map(r => ({ ...r, x: Math.random() * 80 + 10 })),
    [rows]
  )

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {[
        { title: 'What NPCs said', items: npcs },
        { title: 'What humans said', items: humans }
      ].map(({ title, items }, col) => (
        <div key={col} className="relative h-96 overflow-hidden border p-2">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          {items.map((r, i) => (
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
                left: `${r.x}%`,
                whiteSpace: 'nowrap',
              }}
              className="text-sm"
            >
              {r.what_response}
            </motion.p>
          ))}
        </div>
      ))}
    </div>
  )
}
