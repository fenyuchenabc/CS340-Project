function expandUpdateForm(id, firstName, lastName, phoneNumber, email) {
    document.getElementById("update-teacher-id").value = id;
    document.getElementById("update-firstName").value = firstName;
    document.getElementById("update-lastName").value = lastName;
    document.getElementById("update-phoneNumber").value = phoneNumber;
    document.getElementById("update-email").value = email;
}

let updateStudentForm = document.getElementById('update-teacher-form-ajax');
//let updateButton = document.getElementById('update-button');

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateTeacherId = document.getElementById("update-teacher-id");
    let updateFirstName = document.getElementById("update-firstName");
    let updateLastName = document.getElementById("update-lastName");
    let updatePhoneNumber = document.getElementById("update-phoneNumber")
    let updateEmail = document.getElementById("update-email");


    // Get the values from the form fields
    let teacherIdValue = updateTeacherId.value;
    let firstNameValue = updateFirstName.value;
    let lastNameValue = updateLastName.value;
    let phoneValue = updatePhoneNumber.value;
    let emailValue = updateEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        idTeacher: teacherIdValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        phoneNumber: phoneValue,
        email: emailValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-teacher-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("after ajax setup")

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the row in the table with the updated data
            updateRowInTable(xhttp.response);

            // Clear the input fields after update
            updateTeacherId.value = '';
            updateFirstName.value = '';
            updateLastName.value = '';
            updatePhoneNumber.value = '';
            updateEmail.value = '';

            console.log("update teacher success")
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
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

    let rowToUpdate = document.querySelector(`tr[data-value="${updatedRow.idTeacher}"]`);

    if (rowToUpdate) {
        rowToUpdate.cells[0].innerText = updatedRow.idTeacher;
        rowToUpdate.cells[1].innerText = updatedRow.firstName;
        rowToUpdate.cells[2].innerText = updatedRow.lastName;
        rowToUpdate.cells[3].innerText = updatedRow.phoneNumber;
        rowToUpdate.cells[4].innerText = updatedRow.email;
    }
}
