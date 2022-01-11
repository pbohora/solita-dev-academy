const csv = require("fast-csv");

const parserAndValidateCsv = (file) => {
  const fileRows = [];

  // open uploaded file
  csv
    .parseFile(file)
    .on("data", function (data) {
      fileRows.push(data);
    })
    .on("end", function () {
      console.log(fileRows);
    });
};

module.exports = parserAndValidateCsv;
