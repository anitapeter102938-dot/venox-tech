const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formError = document.getElementById("formError");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";
  formError.textContent = "";

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  let allGood = true;

  if (email === "") {
    emailError.textContent = "Enter your email.";
    allGood = false;
  }
  if (password === "") {
    passwordError.textContent = "Enter your password.";
    allGood = false;
  }

  if (allGood === false) {
    return;
  }

  const users = JSON.parse(localStorage.getItem("vx_users")) || [];
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      foundUser = users[i];
    }
  }

  if (foundUser === null) {
    formError.textContent = "Wrong email or password.";
    return;
  }

  localStorage.setItem("vx_session", JSON.stringify(foundUser.email));
  window.location.href = "blogger-dashboard.html";
});