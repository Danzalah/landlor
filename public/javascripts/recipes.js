let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load", success);
xhttp.addEventListener("error", error);
xhttp.open("GET", "/recipesOut", true);
xhttp.send();

/*
https://reactjs.org/docs/lists-and-keys.html
https://en.wikipedia.org/wiki/Map_(higher-order_function)
*/
function success() {
    let data = JSON.parse(xhttp.response);

    let rows = data.map((row) =>
        <tr key={JSON.stringify(row)}>
            <td> {row.id}</td>
            <td> {row.name}</td>
            <td> {row.author}</td>
            <td> {row.cooktime}</td>
            <td> {row.preptime}</td>
            <td> {row.totaltime}</td>
            <td> {row.published_date}</td>
            <td> {row.description}</td>
            <td> {row.images}</td>
            <td> {row.ingr_quant}</td>
            <td> {row.ingr_parts}</td>
            <td> {row.aggr_rating}</td>
            <td> {row.reviewcount}</td>
            <td> {row.servings}</td>
            <td> {row.recipe_instr}</td>
        </tr>
    );
    console.log(rows);
    let element = (
        <div>
            <h2>Recipe Database</h2>
            <table id="myTable">
                <thead>
                    <tr><th>id</th><th>name</th><th>author</th><th>cook time</th><th>prep time</th><th>total time</th><th>date published</th><th>description</th><th>images</th><th>portions</th><th>ingredients</th><th>rating</th><th>rating count</th><th>servings</th><th>instructions</th></tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('recipes')
    );
    /*
     datatable CSS
     https://datatables.net/
     https://github.com/fiduswriter/Simple-DataTables
    */
    const dataTable = new simpleDatatables.DataTable("#myTable");

}
function error() {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
}