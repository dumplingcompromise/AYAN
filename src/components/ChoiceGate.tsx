// src/components/ChoiceGate.tsx
'use client'

import React, { useState, useCallback } from 'react'
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

  // local UI state
  const [donated, setDonated]       = useState(false)
  const [held, setHeld]             = useState(false)
  const [showTradeModal, setShow]   = useState(false)

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

  // hold handler: either advance or pop modal
  const handleHold = () => {
    if (holdsThreshold) {
      setHeld(true)
      onNext()
    } else {
      setShow(true)
    }
  }

  const eligible = donated || held

  return (
    <div className="p-12 max-w-2xl mx-auto space-y-12">
      {/* ─── Header image (unchanged) ─────────────────────────── */}
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

      {/* ─── Subheading ───────────────────────────────────────── */}
      <div className="text-center">
      <h3 className="text-xl font-medium">
          Support the next dev experiment
        </h3><br/>
        <p className="text-sm text-gray-600">
          All proceeds help fund future projects and community development.
        </p>
      </div>

      {/* ─── Buttons with “OR” ─────────────────────────────────── */}
      <div className="flex items-stretch justify-center gap-4">
        <div className="flex-1">
          <DonateButton onStatus={handleDonateStatus} />
        </div>

        <span className="text-sm font-medium text-gray-700 self-center">OR</span>

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
            {held ? 'Held ✔️' : 'Hold 1M SEMI tokens'}
          </button>
        </div>
      </div>

      {/* ─── Checklist ────────────────────────────────────────── */}
      <ul className="list-disc pl-5 space-y-1">
        <li>{donated ? '✅' : '❌'} Donated 0.00005 ETH</li>
        <li>{holdsThreshold || held ? '✅' : '❌'} Holds ≥ 1 000 000 SEMI tokens</li>
      </ul>

      {/* ─── Proceed ──────────────────────────────────────────── */}
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

      {/* ─── Trade Modal ───────────────────────────────────────── */}
      {showTradeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShow(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-sm w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-2">Need more SEMI?</h2>
            <p className="mb-4">
              You need at least <strong>1 000 000 SEMI</strong> to proceed.
            </p>
            <a
              href="https://app.uniswap.org/explore/tokens/base/0x265fb8d9d850be033dc7e98403edff97d3fafb07"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg mb-2"
            >
              Trade on Uniswap
            </a>
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
