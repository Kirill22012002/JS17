const formRegistration = document.querySelector(".form_registration");
const formLogin = document.querySelector(".form_login");

const linkToLogin = formRegistration.querySelector(".link_to-login");
const linkToRegistration = formLogin.querySelector(".link_to-registration");

linkToLogin.addEventListener("click", () => {
  toogleActiveF(formRegistration, formLogin);
});

linkToRegistration.addEventListener("click", () => {
  toogleActiveF(formLogin, formRegistration);
});

function toogleActiveF(hide, active) {
  hide.style.display = "none";
  setTimeout(() => {
    active.style.display = "flex";
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
  popup.classList.add("popup-active");
  popup.querySelector(".text").textContent = "Server available";
  popup.style.backgroundColor = "#C1D9B7";
  setTimeout(() => {
    popup.classList.remove("popup-active");
  }, 4000);
}

function serverNotAvailablePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup-active");
  popup.querySelector(".text").textContent = "Server not available";
  popup.style.backgroundColor = "#E5A298";
  setTimeout(() => {
    popup.classList.remove("popup-active");
  }, 4000);
}
