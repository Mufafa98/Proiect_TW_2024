export function initializeDashboard() {
	const menuButton = document.getElementById("menuButton").style;
	const searchBar = document.getElementById("searchBar").style;

	searchBar.marginLeft = getComputedStyle(
		document.getElementById("leftPadding"),
	).width;
	menuButton.marginRight = getComputedStyle(
		document.getElementById("rightPadding"),
	).width;
}
