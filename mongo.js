import { MongoClient } from "mongodb";
import { readFileSync } from "fs";

// Load data from data.json
const data = JSON.parse(readFileSync("data.json", "utf-8"));

// Add timestamps to each document
const dataWithTimestamps = data.map((doc) => ({
  ...doc,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

// MongoDB connection URI
const uri =
  "mongodb+srv://user1:user1@cluster0.glvof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function insertData() {
  try {
    await client.connect();
    const database = client.db("test"); // Replace with your database name
    const collection = database.collection("units"); // Replace with your collection name

    // Insert data into MongoDB
    const result = await collection.insertMany(dataWithTimestamps);
    console.log(`${result.insertedCount} documents inserted with timestamps!`);
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    await client.close();
  }
}

insertData();
