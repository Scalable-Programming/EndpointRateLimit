import { MongoClient } from "mongodb";
import { config } from "../config";

const collectionName = "users";
let userCollection;

const connect = async () => {
    const client = new MongoClient(config.mongoUrl);
    await client.connect();
    const db = client.db(config.mongoDb);
    userCollection = db.collection(collectionName);
    createUserIndex();
};

const createUserIndex = () => {
    userCollection.createIndex({ username: 1 }, { unique: true });
};

connect();

export { userCollection };
