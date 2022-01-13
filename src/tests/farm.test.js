const supertest = require("supertest");
const { connectDb, closeDatabase } = require("../databse/db");

const app = require("../app");

const { initialDataLoad } = require("./testHelpers/helpers");
const Farm = require("../models/farm");
const api = supertest(app);

let farmId;

beforeAll(async () => {
  await connectDb();
  await initialDataLoad();
});

afterAll(async () => {
  await closeDatabase();
});

describe("when there is farm data at db", () => {
  test("farms are returned as json", (done) => {
    api
      .get("/api/farms")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /farms", (done) => {
    api
      .get("/api/farms")
      .expect((res) => {
        res.body.length = 1;
        res.body[0].name = "test farm";
        farmId = res.body[0].id;
      })
      .end((err, res) => {
        if (err) return done(err);
        farmId = res.body[0].id;
        return done();
      });
  });

  test("POST /farm (create new farm)", async () => {
    const farmsAtStart = await Farm.find({});
    await api
      .post("/api/farms/create")
      .expect("Content-Type", /json/)
      .send({
        name: "Old Helsinki farm",
      })
      .expect(201)
      .expect((res) => {
        res.body.name = "Old Helsinki farm";
      });

    const farmData = await Farm.find({});
    expect(farmData.length).toBe(farmsAtStart.length + 1);

    const farmNames = farmData.map((farm) => farm.name);
    expect(farmNames).toContain("Old Helsinki farm");
  });
});

describe("get farm details when there is farm id", () => {
  test("GET /farms/:farmId", (done) => {
    api
      .get(`/api/farms/${farmId}`)
      .expect(200)
      .expect((res) => {
        res.body.name = "test farm";
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
