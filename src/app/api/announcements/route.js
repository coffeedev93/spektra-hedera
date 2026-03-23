import { NextResponse } from "next/server";
import {
  AccountId,
  PrivateKey,
  Client,
  TopicMessageSubmitTransaction
} from "@hiero-ledger/sdk";

const MY_ACCOUNT_ID = AccountId.fromString(process.env.ANNOUNCEMENTS_ACCOUNT_ID);
const MY_PRIVATE_KEY = PrivateKey.fromStringECDSA(process.env.ANNOUNCEMENTS_SUBMIT_PK);
const initClient = () => Client.forTestnet().setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

export const publishAnnouncement = async (message) => {
  let client;
  try {
    client = initClient();

    //Create the transaction
    const txTopicMessageSubmit = await new TopicMessageSubmitTransaction()
      .setTopicId(process.env.NEXT_PUBLIC_ANNOUNCEMENTS_TOPIC_ID) //Fill in the topic ID
      .setMessage(message);

    //Sign with the client operator private key and submit to a Hedera network
    const txTopicMessageSubmitResponse = await txTopicMessageSubmit.execute(client);

    const receiptTopicMessageSubmitTx = await txTopicMessageSubmitResponse.getReceipt(client);
    const statusTopicMessageSubmitTx = receiptTopicMessageSubmitTx.status;
    const txTopicMessageSubmitId = txTopicMessageSubmitResponse.transactionId.toString();
    
    //Get the transaction message
    // const getTopicMessage = txTopicMessageSubmit.getMessage();

    const result = {
      success: true,
      status: statusTopicMessageSubmitTx.toString(),
      url: "https://hashscan.io/testnet/transaction/" + txTopicMessageSubmitId,
    }

    console.log("Submit Announcement", result)
    return result;

  } catch (error) {
    console.log(error);
    return { success: false }
  } finally {
    if (client) client.close();
  }
}

export async function POST(request) {
  const body = await request.json();
  const { message } = body;

  const result = await publishAnnouncement(message);
  return NextResponse.json(result);
}