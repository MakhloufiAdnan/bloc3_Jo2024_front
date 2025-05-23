import { showPopup, showError, validateEmail, getCsrfToken } from '/js/api/formUtils.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  if (!form) {
    console.warn("Formulaire d'inscription introuvable.");
    return;
  }

  form.addEventListener("submit", handleSubmit);
});

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());

  const requiredFields = ['username', 'firstname', 'email', 'password', 'confirmPassword'];
  requiredFields.forEach(id => document.getElementById(id)?.classList.remove('error-input'));

  // Validations
  if (!data.username.trim()) return showError("username", "Le nom d'utilisateur est requis.");
  if (!data.firstname.trim()) return showError("firstname", "Le prénom est requis.");
  if (!data.email.trim()) return showError("email", "L'email est requis.");
  if (!validateEmail(data.email)) return showError("email", "Format d'email invalide.");
  if (data.password.length < 8) return showError("password", "Mot de passe trop court.");
  if (data.password !== data.confirmPassword) {
    showError("password", "Les mots de passe ne correspondent pas.");
    showError("confirmPassword", "");
    return;
  }

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"X-CSRF-Token": getCsrfToken() -> désactivé
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Erreur lors de l'inscription.");
    }

    showPopup("Inscription réussie ! Connectez-vous.", "success");
    setTimeout(() => window.location.href = "/index.html", 1000);
  } catch (err) {
    console.error("Erreur inscription :", err);
    showPopup(err.message || "Une erreur est survenue.", "error");
  }
}