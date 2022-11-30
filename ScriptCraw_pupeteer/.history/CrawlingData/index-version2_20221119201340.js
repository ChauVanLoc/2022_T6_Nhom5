const puppeteer = require("puppeteer");
var fs = require("fs");
var http = require("http");
const { resolve } = require("path");
const { rejects, throws } = require("assert");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const pro = async (e) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(e, { waitUntil: "networkidle2", timeout: 0 });
  const o = {};
  const title = await page.evaluate(() => {
    let add = document.querySelector(
      ".main-content .bg-light .container .row .col-12 .mb-3 .mb-0"
    );
    return add.innerText;
  });
  o.cinema = title;
  const date = await page.evaluate(() => {
    let add = document.querySelector(
      ".main-content .container .row .col-md-8 #showtimes .showtimes .btn-group .active"
    );
    return add.innerText;
  });
  o.date = date;
  const crawlingData = await page.evaluate(() => {
    const arr = [];
    let films = document.querySelectorAll(".card .card-body .row .col");
    films.forEach((e) => {
      let name = e.querySelector(".card-title a").innerText;
      let description = e.querySelector(".card-text").innerText;
      let timeShow = e.querySelectorAll(".mt-2 .mb-1 a .time");
      let times = [];
      timeShow.forEach((t) => times.push(t.innerText));
      arr.push([name, description, times]);
    });
    return arr;
  });
  o.content = crawlingData;
  await browser.close();
  return o;
};
var date = new Date();
const time = `${date.getHours()}-${date.getMinutes()}.${date.getDate()}-${
  date.getMonth() + 1
}-${date.getFullYear()}`;
const pathData = `DataCinema_ChauVanLoc.${time}.csv`;
const pathLog = `Log_DataCinema_ChauVanLoc.${time}.txt`;
const threate = [
  "https://moveek.com/rap/cgv-ct-plaza/",
  "https://moveek.com/rap/cgv-hung-vuong/",
  "https://moveek.com/rap/cgv-crescent-mall/",
  "https://moveek.com/rap/cgv-pandora-city/",
  "https://moveek.com/rap/cgv-celadon/",
  "https://moveek.com/rap/cgv-thao-dien-pearl/",
  "https://moveek.com/rap/cgv-liberty-citypoint/",
  "https://moveek.com/rap/cgv-thu-duc/",
];
const writeFile = (path, content) => {
  var stream = fs.createWriteStream(`./txt/${path}.txt`, {
    encoding: "utf-8",
    flags: "a",
  });
  stream.write(content + "\n");
};
const writeDataIntoCSV = (arr) => {
  const csvWriter = createCsvWriter({
    path: pathData,
    header: [
      { id: "cinema", title: "CINEMA" },
      { id: "date", title: "DATE" },
      { id: "content", title: "CONTENT" },
    ],
    encoding: "utf-8",
  });
  csvWriter.writeRecords(arr);
};

(async () => {
  const isHasError = false;
  const arr = [];
  writeFile(pathLog, "Start get data");
  for (o of threate) {
    const oneThreate = await pro(o);
    if (oneThreate === "") {
      isHasError = true;
      writeFile(pathLog, "Error while get data");
    }
    arr.push(oneThreate);
  }
  isHasError
    ? writeFile(pathLog, "Error while get data")
    : writeDataIntoCSV(arr);
})();
