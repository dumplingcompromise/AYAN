'use client'

import type { FC } from 'react'

interface Screen1Props {
  onNext: () => void
}

const Screen1: FC<Screen1Props> = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center h-screen space-y-6">
    {/* Replace the text title with your image */}
    <img
      src="/np_title.png"
      alt="Are you an NPC?"
      className="w-auto h-auto"       
    />

    {/* Challenge prompt */}
    <h2 className="text-4xl font-semibold font-displayMono">
      Take the challenge to find out.
    </h2>

    {/* Call‑to‑action */}
    <button
      onClick={onNext}
      className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
    >
      Let’s Go
    </button>
  </div>
)

export default Screen1
