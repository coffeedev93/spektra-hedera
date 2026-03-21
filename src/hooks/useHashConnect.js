'use client'

import { useEffect, useState } from 'react';
import { HashConnect } from 'hashconnect';
import { LedgerId } from '@hiero-ledger/sdk';
import { useWalletStore } from '../store/useWalletStore';

// Next.js safely accesses window.location.origin only on the client
const appMetadata = {
  name: "Spektra",
  description: "Stealth payments on Hedera",
  icons: ["https://cryptologos.cc/logos/hedera-hbar-logo.png"], // Replace with your actual icon
  url: typeof window !== 'undefined' ? window.location.origin : "",
};

// Keep the instance outside the hook so it doesn't re-initialize on re-renders
let hcInstance = null;

export const useHashConnect = () => {
  const { accountId, setAccountId, setConnectionState } = useWalletStore();
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const initHashConnect = async () => {
      // Prevent double initialization
      if (hcInstance || isInitializing) return;
      setIsInitializing(true);

      try {
        hcInstance = new HashConnect(
          LedgerId.TESTNET, // Change to LedgerId.MAINNET for production
          process.env.NEXT_PUBLIC_WALLETCONNECT_ID, // Get this from cloud.walletconnect.com
          appMetadata,
          true // Debug mode enabled
        );

        // Listen for pairing events (user accepts connection)
        hcInstance.pairingEvent.on((pairingData) => {
          if (pairingData.accountIds.length > 0) {
            setAccountId(pairingData.accountIds[0]);
          }
        });

        // Listen for disconnection
        hcInstance.disconnectionEvent.on(() => {
          setAccountId(null);
        });

        // Listen for connection status changes
        hcInstance.connectionStatusChangeEvent.on((status) => {
          setConnectionState(status);
        });

        await hcInstance.init();
      } catch (error) {
        console.error("HashConnect initialization failed:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initHashConnect();
  }, [setAccountId, setConnectionState, isInitializing]);

  const connect = () => {
    if (hcInstance) {
      hcInstance.openPairingModal();
    }
  };

  const disconnect = async () => {
    if (hcInstance) {
      await hcInstance.disconnect();
    }
  };

  const signData = async (message) => {
    if (!hcInstance || !accountId) {
      throw new Error("Wallet is not connected.");
    }

    try {
      // HashConnect prompts Hashpack to sign the string payload
      // const signatureResponse = await hcInstance.signMessages(accountId, message); // method 1
			let signer = hcInstance.getSigner(accountId);
			let signatureResponse = await signer.sign([message]);
			// response = [{ accountId, publicKey, signature }]
			// signatureString = response[0].signature.toString('hex')
			// publicKey = response[0].publicKey.toString('hex')
			// evmAddress = response[0].publicKey.toEvmAddress()
			// publicKey.verify(message, signature)
      return signatureResponse;
    } catch (error) {
      console.error("User rejected signature or it failed:", error);
      return null;
    }
  };

  return { hcInstance, connect, disconnect, signData };
};