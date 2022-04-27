let header_request = new XMLHttpRequest();

xhttp.addEventListener("load", success);
xhttp.addEventListener("error", error);

function success() {

    let element = (
        <div>
            <header id="headerjs" className="header">
                {/* links section */}
                <div className="left_header">
                    <ul className="links">
                        <li className="links-header"><h1 className="logo">whats cooking logo?</h1></li>
                        <li className="links-header"><a href="/">Home</a></li>
                        <li className="links-header"><a href="/recipes">Recipes</a></li>
                        <li className="links-header"><a href="/whatscooking">Whats Cooking</a></li>
                    </ul>
                </div>
                {/* login section */}
                <div className="right_header">
                    <ul className="links">
                        <li className="links-header"><a href="/users/signup">Sign Up!</a></li>
                        <li className="links-header"><a href="/users/login">Log In</a></li>
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


