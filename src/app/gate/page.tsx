// src/app/gate/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import ChoiceGate from '../../components/ChoiceGate'

export default function GatePage() {
  const router = useRouter()

  return (
    <div
      className="relative h-screen w-full bg-white bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <ChoiceGate onNext={() => router.push('/mind')} />
      </div>
    </div>
  )
}
