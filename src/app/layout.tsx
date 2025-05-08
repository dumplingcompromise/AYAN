import './global.css'
import '@coinbase/onchainkit/styles.css'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import Script from 'next/script'
import { Major_Mono_Display } from 'next/font/google'
import type { Metadata } from 'next'
import MiniKitReady from '../components/MiniKitReady'

import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
  NEXT_PUBLIC_ICON_URL,
  NEXT_PUBLIC_IMAGE_URL,
  NEXT_PUBLIC_BUTTON_TITLE,
  NEXT_PUBLIC_SPLASH_IMAGE_URL,
  NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
  NEXT_PUBLIC_MANIFEST_VERSION,
} from '../config'

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

// Build the Farcaster <meta fc:frame> payload
const fcFrame = {
  version: "next",
  imageUrl: NEXT_PUBLIC_IMAGE_URL,
  button: {
    title: NEXT_PUBLIC_BUTTON_TITLE,
    action: {
      type: "launch_frame",
      url: NEXT_PUBLIC_URL,
      name: NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      splashImageUrl: NEXT_PUBLIC_SPLASH_IMAGE_URL,
      splashBackgroundColor: `#${NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR}`,
    },
  },
}

export const metadata: Metadata = {
  title: NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
  description: 'Are you?',
  openGraph: {
    title: NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    description: 'Are you?',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
  other: {
    'fc:frame': JSON.stringify(fcFrame),
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
        <div className="relative w-screen h-screen">
          {/* background */}
          <img
            src="/bg4.svg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* app UI */}
          <div className="relative z-10 flex flex-col h-full">
            <OnchainProviders>
            <MiniKitReady />
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
