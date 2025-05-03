// src/components/DonateButton.tsx
'use client'

import { useCallback } from 'react'
import {
  Transaction,
  TransactionButton,
  type LifecycleStatus,
} from '@coinbase/onchainkit/transaction'
import { parseEther } from 'ethers'

interface DonateButtonProps {
  onStatus?: (status: LifecycleStatus) => void
  className?: string
}

const RECEIVER = '0xAB24620dCA851f82427639A6c80c03C00ED18995' as `0x${string}`
// ≈0.00001 ETH
const DONATION_VALUE = parseEther('0.00001')

export default function DonateButton({
  onStatus,
  className = '',
}: DonateButtonProps) {
  const handleStatus = useCallback(
    (status: LifecycleStatus) => {
      if (status.statusName === 'success') {
        alert('Thanks for your donation! 🙏')
      }
      onStatus?.(status)
    },
    [onStatus]
  )

  return (
    <Transaction
      calls={[{ to: RECEIVER, value: DONATION_VALUE }]}
      onStatus={handleStatus}
    >
      <TransactionButton
        text="Donate 0.0001 ETH"
                className={`
          w-full px-4 py-2
          bg-gray-100 text-black
          border-2 border-black
          rounded-lg
          hover:bg-black hover:text-white
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          ${className}
        `}
      />
    </Transaction>
  )
}
