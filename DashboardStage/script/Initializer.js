export function initializeDashboard() {
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

export function tempPageSwap() {
	window.location.href = "../../ProblemStage/Problem.html";
}
