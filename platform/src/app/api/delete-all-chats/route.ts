import { NextRequest, NextResponse } from "next/server";
import { client, dbName } from "@/lib/mongo-client";

export const DELETE = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chat-history');

    // Delete chat history for the specified email
    const result = await collection.deleteMany({ email });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'No chat history found for this email' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Chat history deleted successfully', success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}