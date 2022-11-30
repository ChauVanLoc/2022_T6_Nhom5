const puppeteer = require("puppeteer");
var fs = require("fs");
var http = require("http");
const { resolve } = require("path");
const { rejects, throws } = require("assert");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

var date = new Date();
const time = `${date.getHours()}-${date.getMinutes()}`;
const pathData = `DataCinema_ChauVanLoc.${time}-${d}.csv`;
const pathLog = `Log_DataCinema_ChauVanLoc.${time}.txt`;

const writeDataIntoCSV = (arr) => {
  const csvWriter = createCsvWriter({
    path: `./${pathData}`,
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

const pro = async (link, day) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(link, {
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
  const giai = await page.$$(
    "#mn_kqngay_24112022_kq > table.table-result.table-xsmn > tbody > tr"
  );
  var tmp,
    str = "";
  var arr = [];
  var tong = [];
  var result = [];
  // console.log(giai[0].$$("td span").textContent);
  for (let x = 0; x < dai.length; x++) {
    for (let i = 0; i < giai.length; i++) {
      tmp = await giai[i].$$("td:nth-child(" + (x + 2) + ") span");
      for (let y = 0; y < tmp.length; y++) {
        arr.push(
          await giai[i].$eval(
            "td:nth-child(" + (x + 2) + ") span:nth-child(" + (y + 1) + ")",
            (e) => e.textContent
          )
        );
      }
      tong.push(arr.join(", "));
      arr.length = 0;
    }
    result.push({
      dai: dai[x],
      ngay: link.substring(25, 35),
      giai8: tong[0],
      giai7: tong[1],
      giai6: tong[2],
      giai5: tong[3],
      giai4: tong[4],
      giai3: tong[5],
      giai2: tong[6],
      giai1: tong[7],
      giaiDB: tong[8],
    });
    tong.length = 0;
  }
  await browser.close();
  return result;
};
const website = "https://xoso.com.vn/xsmn-.html";
const d = website.substring(25, 35);
for (let i = 7; i < 12; i++) {
  for (let o = 1; o < 32; o++) {
    pro(`https://xoso.com.vn/xsmn-.html`).then((e) => writeDataIntoCSV(e));
  }
}
