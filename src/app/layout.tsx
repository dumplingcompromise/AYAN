// src/app/layout.tsx

import type { Metadata } from 'next'
import { NEXT_PUBLIC_URL } from '../config'

import './global.css'
import '@coinbase/onchainkit/styles.css'
import dynamic from 'next/dynamic'
import Header from '../components/Header'

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  { ssr: false }
)

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: 'Base Profile',
  description: 'Built with OnchainKit',
  openGraph: {
    title: 'Base Profile',
    description: 'Built with OnchainKit',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        {/* 
          Single stacking context container:
          - relative so children z-index works predictably 
          - full viewport 
        */}
        <div className="relative w-screen h-screen">
          {/* Video absolutely fills the container, behind everything */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/ayan_bg.mp4"           
            poster="/ayan_bg.jpg"        
          />

          {/* 
            Everything else sits on top of the video,
            via a positive z-index 
          */}
          <div className="relative z-10 flex flex-col h-full">
            <OnchainProviders>
              <Header />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </OnchainProviders>
          </div>
        </div>
      </body>
    </html>
  )
}
