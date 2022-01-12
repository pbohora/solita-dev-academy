const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const { initialDataLoad, farmId } = require("./testHelpers/helpers");

const api = supertest(app);

describe("when there is farm data at db", () => {
  beforeEach(async () => {
    await initialDataLoad();
  });

  test("farms are returned as json", async () => {
    await api
      .get("/api/farms")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("GET /farm", async () => {
    await api.get("/api/farms").expect((res) => {
      res.body.data.length = 1;
      res.body.data[0].name = "test farm";
    });
  });

  test("GET /farm/:id", async () => {
    await api
      .get(`/api/farms/${farmId}`)
      .expect(200)
      .expect((res) => {
        res.body.data.name = "test farm";
      });
  });

  test("GET /farm/:id/surveys", async () => {
    await api
      .get(`/api/farms/${farmId}/surveys`)
      .expect(200)
      .expect((res) => {
        res.body.data.length = 3;
        res.body.data[1].sensorType = "temperature";
      });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
