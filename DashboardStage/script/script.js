import { initializeDashboard, tempPageSwap } from "./Initializer.js";
import { searchField } from "./SearchField.js";
import {
	sortByChapter,
	sortByDifficulty,
	sortByID,
	sortByTitle,
} from "./Sorters.js";

window.addEventListener("DOMContentLoaded", initializeDashboard);
window.addEventListener("resize", initializeDashboard);

const menuButton = document.getElementById("menuButton");
const searchBar = document.getElementById("searchBar");

searchField();

menuButton.addEventListener("click", () => {
	window.location.href = "../../AuthStage/Auth.html";
});
searchBar.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		window.location.href = "../../ErrorStage/SearchError.html";
	}
});

document.getElementById("problems").addEventListener("click", tempPageSwap);

const filters = document.querySelector("#filters");
const idFilter = filters.querySelector("#Id");
const titleFilter = filters.querySelector("#Title");
const chapterFilter = filters.querySelector("#Chapter");
const difficultyFilter = filters.querySelector("#Difficulty");

idFilter.addEventListener("click", sortByID);
titleFilter.addEventListener("click", sortByTitle);
chapterFilter.addEventListener("click", sortByChapter);
difficultyFilter.addEventListener("click", sortByDifficulty);
