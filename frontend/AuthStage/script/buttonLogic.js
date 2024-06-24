import { showPopup } from "./popup.js";
import { changedUser, changedEmail, changedPass } from "./animations.js";

const Pages = { Login: "Login", Signup: "Signup" };
let pageState = Pages.Signup;

export function initSwaping() {
	initLogin();
}

export function initLogin() {
	pageState = Pages.Login;
	document.title = "Login";
	document.getElementById("title").innerHTML = "Login";
	document.getElementById("emailLine").style.display = "none";
	document.getElementById("Button").value = "Login";
	document.getElementById("QswapPage").innerHTML =
		'You don\'t have an account?<br><a id="swapPage">SignUp</a>';
}
export function initSignUp() {
	pageState = Pages.Signup;
	document.title = "SignUp";
	document.getElementById("title").innerHTML = "SignUp";
	document.getElementById("emailLine").style.display = "block";
	document.getElementById("Button").value = "SignUp";
	document.getElementById("QswapPage").innerHTML =
		'Do you have an account?<br><a id="swapPage">Login</a>';
}

export function buttonLogic() {
	const button = document.getElementById("Button");
	button.addEventListener("click", () => {
		switch (pageState) {
			case Pages.Login:
				login();
				break;
			case Pages.Signup:
				signUp();
				break;
			default:
				break;
		}
	});
}

async function login() {
	const url = "http://127.0.0.1:3000/login/";

	const formElements = document.querySelectorAll(".inputLine");
	let username = formElements.item(0).value;
	let password = formElements.item(2).value;

	if (!changedPass()) password = undefined;
	if (!changedUser()) username = undefined;

	const data = {
		username: username,
		password: password,
	};
	try {
		const response = await fetch(url, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		handleStatusCodes(response);
	} catch (error) {
		console.error("Error:", error);
	}
}

async function signUp() {
	const url = "http://127.0.0.1:3000/signUp/";

	const formElements = document.querySelectorAll(".inputLine");
	let username = formElements.item(0).value;
	let email = formElements.item(1).value;
	let password = formElements.item(2).value;

	if (!changedEmail()) email = undefined;
	if (!changedPass()) password = undefined;
	if (!changedUser()) username = undefined;

	const data = {
		email: email,
		username: username,
		password: password,
	};
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		handleStatusCodes(response);
	} catch (error) {
		console.error("Error:", error);
	}
}

export function switchPages() {
	if (pageState === Pages.Login) {
		initSignUp();
	} else if (pageState === Pages.Signup) {
		initLogin();
	}
}

async function handleStatusCodes(response) {
	const code = response.status
	switch (code) {
		case 452:
			showPopup("Fields may not be completed.");
			break;
		case 453:
			showPopup("User already exists.");
			break;
		case 454:
			showPopup("Invalid email format.");
			break;
		case 455://user
			showPopup("Wrong user or password.");
			break;
		case 456://pass
			showPopup("Wrong user or password.");
			break;
		case 200: {
			showPopup("Signed up succesfully.");
			const cookies = document.cookie.split(";");
			for (const cookie of cookies) {
				let [cookieName, cookieValue] = cookie.trim().split("=");

				cookieName = decodeURIComponent(cookieName);
				cookieValue = decodeURIComponent(cookieValue);
				if (cookieName === "admin") {
					if (cookieValue === "1") {
						window.location.href = "../../AdminDashboardStage/AdminDashBoard.html";
					}
					else {
						window.location.href = "../../DashboardStage/Dashboard.html";
					}
				}
				else {
					window.location.href = "../../DashboardStage/Dashboard.html";
				}
			}

			break;
		}
		default:
			break;
	}
}
