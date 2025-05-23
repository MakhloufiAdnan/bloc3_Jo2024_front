
document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminEmailInput = document.getElementById('admin-email');
    const adminPasswordInput = document.getElementById('admin-password');
    const errorMessageDiv = document.getElementById('admin-error-message');

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Empêche la soumission classique du formulaire

            const email = adminEmailInput.value;
            const password = adminPasswordInput.value;

            // Efface les messages d'erreur précédents
            if (errorMessageDiv) {
                errorMessageDiv.textContent = '';
            }

            try {
                const response = await fetch('/api/admin/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Le backend attend LoginAdminRequestDto avec email et password
                    body: JSON.stringify({ email: email, password: password })
                });

                if (response.ok) {
                    // Pas besoin de lire le token symbolique, on sait que c'est ok
                    // On simule une connexion réussie en stockant un flag
                    localStorage.setItem('adminLoggedIn', 'true');
                    console.log('Connexion admin simulée réussie, redirection...');
                    window.location.href = '/pages/home-admin.html'; // Redirige vers le dashboard admin
                } else {
                    const errorData = await response.json();
                    const message = errorData.message || 'Identifiants administrateur invalides.';
                    console.error('Erreur de connexion admin:', message);
                    if (errorMessageDiv) {
                        errorMessageDiv.textContent = message;
                    }
                }
            } catch (error) {
                console.error('Erreur réseau ou technique lors de la connexion admin:', error);
                const message = 'Une erreur est survenue lors de la tentative de connexion.';
                if (errorMessageDiv) {
                    errorMessageDiv.textContent = message;
                }
            }
        });
    }

    // Optionnel: Gérer la déconnexion admin sur la page home-admin.html
    // Ajoutez un bouton de déconnexion sur home-admin.html avec l'ID 'admin-logout-btn'
    const adminLogoutButton = document.getElementById('admin-logout-btn');
    if (adminLogoutButton) {
        adminLogoutButton.addEventListener('click', () => {
            localStorage.removeItem('adminLoggedIn');
            console.log('Déconnexion admin simulée.');
            window.location.href = '/admin.html'; // Redirige vers la page de login admin
        });
    }
});