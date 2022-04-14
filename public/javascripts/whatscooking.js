// let xhttp = new XMLHttpRequest();

// xhttp.addEventListener("load",success);
// xhttp.addEventListener("error",error);
// xhttp.open("GET", "/recipesOut", true);
// xhttp.send();

// /*
// https://reactjs.org/docs/lists-and-keys.html
// https://en.wikipedia.org/wiki/Map_(higher-order_function)
// */
// function success(){
//   let data = JSON.parse(xhttp.response);

//   let rows = data.map((row) =>
//     <tr key={JSON.stringify(row)}>
//         <td> { row.recipeid }</td>
//         <td> { row.name }</td>
//         <td> { row.directions }</td>
//     </tr>
//   );
//   console.log(rows);
//   let element =(
//     <div>
//       <h2>Recipe Database</h2>
//         <table id="myTable">
//         <thead>
//         <tr><th>recipeid</th><th>name</th><th>directions</th></tr>
//         </thead>
//         <tbody>
//             {rows}
//         </tbody>
//         </table>
//     </div>
//   );

//   ReactDOM.render(
//     element,
//     document.getElementById('recipes')
//   );
//   /*
//    datatable CSS
//    https://datatables.net/
//    https://github.com/fiduswriter/Simple-DataTables
//   */
//   const dataTable = new simpleDatatables.DataTable("#myTable");

// }
// function error(){
//   console.log(xhttp.readyState);
//   console.log(xhttp.status);
// }