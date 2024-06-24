function users(){
    document.getElementsByClassName("problems")[0].style.display="none";
    document.getElementsByClassName("users")[0].style.display="block";
    document.getElementsByClassName("createproblems")[0].style.display="none";

    document.getElementsByClassName("problemlist")[0].style.display="none";
    document.getElementsByClassName("userlist")[0].style.display="block";

    document.getElementsByClassName("problems")[1].style.display="none";
}

function problems(){
    document.getElementsByClassName("users")[0].style.display="none";
    document.getElementsByClassName("problems")[0].style.display="block";
    document.getElementsByClassName("createproblems")[0].style.display="none";

    document.getElementsByClassName("userlist")[0].style.display="none";
    document.getElementsByClassName("problemlist")[0].style.display="block";

    document.getElementsByClassName("problems")[1].style.display="block";
}

function createproblem(){
    document.getElementsByClassName("users")[0].style.display="none";
    document.getElementsByClassName("problems")[0].style.display="none";
    document.getElementsByClassName("createproblems")[0].style.display="block";

    document.getElementsByClassName("userlist")[0].style.display="none";
    document.getElementsByClassName("problemlist")[0].style.display="block";

    document.getElementsByClassName("problems")[1].style.display="block";
}