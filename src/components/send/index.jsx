"use client"

import { useEffect, useState } from "react";
import AssetSelector from "./asset-selector";
import AmountInput from "./amount-input";
import UserInputComponent from "./user-input";
import { generateStealthInfo } from "@/lib/stealthV2";
import { publishAnnouncement } from "@/lib/service";


export default function SendPayment({ _username, _query }) { 
	const [amount, setAmount] = useState(0);
	const [token, setToken] = useState("HBAR");
	const [memo, setMemo] = useState("");
	const [username, setUsername] = useState("");
	const [metaAddress, setMetaAddress] = useState("");
	const [stealthInfo, setStealthInfo] = useState(null);

	useEffect(() => {
		const data = _query ? _query["r"] : null;

		if (data) {
			const [_token, _amount, _memo] = atob(data).split("|");
			setToken(_token);
			setAmount(_amount);
			setMemo(_memo);
			setUsername(decodeURIComponent(_username));
		}
	}, [_query])

	useEffect(() => {
		if (!metaAddress.startsWith("st:eth:0x")) {
			setStealthInfo(null);
			return;
		}

		const info = generateStealthInfo(metaAddress);
		setStealthInfo(info)
		console.log(info)
	}, [metaAddress])

	const exchangeRate = token === "USDC" ? 1 : 0.09;

	const excecutePayment = async () => {
		//console.log(username, amount, token, stealthInfo)
		// first send payment...

		// then publish announcement
		const msg = btoa(`${stealthInfo.stealthAddress}|${stealthInfo.ephemeralPublicKey}|${stealthInfo.viewTag}`);
		const announ = await publishAnnouncement(msg);

		console.log(announ)
	}

  return (
		<div className="p-8 max-w-7xl w-full mx-auto space-y-12">
			<header className="mb-12">
				<h2 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Send Payment
				</h2>
				{/* 
					Dissociate your footprint.
					Anonymize your footprint.
					Maintain a sanitized digital footprint
				*/}
				<p className="text-on-surface-variant max-w-2xl font-body">Dissociate your footprint. Spektra generates
					unique one-time addresses to break the on-chain link between sender and receiver.</p>
			</header>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left Column: Input Form */}
				<div className="lg:col-span-7 space-y-6">
					{/* Recipient Input Section */}
					<div className="bg-surface-container rounded-xl p-8 space-y-4">
						<label
							className="block text-xs font-medium tracking-[0.1rem] uppercase text-on-surface-variant">
								Recipient Spektra ID or Address
						</label>
						<UserInputComponent 
							username={username}
							setUsername={setUsername}
							metaAddress={metaAddress}
							setMetaAddress={setMetaAddress}
							isReadonly={_username !== null}
						/>
						{memo !== "0" && (
							<div className="flex justify-between items-center px-1">
								<span className="text-sm text-on-surface-variant font-mono">Memo:&nbsp; 
									<span className="opacity-60">{memo}</span>
								</span>
							</div>
						)}
					</div>
					{/* Asset Selector Bento Card */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-surface-container rounded-xl p-6">
							<label
								className="block text-xs font-medium tracking-[0.1rem] uppercase text-on-surface-variant mb-4">Select
								Asset</label>
							<AssetSelector token={token} setToken={setToken} />
						</div>
						<AmountInput 
							max={500} 
							amount={amount} 
							setAmount={setAmount}
							rate={exchangeRate}
						/>
					</div>
					{/* Stealth Generator Preview */}
					<div className="bg-surface-container-high rounded-xl p-8 border-l-4 border-primary shadow-2xl">
						<div className="flex justify-between items-start mb-6">
							<div>
								<h3 className="text-lg font-bold font-headline text-primary">Stealth Address Generated
								</h3>
								<p className="text-xs text-on-surface-variant">This address is cryptographically linked
									to {username} but known only to you.</p>
							</div>
							<span className="material-symbols-outlined text-primary text-3xl" data-icon="vpn_key"
								style={{ fontVariationSettings: "'FILL' 1" }}>vpn_key</span>
						</div>
						<div
							className="bg-background rounded-md p-4 flex items-center justify-between group cursor-pointer hover:bg-surface-container-lowest transition-all">
							<span
								className="font-mono text-sm tracking-tighter opacity-80 break-all pr-4"
							>
								{stealthInfo !== null ? stealthInfo.stealthAddress : "No meta-address found!"}
							</span>
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
							Operation Summary</h3>
						<div className="space-y-4">
							<div className="flex justify-between text-sm">
								<span className="text-on-surface-variant">Asset Amount</span>
								<span className="font-bold">{amount} {token}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-on-surface-variant">Estimated Fee</span>
								<span className="font-bold">{0.09*0.0001} {"HBAR"}</span>
							</div>
							{/* <div className="flex justify-between text-sm">
								<span className="text-on-surface-variant">Relayer Fee</span>
								<span className="font-bold">0.0005 HBAR</span>
							</div> */}
							<div className="h-px bg-outline-variant opacity-10 my-4"></div>
							<div className="flex justify-between items-end">
								<div>
									<div className="text-[10px] font-bold uppercase text-primary tracking-tighter">Total
										Cost</div>
									<div className="text-2xl font-bold font-headline">{amount ? (parseFloat(amount) * exchangeRate).toLocaleString() : '0.00'} USD</div>
								</div>
								<div className="text-right">
									<div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Est.
										Time</div>
									<div className="text-sm font-bold">~ 10 Seconds</div>
								</div>
							</div>
						</div>
						<button
							onClick={() => excecutePayment()}
							className="w-full mt-8 py-4 rounded-md bg-gradient-to-br from-[#ffabf3] to-[#ff00ff] text-on-primary font-bold text-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
							Initiate Stealth Send
						</button>
						{/* <p
							className="text-center text-[10px] text-on-surface-variant mt-4 uppercase tracking-[0.2em] opacity-40">
							Secured by Advanced Cryptography</p> */}
					</div>
				</div>
			</div>
		</div>
	)
}