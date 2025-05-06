// src/app/head.tsx
import { NEXT_PUBLIC_URL } from '../config'

export default function Head() {
  return (
    <>
      <title>Are you an NPC?</title>
      <meta name="description" content="Take the on‑chain NPC challenge" />

      {/* this is critical */}
      <meta
        name="fc:frame"
        content={JSON.stringify({
          version: '1',
          imageUrl: `${NEXT_PUBLIC_URL}/embed.png`,
          button: {
            title: 'Check this out',
            action: { type: 'url', url: `${NEXT_PUBLIC_URL}` },
          }
        })}
      />
    </>
  )
}
