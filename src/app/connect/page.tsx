// src/app/connect/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import GateConnect from '../../components/GateConnect'

export default function ConnectPage() {
  const router = useRouter()

  return (
    <div
      className="relative h-screen w-full bg-white bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/bg4.svg')" }}
    >
      {/* slight white overlay to ensure legibility */}
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <GateConnect onConnect={() => router.push('/gate')} />
      </div>
    </div>
  )
}
