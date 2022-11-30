const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream(
  "./Data/DataXS_ChauVanLoc.16-41-07-11-2022.csv"
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
      database: "staging",
    });

    // open the connection
    connection.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO snapshot (NaKey, Province, Date, Prize8, Prize7, Prize6, Prize5, Prize4, Prize3, Prize2, Prize1, PrizeDB) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);
