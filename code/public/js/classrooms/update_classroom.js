function expandUpdateForm(idClassroom, location, capacity, isLab) {
    document.getElementById("update-idClassroom").value = idClassroom;
    document.getElementById("update-location").value = location;
    document.getElementById("update-capacity").value = capacity;
    document.getElementById("update-isLab").value = isLab;
}

let updateStudentForm = document.getElementById('update-classroom-form-ajax');
//let updateButton = document.getElementById('update-button');

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    // Get form fields we need to get data from
    let updateIdClassroom = document.getElementById("update-idClassroom");
    let updateLocation = document.getElementById("update-location");
    let updateCapacity = document.getElementById("update-capacity");
    let updateIsLab = document.getElementById("update-isLab");

    // Get the values from the form fields
    let classroomIdValue = updateIdClassroom.value
    let locationValue = updateLocation.value;
    let CapacityValue = updateCapacity.value;
    let isLabValue = updateIsLab.value;

    // Put our data we want to send in a javascript object
    let data = {
        idClassroom: classroomIdValue,
        location: locationValue,
        capacity: CapacityValue,
        isLab: isLabValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-classroom-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("after ajax setup")

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the row in the table with the updated data
            updateRowInTable(xhttp.response);

            
            // Clear the update fields for another transaction
             updateIdClassroom.value = '';
             updateLocation.selectedIndex = 0;
             updateCapacity.value ='' ;
             updateIsLab.selectedIndex = 0;

            console.log("update classroom success")
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the update.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// // Activate the update button
// updateButton.addEventListener("click", function () {
//     let selectedRow = document.querySelector(".selected-row");
//     if (selectedRow) {
//         expandUpdateForm(selectedRow);
//     } else {
//         alert("Please select a row to update.");
//     }
// });

// Updates the row in the table with the updated data
updateRowInTable = (data) => {
    let parsedData = JSON.parse(data);
    let updatedRow = parsedData[0];

    let rowToUpdate = document.querySelector(`tr[data-value="${updatedRow.idClassroom}"]`);

    if (rowToUpdate) {
        rowToUpdate.cells[0].innerText = updatedRow.idClassroom;
        rowToUpdate.cells[1].innerText = updatedRow.location;
        rowToUpdate.cells[2].innerText = updatedRow.capacity;
        rowToUpdate.cells[3].innerText = updatedRow.isLab;
    }
}
