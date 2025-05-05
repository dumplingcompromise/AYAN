<meta
  name="fc:frame"
  content={JSON.stringify({
    version: '1',                   // must be "1" or "next"
    imageUrl: 'https://…/embed.png', // 3:2 aspect ratio
    button: {
      title: 'Are you an NPC?',     // max 32 chars
      action: {                     // how the frame should open
        type: 'url',
        url:    'https://ayan‑ecru.vercel.app',
      }
    }
  })}
/>