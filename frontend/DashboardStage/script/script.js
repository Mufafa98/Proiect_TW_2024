import { initializeDashboard, swapPage } from "./init.js";
import { searchField } from "./search.js";
import { sortByChapter, sortByDifficulty, sortByID, sortByTitle } from "./sort.js"
import { loadProblems, loadProblemsById } from "./problems.js";

window.addEventListener("DOMContentLoaded", loadProblems);
window.addEventListener("resize", initializeDashboard);

const menuButton = document.getElementById("menuButton");
const searchBar = document.getElementById("searchBar");

searchField();

menuButton.addEventListener("click", () => {
	window.location.href = "../AuthStage/Auth.html";
});
searchBar.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		loadProblemsById(searchBar.value)
	}
});

document.getElementById('problems').addEventListener('click', (event) => {
	let element = event.target;
	while (!element.id.startsWith('problem')) {
		element = element.parentElement;
	}
	const elementId = element.querySelector("#Id").innerHTML
	localStorage.setItem("selectedProblem", elementId)
	window.location.href = "../ProblemStage/Problem.html";
});
const filters = document.querySelector("#filters");
const idFilter = filters.querySelector("#Id");
const titleFilter = filters.querySelector("#Title");
const chapterFilter = filters.querySelector("#Chapter");
const difficultyFilter = filters.querySelector("#Difficulty");

idFilter.addEventListener("click", sortByID);
titleFilter.addEventListener("click", sortByTitle);
chapterFilter.addEventListener("click", sortByChapter);
difficultyFilter.addEventListener("click", sortByDifficulty);



