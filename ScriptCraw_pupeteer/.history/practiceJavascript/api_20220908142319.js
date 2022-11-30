async function addPost(title, author) {
  const promise = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

addPost("aaa", "bbb");
