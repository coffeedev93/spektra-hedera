"use client"

import { setRegistryEntry } from "@/lib/service";
import { useWalletStore } from "@/store/useWalletStore";
import { useState } from "react";


export default function NameRegisterModal({ setIsModalOpen }) {
	const [isSigning, setIsSigning] = useState(false);
	const [signatureSuccess, setSignatureSuccess] = useState(false);
  const { userMetaKeys } = useWalletStore();

	const registerUser = async () => { 
		const metaAddress = `st:eth:0x${userMetaKeys.spendingKeyPair.public.replace("0x", "")}${userMetaKeys.viewingKeyPair.public.replace("0x", "")}`;
		console.log(userMetaKeys, metaAddress)
		const res = await setRegistryEntry("@pepe", metaAddress);
		console.log(res)
	}

  return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
			<div 
				className="absolute inset-0 bg-background/80 backdrop-blur-md"
				onClick={() => !isSigning && setIsModalOpen(false)}
			></div>
			<div className="relative w-full max-w-md obsidian-glass rounded-xl p-8 border border-outline-variant/30 shadow-[0_24px_48px_rgba(0,0,0,0.6)]">
				<div className="flex justify-between items-start mb-6">
					<h3 className="font-headline text-2xl font-bold tracking-tight">
						Claim your Spektra ID
					</h3>
					{!isSigning && (
						<span
							onClick={() => setIsModalOpen(false)}
							className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-error transition-colors"
						>
							close
						</span>
					)}
			</div>
			
			<p className="text-on-surface-variant text-sm mb-4">
				Establish your presence with a unique identifier across the decentralized ecosystem. 
				To receive paymennts privately you just have to <span className="font-bold text-primary">share your ID&nbsp;</span> 
				with the sender, Spektra handles the rest.
			</p>

			{/* Simulated Key Display */}
			<div className={`space-y-4 mb-8 transition-opacity ${isSigning ? 'opacity-50' : 'opacity-100'}`}>
				<div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/10">
					<span className="material-symbols-outlined text-primary">alternate_email</span>
					<div>
						<p className="text-xs font-bold tracking-widest uppercase opacity-60">Check Availability</p>
						<div className="text-md font-mono truncate text-on-surface">
							<input className="w-full bg-surface-container-lowest border-none py-2 px-0 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-on-surface-variant/40" placeholder="@user" type="text"/>
						</div>
					</div>
				</div>
			</div>

			<button 
				onClick={() => registerUser()}
				disabled={isSigning || signatureSuccess}
				className={`w-full py-4 rounded-md font-bold text-lg mb-4 transition-all ${
					signatureSuccess 
						? "bg-tertiary text-on-tertiary" 
						: "spectral-glow text-on-primary hover:opacity-90 active:scale-[0.98]"
				} disabled:opacity-50 disabled:cursor-not-allowed`}
			>
				{isSigning ? "Check Hashpack..." : signatureSuccess ? "Keys Initialized!" : "Claim Now"}
			</button>
			
			<p className="text-[10px] text-center text-on-surface-variant uppercase tracking-[0.2em]">
				{!isSigning ? "The handle is available for you" : "Sorry, try with another one"}
			</p>
			</div>
		</div>
	)
}