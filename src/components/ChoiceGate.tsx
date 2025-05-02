'use client'

import { useState, useCallback } from 'react'
import { useAccount, useBlockNumber, useBalance } from 'wagmi'
import { base } from 'viem/chains'
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction'
import DonateButton from './DonateButton'

const TOKEN_ADDRESS = '0x265fb8d9d850be033dc7e98403edff97d3fafb07' as `0x${string}`
// 1,000,000 * 10^18
const HOLD_THRESHOLD = 1_000_000n * 10n ** 18n

interface ChoiceGateProps {
  onNext: () => void
}

export default function ChoiceGate({ onNext }: ChoiceGateProps) {
  const { address } = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })

  const { data: tokenBal } = useBalance({
    address,
    token: TOKEN_ADDRESS,
    chainId: base.id,
    blockNumber,
  })
  const holdsThreshold = (tokenBal?.value ?? 0n) >= HOLD_THRESHOLD

  const [donated, setDonated] = useState(false)
  const [held, setHeld]       = useState(false)

  // Typed status callback
  const handleDonateStatus = useCallback((status: LifecycleStatus) => {
    if (status.statusName === 'success') {
      setDonated(true)
      onNext()
    }
  }, [onNext])

  const handleHold = () => {
    if (holdsThreshold) {
      setHeld(true)
      onNext()
    } else {
      alert('You need to hold at least 1,000,000 NPC tokens to proceed.')
    }
  }

  const eligible = donated || held

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Step 2: Gate</h2>

      <div className="flex space-x-4">
        <DonateButton onStatus={handleDonateStatus} />

        <button
          onClick={handleHold}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          disabled={held}
        >
          {held ? 'Held ✔️' : 'I hold ≥ 1,000,000 NPC tokens'}
        </button>
      </div>

      <ul className="list-disc pl-5 space-y-1">
        <li>{donated           ? '✅' : '❌'} Donated 0.00001 ETH</li>
        <li>{holdsThreshold||held ? '✅' : '❌'} Holds ≥ 1,000,000 NPC tokens</li>
      </ul>

      {eligible && (
        <button
          onClick={onNext}
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
        >
          Proceed
        </button>
      )}
    </div>
  )
}
