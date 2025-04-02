let signUp = document.querySelector("#Signup");
let login = document.querySelector("#login");
let signUpPage = document.querySelector("#signupPage");
let loginPage = document.querySelector("#loginPage");
let forgotPasswordPage = document.querySelector("#forgotPasswordPage");
let forgotPasswordLink = document.querySelector("#forgotPassword");
let backToLoginLink = document.querySelector("#backToLogin");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
const errorMessage = document.querySelector("#error-message");
const successMessage = document.querySelector("#success-message");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const firstnameInput = document.querySelector("#sup-firstname-input");
const supEmailInput = document.querySelector("#sup-email-input");
const supPasswordInput = document.querySelector("#sup-password-input");
const repeatPasswordInput = document.querySelector("#repeat-password-input");
const forgotEmailInput = document.querySelector("#forgot-email-input");

signUp.addEventListener("click", () => {
  errorMessage.innerText = "";
  signUpPage.style.display = "flex";
  loginPage.style.display = "none";
  forgotPasswordPage.style.display = "none";
});

login.addEventListener("click", () => {
  errorMessage.innerText = "";
  signUpPage.style.display = "none";
  loginPage.style.display = "flex";
  forgotPasswordPage.style.display = "none";
});

forgotPasswordLink.addEventListener("click", () => {
  errorMessage.innerText = "";
  signUpPage.style.display = "none";
  loginPage.style.display = "none";
  forgotPasswordPage.style.display = "flex";
});

backToLoginLink.addEventListener("click", () => {
  errorMessage.innerText = "";
  forgotPasswordPage.style.display = "none";
  loginPage.style.display = "flex";
});

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength;
}


supPasswordInput.addEventListener("input", (e) => {
  let password = e.target.value;
  let strength = checkPasswordStrength(password);
  let strengthText = document.querySelector("#password-strength-text");

  if (strength < 3) {
    strengthText.textContent = "Weak";
    strengthText.style.color = "red";
  } else if (strength < 5) {
    strengthText.textContent = "Medium";
    strengthText.style.color = "orange";
  } else {
    strengthText.textContent = "Strong";
    strengthText.style.color = "green";
  }
});

function validateSignup(firstname, email, password, repeatPassword) {
  let errors = "";

  if (!firstname) {
    errors += "Firstname is required. ";
    firstnameInput.style.border = "1px solid red";
  }
  if (!email) {
    errors += "Email is required. ";
    supEmailInput.style.border = "1px solid red";
  }
  if (!password) {
    errors += "Password is required. ";
    supPasswordInput.style.border = "1px solid red";
  } else if (password.length < 8) {
    errors += "Password must be at least 8 characters. ";
  }
  if (password !== repeatPassword) {
    errors += "Passwords do not match. ";
  }

  return errors;
}

function showMessage(message, isError = false) {
  if (isError) {
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    setTimeout(() => (errorMessage.style.display = "none"), 3000);
  } else {
    successMessage.innerText = message;
    successMessage.style.display = "block";
    setTimeout(() => (successMessage.style.display = "none"), 3000);
  }
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let errors = validateSignup(
    firstnameInput.value,
    supEmailInput.value,
    supPasswordInput.value,
    repeatPasswordInput.value
  );

  if (errors) {
    showMessage(errors, true);
  } else {
    showMessage("Signup successful!");
    signupForm.reset();
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!emailInput.value || !passwordInput.value) {
    showMessage("Email and password are required!", true);
    return;
  }
  showMessage("Login successful!");
  loginForm.reset();
});

forgotPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!forgotEmailInput.value) {
    showMessage("Email is required!", true);
    return;
  }
  showMessage("Password reset link sent!");
  forgotPasswordForm.reset();
});
