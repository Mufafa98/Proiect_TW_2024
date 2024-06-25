export async function loadSearchedUser(username) {
    const url = "http://127.0.0.1:3000/login/userByUname";

    try{
        const response = await fetch(url, {
			method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
            body: JSON.stringify({ username: username }),
			credentials: "include",
		});

        const result = await response.json();
        console.log(result.data);
        clearUser();
        loadSearchedUserInPage(result.data);
    } catch (error) {
        console.error("Error", error);
    }
}

function loadSearchedUserInPage(user){
    const listContainer = document.querySelector("#usercontainer")
    const element = user;
        
    //const problem = document.createElement("div");
    const userID = document.querySelector("#userid");

    userID.textContent += " ";
    userID.textContent += element.ID;

    const username = document.querySelector("#username");

    username.textContent += " ";
    username.textContent += element.USERNAME;

    const email = document.querySelector("#email");

    email.textContent += " ";
    email.textContent += element.EMAIL;

    const admin = document.querySelector("#isadmin");

    admin.textContent += " ";
    if(element.ADMIN === 1)
        admin.textContent += "Yes";
    else
        admin.textContent += "No";
}

function clearUser(){
    const userID = document.querySelector("#userid");
    userID.textContent = "Id: ";

    const username = document.querySelector("#username");
    username.textContent = "Username: ";

    const email = document.querySelector("#email");
    email.textContent = "Email: ";

    const admin = document.querySelector("#isadmin");
    admin.textContent = "Is admin: ";
}