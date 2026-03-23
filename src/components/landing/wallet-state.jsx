"use client"

import { useWalletStore } from "@/store/useWalletStore";
import { useWalletConnectV3 } from "@/hooks/useWalletConnectV3";


export default function WalletState({}) {
  // Bring in our global state and HashConnect methods
  const { accountId } = useWalletStore();
  const { connect, disconnect } = useWalletConnectV3();
  
  const isConnected = !!accountId;

  return (
    <div className="flex items-center gap-2">
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
        <button 
          title="Disconnect"
          onClick={disconnect} 
          className="p-2 text-[#e4e1e6] opacity-70 hover:text-[#ffabf3] transition-all"
        >
          <span className="material-symbols-outlined" data-icon="link_off">link_off</span>
        </button>
      )}
    </div>
  )
}