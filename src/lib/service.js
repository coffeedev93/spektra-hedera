import {
  AccountId,
  PrivateKey,
  Client,
  TopicMessageSubmitTransaction,
  TransferTransaction
} from "@hiero-ledger/sdk";

export const getRegistryEntry = async (user) => {
  try {
    const response = await fetch(`/api/registry?userId=${user}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Failed to set message:', error);
    return { success: false }
  }
}

export const setRegistryEntry = async (
  userId, 
  stealthMetaAddress
) => {
  try {
    const response = await fetch('/api/registry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, stealthMetaAddress }),
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Failed to set message:', error);
    return { success: false }
  }
}

export const publishAnnouncement = async (message) => {
  try {
    const response = await fetch('/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Failed to set message:', error);
    return { success: false }
  }
}

export const getAnnouncements = async () => {
  const topicId = process.env.NEXT_PUBLIC_ANNOUNCEMENTS_TOPIC_ID;
  const opts = {
    topicId: topicId,             //Fill in the Topic ID
    order: "desc"                 //Fill in the order in which items are listed
    // limit: 10,                    //Fill in the maximum number of items to return
  };
  
  const getTopicMessagesResponse = await fetch(
    `https://testnet.mirrornode.hedera.com/api/v1/topics/${opts.topicId}/messages?order=${opts.order}` //&limit=${opts.limit}
  );

  if (!getTopicMessagesResponse.ok) {
    console.log(`HTTP error! status: ${getTopicMessagesResponse.status}`);
    return [];
  }
  
  const getTopicMessagesData = await getTopicMessagesResponse.json();
  return getTopicMessagesData;
}

export const fetchAccountData = async (id) => {
  if (!id) return { HBAR: 0, USDC: 0 };

  const MIRROR_NODE_URL = "https://testnet.mirrornode.hedera.com";
  try {
    const response = await fetch(`${MIRROR_NODE_URL}/api/v1/accounts/${id}`);
    const data = await response.json();
    
    const hbarBalance = data.balance.balance / 1e8;
    const usdcToken = data.balance.tokens.find(t => t.token_id === process.env.NEXT_PUBLIC_USDC_TOKEN_ID);
    const usdcBalance = usdcToken ? usdcToken.balance / 1e6 : 0;

    const balances = { HBAR: hbarBalance, USDC: usdcBalance };
    const {
      alias,
      account,
      created_timestamp,
      ethereum_nonce,
      evm_address,
      transactions,
      key:{key}
    } = data;

    return {
      alias,
      account,
      balances,
      created_timestamp,
      ethereum_nonce,
      evm_address,
      transactions,
      key
    }

  } catch (err) {
    console.error("Balance fetch error:", err);
    return { HBAR: 0, USDC: 0 }
  }
}


// This is a call to the Stealth Registry smart contract
export const checkRegistryEntry = async (value) => {
  const list = [
    ["@joedoe", "0.0.8877665", "st:eth:0x03312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b16603312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b166"],
    ["@alice", "0.0.8877664", "st:eth:0x03312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b16603312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b166"],
    ["@user", "0.0.8877663", "st:eth:0x03312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b16603312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b166"],
    ["@bob", "0.0.8877662", "st:eth:0x03312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b16603312f36039e1479d10ba17eef98bba5f9a299af277c1dfac2e9134f352892b166"],
  ]

  const result = list.find(v => v[0] === value)
  return result ? result[2] : "0x"
}


export const getaddr = async () => {
  const k = process.env.NEXT_PUBLIC_RANDOM_PK
  const pk = PrivateKey.fromStringECDSA(k) 
  console.log({
    public: pk.publicKey.toStringRaw(), 
    evm: pk.publicKey.toEvmAddress()
  })
}