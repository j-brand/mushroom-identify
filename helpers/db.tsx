import { MongoClient } from "mongodb";

export async function connectToDatabase(): Promise<MongoClient> {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER;
  const database = process.env.MONGODB_DATABASE;

  const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`);

  return client;
}
