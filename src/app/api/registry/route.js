import { 
  AccountId, 
  Client, 
  ContractCallQuery, 
  ContractExecuteTransaction, 
  ContractFunctionParameters, 
  PrivateKey 
} from "@hiero-ledger/sdk";
import { NextResponse } from "next/server";


const MY_ACCOUNT_ID = AccountId.fromString(process.env.ANNOUNCEMENTS_ACCOUNT_ID);
const MY_PRIVATE_KEY = PrivateKey.fromStringECDSA(process.env.ANNOUNCEMENTS_SUBMIT_PK);
const initClient = () => Client.forTestnet().setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

const registryContractId = process.env.REGISTRY_ACCOUNT_ID;

async function checkRegistry(userId) {
  let client;
  try {
    client = initClient();
    const query = new ContractCallQuery()
      .setContractId(registryContractId)
      .setGas(100_000)
      .setFunction("getMetaAddressOf", 
        new ContractFunctionParameters()
          .addUint256(1)
          .addString(userId)
      )

    const contractCallResult = await query.execute(client);
    const data = contractCallResult.getString(0);

    return {
      success: true,
      data,
    };

  } catch (error) {
    console.log(error);
    return { success: false }
  } finally {
    if (client) client.close();
  }
}

async function checkRegistryWithSender(ethAddress) {
  let client;
  try {
    client = initClient();
    const query = new ContractCallQuery()
      .setContractId(registryContractId)
      .setGas(100_000)
      .setFunction("stealthMetaAddressOf", // needs a getter function
        new ContractFunctionParameters()
          .addAddress(ethAddress)
      )

    const contractCallResult = await query.execute(client);
    const data = contractCallResult.getString(0);

    return {
      success: true,
      data,
    };

  } catch (error) {
    console.log(error);
    return { success: false }
  } finally {
    if (client) client.close();
  }
}

async function updateRegistry(
  userId,
  stealthMetaAddress
) {
  let client;
  try {
    client = initClient();

    // Convert the meta-address to the right format
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(stealthMetaAddress);

    const transaction = new ContractExecuteTransaction()
      .setContractId(registryContractId)
      .setGas(1_000_000)
      .setFunction("registerKeysWithId", 
        new ContractFunctionParameters()
          .addUint256(1)
          .addBytes(uint8Array)
          .addString(userId)
      )

    //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const transactionStatus = receipt.status.toString();

    return {
      success: true,
      status: transactionStatus
    };

  } catch (error) {
    console.log(error);
    return { success: false }
  } finally {
    if (client) client.close();
  }
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const evmAddress = searchParams.get('evmAddress');
  let result;

  console.log(userId, evmAddress)

  if (userId) {
    result = await checkRegistry(userId);
  }
  else if (evmAddress) {
    result = await checkRegistryWithSender(evmAddress);
  }

  return NextResponse.json(result)
}

export async function POST(request) {
  const body = await request.json();
  const { userId, stealthMetaAddress } = body;

  const result = await updateRegistry(userId, stealthMetaAddress);
  return NextResponse.json(result);
}