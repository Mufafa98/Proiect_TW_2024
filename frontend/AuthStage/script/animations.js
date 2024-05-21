export function userField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("userLine");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.value = "Username";
        }
    });
    inputLine.addEventListener("focus", () => {
        if (!fieldChanged) {
            inputLine.value = "";
        }
    });
    inputLine.addEventListener("input", () => {
        fieldChanged = true;
    });
}
export function emailField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("emailLine");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.value = "Email";
        }
    });
    inputLine.addEventListener("focus", () => {
        if (!fieldChanged) {
            inputLine.value = "";
        }
    });
    inputLine.addEventListener("input", () => {
        fieldChanged = true;
    });
}
export function passField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("passLine");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.type = "text";
            inputLine.value = "Password";
        }
    });
    inputLine.addEventListener("focus", () => {
        if (!fieldChanged) {
            inputLine.type = "text";
            inputLine.value = "";
        }
    });
    inputLine.addEventListener("input", () => {
        inputLine.type = "password";
        fieldChanged = true;
    });
}