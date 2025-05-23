import { showPopup, showError, validateEmail } from '/js/api/formUtils.js'; 

console.log("signup.js: Script chargé."); 

document.addEventListener("DOMContentLoaded", () => {
    console.log("signup.js: DOMContentLoaded triggered."); 

    const form = document.getElementById("signup-form");

    if (!form) {
        console.warn("signup.js: Formulaire d'inscription (id='signup-form') INTROUVABLE ! L'écouteur ne sera pas attaché."); 
        return;
    }
    console.log("signup.js: Formulaire d'inscription (id='signup-form') TROUVÉ. Attachement de l'écouteur d'événement 'submit'."); 

    form.addEventListener("submit", handleSubmit);
});

async function handleSubmit(event) {
    console.log("signup.js: handleSubmit déclenché par un événement de type :", event.type); 
    event.preventDefault(); 

    const form = event.target;
    console.log("signup.js: Formulaire cible de l'événement :", form); 

    // Vérification des champs du formulaire
    const usernameInput = form.elements.username;
    const firstnameInput = form.elements.firstname;
    const emailInput = form.elements.email;
    const passwordInput = form.elements.password;
    const confirmPasswordInput = form.elements.confirmPassword;
    const dateInput = form.elements.date;
    const phonenumberInput = form.elements.phonenumber;
    const streetnumberInput = form.elements.streetnumber;
    const addressInput = form.elements.address;
    const postalcodeInput = form.elements.postalcode;
    const cityInput = form.elements.city;
    const countryInput = form.elements.country;
    const termsInput = form.elements.terms;


    if (!usernameInput || !firstnameInput || !emailInput || !passwordInput || !confirmPasswordInput || !dateInput || !phonenumberInput || !streetnumberInput || !addressInput || !postalcodeInput || !cityInput || !countryInput || !termsInput) {
        console.error("signup.js: Un ou plusieurs champs du formulaire sont introuvables par leur 'name'. Vérifiez les attributs 'name' dans votre HTML.");
        showPopup("Erreur de configuration du formulaire.", "error");
        return;
    }
    
    const data = {
        username: usernameInput.value,
        firstname: firstnameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value,
        date: dateInput.value,
        phonenumber: phonenumberInput.value,
        streetnumber: streetnumberInput.value,
        address: addressInput.value,
        postalcode: postalcodeInput.value,
        city: cityInput.value,
        country: countryInput.value,
        terms: termsInput.checked 
    };

    console.log("signup.js: Données extraites du formulaire :", data);


    const requiredFieldsIds = ['username', 'firstname', 'email', 'password', 'confirmPassword', 'date', 'phonenumber', 'streetnumber', 'address', 'postalcode', 'city', 'country'];
    requiredFieldsIds.forEach(id => {
        const fieldElement = document.getElementById(id);
        if (fieldElement) {
            fieldElement.classList.remove('error-input');
        }
    });

    const termsLabel = document.querySelector('label[for="terms"]'); 
    if (termsLabel) termsLabel.classList.remove('error-input');


    console.log("signup.js: Début des validations..."); 
    if (!data.username.trim()) { console.log("signup.js: Validation username échouée"); return showError("username", "Le nom d'utilisateur est requis."); }
    if (!data.firstname.trim()) { console.log("signup.js: Validation firstname échouée"); return showError("firstname", "Le prénom est requis."); }
    if (!data.email.trim()) { console.log("signup.js: Validation email (requis) échouée"); return showError("email", "L'email est requis."); }
    if (!validateEmail(data.email)) { console.log("signup.js: Validation email (format) échouée"); return showError("email", "Format d'email invalide."); }
    if (!data.date) { console.log("signup.js: Validation date de naissance échouée"); return showError("date", "La date de naissance est requise."); }
    if (!data.phonenumber.trim()) { console.log("signup.js: Validation téléphone échouée"); return showError("phonenumber", "Le numéro de téléphone est requis."); }
    if (data.streetnumber === null || data.streetnumber === undefined || data.streetnumber.toString().trim() === '') { console.log("signup.js: Validation numéro de rue échouée"); return showError("streetnumber", "Le numéro de rue est requis (0 si absent).");}
    if (!data.address.trim()) { console.log("signup.js: Validation adresse échouée"); return showError("address", "L'adresse est requise."); }
    if (!data.postalcode.trim()) { console.log("signup.js: Validation code postal échouée"); return showError("postalcode", "Le code postal est requis."); }
    if (!data.city.trim()) { console.log("signup.js: Validation ville échouée"); return showError("city", "La ville est requise."); }
    if (!data.country.trim()) { console.log("signup.js: Validation pays échouée"); return showError("country", "Le pays est requis."); }

    if (!data.password || data.password.length < 8) { console.log("signup.js: Validation password (longueur) échouée"); return showError("password", "Mot de passe trop court (minimum 8 caractères)."); }
    if (data.password !== data.confirmPassword) {
        console.log("signup.js: Validation confirmPassword échouée");
        showError("password", "Les mots de passe ne correspondent pas.");
        return showError("confirmPassword", "Les mots de passe ne correspondent pas.");
    }
    if (!data.terms) {
        console.log("signup.js: Validation des termes et conditions échouée");
        const termsCheckbox = document.getElementById("terms");
        if(termsCheckbox && termsCheckbox.parentElement) {
            termsCheckbox.parentElement.classList.add('error-input'); 
        }
        return showPopup("Vous devez accepter la politique de confidentialité.", "error");
    }
    console.log("signup.js: Validations passées. Données prêtes à être envoyées :", data);
    const backendData = {
        username: data.username,
        firstname: data.firstname,
        date: data.date,
        email: data.email,
        phonenumber: data.phonenumber,
        streetnumber: parseInt(data.streetnumber, 10), 
        address: data.address,
        postalcode: data.postalcode,
        city: data.city,
        password: data.password,
        // role: "USER", // Le backend l'assigne par défaut si non fourni
        country: data.country
    };

    try {
        console.log("signup.js: Tentative d'appel fetch vers /api/auth/register avec les données :", backendData); 
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(backendData) 
        });
        console.log("signup.js: Réponse Fetch reçue, statut :", response.status); 

        const responseData = await response.json().catch((err) => {
            console.error("signup.js: Erreur lors du parsing JSON de la réponse :", err);
            return { message: "Réponse inattendue du serveur." }; 
        }); 

        if (!response.ok) {
            console.error("signup.js: Erreur de réponse du serveur :", responseData); 
            throw new Error(responseData.message || `Erreur ${response.status} lors de l'inscription.`);
        }

        console.log("signup.js: Inscription réussie :", responseData); 
        showPopup("Inscription réussie ! Vous allez être redirigé vers la page d'accueil pour vous connecter.", "success");
        setTimeout(() => { window.location.href = "/index.html"; }, 2500);
    } catch (err) {
        console.error("signup.js: Erreur dans le bloc try-catch de fetch :", err.message); 
        showPopup(err.message || "Une erreur est survenue lors de l'inscription.", "error");
    }
}