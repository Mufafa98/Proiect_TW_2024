export function searchField() {
    let fieldChanged = false;
    const inputLine = document.getElementById("searchBar");
    inputLine.addEventListener("blur", () => {
        const value = inputLine.value.trim();
        if (value === "") {
            fieldChanged = false;
            inputLine.value = "Search User";
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

