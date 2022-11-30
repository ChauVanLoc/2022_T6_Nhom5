async function addPost(name, phone, email) {
  const promise = await fetch("http://localhost:3000/information", {
    method: "POST",
    body: JSON.stringify({
      name,
      phone,
      email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
async function remove() {
  const promise = await fetch("http://localhost:3000/information/1", {
    method: 'DELETE',
  });
}
const form_post = document.querySelector(".form_post");
form_post.addEventListener("submit", function (event) {
  event.preventDefault();
  // const name = this.elements['name'].value;
  // const phone = this.elements['phone'].value;
  // const email = this.elements['email'].value;
  // addPost(name, phone, email);
  remove();
});
