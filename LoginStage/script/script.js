import { initLoginScreen } from "./Initializer.js";
import { loginButtonLogic } from "./ButtonLogic.js";
import { userField, passField } from "./InputField.js";

window.addEventListener("DOMContentLoaded", initLoginScreen);
window.addEventListener("resize", initLoginScreen);
loginButtonLogic();

userField();
passField();
