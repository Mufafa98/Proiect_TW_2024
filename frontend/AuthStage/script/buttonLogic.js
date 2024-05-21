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
        switch (button.value) {
            case "Login":
                login();
                break;
            case "SignUp":
                signUp();
                break;
            default:
                break;
        }
        // window.location.href = "IntermediaryPage.html";
        // window.location.href = "../../DashboardStage/Dashboard.html";
    });
}

function login() {
    console.log("not implemented");
}

function signUp() {
    const url = 'http://127.0.0.1:3000/signUp/';

    const formElements = document.querySelectorAll(".inputLine");
    const username = formElements.item(0).value;
    const email = formElements.item(1).value;
    const password = formElements.item(2).value;

    // TO MANAGE ERROR CODES ACORDINGLY IN APP


    const data = {
        email: email,
        username: username,
        password: password
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// fetch(url, {
//     method: 'GET'
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

export function switchPages() {
    if (pageState === Pages.Login) {
        initSignUp();
    } else if (pageState === Pages.Signup) {
        initLogin();
    }
}
