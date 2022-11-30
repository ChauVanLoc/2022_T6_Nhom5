const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream(
  "./Data/DataXS_ChauVanLoc.23-30-01-11-2022.csv"
);
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "snapshot",
    });

    // open the connection
    connection.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO staging (Dai, Ngay, Giai8, Giai7, Giai6, Giai5, Giai4, Giai3, Giai2, Giai1, GiaiDB) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);
