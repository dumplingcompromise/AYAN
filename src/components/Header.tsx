'use client'

import WalletWrapper from './WalletWrapper'

export default function Header() {
  return (
    <header className="w-full px-4 py-2 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-end">
        <WalletWrapper />
      </div>
    </header>
  )
}
