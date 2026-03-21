"use client"

import { useWalletStore } from '@/store/useWalletStore'
import {
  HederaProvider,
  HederaAdapter,
  HederaChainDefinition,
  hederaNamespace,
} from '@hashgraph/hedera-wallet-connect'
import { createAppKit } from '@reown/appkit'
import { useEffect, useState } from 'react'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
console.log(projectId)

const metadata = {
  name: "Spektra",
  description: "Stealth payments on Hedera",
  url: typeof window !== 'undefined' ? window.location.origin : "", // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

// EVM adapter (eip155)
const hederaEVMAdapter = new HederaAdapter({
  projectId,
  networks: [HederaChainDefinition.EVM.Mainnet, HederaChainDefinition.EVM.Testnet],
  namespace: 'eip155',
})

// Native adapter (hedera namespace)
const hederaNativeAdapter = new HederaAdapter({
  projectId,
  networks: [HederaChainDefinition.Native.Mainnet, HederaChainDefinition.Native.Testnet],
  namespace: hederaNamespace,
})

const universalProvider = (await HederaProvider.init({
  projectId,
  metadata,
})) 

// Keep the instance outside the hook so it doesn't re-initialize on re-renders
let appKit = null; 

export const useWalletConnect = () => { 
	const { setAccountId, setConnectionState } = useWalletStore();
	const [isInitializing, setIsInitializing] = useState(false);

	useEffect(() => {
		const initWalletConnect = async () => {
			// Prevent double initialization
      if (appKit || isInitializing) return;
      setIsInitializing(true);

			try {
				appKit = createAppKit({
					adapters: [hederaEVMAdapter, hederaNativeAdapter],
					universalProvider,
					projectId,
					metadata,
					networks: [
						//HederaChainDefinition.EVM.Mainnet,
						HederaChainDefinition.EVM.Testnet,
						//HederaChainDefinition.Native.Mainnet,
						HederaChainDefinition.Native.Testnet,
					],
				})

				appKit.subscribeAccount((account) => {
					if (account?.address) {
						console.log('Connected:', account.address, 'Type:', account.type)
					} else {
						console.log('Disconnected')
					}
				})

				appKit.subscribeCaipNetworkChange((network) => {
					console.log('Network changed:', network?.caipNetworkId)
				})

			} catch (error) {
        console.error("WallerConnect initialization failed:", error);
      } finally {
        setIsInitializing(false);
      }
		}

		initWalletConnect();
	}, [setAccountId, setConnectionState, isInitializing]);

	const connect = () => {
    if (appKit) {
      appKit.open();
    }
  };

  const disconnect = async () => {
    if (appKit) {
      //await appKit.disconnect();
			console.log('disconnect')
    }
  };

  return { 
		appKit,
		universalProvider,
		hederaNativeAdapter,
		hederaEVMAdapter,
		connect, 
		disconnect 
	};
}