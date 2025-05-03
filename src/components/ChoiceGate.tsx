// src/components/ChoiceGate.tsx
'use client'

import { useState, useCallback } from 'react'
import { useAccount, useBlockNumber, useBalance } from 'wagmi'
import { base } from 'viem/chains'
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction'
import DonateButton from './DonateButton'

// 1 000 000 × 10¹⁸
const TOKEN_ADDRESS = '0x265fb8d9d850be033dc7e98403edff97d3fafb07' as `0x${string}`
const HOLD_THRESHOLD = 1_000_000n * 10n ** 18n

interface ChoiceGateProps {
  onNext: () => void
}

export default function ChoiceGate({ onNext }: ChoiceGateProps) {
  const { address } = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })

  // on‑chain balance
  const { data: tokenBal } = useBalance({
    address,
    token: TOKEN_ADDRESS,
    chainId: base.id,
    blockNumber,
  })
  const holdsThreshold = (tokenBal?.value ?? 0n) >= HOLD_THRESHOLD

  // local state
  const [donated, setDonated] = useState(false)
  const [held, setHeld]       = useState(false)

  // donation handler
  const handleDonateStatus = useCallback(
    (status: LifecycleStatus) => {
      if (status.statusName === 'success') {
        setDonated(true)
        onNext()
      }
    },
    [onNext]
  )

  // hold handler
  const handleHold = () => {
    if (holdsThreshold) {
      setHeld(true)
      onNext()
    } else {
      alert('You need to hold at least 1,000,000 SEMI tokens to proceed.')
    }
  }

  const eligible = donated || held

  return (
    <div className="p-12 max-w-2xl mx-auto space-y-12">
      {/* Header image */}
      <div className="w-full flex justify-center mb-8">
        <img
          src="/no_good.png"
          alt="No good things in life are free – portrait"
          className="
            w-full max-w-2xl h-auto object-contain rounded-lg
            shadow-lg hover:shadow-2xl transition-shadow duration-200
          "
        />
      </div>

      {/* Subheading */}
      <div className="text-center">
        <h3 className="text-xl font-medium">Choose how you tribute</h3>
      </div>

      {/* Buttons with “OR” */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex-1">
          <DonateButton onStatus={handleDonateStatus} />
        </div>

        <span className="text-sm font-medium text-gray-700">OR</span>

        <div className="flex-1">
                    <button
              onClick={handleHold}
              disabled={held}
              className="
                w-full px-4 py-2
                bg-gray-100 text-black
                border-2 border-black
                rounded-lg
                hover:bg-black hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
              "
            >
              {held ? 'Held ✔️' : 'Hold 1 000 000 SEMI tokens'}
            </button>
        </div>
      </div>

      {/* Checklist */}
      <ul className="list-disc pl-5 space-y-1">
        <li>{donated ? '✅' : '❌'} Donated 0.00001 ETH</li>
        <li>
          {holdsThreshold || held ? '✅' : '❌'} Holds ≥ 1 000 000 SEMI tokens
        </li>
      </ul>

      {/* Proceed */}
      {eligible && (
        <button
          onClick={onNext}
          className="
            w-full py-3
            bg-black text-white
            rounded-lg
            hover:bg-gray-800
            transition-colors duration-200
          "
        >
          Proceed
        </button>
      )}
    </div>
  )
}
