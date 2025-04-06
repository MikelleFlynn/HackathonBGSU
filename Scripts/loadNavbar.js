// Scripts/loadNavbar.js
document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar-container");
  
    if (navbarContainer) {
      fetch("/Components/navbar.html")
        .then(res => res.text())
        .then(data => {
          navbarContainer.innerHTML = data;
  
          // Run dynamic login/account logic after navbar is loaded
          const loginLink = document.getElementById("login-link");
          const user = localStorage.getItem("loggedInUser");
  
          if (loginLink) {
            if (user) {
              loginLink.textContent = "Account";
              loginLink.href = "/account.html";
            } else {
              loginLink.textContent = "Login";
              loginLink.href = "/login.html";
            }
          }
        })
        .catch(err => {
          console.error("Failed to load navbar:", err);
        });
    }
  });
  