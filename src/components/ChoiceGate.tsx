'use client'

import { useState } from 'react'

interface ChoiceGateProps {
  onNext: () => void
}

export default function ChoiceGate({ onNext }: ChoiceGateProps) {
  const [donated, setDonated] = useState(false)
  const [held, setHeld]       = useState(false)

  const eligible = donated || held

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 px-4">
      <h2 className="text-2xl font-semibold">Step 2: Gate</h2>

      <div className="flex space-x-4">
        <button
          onClick={() => setDonated(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={donated}
        >
          {donated ? 'Donated ✔️' : 'Donate $1 ETH'}
        </button>

        <button
          onClick={() => setHeld(true)}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          disabled={held}
        >
          {held ? 'Held ✔️' : 'I hold $1 of the token'}
        </button>
      </div>

      <ul className="list-disc pl-5 text-left">
        <li>{donated ? '✅' : '❌'} Donated $1 ETH</li>
        <li>{held    ? '✅' : '❌'} Holds $1 of the token</li>
      </ul>

      {eligible && (
        <button
          onClick={onNext}
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
        >
          Proceed
        </button>
      )}
    </div>
  )
}
