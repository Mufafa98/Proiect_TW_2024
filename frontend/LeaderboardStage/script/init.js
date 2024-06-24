export async function initializeDashboard() {
	try {
		const response = await fetch("http://127.0.0.1:3000/protected", {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status !== 200) {
			window.location.href = "../HomeScreen/homescreen.html";
			return;
		}
	} catch (error) {
		console.error('Error:', error);
	}
	const searchBar = document.getElementById("searchBar").style;

	searchBar.marginLeft = getComputedStyle(
		document.getElementById("leftPadding"),
	).width;

	searchBar.height = `${Number.parseInt(
		getComputedStyle(document.getElementById("mainHeader")).height,
	) * 0.7
		}px`;

	const searchFilter = document.getElementById("searchFilter");
	searchFilter.style.paddingLeft = "5px";
	resizeElements();
	const backButton = document.getElementById("BackButton")
	const topBackground = document.getElementById("content")
	backButton.style.marginRight = `${window.innerWidth - topBackground.getBoundingClientRect().right}px`
	backButton.style.height = `${searchBar.height}px`
	backButton.style.marginTop = "10px";
	backButton.style.marginBottom = "10px"


}

export async function loadCats() {
	const difficultySelector = document.getElementById("difficultyFilter");
	const chapterSelector = document.getElementById("chapterFilter");

	try {
		const response = await fetch("http://127.0.0.1:3000/metadata/tournamentChapters", {
			method: 'GET',
			credentials: 'include'
		});
		const result = await response.json();
		for (const chapterData of result.data) {
			const chapter = document.createElement("option");
			chapter.value = chapterData.solvingCategory;
			chapter.innerHTML = chapterData.solvingCategory;
			chapterSelector.appendChild(chapter)
		}
	} catch (error) {
		console.error('Error:', error);
	}
	try {
		const response = await fetch("http://127.0.0.1:3000/metadata/tournamentDifficulty", {
			method: 'GET',
			credentials: 'include'
		});
		const result = await response.json();
		for (const chapterData of result.data) {
			const chapter = document.createElement("option");
			chapter.value = chapterData.solvingDifficulty;
			chapter.innerHTML = chapterData.solvingDifficulty;
			difficultySelector.appendChild(chapter)
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

let IdMax = 0;
let UsernameMax = 0;
let ChapterMax = 0;
let DifficultyMax = 0;

export function resizeElements() {
	let ids = document.querySelectorAll("#Uid");
	for (let index = 0; index < ids.length; index++) {
		ids[index].style.width = `${IdMax}px`;
	}
	ids = document.querySelectorAll("#Username");
	for (let index = 0; index < ids.length; index++) {
		ids[index].style.width = `${UsernameMax}px`;
	}
	ids = document.querySelectorAll("#TotalProblems");
	for (let index = 0; index < ids.length; index++) {
		ids[index].style.width = `${ChapterMax}px`;
	}
	ids = document.querySelectorAll("#SuccessRate");
	for (let index = 0; index < ids.length; index++) {
		ids[index].style.width = `${DifficultyMax}px`;
	}

	const topBg = document.getElementById("content");
	const leftPadding = document.getElementById("leftPadding")
	leftPadding.style.width = `${IdMax + UsernameMax + ChapterMax + DifficultyMax - 50}px`
	topBg.style.width = `${IdMax + UsernameMax + ChapterMax + DifficultyMax + 100}px`;
}



export function loadElementMaxSize() {
	let ids = document.querySelectorAll("#Uid");
	for (let index = 0; index < ids.length; index++) {
		const elementWidth = ids[index].getBoundingClientRect().width;
		IdMax = Math.max(IdMax, elementWidth + 32);
	}
	ids = document.querySelectorAll("#Username");
	for (let index = 0; index < ids.length; index++) {
		const elementWidth = ids[index].getBoundingClientRect().width;
		UsernameMax = Math.max(UsernameMax, elementWidth + 32);
	}
	ids = document.querySelectorAll("#TotalProblems");
	for (let index = 0; index < ids.length; index++) {
		const elementWidth = ids[index].getBoundingClientRect().width;
		ChapterMax = Math.max(ChapterMax, elementWidth + 32);
	}
	ids = document.querySelectorAll("#SuccessRate");
	for (let index = 0; index < ids.length; index++) {
		const elementWidth = ids[index].getBoundingClientRect().width;
		DifficultyMax = Math.max(DifficultyMax, elementWidth + 32);
	}
}

export function tempPageSwap() {
	localStorage.setItem("test1", "valoare mesaj doi");
	//window.location.href = "../ProblemStage/Problem.html";
}

export function swapPage(problem) {
	console.log(problem.value);
}
