import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
}

const client = new MongoClient(uri);
const dbName = "mentora";
const historyCollectionName = "history";

export { client, dbName, historyCollectionName};