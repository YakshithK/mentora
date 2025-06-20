import { NextRequest, NextResponse } from "next/server";
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from "path";
import { client as mongoClient, dbName, historyCollectionName } from "@/lib/mongo-client"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const PROTO_PATH = path.join(process.cwd(), 'src', 'protos', 'vector_query.proto');


const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const loadedProto = grpc.loadPackageDefinition(packageDefinition) as any;
const VectorQueryService = loadedProto.vectorquery.VectorQueryService;

// Promisified gRPC call using arrow function
const fetchAndQueryPromise = (client: any, query: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.fetchAndQuery({ query }, (err: any, response: any) => {
      if (err) {
        reject(err);
        console.error('gRPC Error:', err);
      } else {
        resolve(response);
      }
    });
  });
};

export const POST = async (req: NextRequest) => {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    // Initialize gRPC client
    const client = new VectorQueryService(
      process.env.GRPC_SERVER_URL || 'localhost:50051',
      grpc.credentials.createInsecure()
    );

    // Await the gRPC response
    const grpcResponseRaw = await fetchAndQueryPromise(client, prompt);

    // Convert protobuf object to plain JS object if possible
    const grpcResponse = grpcResponseRaw.toObject ? grpcResponseRaw.toObject() : grpcResponseRaw;

    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const collection = db.collection(historyCollectionName);

    // Get user email from session
    const session = await auth.api.getSession({ headers: await headers() });
    const email = session?.user?.email || 'anonymous';

    // Store chat history in MongoDB
    await collection.insertOne({
      email,
      prompt,
      response: grpcResponse.answer,
      createdAt: new Date(),
      type: "chat"
    });

    return NextResponse.json({ chat: grpcResponse.answer, success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
};

