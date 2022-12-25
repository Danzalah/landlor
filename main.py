import sqlite3
from tkinter import *


def canv():
    global orderName
    cur.execute("SELECT * FROM "+ tableName+ " ORDER BY "+orderName+";")
    print("SELECT * FROM "+ tableName+ " ORDER BY "+orderName+";")
    global num_cols

    num_cols = len(cur.description)
    num_rows = cur.rowcount
    # create a scrollable canvas to hold the data
    canvas = Canvas(app, width=400, height=450)
    canvas.grid(row=0, column=0)

    # create a frame to hold the data and add it to the canvas
    frame = Frame(canvas)
    frame.grid(row=0, column=0)

    app.grid_rowconfigure(0, weight=1)
    app.grid_columnconfigure(0, weight=1)
    delete = Button(app, text="Delete", command=deleteWindow).grid(row=1, column=1)
    insert = Button(app, text="Insert", command=insertWindow).grid(row=1, column=2)
    change = Button(app, text="Change Tables", command=changeTableWindow).grid(row=1, column=3)
    modifyRow = Button(app, text="Modify a Row", command=modifyWindow).grid(row=1, column=4)
    searchRow = Button(app, text="Search", command=searchWindow).grid(row=1, column=5)


    # create a header row
    for i in range(num_cols):
        Label(frame, text=cur.description[i][0]).grid(row=0, column=i)
        # orderName = cur.description[i][0]
        # Button(frame, text=orderName, command=lambda: order(orderName)).grid(row=0, column=i)

    # loop through the data and add a row for each record
    for i, row in enumerate(cur.fetchall()):
        for j in range(num_cols):
            Label(frame, text=row[j]).grid(row=i+1, column=j)
    # print(num_cols)

    # create a scrollbar and associate it with the canvas
    scrollbar = Scrollbar(app, orient="vertical", command=canvas.yview)
    scrollbar.grid(row=0, column=1, sticky="ns")
    canvas.configure(yscrollcommand=scrollbar.set)

def errorPop(message):
    top = Toplevel(app)
    top.geometry("250x250")
    top.title("Error")
    Label(top, text=message, font=('Mistral 13 bold')).place(x=30, y=30)
    button = Button(top, text="Ok", command=lambda: close_win(top))
    button.pack(pady=5, side=BOTTOM)
def close_win(top):
   top.destroy()
def insert_record(entries):
    insertTable = "INSERT INTO " + tableName + "("
    for j in range(num_cols):
        if j == num_cols-1:
            insertTable = insertTable + cur.description[j][0] + ")"
        else:
            insertTable = insertTable + cur.description[j][0] + ","

    insertTable = insertTable + " VALUES ("
    for i in entries:
        if i == entries[-1]:
            insertTable = insertTable + i.get() + ");"
        else:
            insertTable = insertTable + i.get() + ","

    try:
        cur.execute(insertTable)
    except BaseException as ex:
        errorPop("Error! " + str(ex))
        print("An exception occurred: " + str(ex))

    app.destroy()
    app.__init__()
    canv()
    return 1
def deleteWindow():
    top = Toplevel(app)
    top.geometry("300x250")
    top.title("Delete")
    entry = Entry(top, width=25)
    entry.pack()
    Label(top, text="Enter the ID number to delete").place(x=130, y=0)
    dele = Button(top, text="Delete", command=lambda: delete_entry(entry)).pack(pady=5, side=TOP)
    return 1
def delete_entry(entry):
    global tableName
    tableNext = ""
    deleteCall = "DELETE FROM "+ tableName + " WHERE "+cur.description[0][0]+ "="+entry.get()+";"
    if tableName == "RealEstate":
        tableNext = "Building"
    if tableName == "Building":
        tableNext = "Tennants"
    childRecordCount = "SELECT COUNT(*) FROM "+ tableNext+" WHERE "+cur.description[0][0] + " = "+entry.get()+";"
    cur.execute(childRecordCount)
    count = 0
    for table_name in cur:
        count = table_name[0]
    reset = "SELECT * FROM " + tableName + ";"
    cur.execute(reset)
    if count != 0 and table_name!="Tennants":
        errorPop("Error! Cannot delete or update a parent row: foreign key constraint fail" )

    else:
        try:
            cur.execute(deleteCall)
        except BaseException as ex:
            errorPop("Error! " + str(ex))
            print("An exception occurred: " + str(ex))
        app.destroy()
        app.__init__()
        canv()
    return 1

def order(name):
    global orderName
    print(name+ "TEST")
    # orderName = name
    # app.destroy()
    # app.__init__()
    #
    # canv()
    return 1

def insertWindow():
   #Create a Toplevel window
   top= Toplevel(app)
   top.geometry("750x250")
   top.title("Insert")
   entries = []
   add=0
   for i in range(num_cols):
       Label(top, text=cur.description[i][0]).place(x=150, y=0+add)
       entry = Entry(top, width=25)
       entry.pack()
       entries.append(entry)
       add=add+20


   #Create a Button to print something in the Entry widget
   Button(top,text= "Insert", command= lambda: insert_record(entries)).pack(pady= 5,side=TOP)
