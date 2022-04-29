let profile_request = new XMLHttpRequest();
profile_request.addEventListener("load", success);
profile_request.addEventListener("error", error);
profile_request.open("GET", "/usersLog", true);
profile_request.send();

let recipe_request = new XMLHttpRequest();
recipe_request.addEventListener("load", success);
recipe_request.addEventListener("error", error);
recipe_request.open("GET", "/recipesOut", true);
recipe_request.send();

function success() {

    let info = JSON.parse(profile_request.response);
    let recipes = JSON.parse(recipe_request.response);

    var user_recipes = [];
    for (const [i, id] of info.recipes.entries()) {
        var temp = {
            id: recipes[id].id,
            name: recipes[id].name,
            date: recipes[id].date_published.substring(0, 10),
            rating: recipes[id].rating

        };
        user_recipes.push(temp);
    };
    // console.log(user_recipes)

    let rows = user_recipes.map((row) =>
        <tr key={JSON.stringify(row)}>
            <td><a href={"../recipes/recipe_profile?recipe=" + row.id}>{row.name}</a></td>
            <td>{row.date}</td>
            <td>{row.rating}</td>
        </tr>
    );

    var num = [];
    for (var i = 1; i <= 24; i++) {
        num.push(<option key={i} value={i}>{i}</option>);
        // num.push(i);
    };


    let element = (
        <div className="grid-block">
            <h1>Welcome, {info.user}!</h1>
            <div className="grid-container">
                <div className="post">
                    <h2>Post a Recipe</h2>
                    {/* <form action="profile" method="post" id="submit_post">
                        <input type="text" name="title" placeholder="Title" />
                        <input type="text" name="description" placeholder="Description" />
                        <input type="text" name="ingredients" placeholder="Ingredients" />
                        <input type="text" name="portion" placeholder="Portion" />
                        <input type="text" name="instructons" placeholder="Instructions" />
                        <input type="text" name="preptime" placeholder="Prep Time" />
                        <input type="text" name="cooktime" placeholder="Cook Time" />
                        <input type="text" name="totaltime" placeholder="Total Time" />
                        <input type="text" name="servings" placeholder="Servings" />
                        <input type="text" name="images" placeholder="images" />
                        <input type="submit" value="Submit" />
                    </form> */}
                    <form action="profile" method="post" id="submit_post">
                        <div>
                            <input type="text" name="title" defaultValue="Title" />
                            <input type="text" name="description" defaultValue="Description" />
                        </div>
                        <div>
                            <input type="number" name="cooktime" min="0" max="240" defaultValue="0" />
                            <input type="number" name="preptime" min="0" max="240" defaultValue="0" />
                            <input type="text" name="totaltime" defaultValue="Total Time" />
                            <select name="servings" id="servings" >
                                {/* {dynamically create select element:
                                    https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap} */}
                                {num}
                            </select>
                        </div>
                        <div>
                            {/* {https://stackoverflow.com/questions/14853779/adding-input-elements-dynamically-to-form} */}
                            <input type="text" name="portion" defaultValue="Portion" />
                            <input type="text" name="ingredients" defaultValue="Ingredients" />
                        </div>
                        <div>
                            <input type="text" name="instructions" defaultValue="Instructions" />
                        </div>
                        <div>
                            <input type="text" name="images" defaultValue="images" />
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div className="recipes">
                    <h2>Recipes by You!</h2>
                    <table id="recipes" border="2" cellSpacing="1" cellPadding="8" className="recipeTable">
                        <thead>
                            <tr>
                                <th id="thName">Name</th>
                                <th id="thDate">Date Publshed</th>
                                <th id="thRating">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
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