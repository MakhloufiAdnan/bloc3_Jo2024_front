// Ajoute un eventListener à chaque lien dynamique
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("text-icons")) {
    e.preventDefault();
    
    if (e.target.id === "openPopupConnection") {
      openPopup("Connexion");
    } else if (e.target.id === "openPopupSignup") {
      openPopup("Inscription");
    }
  }
});

document.getElementById ("icon-user-mobile") .addEventListener ("click", function () {
  openPopup("Connexion");
});

function openPopup(Connexion) {
  // Création de la popup
  const popup = document.createElement("div");
  popup.classList.add("login-container");
  popup.innerHTML = 
    `<div class="form-group">
      <h2>${Connexion}</h2>
      <button id="closePopup" class="close-btn">&times;</button>
      <form class="form" id="auth-link" method="post">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" required>
        <p class="mdp-forget"><a href="#">Mot de passe oublié ?</a></p> 
        <button type="submit" class="submit-btn">Se connecter</button>
      </form>
      <div class="checkbox">
        <div class="remember-me">
          <input class="input-checkbox" type="checkbox" id="scales" name="scales"/>
          <label for="scales">Se souvenir de moi ?</label>
        </div>
        <div class="subscribe">
          <input class="input-checkbox" type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"/>
          <label for="subscribeNews">Souhaitez-vous vous abonner à la newsletter ?</label>
        </div>
      </div>
      <div class="new-account">
        <p class="link-new-account"><a href="#">Créer un compte</a></p>
        <div class="line-other"></div>
      </div>
      <div class="social-login">
        <div class="google-btn social-btn" onclick="handleGoogleLogin()">
          <img src="/icons/btn-connection-google.png" alt="bouton connexion via Google">
        </div>
        <div class="facebook-btn social-btn" onclick="handleFacebookLogin()">
          <img src="/icons/btn-connection-facebook.png" alt="bouton connexion via Facebook">
        </div>
      </div>
    </div>`;

  document.body.appendChild(popup);

  // Fermer la popup au clic sur le bouton
  document.getElementById("closePopup").addEventListener("click", () => {
    popup.remove();
  });
}