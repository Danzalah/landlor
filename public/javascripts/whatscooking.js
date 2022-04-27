let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load", success);
xhttp.addEventListener("error", error);
xhttp.open("GET", "/recipesOut", true);
xhttp.send();

function success() {
    let data = JSON.parse(xhttp.response);

    console.log(data);

    let element = (
        <div>
            <ul className="homeBar">
                <li><img className="homeLogo" src="../images/logo_large.png" width="400" /></li>
                <li>
                    <div className="bar">
                        <input className="searchbar" type="text" name="ingredients" placeholder="Whats Cooking?" />
                    </div>
                </li>
            </ul>
        </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('whatscooking')
    );
};


function error() {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
};


