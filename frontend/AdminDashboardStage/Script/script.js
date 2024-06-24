async function validate() {
    try {
        const response = await fetch("http://127.0.0.1:3000/protected", {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status !== 200) {
            window.location.href = "../HomeScreen/homescreen.html";
        }
    } catch (error) {
        console.error('Error:', error);
    }
    try {
        const response = await fetch("http://127.0.0.1:3000/protected/admin", {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status !== 200) {
            window.location.href = "../HomeScreen/homescreen.html";
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

validate()

function users() {
    document.getElementsByClassName("problems")[0].style.display = "none";
    document.getElementsByClassName("users")[0].style.display = "block";
    document.getElementsByClassName("createproblems")[0].style.display = "none";

    document.getElementsByClassName("problemlist")[0].style.display = "none";
    document.getElementsByClassName("userlist")[0].style.display = "block";

    document.getElementsByClassName("problems")[1].style.display = "none";
}

function problems() {
    document.getElementsByClassName("users")[0].style.display = "none";
    document.getElementsByClassName("problems")[0].style.display = "block";
    document.getElementsByClassName("createproblems")[0].style.display = "none";

    document.getElementsByClassName("userlist")[0].style.display = "none";
    document.getElementsByClassName("problemlist")[0].style.display = "block";

    document.getElementsByClassName("problems")[1].style.display = "block";
}

function createproblem() {
    document.getElementsByClassName("users")[0].style.display = "none";
    document.getElementsByClassName("problems")[0].style.display = "none";
    document.getElementsByClassName("createproblems")[0].style.display = "block";

    document.getElementsByClassName("userlist")[0].style.display = "none";
    document.getElementsByClassName("problemlist")[0].style.display = "block";

    document.getElementsByClassName("problems")[1].style.display = "block";
}