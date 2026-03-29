"use client"

import { fetchAccountData } from '@/lib/service'
import { generateSpendViewKeys } from '@/lib/stealthV2'
import { useWalletStore } from '@/store/useWalletStore'
import {
  DAppConnector, 
	HederaJsonRpcMethod, 
	HederaSessionEvent, 
	HederaChainId, 
} from '@hashgraph/hedera-wallet-connect'
import { 
	AccountId,
	Hbar,
	LedgerId,
	TransferTransaction, 
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
  const [isInitializing, setIsInitializing] = useState(false);
	const { 
		accountId, 
		setAccountId,
		setAccountData, 
		setUserMetaKeys,
		setConnectionState 
	} = useWalletStore();

	useEffect(() => {
		const init = async () => {
			await initializeWalletConnect()
			const _accountId = dappConnector.signers[0]?.getAccountId()?.toString();

			if (_accountId) {
				updateAccountInfo(_accountId, "Connected", true)
			}
		}

		init();
	}, [accountId])

	const updateAccountInfo = async (
		_accountId, 
		_connState, 
		_requestSignature = false
	) => {
		setAccountId(_accountId);
		setConnectionState("connected");
		setUserMetaKeys(null);

		if (!_accountId)
				return;

		try {
			// account data
			const data = await fetchAccountData(accountId);
			setAccountData(data);

			if (_requestSignature) {
				const val = window.sessionStorage.getItem("metaKeys");
				if (val !== null) {
					setUserMetaKeys(JSON.parse(val));
				}
				else {
					let signer = getSigner(_accountId);
					//console.log(signer)
					const metaKeys = await generateSpendViewKeys(signer);
					setUserMetaKeys(metaKeys);
					window.sessionStorage.setItem("metaKeys", JSON.stringify(metaKeys));
					console.log(metaKeys)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const connect = async () => {
		await initializeWalletConnect()
		await dappConnector.openModal().then((session) => {
			//const _accountId = dappConnector.signers[0]?.getAccountId()?.toString();
			const _accountId = session.namespaces.hedera.accounts[0].split(":")[2];
			if (_accountId) {
				updateAccountInfo(_accountId, "Connected", true)
			} else {
				updateAccountInfo("", "Disconnected")
			}
		});
	}

	const disconnect = async () => {
		dappConnector.disconnectAll().then(() => {
      updateAccountInfo("", "Disconnected")
			window.sessionStorage.removeItem("metaKeys")
    });
	}

	const getSigner = (_accountId) => {
    if (dappConnector.signers.length === 0) {
      throw new Error('No signers found!');
    }
		const id = accountId || _accountId;
		//console.log(dappConnector.signers, id);
    return dappConnector.signers.find(sig => sig.accountId.toString() === id);
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

	const makeTransfer = async (toAddress, numAmount, asset) => {
		try {
			const USDC_ID = process.env.NEXT_PUBLIC_USDC_TOKEN_ID;
      const tx = new TransferTransaction();
      
      if (asset === 'HBAR') {
        tx.addHbarTransfer(accountId, new Hbar(-numAmount))
          .addHbarTransfer(toAddress, new Hbar(numAmount));
      } else {
        const amountRaw = Math.round(numAmount * 1000000);
        tx.addTokenTransfer(USDC_ID, accountId, -amountRaw)
          .addTokenTransfer(USDC_ID, toAddress, amountRaw);
      }

      // 2. Sign and Execute via WalletConnect. Get the current signer!
      //const signer = dappConnector.signers.find(sig => sig.accountId.toString() === accountId);
			const signer = getSigner();
      const result = await tx.executeWithSigner(signer);
      const receipt = await result.getReceiptWithSigner(signer);
      
      return { error: false, message: receipt }
			re
    } catch (err) {
      console.log(err)
			return { error: true, message: err.message }
    } 
	}

	return {
		connect,
		disconnect,
		getSigner,
		signData,
		makeTransfer
	}
}