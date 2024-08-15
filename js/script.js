// Call this function on page load
document.addEventListener("DOMContentLoaded", updateLoginButton);

// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");

//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghilangkan nav

const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Memperbaruhi tombol login dan logout
function updateLoginButton() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginLink = document.getElementById("login-link");

  if (loggedInUser) {
    loginLink.textContent = "Logout";
    loginLink.href = "#";
    loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      logoutUser();
    });
  } else {
    loginLink.textContent = "Masuk";
    loginLink.href = "login.html";
  }
}

// Memanggil fungsi updateLoginButton
document.addEventListener("DOMContentLoaded", updateLoginButton);

// logout user
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out.");
  window.location.href = "index.html";
}

// fungsi login
function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // mengambil data dari locastorage
  const storedUser = JSON.parse(localStorage.getItem(username));

  // validasi login
  if (storedUser && storedUser.password === password) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");

    if (username === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    alert("Invalid username or password");
  }
}

// Register user
function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;

  // cek apakah username sudah ada atau belum
  if (localStorage.getItem(username)) {
    alert("User already exists!");
  } else {
    const userData = { username, password, address };
    localStorage.setItem(username, JSON.stringify(userData));
    alert("Registration successful!");
    window.location.href = "login.html";
  }
}

// document.getElementById("login-form").addEventListener("submit", function (event) {
//   event.preventDefault();
//   loginUser();
// });

// document.getElementById("register-form").addEventListener("submit", function (event) {
//   event.preventDefault();
//   registerUser();
// });

// // Check if user is logged in
// function checkLoggedInUser() {
//   const loggedInUser = sessionStorage.getItem("loggedInUser");
//   if (loggedInUser) {
//     // User is logged in, you can display user info or redirect if needed
//     console.log("Logged in as:", loggedInUser);
//   }
// }
