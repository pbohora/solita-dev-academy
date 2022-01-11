const csv = require("fast-csv");

const parserAndValidateCsv = (file) => {
  const fileRows = [];

  // open uploaded file
  csv
    .parseFile(file, { headers: true })
    .on("data", function (data) {
      console.log(data, data.sensorType);
      fileRows.push(data);
    })
    .on("end", function () {
      // console.log(fileRows);
    });
};

module.exports = parserAndValidateCsv;
