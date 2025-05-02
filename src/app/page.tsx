// src/app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Screen1 from '../components/Screen1'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="relative h-screen w-full">
      {/* full‑screen video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/ayan_bg.mp4" type="video/mp4" />
        {/* fallback if no video */}
      </video>

      {/* semi‑transparent overlay for contrast */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* your Screen1 UI */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Screen1 onNext={() => router.push('/connect')} />
      </div>
    </div>
  )
}
