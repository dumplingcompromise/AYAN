'use client'

import type { FC } from 'react'

interface Screen1Props {
  onNext: () => void
}

const Screen1: FC<Screen1Props> = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center h-screen space-y-6">
    {/* Page title */}
    <h1 className="text-5xl font-bold">
      Are you an NPC?
    </h1>
    {/* Challenge prompt */}
    <h2 className="text-4xl font-semibold">
      Take the challenge to find out.
    </h2>
    <button
      onClick={onNext}
      className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
    >
      Let’s Go
    </button>
  </div>
)

export default Screen1
