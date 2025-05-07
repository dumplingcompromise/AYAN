// src/app/layout.tsx

import './global.css'
import '@coinbase/onchainkit/styles.css'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import Script from 'next/script'
import { Major_Mono_Display } from 'next/font/google'
import type { Metadata } from 'next'
import { NEXT_PUBLIC_URL, NEXT_PUBLIC_GA_ID } from '../config'

const majorMono = Major_Mono_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  { ssr: false }
)

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: 'Are you an NPC?',
  description: 'Are you?',
  openGraph: {
    title: 'Are you an NPC?',
    description: 'Are you?',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={majorMono.className}>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="overflow-hidden">
        {/* full‑screen stacking context */}
        <div className="relative w-screen h-screen">
          {/* background image/video */}
          <img
            src="/bg4.svg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* main app UI overlaid */}
          <div className="relative z-10 flex flex-col h-full">
            <OnchainProviders>
              <Header />
              <PageTransition>
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
              </PageTransition>
            </OnchainProviders>
          </div>
        </div>
      </body>
    </html>
  )
}
