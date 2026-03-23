"use client"

import Link from "next/link";
import { useWalletStore } from "@/store/useWalletStore";
import { useWalletConnectV3 } from "@/hooks/useWalletConnectV3";

export default function HeroButtons({
  setIsModalOpen
}) {
  // Bring in our global state and HashConnect methods
  const { accountId } = useWalletStore();
  const { connect } = useWalletConnectV3();
  
  const isConnected = !!accountId;

  return (
    <div className="flex flex-wrap gap-6">
      {/* Conditional Button Logic based on Wallet State */}
      {!isConnected ? (
        <button
          onClick={connect}
          className="spectral-glow text-on-primary font-bold px-10 py-4 rounded-md text-lg active:scale-95 transition-all"
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-surface-bright text-primary border border-primary/40 font-bold px-10 py-4 rounded-md text-lg active:scale-95 transition-all shadow-[0_0_15px_rgba(255,171,243,0.3)] hover:shadow-[0_0_25px_rgba(255,171,243,0.5)]"
        >
          Initialize Session Keys
        </button>
      )}
      <Link
        href="/assets"
        className="bg-surface-variant/40 border border-outline-variant/20 text-on-surface font-bold px-10 py-4 rounded-md text-lg hover:bg-surface-variant/60 transition-all"
      >
        Learn More
      </Link>
    </div>
  )
}