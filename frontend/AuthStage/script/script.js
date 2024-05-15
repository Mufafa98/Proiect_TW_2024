const Pages = { Login: "Login", Signup: "Signup" };
let pageState = Pages.Signup;

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

function userField() {
	let fieldChanged = false;
	const inputLine = document.getElementById("userLine");
	inputLine.addEventListener("blur", () => {
		const value = inputLine.value.trim();
		if (value === "") {
			fieldChanged = false;
			inputLine.value = "Username";
		}
	});
	inputLine.addEventListener("focus", () => {
		if (!fieldChanged) {
			inputLine.value = "";
		}
	});
	inputLine.addEventListener("input", () => {
		fieldChanged = true;
	});
}
function emailField() {
	let fieldChanged = false;
	const inputLine = document.getElementById("emailLine");
	inputLine.addEventListener("blur", () => {
		const value = inputLine.value.trim();
		if (value === "") {
			fieldChanged = false;
			inputLine.value = "Email";
		}
	});
	inputLine.addEventListener("focus", () => {
		if (!fieldChanged) {
			inputLine.value = "";
		}
	});
	inputLine.addEventListener("input", () => {
		fieldChanged = true;
	});
}
function passField() {
	let fieldChanged = false;
	const inputLine = document.getElementById("passLine");
	inputLine.addEventListener("blur", () => {
		const value = inputLine.value.trim();
		if (value === "") {
			fieldChanged = false;
			inputLine.type = "text";
			inputLine.value = "Password";
		}
	});
	inputLine.addEventListener("focus", () => {
		if (!fieldChanged) {
			inputLine.type = "text";
			inputLine.value = "";
		}
	});
	inputLine.addEventListener("input", () => {
		inputLine.type = "password";
		fieldChanged = true;
	});
}
function initLoginScreen() {
	const authBackgroundHeight = Number.parseFloat(
		getComputedStyle(document.getElementById("AuthBackground")).height,
	);
	const authBackgroundWidth = Number.parseFloat(
		getComputedStyle(document.getElementById("AuthBackground")).width,
	);

	document.getElementById("formElements").style.height = `${
		(authBackgroundHeight / 2) * 1.5
	}px`;

	const formElements = document.getElementsByClassName("formElement");

	for (let i = 0; i < formElements.length; i++) {
		if (formElements[i].type !== "button") {
			formElements[i].style.width = `${
				authBackgroundWidth - 0.2 * authBackgroundWidth
			}px`;
		} else {
			formElements[i].style.width = `${
				authBackgroundWidth - 0.2 * authBackgroundWidth
			}px`;
		}
	}
}

function initSwaping() {
	initLogin();
}

function loginButtonLogic() {
	const loginButton = document.getElementById("Button");
	loginButton.addEventListener("click", () => {
		window.location.href = "IntermediaryPage.html";
		// window.location.href = "../../DashboardStage/Dashboard.html";
	});
}

function switchPages() {
	if (pageState === Pages.Login) {
		initSignUp();
	} else if (pageState === Pages.Signup) {
		initLogin();
	}
}

function initLogin() {
	pageState = Pages.Login;
	document.title = "Login";
	document.getElementById("title").innerHTML = "Login";
	document.getElementById("emailLine").style.display = "none";
	document.getElementById("Button").value = "Login";
	document.getElementById("QswapPage").innerHTML =
		'You don\'t have an account?<br><a id="swapPage">SignUp</a>';
}
function initSignUp() {
	pageState = Pages.Signup;
	document.title = "SignUp";
	document.getElementById("title").innerHTML = "SignUp";
	document.getElementById("emailLine").style.display = "block";
	document.getElementById("Button").value = "SignUp";
	document.getElementById("QswapPage").innerHTML =
		'Do you have an account?<br><a id="swapPage">Login</a>';
}
