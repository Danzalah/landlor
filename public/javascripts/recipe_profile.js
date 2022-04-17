let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load", success);
xhttp.addEventListener("error", error);
xhttp.open("GET", "/recipesOut", true);
xhttp.send();



function success() {

    let data = JSON.parse(xhttp.response);

    // https://flaviocopes.com/urlsearchparams/ how to get queries from url
    let params = new URLSearchParams(window.location.search)
    let query = params.get('recipe')    // query by id
    console.log(query)

    let recipe = data[query - 1]     // -1 since we start our keys at 1
    console.log(recipe)

    var list = []
    for (const [i, instruct] of recipe.instructions.entries()) {
        list.push(<li>{instruct}</li>)
    }

    let element = (
        <div>
            <h2>{recipe.name}</h2>
            <p>
                prep time:  {recipe.prep_time} &emsp;
                cook time:  {recipe.cook_time} &emsp;
                total time: {recipe.total_time}
            </p>
            <p>{recipe.description}</p>

            <h3>Instructions</h3>
            <ol>{list}</ol>

        </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('profile')
    )
};


function error() {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
};