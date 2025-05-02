'use client'

import WalletWrapper from './WalletWrapper'

export default function Header() {
  return (

   <header className="absolute top-0 left-0 w-full px-4 py-2 bg-transparent  z-20">
      <div className="max-w-7xl mx-auto flex justify-end">
        <WalletWrapper />
      </div>
    </header>
  )
}
