import "./pages/index.css";

const profileImg = new URL("./images/icons/profile.svg", import.meta.url);

const BASE_URL = "http://192.168.100.49:5117";

const formRegistration = document.querySelector(".form_registration");
const formLogin = document.querySelector(".form_login");
const popupContainer = document.querySelector(".popup-container");
const popup = document.querySelector("#popup");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");

const linkToLogin = formRegistration.querySelector(".link_to-login");
const linkToRegistration = formLogin.querySelector(".link_to-registration");

const clearlocalStorage = document.querySelector(".local_storage-clear");

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

linkToLogin.addEventListener("click", () => {
  toogleActive(formRegistration, formLogin);
});

linkToRegistration.addEventListener("click", () => {
  toogleActive(formLogin, formRegistration);
});

clearlocalStorage.addEventListener("click", () => {
  localStorage.clear();
});

formRegistration.addEventListener("submit", handleFormSubmitRegistration);
formLogin.addEventListener("submit", handleFormSubmitLogin);

ping(
  `${BASE_URL}/api/Ping/PingServer`,
  "Server available",
  "Server not available"
);

ping(
  `${BASE_URL}/api/Ping/PingSqlServer`,
  "DataBase available",
  "DataBase not available"
);

function toogleActive(hide, active) {
  hide.classList.remove("active");
  setTimeout(() => {
    active.classList.add("active");
  }, 150);
}

function ping(url, successMessage = "success", errorMessage = "error") {
  const successColor = "#6EC531";
  const errorColor = "#FF3333";

  fetch(url)
    .then((response) => {
      if (response.ok) {
        showMessage(successMessage, successColor);
      } else {
        showMessage(errorMessage, errorColor);
      }
    })
    .catch((err) => {
      showMessage(errorMessage, errorColor);
      console.error(err);
    });
}

function showMessage(message, color) {
  const clonedTemplate = document.querySelector("#popup").cloneNode(true);
  const clonedPopup = clonedTemplate.content;

  clonedPopup.querySelector(".text").textContent = message;
  clonedPopup.querySelector(".popup").style.backgroundColor = color;

  popupContainer.append(clonedPopup);

  setTimeout(() => {
    popupContainer.remove(clonedPopup);
  }, 4000);
}

function handleFormSubmitRegistration(event) {
  event.preventDefault();
  const formData = objectTransformation(formRegistration);

  const nameValue = getValueByName(formData, "name");
  const emailValue = getValueByName(formData, "email");
  const passwordValue = getValueByName(formData, "password");

  fetch(
    `${BASE_URL}/api/User/Register?name=${nameValue}&email=${emailValue}&password=${passwordValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("authToken", data.token);
      formRegistration.classList.remove("active");
    });
}

function getValueByName(arr, property) {
  for (const item of arr) {
    if (item.name === property) {
      return item.value;
    }
  }
}

function validatePassword() {
  if (password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords don't match");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

function objectTransformation(formNode) {
  const { elements } = formNode;

  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, type } = element;
      const value = type === "checkbox" ? element.checked : element.value;

      return { name, value };
    });

  return data;
}

function handleFormSubmitLogin(event) {
  event.preventDefault();
  const formDataLogin = objectTransformation(formLogin);
  const emailValueLogin = getValueByName(formDataLogin, "email");
  const passwordValueLogin = getValueByName(formDataLogin, "password");

  fetch(
    `${BASE_URL}/api/User/Login?email=${emailValueLogin}&password=${passwordValueLogin}`
  )
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("authToken", data.token);
      formLogin.classList.remove("active");
    });
}
