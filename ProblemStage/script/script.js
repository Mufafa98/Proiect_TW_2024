import { init, initPopUp, unInitPopUp } from "./Initializer.js";
import { backButton, runButton } from "./ButtonActions.js";

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", init);

document.getElementById("backButton").addEventListener("click", backButton);
document.getElementById("runButton").addEventListener("click", runButton);
document.getElementById("submitButton").addEventListener("click", initPopUp);
document
	.getElementById("difficultySelectorButton")
	.addEventListener("click", unInitPopUp);
// window.addEventListener("DOMContentLoaded", initPopUp);
// window.addEventListener("resize", initPopUp);
