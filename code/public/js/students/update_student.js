function expandUpdateForm(id, firstName, lastName, email, dateOfBirth, year) {
    document.getElementById("update-student-id").value = id;
    document.getElementById("update-firstName").value = firstName;
    document.getElementById("update-lastName").value = lastName;
    document.getElementById("update-email").value = email;
    document.getElementById("update-dateOfBirth").value = dateOfBirth;
    document.getElementById("update-year").value = year;
}

let updateStudentForm = document.getElementById('update-student-form-ajax');
//let updateButton = document.getElementById('update-button');


// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateStudentId = document.getElementById("update-student-id");
    let updateFirstName = document.getElementById("update-firstName");
    let updateLastName = document.getElementById("update-lastName");
    let updateEmail = document.getElementById("update-email");
    let updateDateOfBirth = document.getElementById("update-dateOfBirth");
    let updateYear = document.getElementById("update-year");

    // Get the values from the form fields
    let studentIdValue = updateStudentId.value;
    let firstNameValue = updateFirstName.value;
    let lastNameValue = updateLastName.value;
    let emailValue = updateEmail.value;
    let dateOfBirthValue = updateDateOfBirth.value;
    let yearValue = updateYear.value;

    // Put our data we want to send in a javascript object
    let data = {
        idStudent: studentIdValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        dateOfBirth: dateOfBirthValue,
        year: yearValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-student-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("after ajax setup")

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the row in the table with the updated data
            updateRowInTable(xhttp.response);

            // Clear the input fields after update
            updateStudentId.value = '';
            updateFirstName.value = '';
            updateLastName.value = '';
            updateEmail.value = '';
            updateDateOfBirth.value = '';
            updateYear.selectedIndex = 0;

            console.log("update student success")
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

    let rowToUpdate = document.querySelector(`tr[data-value="${updatedRow.idStudent}"]`);

    if (rowToUpdate) {
        rowToUpdate.cells[0].innerText = updatedRow.idStudent;
        rowToUpdate.cells[1].innerText = updatedRow.firstName;
        rowToUpdate.cells[2].innerText = updatedRow.lastName;
        rowToUpdate.cells[3].innerText = updatedRow.email;
        rowToUpdate.cells[4].innerText = updatedRow.dateOfBirth;
        rowToUpdate.cells[5].innerText = updatedRow.year;
    }
}
