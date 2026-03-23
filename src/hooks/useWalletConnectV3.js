"use client"

import { useWalletStore } from '@/store/useWalletStore'
import {
  DAppConnector, 
	HederaJsonRpcMethod, 
	HederaSessionEvent, 
	HederaChainId, 
} from '@hashgraph/hedera-wallet-connect'
import { 
	LedgerId, 
} from '@hiero-ledger/sdk'

import { useEffect, useState } from 'react'


// Create a new project in walletconnect cloud to generate a project id
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
const currentNetworkConfig = {
    network: "testnet",
    jsonRpcUrl: "https://testnet.hashio.io/api", // check out the readme for alternative RPC Relay urls
    mirrorNodeUrl: "https://testnet.mirrornode.hedera.com",
    chainId: "0x128",
  }
const hederaNetwork = currentNetworkConfig.network;

// Adapted from walletconnect dapp example:
const metadata = {
  name: "Spektra",
  description: "Stealth payments on Hedera",
  icons: ["https://cryptologos.cc/logos/hedera-hbar-logo.png"], // Replace with your actual icon
  url: typeof window !== 'undefined' ? window.location.origin : "",
};

const dappConnector = new DAppConnector(
	metadata,
	LedgerId.fromString(hederaNetwork),
	walletConnectProjectId,
	Object.values(HederaJsonRpcMethod),
	[HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
	[HederaChainId.Testnet],
);

// ensure walletconnect is initialized only once
let walletConnectInitPromise = undefined;
const initializeWalletConnect = async () => {
	if (walletConnectInitPromise === undefined) {
		walletConnectInitPromise = dappConnector.init();
	}
	await walletConnectInitPromise;
};

export const useWalletConnectV3 = () => { 
	const { accountId, setAccountId, setConnectionState } = useWalletStore();
  const [isInitializing, setIsInitializing] = useState(false);

	// useEffect(() => {
	// 	const init = async () => {
	// 		await initializeWalletConnect()
	// 		console.log(dappConnector)
	// 	}

	// 	init();
	// }, [accountId])

	const connect = async () => {
		await initializeWalletConnect()
		await dappConnector.openModal().then((res) => {
			const accountId = dappConnector.signers[0]?.getAccountId()?.toString();
			console.log(accountId, res)
			if (accountId) {
				setAccountId(accountId);
				setConnectionState("connected");
			} else {
				setAccountId('');
				setConnectionState("disconnected");
			}
		});
	}

	const disconnect = async () => {
		dappConnector.disconnectAll().then(() => {
      setAccountId('');
			setConnectionState("disconnected");
    });
	}

	const getSigner = () => {
    if (dappConnector.signers.length === 0) {
      throw new Error('No signers found!');
    }
    return dappConnector.signers[0];
  }

	const signData = async (message) => {
		if (!dappConnector || !accountId) {
      throw new Error("Wallet is not connected.");
    }

		try {
      // HashConnect prompts Hashpack to sign the string payload
      // const signatureResponse = await hcInstance.signMessages(accountId, message); // method 1
			let signer = getSigner();
			let signatureResponse = await signer.sign([message]);

      return signatureResponse;
    } catch (error) {
      console.error("User rejected signature or it failed:", error);
      return null;
    }
	}

	return {
		connect,
		disconnect,
		getSigner,
		signData
	}
}