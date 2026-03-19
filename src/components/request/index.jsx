"use client"

import Link from "next/link"
import { useState } from "react";
import RequestModal from "./modal";


export default function RequestPayment() { 
	const [isModalOpen, setIsModalOpen] = useState(false);

  return (
		<>
			<div className="p-8 max-w-4xl w-full mx-auto space-y-12">
				{/* Request Configuration Form*/}
				<section className="space-y-8">
					<header className="space-y-2">
						{/* <div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-primary security-pulse"></span>
							<span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Secure Protocol
								Active</span>
						</div> */}
						<h1 className="font-headline font-extrabold text-4xl tracking-tight text-on-surface">Request Payment
						</h1>
						<p className="text-on-surface-variant text-sm">Configure your payment link to facilitate payments from anyone.</p>
					</header>
					<div className="space-y-6">
						{/* Asset Selector*/}
						<div className="space-y-2">
							<label
								className="block text-[10px] font-bold uppercase tracking-[0.1rem] text-on-surface-variant">Select
								Asset</label>
							<div
								className="flex p-1 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
								<button
									className="flex-1 py-2 px-4 rounded-md bg-surface-container-high text-primary font-bold text-xs">HBAR</button>
								<button
									className="flex-1 py-2 px-4 rounded-md text-on-surface-variant hover:text-on-surface transition-colors text-xs">USDC</button>
							</div>
						</div>
						{/* Amount Input*/}
						<div className="space-y-2">
							<label
								className="block text-[10px] font-bold uppercase tracking-[0.1rem] text-on-surface-variant">Requested
								Amount</label>
							<div className="relative">
								<input
									className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-0 rounded-md p-5 text-2xl font-headline font-bold text-on-surface placeholder:text-surface-variant transition-all"
									placeholder="0.00" step="0.01" type="number" />
								<div
									className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface-container-high px-3 py-1 rounded-md text-xs font-bold text-on-surface-variant">
									HBAR
								</div>
							</div>
						</div>
						{/* Optional Memo*/}
						<div className="space-y-2">
							<label
								className="block text-[10px] font-bold uppercase tracking-[0.1rem] text-on-surface-variant">Memo
								(Optional)</label>
							<input
								className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-0 rounded-md p-4 text-sm text-on-surface placeholder:text-surface-variant transition-all"
								placeholder="What's this for?" type="text" />
						</div>
						{/* Generate Button*/}
						<button 
							onClick={() => setIsModalOpen(true)}
							className="w-full bg-gradient-to-r from-[#ffabf3] to-[#ff00ff] text-on-primary font-bold py-4 rounded-md active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
							Generate Secure Link
						</button>
						{/* Secondary Info*/}
						<div className="mt-6 flex items-start gap-3 p-4 bg-primary/5 rounded-md border border-primary/10">
							<span className="material-symbols-outlined text-primary text-xl">info</span>
							<p className="text-xs text-on-surface-variant leading-relaxed">
								Funds will be reflected directly into your linked vault once the sender confirms the
								transaction on the network.
							</p>
						</div>
					</div>
				</section>
			</div>
			{/* QR Modal */}
			{isModalOpen && (
				<RequestModal setIsModalOpen={setIsModalOpen} />
			)}
		</>
	)
}