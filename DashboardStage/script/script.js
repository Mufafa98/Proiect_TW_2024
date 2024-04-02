import { initializeDashboard } from "./Initializer.js";

window.addEventListener("DOMContentLoaded", initializeDashboard);

const test = document.getElementById("menuButton");

test.addEventListener("click", () => {
	alert("merge");
});
