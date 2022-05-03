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

var portion_ingr_counter = 0;
var instruction_counter = 0;

function success() {

    let info = JSON.parse(profile_request.response);
    let recipes = JSON.parse(recipe_request.response);
    // console.log(recipes[1])

    var user_recipes = [];
    for (const [i, id] of info.recipes.entries()) {
        
        if (i == info.recipes.length -1){
            break;
        }
        var temp = {
            id: recipes[id].id,
            name: recipes[id].name,
            date: recipes[id].date_published.substring(0, 10),
            rating: recipes[id].rating

        };
        user_recipes.push(temp);
    };

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
    };

    let element = (
        <div className="grid-block">
            <h1>Welcome, {info.user}!</h1>
            <div className="grid-container">
                <div className="post">
                    <h2>Post a Recipe</h2>
                    <form action="profile" method="post" id="submit_post">
                        <div>
                            <input type="text" name="title" defaultValue="Title" /> <br />
                            <input type="text" name="description" defaultValue="Description" />
                        </div>
                        <div>
                            <label id="label">Prep Time: </label>
                            <input type="number" id="time" step="5" name="cooktime" min="0" max="240" defaultValue="0" />
                            <label id="label">Cook Time: </label>
                            <input type="number" id="time" step="5" name="preptime" min="0" max="240" defaultValue="0" />
                            <label id="label">Number of Servings: </label>
                            <select name="servings" id="servings" >
                                {/* {dynamically create select element:
                                    https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap} */}
                                {num}
                            </select>
                        </div>
                        <div>
                            <div id="portion_ingr">
                                <label id="label">Portion: </label>
                                <input type="text" id="portion-0" name="portion" defaultValue="Portion" />
                                <label id="label">Ingredient: </label>
                                <input type="text" id="ingredient-0" name="ingredients" defaultValue="Ingredients" />
                            </div>
                            <button id="btn" type="button" onClick={AddIngredient}>Add Ingredient</button>
                        </div>
                        <div>
                            <div id="instructions">
                                <label id="label">Instruction: </label>
                                <input type="text" id="instruction-0" name="instructions" defaultValue="Instructions" />
                            </div>
                            <button id="instruct_btn" type="button" onClick={AddInstructions}>Add Instruction</button>
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

function AddInstructions() {
    var instruction_div = document.getElementById("instructions");
    instruction_counter++;
    
    var br = document.createElement("br");
    instruction_div.appendChild(br);

    var instruction_label = document.createElement("label");
    instruction_label.id = "label";
    instruction_label.innerHTML = "Instruction: ";
    instruction_div.appendChild(instruction_label)

    var instruction_input = document.createElement("input");
    instruction_input.id = 'instruction-' + instruction_counter;
    instruction_input.type = 'text';
    instruction_input.name = 'instructions';
    instruction_input.placeholder = 'instruction ' + instruction_counter;
    instruction_div.appendChild(instruction_input)
}

function AddIngredient() {
    var port_ingr = document.getElementById('portion_ingr');
    portion_ingr_counter++;

    var br = document.createElement("br");
    port_ingr.appendChild(br);

    var portion_label = document.createElement("label");
    portion_label.id = "label";
    portion_label.innerHTML = "Portion: "
    port_ingr.appendChild(portion_label)

    var portion_input = document.createElement("input");
    portion_input.id = 'portion-' + portion_ingr_counter;
    portion_input.type = 'text';
    portion_input.name = 'portion';
    portion_input.placeholder = 'portion ' + portion_ingr_counter;
    port_ingr.appendChild(portion_input);

    var ingr_label = document.createElement("label");
    ingr_label.id = "label"
    ingr_label.innerHTML = "Ingredient: "
    port_ingr.appendChild(ingr_label)

    var ingr_input = document.createElement("input");
    ingr_input.id = 'ingredient-' + portion_ingr_counter;
    ingr_input.type = 'text';
    ingr_input.name = 'ingredients';
    ingr_input.placeholder = 'Ingredient ' + portion_ingr_counter;
    port_ingr.appendChild(ingr_input);

}

function error() {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
};