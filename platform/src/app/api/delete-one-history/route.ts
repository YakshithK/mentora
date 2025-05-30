import { client, dbName, historyCollectionName } from "@/lib/mongo-client";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(historyCollectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(id)});

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'No chat history found for this ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Chat history deleted successfully', success: true }, { status: 200 });

  }
  catch (error: any) {  
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  } 
}