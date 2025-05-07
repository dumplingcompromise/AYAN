// src/components/MiniKitReady.tsx
'use client'

import { useEffect } from 'react'
import { useMiniKit } from '@coinbase/onchainkit/minikit'

export default function MiniKitReady() {
  const { isFrameReady, setFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) {
      // tell the Farcaster frame “we’re good to go”
      setFrameReady()
    }
  }, [isFrameReady, setFrameReady])

  return null
}
