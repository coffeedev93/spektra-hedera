_Note: For post-hackathon updates check the **alpha** branch of this repo_

# Spektra \- Private Hedera Payments

Spektra is a **privacy-preserving** dApp designed to provide "unlinkable" payments. Thanks to the implementation of **Stealth Addresses**, it allows users to receive funds at a fresh, unique address for every transaction while managing all funds from a single dashboard. Unlike traditional wallets where your history is an open book, Spektra ensures that a sender (or observer) cannot see your total balance or previous transaction history.

## Unique Value Proposition

Inspired by the **Hedera DevDay 2026**, where privacy was spotlighted as the essential bridge for institutional and mainstream adoption, we identified a critical gap in native user-level privacy tools. So we started to build Spektra to fill that void, transforming the vision of a private, secure ecosystem into a functional reality for all Hedera users.

With the goal of strengthening privacy for the Hedera community while delivering a seamless, intuitive experience this approach doesn't require recipients to set up fresh new addresses for all potential senders. Instead, users must only generate a **platform ID** once, which can then be used by other users to **derive stealth addresses** from it. Of course users could manually swap addresses for every payment, but it’s not scalable, and here the stealth addresses do the heavy lifting for them, making high-level privacy feel like a standard transaction.

## How does it work?

Instead of sending funds directly to a publicly known address, the sender derives a unique, one-time destination address for every payment. This address is computed from the recipient’s public keys and a sender-generated ephemeral private key using elliptic curve cryptography. Each transaction therefore lands on a fresh on-chain address that is mathematically related to the recipient, but impossible to associate with them externally. From the outside, every payment appears to go to an unrelated account.

From the recipient’s side, their wallet uses a private viewing key to scan transactions and detect which ones belong to them. Once detected, a corresponding private spending key is derived locally, giving them exclusive control over the funds. No interaction or coordination is required between sender and recipient. The sender only needs a single public identifier, yet the actual network destination changes every time.

The result is recipient privacy without changing the user-facing payment flow: senders still provide a single identifier, while every transaction becomes unlinkable on the distributed ledger.

## How This Differs From Regular Transfers

In a regular transfer:

* You publish a fixed address.  
* Everyone can see all funds sent to it.  
* Over time, your transaction history becomes trivial to reconstruct.

With stealth addresses:

* Each payment uses a fresh destination.  
* No reusable receiving identifier exists on the network.  
* Multiple transfers to the same person appear unrelated.

The transfer flow stays the same for the sender.

## Technical Details

The platform is powered by **NextJS** for managing the frontend and backend functions, ensuring a frictionless user experience from the first click. At its core, the application interacts with the Hedera ecosystem by utilizing the **Hedera Consensus Service (HCS)** for verifiable event logging, the **Hedera Token Service (HTS)** for native asset management, and the **Hedera Smart Contract Service (HSCS)** for secure, automated contract interactions. Wallet connectivity is handled securely through Hedera Wallet Connect. 

To test the MVP, simply connect your Hashpack wallet using a Testnet account, no real-world assets are required to participate. The currently supported testnet assets are HBAR and USDC.

## Architecture

Inspired by Ethereum’s **ERC-5564** and **ERC-6538** privacy standards, we have successfully ported Stealth Account functionality into the Hedera ecosystem with a native-first approach by using the HCS, HTS and HSCS services.

* **Encryption**: is done with Elliptic Curve Diffie-Hellman (ECDH), It allows two parties (sender and receiver in this case) to arrive at the exact same **shared secret** using their own private keys and the other person's public keys.   
* **Meta-Address Registry**: the smart contract to register users meta-addresses.  
* **Stealth Address Announcements**: a topic in the HCS, which is used to announce the creation of stealth addresses.  
* **Stealth accounts**: for this we use **hollow accounts**, a dormant Hedera account that has been provisionally created on the network but lacks a public key. It serves as a placeholder that can receive assets but cannot perform outbound actions until it is "activated"

![system diagram](https://raw.githubusercontent.com/coffeedev93/spektra-hedera/refs/heads/main/public/diagram.png)

## Service Accounts Links

* **Announcements Topic** [Hedera Topic 0.0.8330548](https://hashscan.io/testnet/topic/0.0.8330548)  
* **Registry Contract** [Hedera Contract 0.0.8335470](https://hashscan.io/testnet/contract/0.0.8335470)


## Business Model

* **Transactional Monetization**: A per-payment micro-fee applied to every stealth transaction and batch withdrawals, ensuring revenue scales directly with network volume.  
* **Freemium Subscription Tiers**: Premium access levels that unlock advanced operational tools, including:  
  * Custom Branding: White-labeling the payment interface for professional use.  
  * Intelligence: Comprehensive payment history and granular data analytics.  
* **Developer & Ecosystem Access**: A tiered API integration model designed specifically for autonomous agent workflows and third-party platform embedding.

