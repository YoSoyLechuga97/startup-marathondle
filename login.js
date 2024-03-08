function login () {
    const usernameEl = document.querySelector("#name");
    localStorage.setItem("userName", usernameEl.value);
    window.location.href = "play.html";
}