'use client'

import { useState } from "react";
import Link from "next/link";
import LandingModal from "./modal";

import { useWalletStore } from "@/store/useWalletStore";
import { useHashConnect } from "@/hooks/useHashConnect";

export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bring in our global state and HashConnect methods
  const { accountId } = useWalletStore();
  const { connect, disconnect, signData } = useHashConnect();
  
  const isConnected = !!accountId;

  return (
    <>
      {/* TopNavBar */}
      <nav className="bg-[#0a0a0a] sticky top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-8 py-4">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-headline font-extrabold tracking-tighter text-transparent bg-clip-text spectral-glow">
              SPEKTRA
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
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
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex flex-col items-start justify-center px-8 md:px-24 py-24 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-2/3 h-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, #ff00ff 0%, transparent 70%)",
            }}
          ></div>
          <div className="z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="security-pulse"></div>
              <span className="font-label text-xs tracking-[0.2em] uppercase text-primary">
                Unlock Your Privacy
              </span>
            </div>
            <h1 className="font-headline font-extrabold text-6xl md:text-8xl tracking-tight leading-[1] text-on-surface mb-8">
              Stealth payments <br />
              <span className="text-transparent bg-clip-text spectral-glow">
                on Hedera
              </span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
              The latest upgrade for on-chain privacy. Transact without exposing
              your personal wallet using stealth address technology.
            </p>
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
          </div>

          {/* Visual Decorative Element */}
          <div className="absolute bottom-12 right-12 hidden lg:block">
            <div className="w-96 h-96 obsidian-glass border border-outline-variant/20 rounded-xl relative overflow-hidden p-8 flex flex-col justify-between shadow-2xl">
              <div className="flex justify-between items-start">
                <span
                  className="material-symbols-outlined text-primary !text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  security
                </span>
                <div className="text-right">
                  <p className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">
                    Encryption Level
                  </p>
                  <p className="font-headline font-bold text-2xl">ECC-256k1</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full spectral-glow w-3/4"></div>
                </div>
                <p className="text-sm font-body text-on-surface-variant">
                  Generating ephemeral keys for stealth transaction session...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="bg-surface-container-low py-32">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
              <h2 className="font-headline font-extrabold text-5xl md:text-6xl mb-6">
                How it works
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                We use the Elliptic Curve Diffie-Hellman (ECDH) key exchange to
                ensure only you and the recipient can ever link a transaction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-surface-container border border-transparent hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary !text-4xl mb-6">
                  visibility_off
                </span>
                <h3 className="font-headline text-xl font-bold mb-4">
                  One-Time Addresses
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Every transaction generates a unique stealth address. No one can
                  link multiple payments to your main identity.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-surface-container border border-transparent hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary !text-4xl mb-6">
                  encrypted
                </span>
                <h3 className="font-headline text-xl font-bold mb-4">
                  Private Scanning
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Only your Viewing Key can scan the network to find payments
                  intended for you, keeping your balance 100% private.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-surface-container border border-transparent hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary !text-4xl mb-6">
                  lock_open
                </span>
                <h3 className="font-headline text-xl font-bold mb-4">
                  Spending Authority
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Your Spending Key allows you to move funds while maintaining
                  anonymity, ensuring complete control over your assets.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Signature Modal */}
      {isModalOpen && (
        <LandingModal 
          signData={signData}
          setIsModalOpen={setIsModalOpen} 
        />
      )}

      {/* Footer */}
      <footer className="bg-[#131316] py-12 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xs font-label text-[#e4e1e6] opacity-40 uppercase tracking-widest">
            © 2026 SPEKTRA. Privacy Coded by Default.
          </span>
          <div className="flex gap-8">
            <Link
              className="text-[#e4e1e6] opacity-40 hover:text-[#ff00ff] transition-opacity text-xs font-label uppercase tracking-widest underline-offset-4 hover:underline"
              href="#"
            >
              Whitepaper
            </Link>
            <Link
              className="text-[#e4e1e6] opacity-40 hover:text-[#ff00ff] transition-opacity text-xs font-label uppercase tracking-widest underline-offset-4 hover:underline"
              href="#"
            >
              Github
            </Link>
            <Link
              className="text-[#e4e1e6] opacity-40 hover:text-[#ff00ff] transition-opacity text-xs font-label uppercase tracking-widest underline-offset-4 hover:underline"
              href="#"
            >
              Audit
            </Link>
            <Link
              className="text-[#e4e1e6] opacity-40 hover:text-[#ff00ff] transition-opacity text-xs font-label uppercase tracking-widest underline-offset-4 hover:underline"
              href="#"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}