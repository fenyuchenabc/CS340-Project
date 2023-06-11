/*
  Citation for the following JavaScript file:
  Date: 05/30/2023
  Adapted from: add_person.js
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/
// Get the objects we need to modify
let addClassroomForm = document.getElementById('add-classroom-form-ajax');

// Modify the objects we need
addClassroomForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdClassroom = document.getElementById("input-idClassroom");
    let inputLocation = document.getElementById("input-location");
    let inputCapacity = document.getElementById("input-capacity");
    let inputIsLab = document.getElementById("input-isLab");

    // Get the values from the form fields
    let IdClassroomValue = inputIdClassroom.value;
    let LocationValue = inputLocation.value;
    let CapacityValue = inputCapacity.value;
    let IsLabValue = inputIsLab.value;

    // Put our data we want to send in a javascript object
    let data = {
        idClassroom: IdClassroomValue,
        location: LocationValue,
        capacity: CapacityValue,
        isLab: IsLabValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-classroom-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputIdClassroom.value = '';
            inputLocation.value = '';
            inputCapacity.value = '';
            inputIsLab.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("classrooms-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idClassroomCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let capacityCell = document.createElement("TD");
    let isLabCell = document.createElement("TD");

    // Fill the cells with correct data
    idClassroomCell.innerText = newRow.idClassroom;
    locationCell.innerText = newRow.location;
    capacityCell.innerText = newRow.capacity;
    isLabCell.innerText = newRow.isLab;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteClassroom(newRow.idClassroom);
    };

    // Add the cells to the row
    row.appendChild(idClassroomCell);
    row.appendChild(locationCell);
    row.appendChild(capacityCell);
    row.appendChild(isLabCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.idClassroom);
    // Add the row to the table
    currentTable.appendChild(row);
}