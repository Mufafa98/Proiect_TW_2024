export function titleField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("titleInput");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.value = "Title";
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

export function chapterField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("chapterInput");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.value = "Chapter";
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


export function statementField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("statementInput");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.value = "Statement";
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


export function solutionField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("solutionInput");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.value = "Solution";
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

