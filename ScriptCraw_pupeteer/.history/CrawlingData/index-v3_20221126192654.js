const puppeteer = require("puppeteer");
var fs = require("fs");
var http = require("http");
const { resolve } = require("path");
const { rejects, throws } = require("assert");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

var date = new Date();
const time = `${date.getHours()}-${date.getMinutes()}.${date.getDate()}-${
  date.getMonth() + 1
}-${date.getFullYear()}`;
const pathData = `DataCinema_ChauVanLoc.${time}.csv`;
const pathLog = `Log_DataCinema_ChauVanLoc.${time}.txt`;

const writeDataIntoCSV = (arr) => {
  const csvWriter = createCsvWriter({
    path: "./csv-text.csv",
    header: [
      { id: "dai", title: "Đài" },
      { id: "ngay", title: "Ngày xổ số" },
      { id: "giai8", title: "Giải 8" },
      { id: "giai7", title: "Giải 7" },
      { id: "giai6", title: "Giải 6" },
      { id: "giai5", title: "Giải 5" },
      { id: "giai4", title: "Giải 4" },
      { id: "giai3", title: "Giải 3" },
      { id: "giai2", title: "Giải 2" },
      { id: "giai1", title: "Giải 1" },
      { id: "giaiDB", title: "Giải Đặc Biệt" },
    ],
    encoding: "utf-8",
  });
  csvWriter.writeRecords(arr);
};

const Xsmn = (
  dai,
  ngay,
  giai8,
  giai7,
  giai6,
  giai5,
  giai4,
  giai3,
  giai2,
  giai1,
  giaiDB
) => {
  (this.dai = dai),
    (this.ngay = ngay),
    (this.giai8 = giai8),
    (this.giai7 = giai7),
    (this.giai6 = giai6),
    (this.giai5 = giai5),
    (this.giai4 = giai4),
    (this.giai3 = giai3),
    (this.giai2 = giai2),
    (this.giai1 = giai1),
    (this.giaiDB = giaiDB);
};

const pro = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://xosodaiphat.com/xsmn-xo-so-mien-nam.html", {
    // waitUntil: "networkidle2",
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  const dai = await page.evaluate(() => {
    return [
      ...document.querySelectorAll(
        "#mn_kqngay_24112022_kq > table.table-result.table-xsmn > thead > tr > th > h3 > a"
      ),
    ].map((e) => e.textContent);
  });
  await browser.close();
  return dai;
};
pro().then((e) => console.log(e));
