export function initLoginScreen() {
    const authBackgroundHeight = Number.parseFloat(
        getComputedStyle(document.getElementById("AuthBackground")).height,
    );
    const authBackgroundWidth = Number.parseFloat(
        getComputedStyle(document.getElementById("AuthBackground")).width,
    );

    document.getElementById("formElements").style.height = `${(authBackgroundHeight / 2) * 1.5
        }px`;

    const formElements = document.getElementsByClassName("formElement");

    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== "button") {
            formElements[i].style.width = `${authBackgroundWidth - 0.2 * authBackgroundWidth
                }px`;
        } else {
            formElements[i].style.width = `${authBackgroundWidth - 0.2 * authBackgroundWidth
                }px`;
        }
    }
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    }
    // console.log(document.cookie)
}
