//Choose what to display to current user
(async () => {
    console.log("Immediately called function");
    const userName = localStorage.getItem('userName'); //Has user logged in?
    if (userName) { //If they have
        setDisplay('loginControls', 'none');
        setDisplay('playControls', 'block');
    } else { //User has not logged in yet
        setDisplay('loginControls', 'block');
        setDisplay('playControls', 'none');
    }
})();

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

//If user decides to log in
async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}
    
//If user decies to create an account
async function createUser() {
    loginOrCreate(`/api/auth/create`);
}

//Send data to server and await response
async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#name')?.value;
    const password = document.querySelector('#password')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ playerTag: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) { //User was found or created
        localStorage.setItem('userName', userName);
        window.location.href = 'play.html';
      } else { //Error finding or creating user
        const body = await response.json();
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
      }
}

//Play button feature
function play() {
    window.location.href = 'play.html';
}

//If user decides to logout
function logout() {
    localStorage.removeItem('userName'); //Delete username of player
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/')); //Refresh webpage
}

async function getUser(playerTag) {
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${playerTag}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
}


function setDisplay(controlId, display) {
    const playControlEl = document.querySelector('#' + controlId);
    if (playControlEl) {
        playControlEl.style.display = display;
    }
}