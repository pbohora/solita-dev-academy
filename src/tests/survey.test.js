const supertest = require("supertest");
const { connectDb, closeDatabase } = require("../databse/db");
const app = require("../app");
const Farm = require("../models/farm");
const Survey = require("../models/survey");

const { initialDataLoad } = require("./testHelpers/helpers");
const api = supertest(app);

beforeAll(async () => {
  await connectDb();
  await initialDataLoad();
});

afterAll(async () => {
  await closeDatabase();
});

describe("when there is farm data at db", () => {
  test("surveys are returned as json", async (done) => {
    api
      .get("/api/surveys")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /:farmId/surveys", (done) => {
    const farms = await Farm.find({});
    const farm=farms[0].toJSON();
  
    api
      .get(`/api/farms/${farm.id}/surveys`)
      .expect(200)
      .expect((res) => {
        res.body.length = 3;
        res.body[0].sensorType = "pH";
        
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /:farmId/surveys/:sensorType/monthly (get monthly sensor data)", (done) => {
    const farms = await Farm.find({});
    const farm=farms[0].toJSON();
    api
      .get(`/api/farms/${farm.id}/surveys/${"pH"}`)
      .expect((res) => {   
        res.body.sensorType = "pH";    
        res.body.stats.length=2
        res.body.stats[0].average=5.7
        res.body.stats[0].median=5.7
        res.body.stats[0].standardDeviation=0.2
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /:farmId/surveys/create (get monthly sensor data)", (done) => {
    const surveysAtStart = await Survey.find({});
    const farms = await Farm.find({});
    const farm=farms[0].toJSON();

    const survey={
      value="4",
      date="2021-12-21T22:00:00.000+00:00",
      type="temperature"
    }
    api
      .post(`/api/farms/${farm.id}/surveys/create`)
      .send(survey)
      .expect(201)
      .expect((res) => {   
        res.body.sensorType = "temperature";    
        
      })   
      const surveyData = await Survey.find({});
    expect(farmData.length).toBe(farmsAtStart.length + 1);
  });
});
