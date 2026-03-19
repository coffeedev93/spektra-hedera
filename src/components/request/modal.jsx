export default function RequestModal({ setIsModalOpen }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
			<div 
				className="absolute inset-0 bg-background/80 backdrop-blur-md"
				onClick={() => setIsModalOpen(false)}
			></div>
		<div className="w-full max-w-md obsidian-glass rounded-xl p-8 border border-outline-variant/20 shadow-2xl">
			<div className="flex justify-between items-start mb-6">
				<div>
					<h2 className="font-headline font-bold text-2xl text-primary">Share Request</h2>
					<p className="text-xs text-on-surface-variant font-label tracking-wide mt-1">
						Anyone with this link can
						view the request and send assets.
					</p>
				</div>
				<button 
					onClick={() => setIsModalOpen(false)}
					className="text-on-surface-variant hover:text-on-surface"
				>
					<span className="material-symbols-outlined" data-icon="close">close</span>
				</button>
			</div>
			<div className="space-y-6">
				<div className="aspect-square w-48 mx-auto bg-white p-4 rounded-xl shadow-lg">
					<img className="w-full h-full object-contain" data-alt="QR code for payment request"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuB63B6nCqYSDugQpyK1YrvHLhJVl0L6cg80VwkxfeqdoWSAMfJPo1wJHypcUo8V71Z95EyMeRlxLFKrJ5U6atdP74k5yoJLjggfWm6LkhyrWCuCXUqZYI25_gFIop55JvDak1Ks7fgkQlLrr5hLMNWcnqrAwt6RXfHJvDXa3EDMVBn_6zIn9u-76ZWHELffNSR0T1rPs_esRY5kzAC0iSslh8q9-Z9iJBMZpzub7h4b0DjxW18OeKC8OyYdRounm9DzJFdlN0rGKgt7" />
				</div>
				<div className="w-full space-y-4">
					<div
						className="flex items-center gap-2 bg-surface-container-lowest p-1 pl-4 rounded-md border border-outline-variant/20">
						<span
							className="text-xs text-on-surface-variant truncate flex-grow text-left">spektra.pay/x7a2...8k9</span>
						<button
							className="bg-surface-container-high hover:bg-surface-bright text-primary text-[10px] font-bold uppercase px-4 py-2 rounded-md transition-colors">
							Copy Link
						</button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<button
						className="flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container-high py-3 rounded-md transition-all">
						<span className="material-symbols-outlined text-sm">share</span>
						<span className="text-xs font-semibold">Native Share</span>
					</button>
					<button
						className="flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container-high py-3 rounded-md transition-all">
						<span className="material-symbols-outlined text-sm text-primary">download</span>
						<span className="text-xs font-semibold">Save QR</span>
					</button>
				</div>
			</div>
		</div>
	</div>
  ) 
}