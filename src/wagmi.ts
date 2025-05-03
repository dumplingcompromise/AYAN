// // src/wagmi.ts
// 'use client'

// import { useMemo } from 'react'
// import { configureChains, createConfig } from 'wagmi'
// import { base, baseSepolia } from 'wagmi/chains'
// import { publicProvider } from 'wagmi/providers/public'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { NEXT_PUBLIC_WC_PROJECT_ID } from './config'

// export function useWagmiConfig() {
//   const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? ''
//   if (!projectId) {
//     throw new Error(
//       'To use WalletConnect you need to provide NEXT_PUBLIC_WC_PROJECT_ID'
//     )
//   }

//   return useMemo(() => {
//     // 1) configure chains + provider
//     const { chains, publicClient } = configureChains(
//       [base, baseSepolia],
//       [publicProvider()]
//     )

//     // 2) set up connectors
//     const connectors = [
//       new MetaMaskConnector({ chains }),
//       new CoinbaseWalletConnector({
//         chains,
//         options: { appName: 'YourAppName' },
//       }),
//       new WalletConnectConnector({
//         chains,
//         options: {
//           projectId,
//           metadata: {
//             name: 'YourAppName',
//             description: 'Your app description',
//             url: window.location.origin,
//             icons: [],
//           },
//         },
//       }),
//     ]

//     // 3) create and return the Wagmi config
//     return createConfig({
//       autoConnect: true,
//       publicClient,
//       connectors,
//     })
//   }, [projectId])
// }
