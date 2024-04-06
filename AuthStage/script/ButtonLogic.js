const Pages = { Login: "Login", Signup: "Signup" };
let pageState = Pages.Signup;

export function initSwaping() {
	initLogin();
}

export function loginButtonLogic() {
	const loginButton = document.getElementById("Button");
	loginButton.addEventListener("click", () => {
		window.location.href = "../../DashboardStage/Dashboard.html";
	});
}

export function switchPages() {
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
