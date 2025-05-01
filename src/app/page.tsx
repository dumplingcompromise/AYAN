'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

import Screen1     from '../components/Screen1'
import GateConnect from '../components/GateConnect'
import ChoiceGate  from '../components/ChoiceGate'
import Mindfulness from '../components/Mindfulness'

export default function Page() {
  const [step, setStep] = useState<'start'|'connect'|'gate'|'mind'>('start')
  const { isConnected, address } = useAccount()

  // If user is already connected, show gate; otherwise show connect
  useEffect(() => {
    if (step === 'connect' && isConnected) {
      setStep('gate')
    }
  }, [step, isConnected])

  return (
    <>
      {step === 'start' && (
        <Screen1 onNext={() => setStep('connect')} />
      )}

      {step === 'connect' && (
        <GateConnect onConnect={() => setStep('gate')} />
      )}

      {step === 'gate' && (
        <ChoiceGate onNext={() => setStep('mind')} />
      )}

      {step === 'mind' && address && (
        <Mindfulness address={address} />
      )}
    </>
  )
}
