// const e = require("express");

let buildingxhttp = new XMLHttpRequest();
buildingxhttp.addEventListener("load", success);
buildingxhttp.addEventListener("error", error);
buildingxhttp.open("GET", "/buildingList", true);
buildingxhttp.send();

let tenxhttp = new XMLHttpRequest();
tenxhttp.addEventListener("load", success);
tenxhttp.addEventListener("error", error);
tenxhttp.open("GET", "/tennantList", true);
tenxhttp.send();

var flag = -1;
var last = "";

function success() {
    flag = -1;
    var searchI = document.getElementById("myInput");
    searchI.style.display = "block";
    var data = JSON.parse(buildingxhttp.response);
    let params = new URLSearchParams(window.location.search);
    let query = params.get('building_id');  // query by id
    // the loop. it'll return array of react node.
    const children = data.map((val) => (
        <a href={"javascript: refreshTennants("+val.building_id+")"}><button type="button" id={"button"+val.bname} class="list-group-item list-group-item-action" >{val.bname}</button></a>
        
    ));
    let element = (
        <div>
            <div class="list-group">
            <a href={"javascript: refreshTennants(-1)"}><button type="button" class="list-group-item list-group-item-action active" aria-current="true">&emsp;&emsp;&emsp;Estates</button></a>
            {children}
        </div>
        </div>
        
    );
    ReactDOM.render(
        element,
        document.getElementById('container')
    );
    // ----------------------------------
    var tdata = JSON.parse(tenxhttp.response);
    const tchildren = tdata.map((val) => (
        <a href= {"tennants?tennant_id="+val.tennant_id}><button type="button" class="list-group-item list-group-item-action">{val.name}</button></a>
    ));
    let telement = (
        <div>
            
        <div class="list-group">
            <button type="button" class="list-group-item list-group-item-action active" aria-current="true">&emsp;&emsp;&emsp;Tennants</button>
            {tchildren}
        </div>
        </div>
    );
    ReactDOM.render(
        telement,
        document.getElementById('list')
    );


}