def changeIt(entry):
    global tableName
    tableName = entry.get()

    newTableCall = "SELECT * FROM "+tableName+";"
    try:
        cur.execute(newTableCall)
        app.destroy()
        app.__init__()

        canv()
    except BaseException as ex:
        errorPop("Error! " + str(ex))
        print("An exception occurred: " + str(ex))


    return 1
def changeTableWindow():
    top = Toplevel(app)
    top.geometry("750x250")
    top.title("Change Tables")
    entry = Entry(top, width=25)
    entry.pack()
    Label(top, text="Enter the table name").place(x=130, y=0)
    Button(top, text="Change", command=lambda: changeIt(entry)).pack(pady=5, side=TOP)
    return 1

def modifyWindow():
    top = Toplevel(app)
    top.geometry("300x250")
    top.title("Modify")
    entry = Entry(top, width=25)
    entry.pack()
    Label(top, text="Enter the ID number of the row you want to modify").place(x=130, y=0)
    mod = Button(top, text="Modify", command=lambda: modifyEntry(entry)).pack(pady=5, side=TOP)
    return 1

def modifyEntry(id):
    top = Toplevel(app)
    top.geometry("750x250")
    top.title("Modify")
    entries = []
    add = 0
    for i in range(num_cols):
        Label(top, text=cur.description[i][0]).place(x=150, y=0 + add)
        entry = Entry(top, width=25)
        entry.pack()
        entries.append(entry)
        add = add + 20
    Button(top, text="Accept", command=lambda: changeEntry(entries,id)).pack(pady=5, side=TOP)

def searchWindow():
    top = Toplevel(app)
    top.geometry("300x250")
    top.title("Search")
    entry = Entry(top, width=25)
    entry.pack()
    Label(top, text="Enter the ID number or Name to search.").place(x=130, y=0)
    check = Button(top, text="Search", command=lambda: search_entry(entry)).pack(pady=5, side=TOP)
    return 1
def search_entry(entry):
    i = 0
    x = 0
    if tableName == "RealEstate":
        i = 1
        x = 2
    if tableName == "Tennants":
        i = 4
        x = 5
    searchRecord = "SELECT * FROM "+tableName +" WHERE "
    if entry.get().isnumeric():
        searchRecord = searchRecord + cur.description[0][0] + " = " + entry.get() + ";"
    elif ~entry.get().isnumeric() and tableName == "Building":
        searchRecord = searchRecord + cur.description[2][0] + " like \'%" + entry.get() + "%\';"
    else:
        searchRecord = searchRecord + cur.description[i][0] + " like \'%" + entry.get() + "%\' OR " + cur.description[x][0] + " like \'%" + entry.get() + "%\';"
    cur.execute(searchRecord)
    top = Toplevel(app)
    top.geometry("300x250")
    top.title("Search")
    for i in range(num_cols):
        Label(top, text=cur.description[i][0]).grid(row=0, column=i)


    for i, row in enumerate(cur.fetchall()):
        for j in range(num_cols):
            Label(top, text=row[j]).grid(row=i+1, column=j)
    return 1
def changeEntry(entries,id):
    tableNext = ""
    if tableName == "RealEstate":
        tableNext = "Building"
    if tableName == "Building":
        tableNext = "Tennants"
    childRecordCount = "SELECT COUNT(*) FROM " + tableNext + " WHERE " + cur.description[0][0] + " = " + id.get() + ";"
    cur.execute(childRecordCount)
    count = 0
    for table_name in cur:
        count = table_name[0]
    if count != 0 and table_name!="Tennants":
        errorPop("Error! Cannot delete or update a parent row: foreign key constraint fail")
        reset = "SELECT * FROM " + tableName + ";"
        cur.execute(reset)
    else:
        reset = "SELECT * FROM "+tableName+";"
        cur.execute(reset)
        modRow = "UPDATE "+tableName + " SET "
        j = 0
        for i in entries:
            if i == entries[0]:
                if i.get() != "":
                    modRow = modRow + cur.description[j][0] + " = " + i.get()
            else:
                if i.get() != "":
                    modRow = modRow + ","+cur.description[j][0] + " = " + i.get()
            j=j+1
        modRow = modRow + " WHERE "+ cur.description[0][0] + " = "+ id.get()+";"
        try:
            cur.execute(modRow)
        except BaseException as ex:
            errorPop("Error! " + str(ex))
            print("An exception occurred: " + str(ex))

        app.destroy()
        app.__init__()
        canv()

def refresh():
    return 1
# create a new Tkinter application
app = Tk()
app.title("SQLite3 Table Viewer")

