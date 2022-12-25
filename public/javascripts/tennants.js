let data_request = new XMLHttpRequest();
data_request.addEventListener("load", success);
data_request.addEventListener("error", error);
data_request.open("GET", "/usersLog", true);
data_request.send();

let tennant_xhttp = new XMLHttpRequest();
tennant_xhttp.addEventListener("load", success);
tennant_xhttp.addEventListener("error", error);
tennant_xhttp.open("GET", "/tennantOut", true);
tennant_xhttp.send();

function success() {
    var eProfile = document.getElementById("editProfile");
    var dProfile = document.getElementById("deleteProfile");
    var sProfile = document.getElementById("saveProfile");
    eProfile.style.display = "block";
    dProfile.style.display = "none";
    sProfile.style.display = "none";
    // let checkLoggedIn = JSON.parse(data_request.response);
    let data = JSON.parse(tennant_xhttp.response);  
    let params = new URLSearchParams(window.location.search)
    let query = params.get('tennant_id')    // query by id

    let entry = []
    for(var i = 0; i<data.length;i++){
        if(data[i].tennant_id==query){
            entry = data[i]
        }
    }

    let element = (
        <div class="col-lg-16">
            <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0">{entry.tennantname}</p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Building</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><a href= {"buildings?building_id="+entry.building_id}>{entry.name}</a></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Phone Number / Email</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0">{entry.phonenumber}</p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Rent Cost</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0">{entry.rent_cost}</p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Rent Due Date</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0">{entry.rent_due_date.slice(0,10)}</p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Payment Interval (in months)</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0">{entry.paycycle}</p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Room Number</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0">{entry.roomnumber}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
    

    ReactDOM.render(
        element,
        document.getElementById('container')
    );

}

function edit() {
    var eProfile = document.getElementById("editProfile");
    var dProfile = document.getElementById("deleteProfile");
    var sProfile = document.getElementById("saveProfile");
    // Hiding and displaying buttons 
    dProfile.style.display = "inline";
    eProfile.style.display = "none";
    sProfile.style.display = "inline";
    let data = JSON.parse(tennant_xhttp.response);  
    // getting header data from url 
    let params = new URLSearchParams(window.location.search)
    let query = params.get('tennant_id')    // query by id

    // Search through tennant list find tennant with matching tennant_id
    let entry = []
    for(var i = 0; i<data.length;i++){
        if(data[i].tennant_id==query){
            entry = data[i]
        }
    }


    let element = (
        <form action="edit" id="form" method="post">
        <div class="col-lg-16">
            <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="tname" name="tname" placeholder={entry.tennantname}></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Phone Number / Email</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="phone" name="phone" placeholder={entry.phonenumber}></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Rent Cost</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="cost" name="cost" placeholder={entry.rent_cost}></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-4">
                    <p class="mb-0">Rent Due Date "yyyy-mm-dd"</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="due" name="due" placeholder={entry.rent_due_date.slice(0,10)}></input></p>
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Payment Interval(in months) e.g. 1</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-0"><input type="text" id="paycycle" name="paycycle" placeholder= {entry.paycycle}></input></p>
                
                </div>
                </div>
                <hr></hr>
                <div class="row">
                <div class="col-sm-6">
                    <p class="mb-0">Room Number</p>
                </div>
                <div class="col-sm-7">
                    <p class="text-muted mb-0"><input type="text" id="roomnumber" name="roomnumber" placeholder= {entry.roomnumber}></input></p>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        <input type="hidden" id="Id" name="Id" value={query}></input>
        </form>
    );
    

    ReactDOM.render(
        element,
        document.getElementById('container')
    );

}

function save(){
    var tname = document.getElementById("tname");
    var bname = document.getElementById("bname");
    var phone = document.getElementById("phone");
    var cost = document.getElementById("cost");
    var due = document.getElementById("due");
    var roomnumber = document.getElementById("roomnumber");
    var paycycle = document.getElementById("paycycle");
    // Validating format, if empty or wrong format return what was there before 
    if(tname.value == ""){
        tname.value = tname.placeholder
    }
    if(phone.value == ""){
        phone.value = phone.placeholder
    }
    if(cost.value == ""){
        cost.value = cost.placeholder
    }
    const regex = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    if(due.value == "" || !regex.test(due.value)){
        due.value = due.placeholder
    }
    if(roomnumber.value == ""){
        roomnumber.value = roomnumber.placeholder
    }
    var isNum = isNaN(paycycle.value) === false;
    if(paycycle.value == "" || !isNum){
        paycycle.value = paycycle.placeholder
    }
    else{
        paycycle.value = parseInt(paycycle.value);
        }
    // Sumbiting form manually instead of using button, doing it this way so i call save function which validates before POST to server side
    document.forms["form"].submit();
}

function deleteP(){
    let params = new URLSearchParams(window.location.search)
    let query = params.get('tennant_id');
    let element = (
        <div>
        <form action="deleteProfile" id="form" method="post">
        <input type="hidden" id="tennantId" name="tennantId" value={query}></input>
        </form>
        </div>
    );
    
    ReactDOM.render(
        element,
        document.getElementById('container')
    );
    document.forms["form"].submit();
}
const changeProfile = document.getElementById("editProfile");
changeProfile.addEventListener("click",edit);

const saveProfile = document.getElementById("saveProfile");
saveProfile.addEventListener("click",save);

const deleteProfile = document.getElementById("deleteProfile");
deleteProfile.addEventListener("click",deleteP);

function error() {
    console.log(tennant_xhttp.readyState);
    console.log(tennant_xhttp.status);
};


