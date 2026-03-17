import * as secp from "@noble/secp256k1";
import { keccak_256 } from '@noble/hashes/sha3.js';
import { 
	keccak256,
	hexlify,
	isHexString,
	sha256,
	toUtf8Bytes,
	SigningKey ,
} from "ethers";

function randomPrivateKey() {
	let randPrivateKey = secp.utils.randomSecretKey();
	return randPrivateKey; 
	return BigInt(`0x${Buffer.from(randPrivateKey, "hex").toString('hex')}`);
}

function uintArrayToHex(uintArray) {
	return secp.utils.bytesToHex(uintArray);
}

function toEthAddress(PublicKey) {
	let stAA = keccak256( Buffer.from(PublicKey, 'hex').slice(1)).toString(16);
	return "0x"+stAA.slice(-40);
}

export function privToAddress(stealthPrivateKey) {
	let stealthPublicKey = secp.Point.fromPrivateKey(stealthPrivateKey);
	let stealthAddress = toEthAddress(stealthPublicKey.toHex());
	return  stealthPublicKey.toHex(isCompressed=true), stealthAddress;
}

export function generateRandomStealthMetaAddress() {
	const spendingPrivateKey = randomPrivateKey();
	const viewingPrivateKey = randomPrivateKey();
	const spendingPublicKey = uintArrayToHex(secp.getPublicKey(spendingPrivateKey, isCompressed=true));
	const viewingPublicKey = uintArrayToHex(secp.getPublicKey(viewingPrivateKey, isCompressed=true));
	const stealthMetaAddress = "st:eth:0x"+spendingPublicKey+viewingPublicKey;
	return ["0x"+spendingPrivateKey.toString(16), "0x"+viewingPrivateKey.toString(16), "0x"+spendingPublicKey, "0x"+viewingPublicKey, stealthMetaAddress]
}

export function generateStealthInfo(stealthMetaAddress) {
	const USER = stealthMetaAddress;

	if (!USER.startsWith("st:eth:0x")){
		throw "Wrong address format; Address must start with `st:eth:0x...`";
	}

	const R_pubkey_spend = Buffer.from(USER.slice(9,75), "hex");//secp.Point.fromHex(USER.slice(9,75));

	const R_pubkey_view = Buffer.from(USER.slice(75,), "hex"); //secp.Point.fromHex(USER.slice(75,));

	const ephemeralPrivateKey = randomPrivateKey();

	const ephemeralPublicKey = secp.getPublicKey(ephemeralPrivateKey, true);

	const sharedSecret = secp.getSharedSecret(ephemeralPrivateKey, R_pubkey_view, false);

	let hashedSharedSecret = keccak256(sharedSecret.slice(1));

	let ViewTag = hashedSharedSecret.slice(0,4);

	const hashedSharedSecretPoint = secp.Point.fromHex(hashedSharedSecret.slice(2));

	const stealthPublicKey = R_pubkey_spend.add(hashedSharedSecretPoint);

	const stealthAddress = toEthAddress(stealthPublicKey.toHex());

	return {
		"stealthAddress":stealthAddress, 
		"ephemeralPublicKey":"0x"+Buffer.from(ephemeralPublicKey).toString('hex'), 
		"ViewTag":"0x"+ViewTag
	};
}

export function parseStealthAddresses(
	ephemeralPublicKey_hex,
	stealthAddress_given,
	spendingPublicKey_hex,
	viewingPrivateKey,
	viewTag_given
) {
	let ephemeralPublicKey = secp.Point.fromHex(ephemeralPublicKey_hex.slice(2));

	const spendingPublicKey = secp.Point.fromHex(spendingPublicKey_hex.slice(2), isCompressed=true);

	const sharedSecret = secp.getSharedSecret(BigInt(viewingPrivateKey), ephemeralPublicKey);

	let hashedSharedSecret = keccak256(Buffer.from(sharedSecret.slice(2)));

	let ViewTag = hashedSharedSecret.slice(0,2).toString('hex');

	if (viewTag_given != ViewTag) {
		//console.log("skipped thanks to view tag;")
		return false;
	}

	const hashedSharedSecretPoint = secp.Point.fromPrivateKey(Buffer.from(hashedSharedSecret, "hex"));

	const stealthPublicKey = spendingPublicKey.add(hashedSharedSecretPoint);

	const stealthAddress = toEthAddress(stealthPublicKey.toHex());

	if (stealthAddress === stealthAddress_given) {
		return [stealthAddress, ephemeralPublicKey_hex,  "0x" + hashedSharedSecret.toString('hex')];
	}

	return false;
}

export async function generateSpendViewKeys(signer) {
	// Base message that will be signed
	const baseMessage = 'Sign this message to access your Stealth account.\n\nOnly sign this message for a trusted client!'; // prettier-ignore

	// Append chain ID if not mainnet to mitigate replay attacks
	const { chainId } = 1;
	const message = chainId === 1 ? baseMessage : `${baseMessage}\n\nChain ID: ${chainId}`;

	// Get 65 byte signature from user using personal_sign
	const userAddress = await signer.getAddress();
	const formattedMessage = hexlify(toUtf8Bytes(message));
	//const signature = String(await this.provider.send('personal_sign', [formattedMessage, userAddress.toLowerCase()]));
	const signature = String(await signer.signMessage(formattedMessage));

	// If a user can no longer access funds because their wallet was using eth_sign before this update, stand up a
	// special "fund recovery login page" which uses the commented out code below to sign with eth_sign
	//     const signature = await signer.signMessage(message);

	// Verify signature
	const isValidSignature = (sig) => isHexString(sig) && sig.length === 132;
	if (!isValidSignature(signature)) {
		throw new Error(`Invalid signature: ${signature}`);
	}

	// Split hex string signature into two 32 byte chunks
	const startIndex = 2; // first two characters are 0x, so skip these
	const length = 64; // each 32 byte chunk is in hex, so 64 characters
	const portion1 = signature.slice(startIndex, startIndex + length);
	const portion2 = signature.slice(startIndex + length, startIndex + length + length);
	const lastByte = signature.slice(signature.length - 2);

	if (`0x${portion1}${portion2}${lastByte}` !== signature) {
		throw new Error('Signature incorrectly generated or parsed');
	}

	// Hash the signature pieces to get the two private keys
	const spendingPrivateKey = sha256(`0x${portion1}`);
	const viewingPrivateKey = sha256(`0x${portion2}`);

	// Create KeyPair instances from the private keys and return them
	const signingKeySpend = new SigningKey(spendingPrivateKey);
	const signingKeyView = new SigningKey(viewingPrivateKey);

	const spendingKeyPair = {
		private: spendingPrivateKey,
		public: signingKeySpend.compressedPublicKey
		//public: uintArrayToHex(secp.getPublicKey(spendingPrivateKey, isCompressed=true))
	};
	const viewingKeyPair = {
		private: viewingPrivateKey,
		public: signingKeyView.compressedPublicKey
		//public: uintArrayToHex(secp.getPublicKey(viewingPrivateKey, isCompressed=true))
	};
	return { spendingKeyPair, viewingKeyPair };
}

