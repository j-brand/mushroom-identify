import { Document, MongoClient } from "mongodb";

export async function connectToDatabase(): Promise<MongoClient> {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  //const cluster = process.env.MONGODB_CLUSTER;
  const database = process.env.MONGODB_DATABASE;

  const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@${database}?retryWrites=true&w=majority`);

  return client;
}

export async function insertDocument(client: MongoClient, collection: string, data: Document): Promise<boolean> {
  const db = client.db();
  await db.collection(collection).insertOne(data);
  return true;
}

export async function findOneDocument(client: MongoClient, collection: string, criteria: Document): Promise<Document | null> {
  const db = client.db();
  const result = await db.collection(collection).findOne(criteria, { projection: { _id: 0 } });
  return result;
}

export async function findDocument(client: MongoClient, collection: string, criteria: Document): Promise<Document | null> {
  const db = client.db();
  const result = await db.collection(collection).find(criteria, { projection: { _id: 0 } });
  return result;
}

export async function updateDocument(client: MongoClient, collection: string, query: Document, data: Document, upsert = false) {
  const db = client.db();
  const result = await db.collection(collection).updateOne(query, { $set: data }, { upsert: upsert });
  return result;
}
