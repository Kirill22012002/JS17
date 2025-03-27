const BASE_URL = "http://192.168.100.42:5117";

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
  hide.classList.remove("active");
  setTimeout(() => {
    active.classList.add("active");
  }, 150);
}

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

const applicantForm = document.querySelector(".form_registration");
applicantForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = objectTransformation(applicantForm);

  const nameValue = getValueByName(formData, "name");
  const emailValue = getValueByName(formData, "email");
  const passwordValue = getValueByName(formData, "password");

  console.log(nameValue);
  console.log(emailValue);
  console.log(passwordValue);

  fetch(
    `${BASE_URL}/api/User/Register?name=${nameValue}&email=${emailValue}&password=${passwordValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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

const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords don't match");
  } else {
    confirm_password.setCustomValidity("");
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

function objectTransformation(formNode) {
  const { elements } = formNode;

  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, type } = element;
      const value = type === "checkbox" ? element.checked : element.value;

      return { name, value };
    });

  console.log(data);
  return data;
}
