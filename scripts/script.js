const formRegistration = document.querySelector(".form_registration");
const formLogin = document.querySelector(".form_login");

const linkToLogin = formRegistration.querySelector(".link_to-login");
const linkToRegistration = formLogin.querySelector(".link_to-registration");

linkToLogin.addEventListener("click", () => {
  toogleActive(formRegistration, formLogin);
});

linkToRegistration.addEventListener("click", () => {
  toogleActive(formLogin, formRegistration);
});

function toogleActive(hide, active) {
  hide.classList.remove(active);
  setTimeout(() => {
    active.classList.add(active);
  }, 150);
}

fetch("http://192.168.100.39:5117/api/Ping/PingServer")
  .then((response) => {
    if (response.ok) {
      serverAvailablePopup();
    } else {
      serverNotAvailablePopup();
    }
  })
  .catch((err) => {
    serverNotAvailablePopup();
    console.log(err);
  });

function serverAvailablePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("active");
  popup.querySelector(".text").textContent = "Server available";
  popup.style.backgroundColor = "#6EC531";
  setTimeout(() => {
    popup.classList.remove("active");
  }, 4000);
}

function serverNotAvailablePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("active");
  popup.querySelector(".text").textContent = "Server not available";
  popup.style.backgroundColor = "#ff3333";
  setTimeout(() => {
    popup.classList.remove("active");
  }, 4000);
}
