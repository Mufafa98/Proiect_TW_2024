import { init, initPopUp, unInitPopUp } from "./init.js";
import { runButton, backButton } from "./buttonLogic.js";

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", init);

document.getElementById("backButton").addEventListener("click", backButton);
document.getElementById("runButton").addEventListener("click", runButton);
document.getElementById("submitButton").addEventListener("click", initPopUp);
document
	.getElementById("difficultySelectorButton")
	.addEventListener("click", unInitPopUp);

init();