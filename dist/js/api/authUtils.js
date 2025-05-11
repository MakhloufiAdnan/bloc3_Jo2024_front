/**
 * Sauvegarde le token JWT dans le stockage local ou de session.
 * @param {string} token - Le token JWT à sauvegarder.
 * @param {boolean} rememberMe - Si true, on utilise le localStorage, sinon sessionStorage.
 */
export function saveToken(token, rememberMe = false) {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("jwt", token);
}

/**
 * Récupère le token JWT depuis le stockage local ou de session.
 * @returns {string|null} Le token ou null s’il n’est pas trouvé.
 */
export function getToken() {
  return localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
}

/**
 * Vérifie si un utilisateur est authentifié, selon la présence d’un JWT.
 * (Optionnel : peut être étendu pour vérifier l'expiration du token.)
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Supprime le token (logout) et redirige l'utilisateur.
 */
export function logout() {
  localStorage.removeItem("jwt");
  sessionStorage.removeItem("jwt");
  window.location.href = "/index.html";
}