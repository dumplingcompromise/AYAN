'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Screen1 from '../components/Screen1'
import { useMiniKit } from '@coinbase/onchainkit/minikit'

export default function HomePage() {
  const router = useRouter()
  const { setFrameReady, isFrameReady } = useMiniKit()

  // tell MiniKit that our page is ready to display
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [isFrameReady, setFrameReady])

  return (
    <div className="relative h-screen w-full">
      {/* full‑screen background */}
      {/* <img
        src="/bg4.svg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}

      {/* main content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Screen1 onNext={() => router.push('/connect')} />
      </div>
    </div>
  )
}
