'use client'

import type { FC } from 'react'

interface Screen1Props {
  onNext: () => void
}

const Screen1: FC<Screen1Props> = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-semibold mb-8">
      Ready to start the challenge?
    </h1>
    <button
      onClick={onNext}
      className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
    >
      Let’s Go
    </button>
  </div>
)

export default Screen1
