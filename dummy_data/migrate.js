const fs = require("fs/promises");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const dataToSync = [
  ["genera", "example.genera.json"],
  ["questions", "example.questions.json"],
  ["habitus", "example.habitus.json"],
];

async function connectToDatabase() {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER;
  const database = process.env.MONGODB_DATABASE;

  const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`);

  return client;
}

async function updateDocument(client, collection, query, data, upsert = false) {
  const db = client.db();
  const result = await db.collection(collection).updateOne(query, { $set: data }, { upsert: upsert });
  return result;
}

async function syncData(dataToSync) {
  dataToSync.map(async (file) => {
    process.stdout.write(`Syncing ${file[1]} \n`);

    const client = await connectToDatabase();
    const filePath = path.resolve(__dirname, `./${file[1]}`);

    const rawData = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(rawData);

    try {
      for (const entity of parsedData.list) {
        if (entity.id) {
          let result = await updateDocument(client, file[0], { id: entity.id }, entity, true);
          process.stdout.write(`${file[1]} id ${entity.id} synced \n`);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  });
}

syncData(dataToSync);
