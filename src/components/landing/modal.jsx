import { useState } from "react";

export default function LandingModal({ signData, setIsModalOpen }) {
	const [isSigning, setIsSigning] = useState(false);
  const [signatureSuccess, setSignatureSuccess] = useState(false);

	// Handler for the signature request
  const handleSignatureRequest = async () => {
    setIsSigning(true);
    setSignatureSuccess(false);

    try {
      // The payload you want the user to sign to generate deterministic keys
      const payloadToSign = `Authenticate Your Spektra Session\nTimestamp: 0x`;
      
      const response = await signData(payloadToSign);
     
			console.log("response", response)
      console.log("Signature received:", response[0].signature.toString('hex'));
      
      // Here you would normally hash the signature to derive your Viewing/Spending keys
      setSignatureSuccess(true);
      
      // Close modal after a short delay so user sees success
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSigning(false);
        setSignatureSuccess(false);
      }, 2000);

    } catch (error) {
      console.error("Signing process failed:", error);
      setIsSigning(false);
    }
  };

  return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
			<div 
				className="absolute inset-0 bg-background/80 backdrop-blur-md"
				onClick={() => !isSigning && setIsModalOpen(false)}
			></div>
			<div className="relative w-full max-w-md obsidian-glass rounded-xl p-8 border border-outline-variant/30 shadow-[0_24px_48px_rgba(0,0,0,0.6)]">
				<div className="flex justify-between items-start mb-6">
					<h3 className="font-headline text-2xl font-bold tracking-tight">
						Key Generation
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
			
			<p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
				Spektra requires a one-time cryptographic signature to
				generate your <span className="text-primary font-bold">Viewing Key</span>{" "}
				and <span className="text-primary font-bold">Spending Key</span>.
				This does not grant access to your wallet funds.
			</p>

			{/* Simulated Key Display */}
			<div className={`space-y-4 mb-8 transition-opacity ${isSigning ? 'opacity-50' : 'opacity-100'}`}>
				<div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/10">
					<span className="material-symbols-outlined text-primary">visibility</span>
					<div>
						<p className="text-xs font-bold tracking-widest uppercase opacity-60">Viewing Key</p>
						<p className="text-sm font-mono truncate w-48 text-on-surface">
							{signatureSuccess ? "spektra_vk_GENERATED_SECURE" : "spektra_vk_pending..."}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/10">
					<span className="material-symbols-outlined text-primary">vpn_key</span>
					<div>
						<p className="text-xs font-bold tracking-widest uppercase opacity-60">Spending Key</p>
						<p className="text-sm font-mono truncate w-48 text-on-surface">
							{signatureSuccess ? "spektra_sk_GENERATED_SECURE" : "spektra_sk_pending..."}
						</p>
					</div>
				</div>
			</div>

			<button 
				onClick={handleSignatureRequest}
				disabled={isSigning || signatureSuccess}
				className={`w-full py-4 rounded-md font-bold text-lg mb-4 transition-all ${
					signatureSuccess 
						? "bg-tertiary text-on-tertiary" 
						: "spectral-glow text-on-primary hover:opacity-90 active:scale-[0.98]"
				} disabled:opacity-50 disabled:cursor-not-allowed`}
			>
				{isSigning ? "Check Hashpack..." : signatureSuccess ? "Keys Initialized!" : "Sign to Initialize"}
			</button>
			
			<p className="text-[10px] text-center text-on-surface-variant uppercase tracking-[0.2em]">
				{isSigning ? "Awaiting your approval" : "Signature request will appear in Hashpack"}
			</p>

				{/* <div className="space-y-4 mb-8">
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
					Signature request will appear in Hashpack
				</p> */}
			</div>
		</div>
	)
}