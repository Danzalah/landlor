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
            <td> {row.cook_time}</td>
            <td> {row.prep_time}</td>
            <td> {row.total_time}</td>
            <td> {row.date_published}</td>
            <td> {row.description}</td>
            <td> {row.images}</td>
            <td> {row.ing_portion}</td>
            <td> {row.ingredients}</td>
            <td> {row.rating}</td>
            <td> {row.rating_count}</td>
            <td> {row.servings}</td>
            <td> {row.instructions}</td>
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