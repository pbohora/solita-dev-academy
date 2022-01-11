const csv = require("fast-csv");
const csvValidator = require("./csvValidator");

const parserAndValidateCsv = (file) => {
  return new Promise((resolve, reject) => {
    const fileRows = [];
    // open uploaded file
    csv
      .parseFile(file, { headers: true })
      .on("data", function (data) {
        if (
          !data.hasOwnProperty("location") ||
          !data.hasOwnProperty("datetime") ||
          !data.hasOwnProperty("sensorType") ||
          !data.hasOwnProperty("value")
        ) {
          reject({ message: "missing field" });
        }
        const isDataValid = csvValidator(data);
        if (isDataValid) {
          fileRows.push(data);
        }
      })
      .on("end", function () {
        console.log(fileRows.length);
        resolve({ farm: fileRows[0].location, data: fileRows });
      });
  });
};

module.exports = parserAndValidateCsv;
