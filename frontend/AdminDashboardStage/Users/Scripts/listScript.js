export async function loadUsers() {
    const url = "http://127.0.0.1:3000/login/users";

    try{
        const response = await fetch(url, {
			method: "GET",
			credentials: "include",
		});

        const result = await response.json();
        //console.log(result.data);
        loadUsersInPage(result.data);
    } catch (error) {
        console.error("Error", error);
    }
}

function loadUsersInPage(users){
    const listContainer = document.querySelector("#listcontainer")

    for(let i = 0; i < users.length; i++) {
        const element = users[i];
        
        const user = document.createElement("div");
        const username = document.createElement("p");

        username.id = "username";
        username.textContent = element.USERNAME;

        user.appendChild(username);

        listContainer.appendChild(user)
    }
}