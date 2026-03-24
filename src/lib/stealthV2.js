//import { keccak_256 as keccak256 } from '@noble/hashes/sha3.js';
import * as secp from "@noble/secp256k1";
import { 
	keccak256,
	hexlify,
	isHexString,
	sha256,
	toUtf8Bytes,
	SigningKey ,
} from "ethers";

function randomPrivateKey() {
  var randPrivateKey = secp.utils.randomPrivateKey();
  return BigInt(`0x${Buffer.from(randPrivateKey, "hex").toString('hex')}`);
}

function uintArrayToHex(uintArray) {
  return secp.utils.bytesToHex(uintArray);
}

function toEthAddress(PublicKey) {
  var stAA = keccak256( Buffer.from(PublicKey, 'hex').slice(1)).toString(16);
  return "0x"+stAA.slice(-40);
}

export function generateStealthInfo(stealthMetaAddress) {
  const USER = stealthMetaAddress;
  
	if (!USER.startsWith("st:eth:0x")){
    //throw "Wrong address format; Address must start with `st:hbar:0x...`";
    console.log("Error! Wrong address format; Address must start with `st:eth:0x...`");
    return {}
  }

  const R_pubkey_spend = secp.Point.fromHex(USER.slice(9,75));
  const R_pubkey_view = secp.Point.fromHex(USER.slice(75,));

  const ephemeralPrivateKey = randomPrivateKey(); 
  const ephemeralPublicKey = secp.getPublicKey(ephemeralPrivateKey, true);
  const sharedSecret = secp.getSharedSecret(ephemeralPrivateKey, R_pubkey_view);
  var hashedSharedSecret = keccak256(Buffer.from(sharedSecret.slice(1)));

  var viewTag = hashedSharedSecret.slice(0,4);
  const hashedSharedSecretPoint = secp.Point.fromPrivateKey(Buffer.from(hashedSharedSecret.slice(2), "hex"));
  const stealthPublicKey = R_pubkey_spend.add(hashedSharedSecretPoint);
  const stealthAddress = toEthAddress(stealthPublicKey.toHex());

  return {"stealthAddress":stealthAddress, "ephemeralPublicKey":"0x"+Buffer.from(ephemeralPublicKey).toString('hex'), "viewTag":viewTag.toString('hex')};
}

export function parseStealthAddresses(
  ephemeralPublicKey_hex,
  stealthAddress_given,
  spendingPublicKey_hex,
  viewingPrivateKey,
  viewTag_given
){
  //console.log("ephemeralPublicKey_hex :",ephemeralPublicKey_hex);

  var ephemeralPublicKey = secp.Point.fromHex(ephemeralPublicKey_hex.slice(2));
  console.log('spendingPublicKey_hex:', spendingPublicKey_hex);

  const spendingPublicKey = secp.Point.fromHex(spendingPublicKey_hex.slice(2), true);
  //console.log('spendingPublicKey:', spendingPublicKey);


  const sharedSecret = secp.getSharedSecret(BigInt(viewingPrivateKey), ephemeralPublicKey);
  console.log('sharedSecret:', sharedSecret);

  var hashedSharedSecret = keccak256(Buffer.from(sharedSecret.slice(1)));
  console.log("hashedSharedSecret2 :",hashedSharedSecret);

  var ViewTag = hashedSharedSecret.slice(2,4).toString('hex');
  console.log('View tag:', ViewTag);
  console.log('View tag given:', viewTag_given);
  if (viewTag_given != ViewTag) {
    //console.log("skipped thanks to view tag;")
    return false;
  }

  const hashedSharedSecretPoint = secp.Point.fromPrivateKey(Buffer.from(hashedSharedSecret.slice(2), "hex"));
  //console.log('hashedSharedSecretPoint1:', hashedSharedSecretPoint);

  ////console.log('hashedSharedSecretPoint:', hashedSharedSecretPoint);
  const stealthPublicKey = spendingPublicKey.add(hashedSharedSecretPoint);
  //console.log("stealthPublicKey :",stealthPublicKey.toHex());

  const stealthAddress = toEthAddress(stealthPublicKey.toHex());
  console.log(stealthAddress);
  console.log(stealthAddress_given);
  if (stealthAddress === stealthAddress_given) {
    return [stealthAddress, ephemeralPublicKey_hex,  "0x" + hashedSharedSecret.toString('hex')];
  }
  return false;
}

export function privToAddress(
  stealthPrivateKey
){
  var stealthPublicKey = secp.Point.fromPrivateKey(stealthPrivateKey);
  var stealthAddress = toEthAddress(stealthPublicKey.toHex());
  return  stealthPublicKey.toHex(true), stealthAddress;
}

export function generateRandomStealthMetaAddress() {
  const spendingPrivateKey = randomPrivateKey();
  const viewingPrivateKey = randomPrivateKey();
  const spendingPublicKey = uintArrayToHex(secp.getPublicKey(spendingPrivateKey, true));
  const viewingPublicKey = uintArrayToHex(secp.getPublicKey(viewingPrivateKey, true));
  const stealthMetaAddress = "st:eth:0x"+spendingPublicKey+viewingPublicKey;

  const spendingKeyPair = {
		private: "0x"+spendingPrivateKey.toString(16),
		public: "0x"+spendingPublicKey
	};
	const viewingKeyPair = {
		private: "0x"+viewingPrivateKey.toString(16),
		public: "0x"+viewingPublicKey
	};
	return { spendingKeyPair, viewingKeyPair };
}

export async function generateSpendViewKeys(signer) {
	// Base message that will be signed
	const baseMessage = 'Sign this message to access your Stealth account.\nOnly sign this message for a trusted client!'; // prettier-ignore

	// Append chain ID if not mainnet to mitigate replay attacks
	const { chainId } = 1;
	const message = chainId === 1 ? baseMessage : `${baseMessage}\n\nChain ID: ${chainId}`;

	// Get 65 byte signature from user using personal_sign
	//const userAddress = await signer.getAddress();
	const formattedMessage = hexlify(toUtf8Bytes(message));
	//const signature = String(await this.provider.send('personal_sign', [formattedMessage, userAddress.toLowerCase()]));
	//const signature = String(await signer.signMessage(formattedMessage));
  const sig = await signer.sign([formattedMessage]);
  const ln = sig[0].signature.toHex(false).length;
  const signature = `${ln===128?"0x00":"0x"}${sig[0].signature.toHex(false)}`;

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

// To verify Hashpack signatures in backend https://github.com/Hashpack/hashconnect?tab=readme-ov-file#verify-signature
export function prefixMessageToSign(message) {
	return '\x19Hedera Signed Message:\n' + message.length + message
}