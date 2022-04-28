let profle_request = new XMLHttpRequest();

profle_request.addEventListener("load", success);
profle_request.addEventListener("error", error);
profle_request.open("GET", "/usersLog", true);
profle_request.send();

function success() {

    let info = JSON.parse(profle_request.response)


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
                        <input type="text" name="title" defaultValue="Title" />
                        <input type="text" name="description" defaultValue="Description" />
                        <input type="text" name="ingredients" defaultValue="Ingredients" />
                        <input type="text" name="portion" defaultValue="Portion" />
                        <input type="text" name="instructions" defaultValue="Instructions" />
                        <input type="text" name="preptime" defaultValue="Prep Time" />
                        <input type="text" name="cooktime" defaultValue="Cook Time" />
                        <input type="text" name="totaltime" defaultValue="Total Time" />
                        <input type="text" name="servings" defaultValue="0" />
                        <input type="text" name="images" defaultValue="images" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div className="recipes">
                    <h2>Recipes</h2>
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
