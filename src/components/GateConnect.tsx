'use client'

import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet'

interface GateConnectProps {
  onConnect: () => void
}

export default function GateConnect({ onConnect }: GateConnectProps) {
  const { isConnected } = useAccount()

  // only fire onConnect when the user actually connects
  useEffect(() => {
    if (isConnected) {
      onConnect()
    }
  }, [isConnected, onConnect])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-4">Please connect your wallet to proceed</p>
      <Wallet>
      <ConnectWallet>
       
         <div className="px-4 py-2 bg-black text-white rounded cursor-pointer">
           Connect Wallet
         </div>
       </ConnectWallet>
      </Wallet>
    </div>
  )
}
