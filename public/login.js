//Add in inspirational quote
const url = "https://api.quotable.io/random";
fetch(url)
.then((x) => x.json())
.then((response) => {
    document.querySelector('.inspiration').textContent = JSON.stringify(
        response.content,
        null,
        "  "
      );
});

function login () {
    const usernameEl = document.querySelector("#name");
    localStorage.setItem("userName", usernameEl.value);
    window.location.href = "play.html";
}