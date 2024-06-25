import { loadSearchedUser } from "./searchScript.js";

const searchbar = document.getElementById("searchBar");

searchbar.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        loadSearchedUser(searchbar.value);
    }
})