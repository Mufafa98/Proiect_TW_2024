import { initLoginScreen } from "./Initializer.js";
import { loginButtonLogic, switchPages, initSwaping } from "./ButtonLogic.js";
import { userField, passField, emailField } from "./InputField.js";

initSwaping();

window.addEventListener("DOMContentLoaded", initLoginScreen);
window.addEventListener("resize", initLoginScreen);

loginButtonLogic();

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
