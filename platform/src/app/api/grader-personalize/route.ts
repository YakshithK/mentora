import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from "path";
import { client as mongoClient } from '@/lib/mongo-client'
import { auth } from '@/lib/auth';

const PROTO_PATH = path.join(process.cwd(), 'src', 'protos', 'personalization.proto');


const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const loadedProto = grpc.loadPackageDefinition(packageDefinition) as any;
const PersonalizationService = loadedProto.personalization.PersonalizationService;

// Promisified gRPC call using arrow function
const generatePersonalizationPromise = (client: any, feedback: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.generatePersonalization({ feedback }, (err: any, response: any) => {
      if (err) {
        reject(err);
        console.error('gRPC Error:', err);
      } else {
        resolve(response);
      }
    });
  });
};

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const client = new PersonalizationService('localhost:50052', grpc.credentials.createInsecure());
    
    const response = await generatePersonalizationPromise(client, query);

    const db = mongoClient.db('test');
    const accountsCollection = db.collection('account');
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    await accountsCollection.updateOne(
      { email: session?.user?.email },
      { $set: { preferences: response } },
      { upsert: true }
    );

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}