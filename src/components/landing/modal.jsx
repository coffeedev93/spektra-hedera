export default function LandingModal({ setIsModalOpen }) {
  return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
			<div 
				className="absolute inset-0 bg-background/80 backdrop-blur-md"
				onClick={() => setIsModalOpen(false)}
			></div>
			<div className="relative w-full max-w-md obsidian-glass rounded-xl p-8 border border-outline-variant/30 shadow-[0_24px_48px_rgba(0,0,0,0.6)]">
				<div className="flex justify-between items-start mb-6">
					<h3 className="font-headline text-2xl font-bold tracking-tight">
						Key Generation
					</h3>
					<span
						onClick={() => setIsModalOpen(false)}
						className="material-symbols-outlined text-on-surface-variant cursor-pointer"
					>
						close
					</span>
				</div>
				<p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
					Project Nebula requires a one-time cryptographic signature to
					generate your <span className="text-primary font-bold">Viewing Key</span>{" "}
					and <span className="text-primary font-bold">Spending Key</span>.
					This does not grant access to your wallet funds.
				</p>
				<div className="space-y-4 mb-8">
					<div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/10">
						<span className="material-symbols-outlined text-primary">
							visibility
						</span>
						<div>
							<p className="text-xs font-bold tracking-widest uppercase opacity-60">
								Viewing Key
							</p>
							<p className="text-sm font-mono truncate w-48 text-on-surface">
								nebula_vk_0x9f...a23
							</p>
						</div>
					</div>
					<div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/10">
						<span className="material-symbols-outlined text-primary">
							vpn_key
						</span>
						<div>
							<p className="text-xs font-bold tracking-widest uppercase opacity-60">
								Spending Key
							</p>
							<p className="text-sm font-mono truncate w-48 text-on-surface">
								nebula_sk_0x4d...e89
							</p>
						</div>
					</div>
				</div>
				<button className="w-full py-4 rounded-md spectral-glow text-on-primary font-bold text-lg mb-4">
					Sign to Initialize
				</button>
				<p className="text-[10px] text-center text-on-surface-variant uppercase tracking-[0.2em]">
					Signature request will appear in wallet
				</p>
			</div>
		</div>
	)
}