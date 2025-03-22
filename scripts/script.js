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

ping(
  "http://192.168.100.39:5117/api/Ping/PingServer",
  "Server available",
  "Server not available"
);
ping(
  "http://192.168.100.39:5117/api/Ping/PingSqlServer",
  "DataBase available",
  "DataBase not available"
);

function ping(url, successMessage = "success", errorMessage = "error") {
  const successMessageColor = "#6EC531";
  const errorMessageColor = "#FF3333";

  fetch(url)
    .then((response) => {
      if (response.ok) {
        showMessage(successMessage, successMessageColor);
      } else {
        showMessage(errorMessage, errorMessageColor);
      }
    })
    .catch((err) => {
      showMessage(errorMessage, errorMessageColor);
      console.log(err);
    });
}

function showMessage(message, color) {
  const clonedTemplate = document.querySelector("#popup").cloneNode(true);
  const popup = clonedTemplate.content;

  popup.querySelector(".text").textContent = message;
  popup.querySelector(".popup").style.backgroundColor = color;

  const popupContainer = document.querySelector(".popup-container");
  popupContainer.append(popup);

  setTimeout(() => {
    popupContainer.remove(popup);
  }, 4000);
}
