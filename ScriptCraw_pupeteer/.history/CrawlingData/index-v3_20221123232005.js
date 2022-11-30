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
  const giai = await page.evaluate(() => {
    return document.querySelectorAll(
      ".main .main-content .content-left .section .section-content .table-xsmn tbody tr"
    );
  });
  var ketQua;
  var title;
  if (giai) {
    [...giai].forEach((o) => {
      title = o.querySelector("th").textContent;
      ketQua = o.querySelector("td span");
      if (ketQua.length === 1) {
      }
    });
  }
  await browser.close();
  return giai;
};
pro().then((res) => {
  console.log(res);
});
