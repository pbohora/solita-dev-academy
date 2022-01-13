const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const { initialDataLoad } = require("./testHelpers/helpers");

const api = supertest(app);

let farmId;

describe("when there is farm data at db", () => {
  beforeEach(async () => {
    await initialDataLoad();
  });

  test("farms are returned as json", (done) => {
    api
      .get("/api/farms")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /farm", (done) => {
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

  test("POST /farm (create new farm)", (done) => {
    request(app)
      .post("/api/farms/create")
      .expect("Content-Type", /json/)
      .send({
        name: "Old Helsinki farm",
      })
      .expect(201)
      .expect((res) => {
        res.body.length = 2;
        res.body.name = "Old Helsinki farm";
      })
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.data[1].id;
        return done();
      });

    Farm.find({}).expect((data) => {
      data.length = 2;
      const farmNames = data.map((farm) => farm.name);
      expect(farmNames).toContain("Old Helsinki farm");
    });
  });

  /*test("GET /farm/:farmId/surveys", async () => {
    await api
      .get(`/api/farms/${farmId}/surveys`)
      .expect(200)
      .expect((res) => {
        res.body.data.length = 3;
        res.body.data[1].sensorType = "temperature";
      });
  });*/
});

describe("get farm details when there is farm id", () => {
  test("GET /farms/:farmId", (done) => {
    api
      .get(`/api/farms/${farmId}`)
      .expect(200)
      .expect((res) => {
        res.body.name = "test farm";
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
