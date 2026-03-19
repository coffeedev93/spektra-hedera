"use client"

import Link from "next/link"

export default function SendPayment() { 
	const username = "clark";
  return (
		<div className="p-8 max-w-7xl w-full mx-auto space-y-12">
			<header className="mb-12">
				<h2 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Send Payment
				</h2>
				<p className="text-on-surface-variant max-w-2xl font-body">Anonymize your footprint. Spektra generates
					unique one-time addresses to break the on-chain link between sender and receiver.</p>
			</header>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left Column: Input Form */}
				<div className="lg:col-span-7 space-y-6">
					{/* Recipient Input Section */}
					<div className="bg-surface-container rounded-xl p-8 space-y-4">
						<label
							className="block text-xs font-medium tracking-[0.1rem] uppercase text-on-surface-variant">Recipient
							Spektra ID or Address</label>
						<div className="relative group">
							<input
								className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-primary rounded-md py-4 pl-4 pr-12 text-on-surface font-body text-lg transition-all"
								placeholder="Enter user.spektra or 0x..." type="text" />
							<div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
								<div
									className="flex items-center gap-2 bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full border border-secondary-container/30">
									<span
										className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#ffabf3]"></span>
									<span className="text-[10px] font-bold uppercase tracking-wider">Resolved</span>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center px-1">
							<span className="text-xs text-on-surface-variant font-body">{username}'s Vault: <span
									className="font-mono opacity-60">0x71C...4e21</span></span>
							<span
								className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"><span
									className="material-symbols-outlined text-sm" data-icon="history">history</span>
								Recent Recipient</span>
						</div>
					</div>
					{/* Asset Selector Bento Card */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-surface-container rounded-xl p-6">
							<label
								className="block text-xs font-medium tracking-[0.1rem] uppercase text-on-surface-variant mb-4">Select
								Asset</label>
							<div className="space-y-2">
								<button
									className="w-full flex items-center justify-between p-3 rounded-md bg-surface-container-high border border-primary/20 hover:bg-surface-container-highest transition-all">
									<div className="flex items-center gap-3">
										<div
											className="w-8 h-8 rounded-full bg-[#627eea] flex items-center justify-center font-bold text-white text-xs">
											Ξ</div>
										<div className="text-left">
											<div className="text-sm font-bold">HBAR</div>
											<div className="text-[10px] text-on-surface-variant">0.42 HBAR Available
											</div>
										</div>
									</div>
									<span className="material-symbols-outlined text-primary" data-icon="check_circle"
										style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
								</button>
								<button
									className="w-full flex items-center justify-between p-3 rounded-md bg-surface-container-lowest hover:bg-surface-container-high transition-all">
									<div className="flex items-center gap-3">
										<div
											className="w-8 h-8 rounded-full bg-[#2775ca] flex items-center justify-center font-bold text-white text-[10px]">
											$</div>
										<div className="text-left">
											<div className="text-sm font-bold opacity-60">USDC</div>
											<div className="text-[10px] text-on-surface-variant">2,450.00 USDC</div>
										</div>
									</div>
								</button>
							</div>
						</div>
						<div className="bg-surface-container rounded-xl p-6 flex flex-col">
							<label
								className="block text-xs font-medium tracking-[0.1rem] uppercase text-on-surface-variant mb-4">Amount</label>
							<div className="flex-1 flex flex-col justify-center">
								<input
									className="bg-transparent border-none p-0 text-4xl font-headline font-bold text-on-surface focus:ring-0 placeholder-on-surface-variant/30"
									placeholder="0.00" type="text" />
								<div className="text-xs text-on-surface-variant mt-1">≈ $124.50 USD</div>
							</div>
							<div className="flex gap-2 mt-4">
								<button
									className="text-[10px] font-bold bg-surface-container-lowest px-2 py-1 rounded hover:bg-primary/20 transition-all">25%</button>
								<button
									className="text-[10px] font-bold bg-surface-container-lowest px-2 py-1 rounded hover:bg-primary/20 transition-all">50%</button>
								<button
									className="text-[10px] font-bold bg-surface-container-lowest px-2 py-1 rounded hover:bg-primary/20 transition-all">MAX</button>
							</div>
						</div>
					</div>
					{/* Stealth Generator Preview */}
					<div className="bg-surface-container-high rounded-xl p-8 border-l-4 border-primary shadow-2xl">
						<div className="flex justify-between items-start mb-6">
							<div>
								<h3 className="text-lg font-bold font-headline text-primary">Stealth Address Generated
								</h3>
								<p className="text-xs text-on-surface-variant">This address is cryptographically linked
									to {username}.spektra
									but known only to you.</p>
							</div>
							<span className="material-symbols-outlined text-primary text-3xl" data-icon="vpn_key"
								style={{ fontVariationSettings: "'FILL' 1" }}>vpn_key</span>
						</div>
						<div
							className="bg-background rounded-md p-4 flex items-center justify-between group cursor-pointer hover:bg-surface-container-lowest transition-all">
							<span
								className="font-mono text-sm tracking-tighter opacity-80 break-all pr-4">st_0x4f2e91b...a9c8d7f6e5d4c3b2a1a2b3c4d5e6f7</span>
							<span
								className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
								data-icon="content_copy">content_copy</span>
						</div>
						<div
							className="mt-6 flex gap-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
							<div className="flex items-center gap-1.5"><span
									className="w-1.5 h-1.5 rounded-full bg-primary"></span>
								One-time use</div>
							<div className="flex items-center gap-1.5"><span
									className="w-1.5 h-1.5 rounded-full bg-primary"></span>
								Diffie-Hellman Key Exchange</div>
							<div className="flex items-center gap-1.5"><span
									className="w-1.5 h-1.5 rounded-full bg-primary"></span> Private
							</div>
						</div>
					</div>
				</div>
				{/* Right Column: Security Controls & Summary */}
				<div className="lg:col-span-5 space-y-6">
					{/* Transaction Summary */}
					<div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10">
						<h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">
							Security Summary</h3>
						<div className="space-y-4">
							<div className="flex justify-between text-sm">
								<span className="text-on-surface-variant">Asset Amount</span>
								<span className="font-bold">0.05 HBAR</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-on-surface-variant">Estimated Gas</span>
								<span className="font-bold">0.0012 HBAR</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-on-surface-variant">Relayer Fee</span>
								<span className="font-bold">0.0005 HBAR</span>
							</div>
							<div className="h-px bg-outline-variant opacity-10 my-4"></div>
							<div className="flex justify-between items-end">
								<div>
									<div className="text-[10px] font-bold uppercase text-primary tracking-tighter">Total
										Cost</div>
									<div className="text-2xl font-bold font-headline">0.0517 HBAR</div>
								</div>
								<div className="text-right">
									<div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Est.
										Time</div>
									<div className="text-sm font-bold">~ 12 Seconds</div>
								</div>
							</div>
						</div>
						<button
							className="w-full mt-8 py-4 rounded-md bg-gradient-to-br from-[#ffabf3] to-[#ff00ff] text-on-primary font-bold text-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
							Initiate Stealth Send
						</button>
						<p
							className="text-center text-[10px] text-on-surface-variant mt-4 uppercase tracking-[0.2em] opacity-40">
							Secured by Advanced Cryptography</p>
					</div>
				</div>
			</div>
		</div>
	)
}