function searchTennants(){
    var searchInput = document.getElementById("myInput");
    var tdata = JSON.parse(tenxhttp.response);
    var entry = [];
    for(var i =0;i<tdata.length;i++){
        if(tdata[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            entry.push(tdata[i]);
        }
    }
    const tchildren = entry.map((val) => (
        <a href= {"tennants?tennant_id="+val.tennant_id}><button type="button" class="list-group-item list-group-item-action">{val.name}</button></a>
    ));
    let telement = (
        <div>
            
        <div class="list-group">
            <button type="button" class="list-group-item list-group-item-action active" aria-current="true">&emsp;&emsp;&emsp;Tennants</button>
            {tchildren}
        </div>
        </div>
    );
    ReactDOM.render(
        telement,
        document.getElementById('list')
    );
  
}

function refreshTennants(id){
    flag = id;
    
    if(id != -1){
    console.log("Entry was recieved:  "+id);
    var data = JSON.parse(buildingxhttp.response);
    let params = new URLSearchParams(window.location.search);
    let query = params.get('building_id');  // query by id
    console.log(data)
    console.log(query)
    // the loop. it'll return array of react node.
    const rchildren = data.map((val) => (
        <a href={"javascript: refreshTennants("+val.building_id+")"}><button type="button" id={"button"+val.bname} class="list-group-item list-group-item-action" >{val.bname}</button></a>
        
    ));
    let relement = (
        <div>
            <h4 id = "edits"><a href={"javascript: addBuilding()"}> + </a> &emsp;&emsp;&emsp; <a href={"javascript: editBuilding()"}> edit </a> </h4>
            <div class="list-group">
            <a href={"javascript: refreshTennants(-1)"}><button type="button" class="list-group-item list-group-item-action active" aria-current="true">&emsp;&emsp;&emsp;Estates</button></a>
            {rchildren}
        </div>
        </div>
        
    );
    ReactDOM.render(
        relement,
        document.getElementById('container')
    );
    var tdata = JSON.parse(tenxhttp.response);
    console.log(tdata);
    var entry = []
    for(var i = 0; i<tdata.length;i++){
        if(tdata[i].building_id == id){
            entry.push(tdata[i]);
        }
    }
    console.log(entry);
    const tchildren = entry.map((val) => (
        <a href= {"tennants?tennant_id="+val.tennant_id}><button type="button" class="list-group-item list-group-item-action">{val.name}</button></a>
    ));
    let telement = (
        <div>
            <h4><a href={"javascript: addTennant()"}> + </a></h4>
        <div class="list-group">
            <button type="button" class="list-group-item list-group-item-action active" aria-current="true">&emsp;&emsp;&emsp;Tennants</button>
            {tchildren}
        </div>
        </div>
    );
    ReactDOM.render(
        telement,
        document.getElementById('list')
    );

    }
    else{
    var tdata = JSON.parse(tenxhttp.response);
    const tchildren = tdata.map((val) => (
        <a href= {"tennants?tennant_id="+val.tennant_id}><button type="button" class="list-group-item list-group-item-action">{val.name}</button></a>
    ));
    let telement = (
        <div class="list-group">
            <button type="button" class="list-group-item list-group-item-action active" aria-current="true">&emsp;&emsp;&emsp;Tennants</button>
            {tchildren}
        </div>
    );
    ReactDOM.render(
        telement,
        document.getElementById('list')
    );
    }
    

}

function addBuilding(){
    if (flag!=-1 ){
        var searchI = document.getElementById("myInput");
        searchI.style.display = "none";
        console.log("Adding a Building"+flag)
        var tdata = JSON.parse(tenxhttp.response);
    
        let telement = (
            <div class="list-group">
            </div>
        );
        ReactDOM.render(
            telement,
            document.getElementById('list')
        );    
        
    let element = (
        <div>
        <form action="addNewBuilding" id="form" method="post">
        <div class="col-lg-16">
            <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Building Name</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="bname" name="bname" placeholder="E.g. Vacation Inn"></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Number of units</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="units" name="units" placeholder="Must be a whole number E.g 5"></input></p>
                </div>
                </div>
                
            </div>
            </div>
            
        </div>
        <input type="hidden" id="ownerId" name="ownerId" value={tdata[0].owner_id}></input>
        <input type="hidden" id="buildingId" name="buildingId" value={tdata[0].building_id}></input>
        </form>
        <a href={"javascript: save()"}><button class="button-85" id="saveB" role="button">Save the building </button></a>
        </div>
    );
    

    ReactDOM.render(
        element,
        document.getElementById('container')
    );
    }
}
function editBuilding(){
    var entry = [];
    if (flag!=-1){
        var searchI = document.getElementById("myInput");
        searchI.style.display = "none";
        var data = JSON.parse(buildingxhttp.response);
        for (var i =0;i<data.length;i++){
            if (data[i].building_id==flag){
                entry = data[i];
            }
        }
        console.log(data);
        let telement = (
            <div class="list-group">
            </div>
        );
        ReactDOM.render(
            telement,
            document.getElementById('list')
        );    
        
    let element = (
        <div>
        <form action="updateBuilding" id="form" method="post">
        <div class="col-lg-16">
            <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Building Name</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="bname" name="bname" placeholder={entry.bname}></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Number of units</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="units" name="units" placeholder={entry.numberOfUnits}></input></p>
                </div>
                </div>
                
            </div>
            </div>
            
        </div>
        <input type="hidden" id="ownerId" name="ownerId" value={entry.owner_id}></input>
        <input type="hidden" id="buildingId" name="buildingId" value={entry.building_id}></input>
        </form>
        <a href={"javascript: saveAdd()"}><button class="button-85" id="saveB" role="button">Save the building </button></a>
        </div>
    );
    

    ReactDOM.render(
        element,
        document.getElementById('container')
    );
    }
    
}

function saveAdd(){
    var bUnits = document.getElementById("units");
    var buildName = document.getElementById("bname");
    if(bUnits.value == ""){
        bUnits.value = Number(bUnits.placeholder)+1;
    }
    if(buildName.value == ""){
        // console.log("The value is "+buildName.value);
        buildName.value = buildName.placeholder;
        // console.log("The placeholder is "+buildName.value);
    }
        // console.log("Bunits is"+bUnits.value +"Build Name is"+buildName.value )
        document.forms["form"].submit();
    
}

function save(){
    var bUnits = document.getElementById("units");
    var buildName = document.getElementById("bname");
    if(bUnits.value == ""){
        bUnits.value = 10;
    }
    
    if(buildName.value !=""){
        document.forms["form"].submit();
    }
    
}
function addTennant(){
    let data = JSON.parse(tenxhttp.response);
    var searchI = document.getElementById("myInput");
    searchI.style.display = "none";
    let telement = (
        <div class="list-group">
        </div>
    );
    ReactDOM.render(
        telement,
        document.getElementById('list')
    );    

    let element = (
        <div>
        <form action="addTennant" id="form" method="post">
        <div class="col-lg-16">
            <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="tname" name="tname" placeholder="Full Name"></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Phone Number / Email</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="phone" name="phone" placeholder="999 876 5432"></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Rent Cost</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="cost" name="cost" placeholder="1300"></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Rent Due Date "yyyy-mm-dd"</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="due" name="due" placeholder="2023-01-01"></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Payment Interval(in months) e.g. 1</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="paycycle" name="paycycle" placeholder= "1"></input></p>
                
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Room Number</p>
                </div>
                <div class="col-sm-7">
                    <p class="text-muted mb-0"><input type="text" id="roomnumber" name="roomnumber" placeholder= "room 1"></input></p>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        <input type="hidden" id="bId" name="bId" value={data[0].building_id}></input>
        </form>
        <a href={"javascript: saveT()"}><button class="button-85" id="saveT" role="button">Save the tennant </button></a>
        </div>
    );
    

    ReactDOM.render(
        element,
        document.getElementById('container')
    );
}

function saveT(){
    var tname = document.getElementById("tname");
    var phone = document.getElementById("phone");
    var cost = document.getElementById("cost");
    var due = document.getElementById("due");
    var roomnumber = document.getElementById("roomnumber");
    var paycycle = document.getElementById("paycycle");
    // Validating format, if empty or wrong format return what was there before 
    if(tname.value == ""){
        tname.value = tname.placeholder;
    }
    if(phone.value == ""){
        phone.value = phone.placeholder;
    }
    if(cost.value == ""){
        cost.value = cost.placeholder;
    }
    const regex = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    if(due.value == "" || !regex.test(due.value)){
        due.value = due.placeholder;
    }
    if(roomnumber.value == ""){
        roomnumber.value = roomnumber.placeholder;
    }
    var isNum = isNaN(paycycle.value) === false;
    if(paycycle.value == "" || !isNum){
        paycycle.value =1;
    }
    else{
        paycycle.value = parseInt(paycycle.value);
        }
    // Sumbiting form manually instead of using button, doing it this way so i call save function which validates before POST to server side
    document.forms["form"].submit();
    
}

function error() {
    console.log(header_request.readyState);
    console.log(header_request.status);
};


