const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const request = require("supertest");

const { app } = require("../app");
const auth = "/api/auth";

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
});

global.signIn = async () => {
  const res = await request(app)
    .post(auth+ "/sign-up")
    .send({
      name: "test",
      email: "test@gmail.com",
      password: "123456",
    })
    .expect(200);

  const res1 = await request(app)
    .post(auth + "/sign-in")
    .send({
      email: "test@gmail.com",
      password: "123456",
    })
    .expect(200);
  return res1.body.token;
};
