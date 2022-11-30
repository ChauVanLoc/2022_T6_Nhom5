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
    }
  }
  await browser.close();
  return giai;
};
pro().then((res) => {
  console.log(res);
});