# connect to the database and get a cursor
global cur
db = sqlite3.connect("mydatabase.db")
cur = db.cursor()
#----------------------
createRealEstate = "CREATE TABLE IF NOT EXISTS RealEstate ( owner_id int NOT NULL, FirstName varchar(255), LastName varchar(255), phoneNumber varchar(255), PRIMARY KEY (owner_id));"
cur.execute(createRealEstate)
createBuilding = "CREATE TABLE IF NOT EXISTS Building (building_id int NOT NULL,owner_id int,name varchar(255),numberOfUnits int,PRIMARY KEY (building_id),FOREIGN KEY (owner_id) REFERENCES RealEstate(owner_id));"
cur.execute(createBuilding)
createTennants = "CREATE TABLE IF NOT EXISTS Tennants (tennant_id int NOT NULL,building_id int,rent_cost int,rent_due_date varchar(255),firstName varchar(255),lastName varchar(255),phoneNumber varchar(255),PRIMARY KEY (tennant_id),FOREIGN KEY (building_id) REFERENCES Building(building_id));"
cur.execute(createTennants)
#---------------------
populateEstate = "INSERT INTO RealEstate (owner_id, FirstName,LastName,phoneNumber) VALUES (1, 'Thomas', 'Red', '9991112222'),(2, 'Brad', 'Times', '9992223333'),(3, 'Cleu', 'Ted', '9993334444'),(4, 'Tyas', 'Fink', '9994445555'), (5, 'Theo', 'Blue', '9995556666'),(6, 'Trent', 'Reeding', '9996667777'),(7, 'Real', 'Red', '9997778888'),(8, 'Giveon', 'Tied', '9998889999');"
cur.execute(populateEstate)
populateBuilding = "INSERT INTO Building (building_id, owner_id,name,numberOfUnits) VALUES (101,1,'Great House',10),(102,1,'Gold House',3),(103,1,'Times Apartments',1),(11,2,'Flag Staff',15), (14,3,'American House',90),(76,4,'Clam Hut',0),(31,5,'Great Street Building',1),(32,5,'Hunter House',1),(33,5,'Vacation Inn Hotel',1),(201,6,'Great Hill Appartments',10),(415,7,'Suberu Estate',51),(300,8,'Stone Hill Appartments',0);"
# populateBuilding = "INSERT INTO Building (building_id, owner_id,numberOfUnits) VALUES (101,1,10),(102,1,3),(103,1,1),(11,2,15), (14,3,90),(76,4,0),(31,5,1),(32,5,1),(33,5,1),(201,6,10),(415,7,51),(300,8,0);"
cur.execute(populateBuilding)
populateTennants = "INSERT INTO Tennants (tennant_id, building_id,rent_cost,rent_due_date,firstName,lastName,phoneNumber) VALUES (1, 101,1500,'12/26/2022','Caleb','Long','9999999988'),(2, 101,1500,'12/26/2022','Drake','Pell','7799091188'),(3, 101,1500,'12/26/2022','Doly','Gas','1113334488'),(4, 102,2400,'01/26/2023','Stretch','Last','6065454488'),(5, 103,1300,'01/26/2022','Mark','LastBerg','9095454488'),(6, 11,760,'01/18/2023','Gumbo','Fod','3216549876'),(7, 14,1760,'02/10/2023','Beyond','Netero','3210009876'),(8, 14,1760,'02/10/2023','Below','Netero','3210001176'),(9, 31,1000,'01/10/2023','Josh','McNick','9518427654'),(10, 32,1000,'01/10/2023','Liam','McNick','9518423123'),(11, 33,1000,'01/10/2023','Jake','McNick','9518424312'),(12, 415,2300,'01/03/2023','Alpha','Bet','7078424319');"
cur.execute(populateTennants)


tableName="RealEstate"
orderName="owner_id"
cur.execute("SELECT * FROM RealEstate;")
num_cols = len(cur.description)
num_rows = cur.rowcount
# aa scrollable canvas to hold the data
canvas = Canvas(app, width=500, height=500)
canvas.grid(row=0, column=0)

# a frame to hold the data and add it to the canvas
frame = Frame(canvas)
frame.grid(row=0, column=0)
# frame.configure(bg='blue')
app.configure()
app.grid_rowconfigure(0, weight=1)
app.grid_columnconfigure(0, weight=1)
delete = Button(app, text="Delete", command=deleteWindow).grid(row=1, column=1)
insert = Button(app, text="Insert", command=insertWindow).grid(row=1, column=2)
change = Button(app, text="Change Tables", command=changeTableWindow).grid(row=1, column=3)
modifyRow = Button(app, text="Modify a Row", command=modifyWindow).grid(row=1, column=4)
searchRow = Button(app, text="Search", command=searchWindow).grid(row=1, column=5)
# create headers
for i in range(num_cols):
    Label(frame, text=cur.description[i][0]).grid(row=0, column=i)
    # orderName = cur.description[i][0]
    # Button(frame, text=orderName, command=lambda :order(orderName)).grid(row=0, column=i)

#add a row for each record
for i, row in enumerate(cur.fetchall()):
    for j in range(num_cols):
        Label(frame, text=row[j]).grid(row=i+1, column=j)

# create a scrollbar
scrollbar = Scrollbar(app, orient="vertical", command=canvas.yview)
scrollbar.grid(row=0, column=1, sticky="ns")
canvas.configure(yscrollcommand=scrollbar.set)


# run
app.mainloop()
