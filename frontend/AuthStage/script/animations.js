let userChanged = false; let emailChanged = false; let passChanged = false;
export function userField() {
    const inputLine = document.getElementById("userLine");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            userChanged = false;
            inputLine.value = "Username";
        }
    });
    inputLine.addEventListener("focus", () => {
        if (!userChanged) {
            inputLine.value = "";
        }
    });
    inputLine.addEventListener("input", () => {
        userChanged = true;
    });
}
export function emailField() {
    const inputLine = document.getElementById("emailLine");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            emailChanged = false;
            inputLine.value = "Email";
        }
    });
    inputLine.addEventListener("focus", () => {
        if (!emailChanged) {
            inputLine.value = "";
        }
    });
    inputLine.addEventListener("input", () => {
        emailChanged = true;
    });
}
export function passField() {
    const inputLine = document.getElementById("passLine");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            passChanged = false;
            inputLine.type = "text";
            inputLine.value = "Password";
        }
    });
    inputLine.addEventListener("focus", () => {
        if (!passChanged) {
            inputLine.type = "text";
            inputLine.value = "";
        }
    });
    inputLine.addEventListener("input", () => {
        inputLine.type = "password";
        passChanged = true;
    });
}

export function changedUser() {
    return userChanged;
}

export function changedEmail() {
    return emailChanged;
}

export function changedPass() {
    return passChanged;
}