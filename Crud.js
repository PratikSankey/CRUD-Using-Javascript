var selectedRow = null;
// Declare Global Array To store id of previously register employee
let idArray = [];

function onFormSubmit() {

    if (validate()) {

        //Store data entered by user inside formData object
        var formData = readFormData();
        if (selectedRow == null && checkId())
            insertNewRecord(formData);

        else
            updateRecord(formData);

        resetForm();
    }
    else {

        if (!(checkId() && validate())) {
            document.getElementById("error1").style.display = "block";
            document.getElementById("error2").style.display = "block";
        }
        else {

            if (!(checkId())) {
                document.getElementById("error1").style.display = "block";
            }
            else {
                document.getElementById("error2").style.display = "block";
            }
        }

    }
}

//Function to verify employee id is not repeated
function checkId() {
    let id = document.getElementById("id").value;

    if (idArray.some((val) => val == id)) {
        //id already exist.. so display error.
        // document.getElementById("error1").style.display = "block";

        return false;
    }
    else {
        idArray.push(id);
        document.getElementById("error1").style.display = "none";
        return true;
    }

}
//READ
//Retrieving Form data
function readFormData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["name"] = document.getElementById("name").value;
    formData["age"] = document.getElementById("age").value;
    formData["gender"] = document.getElementById("gender").value;
    return formData;
}
//Inserting data record inside table
function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    // Insert new cell's &Insert record inside newly created cell's
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.age;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)" class="editbttn">Edit</a>         
                       <button onClick="onDelete(this)" class="deletebttn">Delete</a>`;
    //onEdit() for editing the record
    //onDelete() for deleting the record          
}
//Reset form after successful insertion of one employee record
function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    selectedRow = null;
}
//EDIT
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[3].innerHTML;
    //Confirmation Before Editing this record
    confirm('Are you sure to Edit this record ? \n ⚠️💥💀');
}
//UPDATE
function updateRecord(formData) {
    //Update data according to data inserted inside form    
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.gender;
}
//DELETE
function onDelete(td) {
    //Please Confirm Before deleting this record
    if (confirm('Are you sure to delete this record ? \n ⚠️💥💀')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;

    if (document.getElementById("id").value == "") {
        isValid = false;
        alert("Please Enter ID");
    }
    else {
        isValid = true;
    }
    //Validation for Username
    //Create pattern using regex and match it with user input for validating username
    var regexp = /^[a-zA-Z ]*$/;
    if (!document.getElementById("name").value.match(regexp)) {
        // document.getElementById("error2").style.display = "block";
        return isValid = false;
    }
    else {
        document.getElementById("error2").style.display = "none";
    }

    return isValid;
}

