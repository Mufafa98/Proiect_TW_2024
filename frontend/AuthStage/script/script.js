import { userField, emailField, passField } from "./animations.js"
import { initLoginScreen } from "./init.js"
import { buttonLogic, switchPages, initSwaping } from "./buttonLogic.js";

initSwaping();

window.addEventListener("DOMContentLoaded", initLoginScreen);
window.addEventListener("resize", initLoginScreen);

buttonLogic();

document.addEventListener("click", (e) => {
	if (
		document.elementFromPoint(e.x, e.y) === document.getElementById("swapPage")
	) {
		switchPages();
	}
});

userField();
passField();
emailField();



