import { initializeDashboard, swapPage } from "./init.js";
import { searchField } from "./search.js";
import { sortByChapter, sortByDifficulty, sortByID, sortByTitle } from "./sort.js"
import { loadProblems, loadProblemsById, downloadProblems } from "./problems.js";

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

const selector = document.getElementById("searchFilter");
selector.value = "0";
const exportButton = document.getElementById("exportButton");
exportButton.addEventListener("click", async () => {
	let url = `http://127.0.0.1:3000/problems/download?id=${searchBar.value}&filter=${selector.value}`;
	if (searchBar.value === "Search Problem by ID" || searchBar.value === "")
		url = `http://127.0.0.1:3000/problems/download?id="neimportant"&filter=4`;
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include'
		});
		const result = await response.json();
		downloadProblems(result);
	} catch (error) {
		console.error('Error:', error);
	}
})

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



