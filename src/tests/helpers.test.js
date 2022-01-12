const path = require("path");
const csvDataValidator = require("../helpers/csvValidator");
const parserAndValidateCsv = require("../helpers/parserAndValidateCsv");

const csvDataArray = require("./testMockData/csvDataArray");
const testCsvFile1 = path.resolve(
  __dirname,
  "./testMockData/testCsvFiles",
  "test_csv_file_1.csv"
);

const testCsvFile2 = path.resolve(
  __dirname,
  "./testMockData/testCsvFiles",
  "test_csv_file_2.csv"
);

describe("test csv data validator functions", () => {
  test("return true for valid  data", () => {
    expect(csvDataValidator(csvDataArray[0])).toEqual(true);
  });

  test("return false for invalid  data", () => {
    expect(csvDataValidator(csvDataArray[1])).toEqual(false);
  });

  test("return false for data with only date property", () => {
    expect(csvDataValidator(csvDataArray[2])).toEqual(false);
  });
});

describe("test csv file parser and validator functions", () => {
  test("return error meaasage for invalid  csv file", async () => {
    try {
      await parserAndValidateCsv(testCsvFile2);
    } catch (e) {
      expect(e).toEqual({ error: "missing field" });
    }
  });

  test("return data object for valid  csv file", async () => {
    const data = await parserAndValidateCsv(testCsvFile1);
    expect(data.data[0]).toEqual({
      location: "Test Farm 1",
      datetime: "2018-12-31T22:00:00.000Z",
      sensorType: "pH",
      value: "7.17",
    });
  });
});
