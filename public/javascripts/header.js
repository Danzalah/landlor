let header_request = new XMLHttpRequest();

header_request.addEventListener("load", success);
header_request.addEventListener("error", error);
header_request.open("GET", "/usersLog", true);
header_request.send();

function success() {

    let checkLoggedIn = JSON.parse(header_request.response);
    var signupAccount;
    var signupAccountHref;
    var logInOut;
    var logInOutHref;
    var profile;
    var building;

    if (checkLoggedIn.loggedin){
        signupAccount = "Account";
        signupAccountHref = "/users/profile?name=" + checkLoggedIn.user;
        logInOut = "Log Out";
        logInOutHref = "/users/logout";
    }
    else {
        signupAccount = "Sign Up!";
        signupAccountHref = "/users/signup";
        logInOut = "Log In";
        logInOutHref = "/users/login";
    }
    profile = "/";
    building = "/users/profile?name=" + checkLoggedIn.user;
    if (checkLoggedIn.loggedin){
    let element = (
        
        <div class="navigation">
        <input type="checkbox" class="navigation__checkbox" id="nav-toggle"></input>
        <label for="nav-toggle" class="navigation__button">
        <span class="navigation__icon" aria-label="toggle navigation menu"></span>
        </label>
        <div class="navigation__background"></div>

        <nav class="navigation__nav" role="navigation">
        <ul class="navigation__list">
            <li class="navigation__item">
            <a href={profile} class="navigation__link">Home</a>
            </li>
            <li class="navigation__item">
            <a href={building} class="navigation__link">Estates</a>
            </li>
            <li class="navigation__item">
            <a href={logInOutHref} class="navigation__link">{logInOut}</a>
            </li>
            <li class="navigation__item">
            <a href="https://www.linkedin.com/in/rayan-suberu-57040819b/" class="navigation__link">About the Developer</a>
            </li>
    </ul>
    </nav>
    <span id="by"></span>
    </div>


    );

    ReactDOM.render(
        element,
        document.getElementById('header')
    );

}


function error() {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
};
}

