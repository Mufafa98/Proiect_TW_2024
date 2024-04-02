export function initLoginScreen() {
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
		formElements[i].style.width = `${
			authBackgroundWidth - 0.2 * authBackgroundWidth
		}px`;
	}

	// document.getElementById("tes").innerHTML = window.innerWidth;
}
