// const e = require("express");

let profile_request = new XMLHttpRequest();
profile_request.addEventListener("load", success);
profile_request.addEventListener("error", error);
profile_request.open("GET", "/usersLog", true);
profile_request.send();

let tennant_request = new XMLHttpRequest();
tennant_request.addEventListener("load", success);
tennant_request.addEventListener("error", error);
tennant_request.open("GET", "/tennantList", true);
tennant_request.send();

function success() {
    var parse = JSON.parse(tennant_request.response);

    // let checkLoggedIn = JSON.parse(profile_request.response);

    var names = [];
    
    for(var i=0;i<parse.length && i<5;i++){
        if(parse[i].name != null && parse[i].name != "" ){
            names.push([parse[i].name,parse[i].rent_due_date,parse[i].rent_cost,parse[i].tennant_id]);
        }
        else{
            names.push(["No upcoming payments","","",""])
        }
        
    }
    //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const tchildren = names.map((val) => (
      <div class="event_item">
        <div class="ei_Dot"></div>
          <div class="ei_Title"><a  class = "no_line" href= {"tennants?tennant_id="+val[3]}>{val[0]}</a>&emsp;&emsp;<a class = "no_line" href={"javascript: paid("+val[3]+")"}><button class="button-5" id="paidRent" role="button">Paid </button></a></div>
          <div class="ei_Copy">Rent of {val[2]} due on {val[1].slice(0,10)}</div>
        </div>
    ));
    
    let elementInfo = (
        <div class="calendar light">
      <div class="calendar_header">
        <h1 class = "header_title">Welcome Back</h1>
        <p class="header_copy"> Calendar Plan</p>
      </div>
      <div class="calendar_plan">
        <div class="cl_plan">
          <div class="cl_title">Today</div>
          <div class="cl_copy">{today}</div>
          <div class="cl_add">
          </div>
        </div>
      </div>
      <div class="calendar_events">
        <p class="ce_title">Upcoming Payments</p>
        {tchildren}
      </div>
    </div>

    );
    
    ReactDOM.render(
        elementInfo,
        document.getElementById('container')
    );
 
};

function paid(id){
  console.log("Paid " + id);
  let element = (
    <div>
    <form action="updatePaid" id="form" method="post">
    <input type="hidden" id="tennantId" name="tennantId" value={id}></input>
    </form>
    </div>
    );
  ReactDOM.render(
    element,
    document.getElementById('message')
);
  document.forms["form"].submit();
}

function error() {
    console.log(tennant_request.readyState);
    console.log(tennant_request.status);
};