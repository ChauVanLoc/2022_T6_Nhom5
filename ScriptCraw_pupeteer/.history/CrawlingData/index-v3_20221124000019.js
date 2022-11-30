const puppeteer = require("puppeteer");
var fs = require("fs");
var http = require("http");
const { resolve } = require("path");
const { rejects, throws } = require("assert");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const pro = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://xoso.com.vn/xsmn-23-11-2022.html", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  const o = {};
  const dai = await page.evaluate(() => {
    return document.querySelectorAll(
      ".main .main-content .content-left .section .section-content .table-xsmn thead tr th h3 a"
    );
  });
  const giai = await page.evaluate(() => {
    return document.querySelectorAll(
      ".main .main-content .content-left .section .section-content .table-xsmn tbody tr"
    );
  });
  var ketQua;
  var title;
  var arr = [];
  var ob;
  if (giai) {
    for (let x = 0; x > dai.length; x++) {
      for (let i = 0; i < giai.length; i++) {
        // title = giai[i].querySelector("th").textContent;
        ketQua = giai[i].querySelector("td span");
        if (ketQua[x].length === 1) {
          arr.push(ketQua[x].textContent);
        } else {
          arr.push([...ketQua[x]].map((e) => e.textContent).join(", "));
        }
      }
      ob = {
        Đài: dai[0].textContent,
        Giải_1: arr[0],
        Giải_2: arr[1],
        Giải_3: arr[2],
        Giải_4: arr[3],
        Giải_5: arr[4],
        Giải_6: arr[5],
        Giải_7: arr[6],
        Giải_8: arr[7],
        Giải_DB: arr[8],
      };
    }
  }
  await browser.close();
  return giai;
};
pro().then((res) => {
  console.log(res);
});
