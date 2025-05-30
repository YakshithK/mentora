import { NextRequest, NextResponse } from 'next/server';
import { VectorQueryServiceClient } from '@/grpc/vector_query_grpc_pb';
import { QueryRequest, QueryResponse } from '@/grpc/vector_query_pb';
import { MongoClient } from 'mongodb';

const grpcClient = new VectorQueryServiceClient(
    process.env.GRPC_SERVER_URL || 'localhost:50051',
    null,
    null
);

const mongoClient = new MongoClient(process.env.MONGODB_URI || '', {});
const dbName = 'mentora';
const collectionName = 'chat-history';

async function handleAIResponse(prompt: string): Promise<QueryResponse.AsObject> {
    return new Promise((resolve, reject) => {
        const req = new QueryRequest();
        req.setQuery(prompt);

        grpcClient.fetchAndQuery(req, (err: any, response: { toObject: () => QueryResponse.AsObject | PromiseLike<QueryResponse.AsObject>; }) => {
            if (err) return reject(err);
            resolve(response?.toObject());
        });
    });
}

async function handleStoreChatHistory(email: string, prompt: string, response: QueryResponse.AsObject) {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const chats = db.collection(collectionName);

    await chats.insertOne({
        email,
        prompt,
        response,
        createdAt: new Date(),
    });
}

export async function POST(req: NextRequest) {
    try {
        const { email, prompt } = await req.json();
        if (!email || !prompt) {
            return NextResponse.json({ error: 'Missing email or prompt' }, { status: 400 });
        }

        const grpcResponse = await handleAIResponse(email);
        await handleStoreChatHistory(email, prompt, grpcResponse);

        return NextResponse.json({ chat: grpcResponse });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
