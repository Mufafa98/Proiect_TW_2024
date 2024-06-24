import { initializeDashboard, loadCats } from "./init.js";
import { searchField } from "./search.js";
import { sortByUID, sortByTotalProblems, sortByUsername, sortBySuccessRate } from "./sort.js"
import { loadUsers, loadProblemsById, loadUsersBy } from "./problems.js";

window.addEventListener("DOMContentLoaded", loadUsers);
window.addEventListener("DOMContentLoaded", loadCats);
window.addEventListener("resize", initializeDashboard);

const searchBar = document.getElementById("searchBar");

searchField();

const selector = document.getElementById("searchFilter");
selector.value = "0";
searchBar.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		if (searchBar.value === "") {
			loadUsers();
			initializeDashboard();
			selector.style.display = "none";
		}
		else {
			loadProblemsById(searchBar.value)
			selector.style.display = "block"
		}
	}
});



const backbutton = document.getElementById("BackButton");
backbutton.addEventListener("click", () => {
	window.location.href = "../DashboardStage/Dashboard.html"
})


const filters = document.querySelector("#filters");
const uidFilter = filters.querySelector("#Uid");
const usernameFilter = filters.querySelector("#Username");
const totalProblemsFilter = filters.querySelector("#TotalProblems");
const successRateFilter = filters.querySelector("#SuccessRate");

uidFilter.addEventListener("click", sortByUID);
usernameFilter.addEventListener("click", sortByUsername);
totalProblemsFilter.addEventListener("click", sortByTotalProblems);
successRateFilter.addEventListener("click", sortBySuccessRate);

const difficultySelector = document.getElementById("difficultyFilter");
const chapterSelector = document.getElementById("chapterFilter");

difficultySelector.addEventListener("change", () => {
	loadUsersBy(chapterSelector.value, difficultySelector.value, searchBar.value)
})

chapterSelector.addEventListener("change", () => {
	loadUsersBy(chapterSelector.value, difficultySelector.value, searchBar.value)
})