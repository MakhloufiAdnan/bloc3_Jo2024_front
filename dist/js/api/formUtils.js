export function showPopup(message, type = 'info') {
    const popup = document.createElement("div");
    popup.classList.add(type === "success" ? "popup-success" : "popup-error");
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
}

export function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    if (input) input.classList.add("error-input");
    showPopup(message, "error");
}

export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/*export function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.content : null;
}*/ // désactivé //
