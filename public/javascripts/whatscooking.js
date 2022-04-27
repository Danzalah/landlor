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
            <div class="bar">
            <form action="whatscooking" method="post" id="submit_ingredients">
            <input className="searchbar" type="text" name="ingredients" placeholder="Whats Cooking?" />
            <button className="button" type="button" id="submit">Let's Cook!</button>
            
            </form>
            </div>
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


