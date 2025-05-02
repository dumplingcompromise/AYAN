// src/app/mind/page.tsx
'use client'

import { useAccount } from 'wagmi'
import Mindfulness from '../../components/Mindfulness'

export default function MindPage() {
  const { address, isConnected } = useAccount()

  // if they somehow hit this route without connecting:
  if (!isConnected || !address) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please connect your wallet first.</p>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen w-full bg-white bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10">
        <Mindfulness address={address} />
      </div>
    </div>
  )
}
