let header_request = new XMLHttpRequest();

header_request.addEventListener("load", success);
header_request.addEventListener("error", error);
header_request.open("GET", "/usersLog", true);
header_request.send();

function success() {

    let checkLoggedIn = JSON.parse(header_request.response);

    if (checkLoggedIn.loggedin){
        
    }
    else {
        location.href = "/users/login";
    }




}


function error() {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
};


