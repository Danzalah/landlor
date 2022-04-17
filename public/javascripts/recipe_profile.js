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

    // https://dev.to/duomly/how-to-use-loop-in-react-js-ael
    var instructions = []
    for (const [i, instruct] of recipe.instructions.entries()) {
        instructions.push(<li>{instruct}</li>)
    }

    var ingredients = []
    for (const [i, instruct] of recipe.ingredients.entries()) {
        ingredients.push(<li>{instruct}</li>)
    }

    var portions = []
    for (const [i, instruct] of recipe.ing_portion.entries()) {
        portions.push(<li>{instruct}</li>)
    }

    var date = recipe.date_published.substring(0, 10)

    // TODO: make a slide show from array of images
    var img = ""
    if (recipe.images[0] != "NA"){
        img = recipe.images[0]
    }   

    console.log(img)

    let element = (
        <div>
            <h2>{recipe.name}</h2>
            <p>published date: {date} by {recipe.author}</p>
            <p>
                ratings: {recipe.rating} &emsp;
                total ratings: {recipe.rating_count}
            </p>
            <p>
                prep time:  {recipe.prep_time} &emsp;
                cook time:  {recipe.cook_time} &emsp;
                total time: {recipe.total_time}
            </p>
            <p>Servings: {recipe.servings}</p>
            <p>{recipe.description}</p>

            <img src={img}/>

            <h3>Ingredients</h3>
            <ol>{ingredients}</ol>

            <h3>Portions</h3>
            <ol>{portions}</ol>

            <h3>Instructions</h3>
            <ol>{instructions}</ol>
            

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