window.addEventListener("DOMContentLoaded", initializeDashboard);
window.addEventListener("resize", initializeDashboard);

const menuButton = document.getElementById("menuButton");
const searchBar = document.getElementById("searchBar");

searchField();

menuButton.addEventListener("click", () => {
	window.location.href = "../AuthStage/Auth.html";
});
searchBar.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		window.location.href = "../ErrorStage/SearchError.html";
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

function initializeDashboard() {
	const menuButton = document.getElementById("menuButton").style;
	const searchBar = document.getElementById("searchBar").style;

	searchBar.marginLeft = getComputedStyle(
		document.getElementById("leftPadding"),
	).width;

	searchBar.height = `${
		Number.parseInt(
			getComputedStyle(document.getElementById("mainHeader")).height,
		) * 0.7
	}px`;

	menuButton.marginRight = getComputedStyle(
		document.getElementById("rightPadding"),
	).width;

	const sumedMaxWidth =
		resizeToFit("#Id") + resizeToFit("#Chapter") + resizeToFit("#Difficulty");

	const titleMaxSpace =
		document.getElementById("filters").getBoundingClientRect().width -
		sumedMaxWidth;
	resizeWidthToFitIn("#Title", titleMaxSpace);
}

function resizeToFit(id) {
	let maxWidth = 0;
	const ids = document.querySelectorAll(id);
	for (let index = 0; index < ids.length; index++) {
		const elementWidth = ids[index].getBoundingClientRect().width;
		maxWidth = Math.max(maxWidth, elementWidth + 32);
	}
	for (let index = 0; index < ids.length; index++) {
		ids[index].style.width = `${maxWidth}px`;
	}
	return maxWidth;
}

function resizeWidthToFitIn(id, maxWidth) {
	const ids = document.querySelectorAll(id);
	for (let index = 0; index < ids.length; index++) {
		ids[index].style.width = `${maxWidth}px`;
	}
}

function tempPageSwap() {
	window.location.href = "../ProblemStage/Problem.html";
}

function searchField() {
	let fieldChanged = false;
	const inputLine = document.getElementById("searchBar");
	inputLine.addEventListener("blur", () => {
		const value = inputLine.value.trim();
		if (value === "") {
			fieldChanged = false;
			inputLine.value = "Search Problem by ID";
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
const sortOrder = { Asc: 1, Desc: 2 };

let sortByIdOrder = sortOrder.Asc;
let sortByTitleOrder = sortOrder.Asc;
let sortByDifficultyOrder = sortOrder.Asc;
let sortByChapterOrder = sortOrder.Asc;

function sortByID() {
	const container = document.getElementById("problems");
	const items = container.querySelectorAll("#problem");
	const itemsArray = Array.from(items);

	itemsArray.sort((a, b) => {
		const idA = Number.parseInt(a.querySelector("#Id").textContent);
		const idB = Number.parseInt(b.querySelector("#Id").textContent);
		switch (sortByIdOrder) {
			case sortOrder.Asc:
				return idA - idB;
			case sortOrder.Desc:
				return idB - idA;
			default:
				break;
		}
	});
	if (sortByIdOrder === sortOrder.Asc) {
		sortByIdOrder = sortOrder.Desc;
	} else if (sortByIdOrder === sortOrder.Desc) {
		sortByIdOrder = sortOrder.Asc;
	}

	container.innerHTML = "";
	for (let index = 0; index < itemsArray.length; index++) {
		const element = itemsArray[index];
		container.appendChild(element);
	}
}

function sortByTitle() {
	const container = document.getElementById("problems");
	const items = container.querySelectorAll("#problem");
	const itemsArray = Array.from(items);

	itemsArray.sort((a, b) => {
		const idA = a.querySelector("#Title").textContent;
		const idB = b.querySelector("#Title").textContent;
		switch (sortByTitleOrder) {
			case sortOrder.Asc:
				return idA.localeCompare(idB);
			case sortOrder.Desc:
				return idB.localeCompare(idA);
			default:
				break;
		}
	});
	if (sortByTitleOrder === sortOrder.Asc) {
		sortByTitleOrder = sortOrder.Desc;
	} else if (sortByTitleOrder === sortOrder.Desc) {
		sortByTitleOrder = sortOrder.Asc;
	}

	container.innerHTML = "";
	for (let index = 0; index < itemsArray.length; index++) {
		const element = itemsArray[index];
		container.appendChild(element);
	}
}

function sortByChapter() {
	const container = document.getElementById("problems");
	const items = container.querySelectorAll("#problem");
	const itemsArray = Array.from(items);

	itemsArray.sort((a, b) => {
		const idA = a.querySelector("#Chapter").textContent;
		const idB = b.querySelector("#Chapter").textContent;
		switch (sortByChapterOrder) {
			case sortOrder.Asc:
				return idA.localeCompare(idB);
			case sortOrder.Desc:
				return idB.localeCompare(idA);
			default:
				break;
		}
	});
	if (sortByChapterOrder === sortOrder.Asc) {
		sortByChapterOrder = sortOrder.Desc;
	} else if (sortByChapterOrder === sortOrder.Desc) {
		sortByChapterOrder = sortOrder.Asc;
	}

	container.innerHTML = "";
	for (let index = 0; index < itemsArray.length; index++) {
		const element = itemsArray[index];
		container.appendChild(element);
	}
}

function sortByDifficulty() {
	const container = document.getElementById("problems");
	const items = container.querySelectorAll("#problem");
	const itemsArray = Array.from(items);

	itemsArray.sort((a, b) => {
		const idA = a.querySelector("#Difficulty").textContent;
		const idB = b.querySelector("#Difficulty").textContent;
		switch (sortByDifficultyOrder) {
			case sortOrder.Asc:
				return compareDifficulty(idA, idB);
			case sortOrder.Desc:
				return compareDifficulty(idB, idA);
			default:
				break;
		}
	});
	if (sortByDifficultyOrder === sortOrder.Asc) {
		sortByDifficultyOrder = sortOrder.Desc;
	} else if (sortByDifficultyOrder === sortOrder.Desc) {
		sortByDifficultyOrder = sortOrder.Asc;
	}

	container.innerHTML = "";
	for (let index = 0; index < itemsArray.length; index++) {
		const element = itemsArray[index];
		container.appendChild(element);
	}
}

function compareDifficulty(a, b) {
	if (a === b) return 0;
	if (a === "Easy") {
		return -1;
	}
	if (a === "Medium") {
		if (b === "Easy") {
			return 1;
		}
		if (b === "Hard") {
			return -1;
		}
	}
	if (a === "Hard") {
		return 1;
	}
}
