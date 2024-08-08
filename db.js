const { MongoClient } = require('mongodb');

const url = "mongodb+srv://admin:admin@users.4thd4cn.mongodb.net/?retryWrites=true&w=majority&appName=users";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    const database = client.db('users'); // Replace with your database name
    return database;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = connectToDatabase;
