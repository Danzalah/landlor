let xhttp = new XMLHttpRequest();
xhttp.addEventListener("load", success);
xhttp.addEventListener("error", error);
xhttp.open("GET", "/recipesOut", true);
xhttp.send();
let pos = 0;

function success() {
    // if (document.getElementById("submit")!= null){
    //     const loadMore = document.getElementById("submit");
    //     loadMore.addEventListener("click",function(e) {
    //     console.log("button was clicked");
    //     });
    // }
    console.log("succes ran");
    let data = JSON.parse(xhttp.response);
    let params = new URLSearchParams(window.location.search)
    var matches = [];
    let tname ="";
    let tid ="";
    let tpercent;
    if(params.get('message') != null){
        let ingredients = params.get('message').split(",");
        // console.log(data);
        
        for (const [i, row] of data.entries()) {
            // console.log(row);
            for (const [j, ingr] of row.ingredients.entries()) {
                var id;
                var name= "";
                var count = 0;
                var match = false;
                var length;
                // console.log(ingr);
                for (const [k, search_ingr] of ingredients.entries()) {
                    if (search_ingr == ingr) {
                        if (!match) {
                            id = row.id;
                            length = row.ingredients.length;
                            match = true;
                        }
                        count += 1;
                    }
                }
                if (match) {
                    var obj = {
                        id: id,
                        name: row.name,
                        percent_match: Math.round(count / length * 100),
                    };
                    matches.push(obj);
                    match = false;
                }

            }
        }

        //TODO:: something wrong with matches, does not redirect to correct recipes
        // console.log(matches)
        pos = matches.length%pos;
        document.getElementById("submit").style.display = "block";
    
    let rows = matches.map((row) =>
        <tr key={JSON.stringify(row)}>
            
            <td> <a href={"recipe_profile?recipe=" + row.id}>{row.name}</a></td>    {/* pass id here to get query later*/}
            <td> {row.percent_match}</td>
        </tr>
    );
    
    let element = (
        <div>
            <form action="whatscooking" method="post" id="submit_ingredients">
            <ul className="homeBar">
                <li><img className="homeLogo" src="../images/logo_large.png" width="400" /></li>
                <li>
                    <div className="bar">
                        <input className="searchbar" type="text" name="ingredients" placeholder="Enter ingredients with commas eg: milk,fish " />
                    </div>
                </li>
            </ul>
            </form>
           {/* ---------------------------------------------- */}
           <div id="food-table" className="clear">
            <h2>Match Percentage</h2>
            <br></br>
            <div className="food">
                <h3>{matches[pos].name}<span>{matches[pos].percent_match}%</span></h3>
                <a className="gotofood" href={"recipe_profile?recipe=" + matches[pos].id}>Let's Cook!</a>         
            </div>
            <div className="food" id="most-popular">
                <h3>{matches[pos+1].name}<span>{matches[pos+1].percent_match}%</span></h3>
                <a className="gotofood" href={"recipe_profile?recipe=" + matches[pos+1].id}>Let's Cook!</a> 
            </div>
            <div className="food">
                <h3>{matches[pos+2].name}<span>{matches[pos+2].percent_match}%</span></h3>
                <a className="gotofood" href={"recipe_profile?recipe=" + matches[pos+2].id}>Let's Cook!</a>
            </div>
            <div className="food">
                <h3>{matches[pos+3].name}<span>{matches[pos+3].percent_match}%</span></h3>
                <a className="gotofood" href={"recipe_profile?recipe=" + matches[pos+3].id}>Let's Cook!</a>
            </div> 	
            
        </div>
           {/* ------------------------------------------------------------- */}
           
        </div>
    );
    
    ReactDOM.render(
        element,
        document.getElementById('whatscooking')
    );
    }
    else{
        let element = (
            <div>
                <form action="whatscooking" method="post" id="submit_ingredients">
                <ul className="homeBar">
                    <li><img className="homeLogo" src="../images/logo_large.png" width="400" /></li>
                    <li>
                        <div className="bar">
                            <input className="searchbar" type="text" name="ingredients" placeholder="Enter ingredients with commas eg: milk,fish " />
                        </div>
                    </li>
                </ul>
            </form>
            </div>
        );
    
        ReactDOM.render(
            element,
            document.getElementById('whatscooking')
        );
    }
};

const loadMore = document.getElementById("submit");
loadMore.addEventListener("click",next);
loadMore.addEventListener("click",success);
function next() {
    pos++;
  }

function error() {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
};


