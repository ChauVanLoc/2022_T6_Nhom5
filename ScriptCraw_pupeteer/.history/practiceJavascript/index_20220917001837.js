// const menu_left = document.querySelector(".header .menu .menu_left");
// const dropDown = document.querySelector(
//   ".header .menu .menu_left .menu_left-dropDown"
// );
// const icon = document.querySelector(".icon");
// menu_left.addEventListener("click", (e) => {
//   e.stopPropagation();
//   if (icon.getAttribute("name").indexOf("menu-outline") != -1) {
//     icon.setAttribute("name", "close-outline");
//   } else {
//     icon.setAttribute("name", "menu-outline");
//   }
//   dropDown.classList.toggle("activeDropdown");
// });
// document.addEventListener("click", (e) => {
//   if (
//     !dropDown.contains(e.target) &&
//     !e.target.matches(".menu_left-dropDown")
//   ) {
//     dropDown.classList.remove("activeDropdown");
//     icon.setAttribute("name", "menu-outline");
//   }
// });
// const header = document.querySelector(".header");
// const container = document.querySelector(".container");
// window.addEventListener("scroll", (e) => {
//   e.stopPropagation();
//   if (window.pageYOffset > 115) {
//     header.classList.add("sclicky");
//     container.classList.add("distance");
//   } else {
//     header.classList.remove("sclicky");
//     container.classList.remove("distance");
//   }
// });
// var a = (agr = 10) => {
//   return new Promise((resolve, reject) => {
//     if (agr > 9) {
//       resolve("Hello");
//     } else {
//       reject("Hi");
//     }
//   });
// };
// var b = async () => {
// //   try {
//     const dev1 = await a(8);
//     console.log(dev1);
//     return dev1;
// //   } catch (error) {
// //     console.log(error);
// //   }
// };
// // Promise.allSettled([a(10), a(8), a(12)]).then((e) => console.log(e));
// console.log(b());
// let str = "hello everyone";

// const endPoint = "https://api.chucknorris.io/jokes/random";
// const img = document.querySelector(".container .content .img");
// const text = document.querySelector(".container .content .text");
// async function testApi() {
//   const element = await fetch(endPoint);
//   console.log(element);
//   const promise = element.json();
//   console.log(promise);
//   promise.then((data) => {
//     console.log(data);
//     // img.setAttribute("src", `${data.icon_url}`);
//     // text.textContent = `${data.value}`;
//   });
// }
// testApi();
// async function addPost(title, author) {
//   await fetch("http://localhost:3000/posts", {
//     method: "POST",
//     body: JSON.stringify({
//       title,
//       author,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// };
// addPost("test api", "a");

const promise = fetch("http://localhost:3000/posts");
const data = promise.then((data) => data.json());
console.log(data);
