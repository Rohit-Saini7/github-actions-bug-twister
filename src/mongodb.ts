import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const userName = process.env.DATABASE_USER_NAME || '';
const password = process.env.DATABASE_PASSWORD || '';
const cluster = process.env.DATABASE_CLUSTER || '';
const appName = process.env.DATABASE_APP_NAME || '';

if (!userName || !password || !cluster || !appName) {
  throw new Error('Missing required DB environment variables.');
}

const uri = `mongodb+srv://${userName}:${encodeURIComponent(
  password
)}@${cluster}/?retryWrites=true&w=majority&appName=${appName}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('bug_twister_db');
  }
  return db;
};

export const closeDB = async () => {
  await client.close();
};
