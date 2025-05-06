// src/components/OnchainProviders.tsx
'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import type { ReactNode } from 'react'
import { base } from 'viem/chains'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';


export default function OnchainProviders({ children }: { children: ReactNode }) {
  
  return (
    <MiniKitProvider
      projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID!}
      apiKey={process.env.NEXT_PUBLIC_CDP_API_KEY!}
      chain={base}
      config={{
        appearance: {
          name: 'Are you an NPC?',      // shown in the modal header
          mode: 'auto',
          theme: 'default',
        },
        wallet: {
          display: 'modal',            // <-- use the modal instead of dropdown
          supportedWallets: {
            // these are all disabled by default
          
            rabby:     true,            // enable Rabby
            trust:     true,            // enable Trust Wallet
            frame:     true,            // enable Frame
            // metamask & coinbase & walletconnect & phantom are on by default
          },
          termsUrl:    'https://your.app/terms',
          privacyUrl:  'https://your.app/privacy',
        },
      }}
    >
      {children}
    </MiniKitProvider>
  )
}
