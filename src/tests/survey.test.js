const supertest = require("supertest");
const { connectDb, closeDatabase } = require("../databse/db");
const app = require("../app");

const api = supertest(app);

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await closeDatabase();
});

test("surveys are returned as json", async () => {
  await api
    .get("/api/surveys")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
