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

    let element = (
        <div>
            <header id="headerjs" className="header">
                {/* links section */}
                <div className="left_header">
                    <ul className="links">
                        <li className="logo-header"><img src="../images/logo.png" width="100" /></li>
                        <li className="links-header"><a href="/">Home</a></li>
                        <li className="links-header"><a href="/recipes">Recipes</a></li>
                        <li className="links-header"><a href="/recipes/whatscooking">Whats Cooking</a></li>
                    </ul>
                </div>
                {/* login section */}
                <div className="right_header">
                    <ul className="links">
                        <li className="links-header"><a href={signupAccountHref}>{signupAccount}</a></li>
                        <li className="links-header"><a href={logInOutHref}>{logInOut}</a></li>
                    </ul>
                </div>

            </header>
            <br />
            <br />
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


