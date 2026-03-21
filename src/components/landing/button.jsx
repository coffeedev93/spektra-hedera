'use client'

import { useWalletStore } from "@/store/useWalletStore";
import { useHashConnect } from "@/hooks/useHashConnect";

export default function ConnectButton() {
	// Bring in our global state and HashConnect methods
  const { accountId } = useWalletStore();
  const { connect, disconnect } = useHashConnect();
  
  const isConnected = !!accountId;

	if (!isConnected)
		return (
			<button onClick={connect} className="text-xs font-bold text-on-surface-variant hover:text-error transition-colors">
				Connect Wallet
			</button>
		)

	return (
		<>
			{/* Dynamic Connection Status Indicator */}
			<div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-container text-xs font-mono text-on-surface-variant">
				<div 
					className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${
						isConnected ? "bg-tertiary text-tertiary" : "bg-error text-error"
					}`}
				></div>
				{isConnected 
					? `${accountId}` 
					: "Not Connected"}
			</div>
			{isConnected && (
				<button onClick={disconnect} className="text-xs font-bold text-on-surface-variant hover:text-error transition-colors">
					Disconnect
				</button>
			)}
		</>
	)
}