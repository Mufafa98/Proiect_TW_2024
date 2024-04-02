import { initLoginScreen } from "./Initializer.js";
import { loginButtonLogic, signUpButtonLogic } from "./ButtonLogic.js";

window.addEventListener("DOMContentLoaded", initLoginScreen);
window.addEventListener("resize", initLoginScreen);
loginButtonLogic();
signUpButtonLogic();
