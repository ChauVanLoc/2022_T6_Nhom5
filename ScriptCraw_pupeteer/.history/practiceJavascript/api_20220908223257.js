async function addPost(name, phone, email) {
  const promise = await fetch("http://localhost:3000/pots", {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
const form_post = document.querySelector(".form_post");
form_post.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = this.elements['title'].value;
  const author = this.elements['author'].value;
  addPost(title, author);
});
