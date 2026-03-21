import { useState } from "react";
import QRCodeGenerator from "../common/qrcode-gen";

export default function RequestModal({
	requestParams = [],
	setIsModalOpen 
}) {
	const [user, token, amount, memo] = requestParams;
	const query = btoa(`${token}|${amount}|${memo.trim() === "" ? 0 : memo}`);
	const requestUrl=`https://spektra.vercel.app/send/@${user}?r=${query}`;

	const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(requestUrl);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
			<div 
				className="absolute inset-0 bg-background/80 backdrop-blur-md"
				onClick={() => setIsModalOpen(false)}
			></div>
		<div className="w-full max-w-md obsidian-glass rounded-xl p-8 border border-outline-variant/20 shadow-2xl">
			<div className="flex justify-between items-start mb-4">
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
			<div className="space-y-4">
				<QRCodeGenerator 
						text={requestUrl}
						size={300} 
				/>
				<div className="w-full space-y-4">
					<div
						className="flex items-center gap-2 bg-surface-container-lowest p-1 pl-4 rounded-md border border-outline-variant/20">
						<input
							className="text-xs text-on-surface-variant truncate flex-grow text-left"
							readOnly
							type="text"
							value={requestUrl}
						/>
						<button
							className="bg-surface-container-high hover:bg-surface-bright text-primary text-[10px] font-bold uppercase px-4 py-2 rounded-md transition-colors"
							onClick={handleCopy}
						>
							{copied ? "Copied!" : "Copy Link"}
						</button>
					</div>
				</div>
				<div className="flex items-start gap-3 px-4 py-2 bg-primary/5 rounded-md border border-primary/10">
					<span className="material-symbols-outlined text-primary text-2xl">info</span>
					<p className="text-xs text-on-surface-variant leading-relaxed">
						{`You're requesting ${amount} ${token}`}
					</p>
				</div>
				
				{/* <div className="grid grid-cols-2 gap-4">
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
				</div> */}
			</div>
		</div>
	</div>
  ) 
}