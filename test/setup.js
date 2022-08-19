const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

let mongod;

beforeAll(async () => {
  process.env.JWT_KEY = "mysecrettoken";
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongoose.disconnect();
  // await mongoose.connection.close();
});
