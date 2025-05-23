import { saveToken, isAuthenticated } from '/js/api/authUtils.js';
import { showPopup, validateEmail, getCsrfToken } from '/js/api/formUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("auth-form");

  if (!form) {
    console.warn("Formulaire de connexion introuvable.");
    return;
  }

  if (isAuthenticated()) {
    window.location.href = "/index.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;
    const rememberMe = form.rememberMe?.checked;

    if (!validateEmail(email)) {
      form.email.classList.add("error-input");
      showPopup("Veuillez entrer un email valide.", "error");
      return;
    }

    if (!password) {
      form.password.classList.add("error-input");
      showPopup("Le mot de passe est requis.", "error");
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          //"X-CSRF-Token": getCsrfToken() -> désactivé
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Échec de la connexion.");
      }

      const { token } = await response.json();
      saveToken(token, rememberMe);
      showPopup("Connexion réussie !", "success");

      setTimeout(() => window.location.href = "/index.html", 1000);
    } catch (err) {
      console.error(err);
      showPopup(err.message || "Erreur lors de la connexion.", "error");
    }
  });
});