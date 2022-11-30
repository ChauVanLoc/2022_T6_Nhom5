const puppeteer = require("puppeteer");
var fs = require("fs");
var http = require("http");
const { resolve } = require("path");
const { rejects, throws } = require("assert");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// var date = new Date();
// const time = `${date.getHours()}-${date.getMinutes()}.${date.getDate()}-${
//   date.getMonth() + 1
// }-${date.getFullYear()}`;
// const pathData = `DataCinema_ChauVanLoc.${time}.csv`;
// const pathLog = `Log_DataCinema_ChauVanLoc.${time}.txt`;

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

const pro = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://xoso.com.vn/xsmn-23-11-2022.html", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  const dai = await page.evaluate(() => {
    const e = document.querySelectorAll(
      ".main .main-content .content-left .section .section-content .table-xsmn thead tr th h3 a"
    );
    return e;
  });
  const giai = await page.evaluate(() => {
    return document.querySelectorAll(
      ".main .main-content .content-left .section .section-content .table-xsmn tbody tr"
    );
  });
  const list = [];
  var ketQua;
  var arr = [];
  var ob;
  // if (giai) {
  // for (let x = 0; x > dai.length; x++) {
  //   for (let i = 0; i < giai.length; i++) {
  //     ketQua = giai[i].querySelector("td span");
  //     if (ketQua[x].length === 1) {
  //       arr.push(ketQua[x].textContent);
  //     } else {
  //       arr.push([...ketQua[x]].map((e) => e.textContent).join(", "));
  //     }
  //   }
  //   ob = {
  //     dai: dai[0].textContent,
  //     ngay: 1,
  //     giai8: arr[0],
  //     giai7: arr[1],
  //     giai6: arr[2],
  //     giai5: arr[3],
  //     giai4: arr[4],
  //     giai3: arr[5],
  //     giai2: arr[6],
  //     giai1: arr[7],
  //     giaiDB: arr[8],
  //   };
  //   list.push(ob);
  // }
  await browser.close();
  return dai[0];
};
pro().then((res) => console.log(res));
