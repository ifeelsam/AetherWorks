"use client"

import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, coinbaseWallet, metaMask } from 'wagmi/connectors'

// Set up wagmi config with Base Sepolia as default network
export const config = createConfig({
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({
      appName: 'UGC Marketplace',
    }),
  ],
})
