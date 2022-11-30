const puppeteer = require("puppeteer");
var fs = require("fs");
var http = require("http");
const { resolve } = require("path");
const { rejects, throws } = require("assert");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function convertViToEn(str, toUpperCase = false) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  return toUpperCase
    ? str.replace(/\s/g, "").toUpperCase()
    : str.replace(/\s/g, "");
}

const pro = async (link) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  const dai = await page.evaluate(() => {
    return [
      ...document.querySelectorAll(
        "#mn_kqngay_01112022_kq > table.table-result.table-xsmn > thead > tr > th > h3 > a"
      ),
    ].map((e) => e.textContent);
  });
  const giai = await page.$$(
    "#mn_kqngay_01112022_kq > table.table-result.table-xsmn > tbody > tr"
  );
  var tmp,
    str = "";
  var arr = [];
  var tong = [];
  var result = [];
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
      tong.push(arr.join("-"));
      arr.length = 0;
    }
    result.push({
      dai: convertViToEn(dai[x]) + link.substring(25, 35),
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

const writeDataIntoCSV = (pathData, arr) => {
  const csvWriter = createCsvWriter({
    path: `./Data/${pathData}`,
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
var date = new Date();
const time = `${date.getHours()}-${date.getMinutes()}`;
pro(`https://xoso.com.vn/xsmn-01-11-2022.html`).then((e) =>
  writeDataIntoCSV(`DataXS_ChauVanLoc.${time}-01-11-2022.csv`, e)
);
