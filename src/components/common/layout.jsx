import Link from "next/link";

export default function AppLayout({ children }) {
  return (
		<div className="flex h-screen overflow-hidden">
			{/* Main Canvas */}
			<main className="flex-1 flex flex-col min-w-0 bg-background overflow-y-auto">
				{/* TopNavBar */}
				<header
					className="flex justify-between items-center w-full md:max-w-7xl md:mx-auto px-8 py-4 bg-[#131316] z-10 sticky top-0">
					<div className="flex items-center gap-8">
						<span
							className="text-2xl font-headline font-extrabold tracking-tighter text-transparent bg-clip-text spectral-glow">SPEKTRA</span>
						{/* <nav className="hidden md:flex gap-6">
							<a className="text-[#ffabf3] font-bold border-b-2 border-[#ff00ff] pb-1 font-label text-sm"
								href="#">Dashboard</a>
							<a className="text-[#e4e1e6] opacity-70 hover:text-[#ffabf3] transition-colors duration-200 font-label text-sm"
								href="#">Assets</a>
							<a className="text-[#e4e1e6] opacity-70 hover:text-[#ffabf3] transition-colors duration-200 font-label text-sm"
								href="#">History</a>
						</nav> */}
					</div>
					<div className="flex items-center gap-4">
						<div
							className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-container text-xs font-mono text-on-surface-variant">
							<div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#ffabf3]"></div>
							0.00 HBAR
						</div>
						<div className="flex items-center gap-2">
							<button className="p-2 text-[#e4e1e6] opacity-70 hover:text-[#ffabf3] transition-all">
								<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
							</button>
							<button className="p-2 text-[#e4e1e6] opacity-70 hover:text-[#ffabf3] transition-all">
								<span className="material-symbols-outlined" data-icon="settings">settings</span>
							</button>
						</div>
					</div>
				</header>

				{/* Content */}
				{ children }

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
			</main>
		</div>
  )
}