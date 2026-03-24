"use client"

import Link from "next/link";
import { useState } from "react";
import NameRegisterModal from "./modal";

export default function Dashboard() {
	const [isModalOpen, setIsModalOpen] = useState(false);

  return (
		<>
			<div className="p-8 max-w-7xl w-full mx-auto space-y-12">
				{/* Hero Section: Balance & Actions */}
				<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
					{/* Total Balance Card */}
					<div className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
						<div className="absolute top-4 right-4 flex items-center gap-2">
							<span className="text-[10px] tracking-widest uppercase opacity-40 font-label">Privacy Shield</span>
							<div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#ffabf3]"></div>
						</div>
						<p className="font-label text-xs tracking-widest uppercase text-on-surface-variant mb-2">Consolidated Balance
						</p>
						<div className="flex items-baseline gap-4">
							<h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface">$123.52</h2>
							<span className="text-primary font-mono text-sm tracking-tighter">+4.2%</span>
						</div>
						<div className="mt-8 flex gap-3">
							<div
								className="px-3 py-1.5 rounded-full bg-surface-container-highest/50 border border-outline-variant/10 text-[10px] font-label uppercase tracking-widest">
								HBAR: 32.41</div>
							<div
								className="px-3 py-1.5 rounded-full bg-surface-container-highest/50 border border-outline-variant/10 text-[10px] font-label uppercase tracking-widest">
								USDC: 45,000</div>
							<div
								className="px-3 py-1.5 rounded-full bg-surface-container-highest/50 border border-outline-variant/10 text-[10px] font-label uppercase tracking-widest">
								WBTC: 1.22</div>
						</div>
					</div>
					{/* Quick Action Buttons */}
					<div className="lg:col-span-5 grid grid-cols-2 gap-4">
						<Link href="/send"
							className="group flex flex-col justify-between p-6 bg-gradient-to-br from-primary to-primary-container rounded-xl h-44 text-on-primary transition-all active:scale-[0.98]">
							<span className="material-symbols-outlined !text-4xl" data-icon="north_east">north_east</span>
							<div className="text-left">
								<span className="block text-xl font-bold font-headline">Send</span>
								<span className="text-[10px] uppercase tracking-widest opacity-80">Stealth Transfer</span>
							</div>
						</Link>
						<Link href="/request"
							className="group flex flex-col justify-between p-6 bg-surface-container-high rounded-xl h-44 border border-outline-variant/20 hover:border-primary/40 transition-all active:scale-[0.98]">
							<span className="material-symbols-outlined !text-4xl text-primary" data-icon="south_west">south_west</span>
							<div className="text-left">
								<span className="block text-xl font-bold font-headline">Request</span>
								<span className="text-[10px] uppercase tracking-widest opacity-40">Facilitate Payments</span>
							</div>
						</Link>
					</div>
				</section>
				{/* Main Grid Layout */}
				<section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Activity Feed (Stealth Transfers) */}
					<div className="lg:col-span-8 space-y-6">
						<div className="flex justify-between items-end">
							<h3 className="font-headline text-2xl font-bold tracking-tight">Stealth Transfers</h3>
							<button
								className="group flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 py-2 rounded-md font-black text-sm uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all">
								<span className="material-symbols-outlined">radar</span>
								Scan Payments
							</button>
						</div>
						<div className="grid grid-cols-1 gap-3">
							{/* Safe Card 1 */}
							<div
								className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#1b1b1e] hover:bg-[#2a2a2d] transition-all rounded-md border border-outline-variant/5">
								<div className="flex items-center gap-6">
									<div
										className="w-12 h-12 bg-[#131316] rounded-md flex items-center justify-center border border-outline-variant/10">
										<span
											className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">key_visualizer</span>
									</div>
									<div>
										<div className="flex items-center gap-2">
											<span className="font-headline font-bold text-on-surface">Addr #4812</span>
											<span
												className="text-[10px] bg-tertiary-container/20 text-tertiary px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">Stealth</span>
										</div>
										<span className="text-xs font-mono text-on-surface-variant opacity-50">0x71C...8e29</span>
									</div>
								</div>
								<div className="flex items-center justify-between md:justify-end gap-12 mt-4 md:mt-0">
									<div className="text-right">
										<div className="text-lg font-bold font-headline text-on-surface">10 HBAR</div>
										<div className="text-[10px] text-on-surface-variant uppercase tracking-widest">≈
											$0.9</div>
									</div>
									<div className="flex gap-2">
										<button
											className="w-10 h-10 flex items-center justify-center bg-[#131316] hover:bg-primary/20 hover:text-primary rounded-md transition-colors text-on-surface-variant">
											<span className="material-symbols-outlined text-lg">send</span>
										</button>
										<button
											className="w-10 h-10 flex items-center justify-center bg-[#131316] hover:bg-surface-container-highest rounded-md transition-colors text-on-surface-variant">
											<span className="material-symbols-outlined text-lg">more_vert</span>
										</button>
									</div>
								</div>
							</div>
							{/* Safe Card 2 */}
							<div
								className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#1b1b1e] hover:bg-[#2a2a2d] transition-all rounded-md border border-outline-variant/5">
								<div className="flex items-center gap-6">
									<div
										className="w-12 h-12 bg-[#131316] rounded-md flex items-center justify-center border border-outline-variant/10">
										<span
											className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">key_visualizer</span>
									</div>
									<div>
										<div className="flex items-center gap-2">
											<span className="font-headline font-bold text-on-surface">Addr #9901</span>
											<span
												className="text-[10px] bg-tertiary-container/20 text-tertiary px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">Stealth</span>
										</div>
										<span className="text-xs font-mono text-on-surface-variant opacity-50">0x3A2...F910</span>
									</div>
								</div>
								<div className="flex items-center justify-between md:justify-end gap-12 mt-4 md:mt-0">
									<div className="text-right">
										<div className="text-lg font-bold font-headline text-on-surface">80.11 HBAR</div>
										<div className="text-[10px] text-on-surface-variant uppercase tracking-widest">≈
											$7.25</div>
									</div>
									<div className="flex gap-2">
										<button
											className="w-10 h-10 flex items-center justify-center bg-[#131316] hover:bg-primary/20 hover:text-primary rounded-md transition-colors text-on-surface-variant">
											<span className="material-symbols-outlined text-lg">send</span>
										</button>
										<button
											className="w-10 h-10 flex items-center justify-center bg-[#131316] hover:bg-surface-container-highest rounded-md transition-colors text-on-surface-variant">
											<span className="material-symbols-outlined text-lg">more_vert</span>
										</button>
									</div>
								</div>
							</div>
							{/* Safe Card 3 */}
							<div
								className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#1b1b1e] hover:bg-[#2a2a2d] transition-all rounded-md border border-outline-variant/5">
								<div className="flex items-center gap-6">
									<div
										className="w-12 h-12 bg-[#131316] rounded-md flex items-center justify-center border border-outline-variant/10">
										<span
											className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">key_visualizer</span>
									</div>
									<div>
										<div className="flex items-center gap-2">
											<span className="font-headline font-bold text-on-surface">Addr #2044</span>
											<span
												className="text-[10px] bg-tertiary-container/20 text-tertiary px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">Stealth</span>
										</div>
										<span className="text-xs font-mono text-on-surface-variant opacity-50">0xBE9...44CC</span>
									</div>
								</div>
								<div className="flex items-center justify-between md:justify-end gap-12 mt-4 md:mt-0">
									<div className="text-right">
										<div className="text-lg font-bold font-headline text-on-surface">50.55 HBAR</div>
										<div className="text-[10px] text-on-surface-variant uppercase tracking-widest">≈
											$5.40</div>
									</div>
									<div className="flex gap-2">
										<button
											className="w-10 h-10 flex items-center justify-center bg-[#131316] hover:bg-primary/20 hover:text-primary rounded-md transition-colors text-on-surface-variant">
											<span className="material-symbols-outlined text-lg">send</span>
										</button>
										<button
											className="w-10 h-10 flex items-center justify-center bg-[#131316] hover:bg-surface-container-highest rounded-md transition-colors text-on-surface-variant">
											<span className="material-symbols-outlined text-lg">more_vert</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Sidebar Stats / Bento Items */}
					<div className="lg:col-span-4 space-y-8">
						{/* Privacy Level Card */}
						<div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10">
							<div className="flex justify-between items-center mb-6">
								<h4 className="font-headline font-bold text-sm tracking-widest uppercase opacity-80">Sweep To Safe</h4>
							</div>
							<button
									className="mb-4 w-full py-3 bg-[#0e0e11] border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all rounded-md active:scale-95">
									Consolidate Assets
							</button>
							<p className="text-xs text-on-surface-variant leading-relaxed">Platform Fees and Gas costs will be deducted from your primary relay vault.</p>
						</div>
						{/* Mini Map/Location Placeholder */}
						<div 
							onClick={() => setIsModalOpen(true)}
							className="bg-surface-container-low rounded-xl overflow-hidden aspect-video relative group"
						>
							<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
							<img alt="Privacy Network Graph"
								className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500"
								data-alt="Abstract network topography map in fuchsia and black"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHgbqX1dRw31iJ-S1KrMDQgVuf14DJaoQ2dWBdE27aBuK7Gk2nB_v-xBWAlJMHL9spcFtof58RAcX0ZyDZwXqd0AqRXbfWZ8Kk34PkIDGTJy5NYG_qgkJcr23cGRy1kHvQvyG0laAOnRq985a0Q8M3xyja-lzDywuLmNP1hi4b4oP5FkvrWTrvezS66obrQ2pI77lfUThHRQoLITdK06gJNnaQ9C7ppreEzTtgITreLKc8Q56ImNJo__NWM68Yjn-DauT3Ez_HI-wV" />
							<div className="absolute bottom-4 left-4 z-20">
								<p className="text-[12px] font-label uppercase tracking-widest text-primary font-bold">Your Spektra ID</p>
								<p className="text-xs text-on-surface">Press here to Claim</p>
							</div>
						</div>
					</div>
				</section>
			</div>
			{/* UserId Modal */}
      {isModalOpen && (
        <NameRegisterModal 
          setIsModalOpen={setIsModalOpen} 
        />
      )}
		</>
  ) 
}