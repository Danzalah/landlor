let xhttp = new XMLHttpRequest();
xhttp.addEventListener("load", success);
xhttp.addEventListener("error", error);
xhttp.open("GET", "/recipesOut", true);
xhttp.send();

let swaps_request = new XMLHttpRequest();
swaps_request.addEventListener("load", success);
swaps_request.addEventListener("error", error);
swaps_request.open("GET", "/swapsOut", true);
swaps_request.send();



function success() {

    let data = JSON.parse(xhttp.response);
    let ingr_swaps = JSON.parse(swaps_request.response)

    // https://flaviocopes.com/urlsearchparams/ how to get queries from url
    let params = new URLSearchParams(window.location.search)
    let query = params.get('recipe')    // query by id
    // console.log(query)

    let recipe = data[query - 1]     // -1 since we start our keys at 1
    // console.log(recipe)

    // https://dev.to/duomly/how-to-use-loop-in-react-js-ael
    var instructions = []
    for (const [i, instruct] of recipe.instructions.entries()) {
        instructions.push(<li>{instruct}</li>)
    }

    var ingredients = []
    for (const [i, ingr] of recipe.ingredients.entries()) {
        ingredients.push(ingr)
    }

    var swaps = [];
    for (const [j, ingr] of ingredients.entries()) {
        var swap_str = "";
        for (const [i, swap] of ingr_swaps.entries()) {
            if (ingr.toLowerCase() == swap.ingredient.toLowerCase()){
                swap_str += "[*] " + swap.swaps + "\n";
            };
        }
        var obj = {
            ingredient: ingr,
            swaps: swap_str
        };
        swaps.push(<li><a title={obj.swaps}>{obj.ingredient}</a></li>);
    }

    var portions = []
    for (const [i, portion] of recipe.ing_portion.entries()) {
        portions.push(<li>{portion}</li>)
    }

    var date = recipe.date_published.substring(0, 10)

    // TODO: make a slide show from array of images
    var img = ""
    if (recipe.images[0] != "NA") {
        img = recipe.images[0]
    }

    let element = (

        <div className="grid-block">

            <div className="grid-container">

                <div className="ingredients">
                    <h3>Ingredients</h3>
                    <ol>{swaps}</ol>
                </div>

                <div className="portions">
                    <h3>Portions</h3>
                    <ol>{portions}</ol>
                </div>

                <div className="instructions">
                    <h3>Instructions</h3>
                    <ol>{instructions}</ol>
                </div>

                <div className="details">
                    <div>   {/* recipe info */}
                        <h2 id="title">{recipe.name}</h2>
                        <p><strong>published date</strong>: {date} by <strong>{recipe.author}</strong></p>
                        <p>
                            <strong>ratings</strong>: {recipe.rating} &emsp;
                            <strong>total ratings</strong>: {recipe.rating_count}
                        </p>
                        <p>
                            <strong>prep time</strong>:  {recipe.prep_time} &emsp;
                            <strong>cook time</strong>:  {recipe.cook_time} &emsp;
                            <strong>total time</strong>: {recipe.total_time}
                        </p>
                        <p><strong>Servings</strong>: {recipe.servings}</p>
                    </div>
                </div>

                <div className="description">
                    <h3>Description</h3>
                    <p>{recipe.description}</p>
                </div>

                <div className="image">
                    <img id="image" src={img} />
                </div>

            </div>

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
