const puppeteer = require("puppeteer");
var fs = require("fs");
var http = require("http");
const { resolve } = require("path");
const { rejects, throws } = require("assert");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const pro = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://moveek.com/rap/cgv-ct-plaza/", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  const o = {};
  //   const title = await page.evaluate(() => {
  //     let dai = document.querySelectorAll(
  //       ".body-wrapper .main-content .container .row .col-xs-12 .row .col-xs-12 .block .block-main-content .livetn3 thead tr .text-center a"
  //     );
  //     let date = document.querySelector(
  //       ".body-wrapper .main-content .container .row .col-xs-12 .row .col-xs-12 .block .block-main-heading h1"
  //     );
  //     let giai = document.querySelectorAll(
  //       ".body-wrapper .main-content .container .row .col-xs-12 .row .col-xs-12 .block .block-main-content .livetn3 tbody tr"
  //     );
  //     var giais = [];
  //     [...giai].forEach((o, index) => {});
  //   });
  const test = await page.evaluate(() => {
    let block = document.querySelectorAll(
      ".body-wrapper .main-content .container .row .col-xs-12 .row .col-xs-12 .block .block-main-content .livetn3 thead tr th"
    );
    return block[0].innerText;
  });
  await browser.close();
  return test;
};
pro().then((res) => {
  console.log(res);
});
