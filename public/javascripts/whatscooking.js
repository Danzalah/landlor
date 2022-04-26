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
            <form action="whatscooking" method="post" id="submit_ingredients">
                <p>What ingredients do you have to work with?</p>
                <input type="text" name="ingredients" placeholder="Whats Cooking?" />
                <input type="submit" value="Let's Cook!" id="submit" />
            </form>
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


