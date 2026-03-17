"use client"

import { useEffect, useState } from "react";
import { Wallet } from "ethers";
import {
	generateRandomStealthMetaAddress,
	generateSpendViewKeys,
	parseStealthAddresses,
	generateStealthInfo,
	privToAddress
} from "../lib/stealthV2"

async function generateStealthAddress() {
	let stealthAddressInfo = {};
	const privateKey = process.env.NEXT_PUBLIC_HEDERA_PK; // Base Hedera account
	const wallet = new Wallet(privateKey);

	console.log("1. Generate spending and view keys...");
	const keys = await generateSpendViewKeys(wallet)
	//const keys = generateRandomStealthMetaAddress();
	console.log(keys)

	console.log("2. Generating Stealth Address info...");
	const metaAddress = `st:eth:0x${keys.spendingKeyPair.public.replace("0x", "")}${keys.viewingKeyPair.public.replace("0x", "")}`;
	console.log(metaAddress)
	if (!(metaAddress.startsWith("st:eth:0x")) || (metaAddress.length != 141)) {
		console.log("Input a valid stealth meta-address starting with st:eth:0x;");
		return {}
	}
	else {
		try {
			stealthAddressInfo = generateStealthInfo(metaAddress);
			console.log(stealthAddressInfo);
			//return stealthAddressInfo;
		} catch (error) {
			console.log("Error occured: ", error)
			stealthAddressInfo = {}
		}
	}

	console.log("3. Check announcements...");
	let stealthInfo = parseStealthAddresses(
		stealthAddressInfo["ephemeralPublicKey"],
		stealthAddressInfo["stealthAddress"].toLowerCase(),
		keys.spendingKeyPair.public,
		keys.viewingKeyPair.private,
		stealthAddressInfo["ViewTag"].slice(2, 4)
	);
	console.log(stealthInfo)
	// const [stealthAddress, ephemeralPublicKey, hashedSharedSecret] = stealthInfo
	// console.log({ stealthAddress, ephemeralPublicKey, hashedSharedSecret })

	// console.log("4. Getting Stealth Secret!!!");
	// let stealthPrivateKey = (BigInt(keys.spendingKeyPair.private) + BigInt(hashedSharedSecret)) % BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
	// let stealthPrivateKeyString = stealthPrivateKey.toString(16);
	// stealthPrivateKeyString = "0x" + stealthPrivateKeyString.padStart(64, '0');
	// let stealthAddressComputed = privToAddress(stealthPrivateKey);
	// console.log({ stealthPrivateKeyString, stealthAddressComputed });

	return stealthAddressInfo;
}

export default function StealthAddress() { 
	const [addr, setAddr] = useState("0x...");
	useEffect(() => {
		init();
	}, [])

	const init = async () => {
		const { 
			stealthAddress = "0xErr",
			ephemeralPublicKey,
			ViewTag 
		} = await generateStealthAddress();

		setAddr(stealthAddress);
	}

  return (
		<div className="text-white text-left text-lg">
			<h3>Stealth Address for: <span className="text-pink-400">pandora.spektra.id</span></h3>
			<h3 className="text-lime-500">{ addr }</h3>
		</div>
	)
}