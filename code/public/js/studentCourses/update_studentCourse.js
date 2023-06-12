function expandUpdateForm(idStudent, idCourse) {
    document.getElementById("update-idStudent").value = idStudent;
    document.getElementById("update-idCourse").value = idCourse;
}

let updateStudentForm = document.getElementById('update-studentCourse-form-ajax');
//let updateButton = document.getElementById('update-button');

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    // Get form fields we need to get data from
    let updateIdStudent = document.getElementById("update-idStudent");
    let updateIdCourse = document.getElementById("update-idCourse");

    // Get the values from the form fields
    let idStudent = updateIdStudent.value
    let idCourse = updateIdCourse.value;

    // Put our data we want to send in a javascript object
    let data = {
        idStudent: idStudent,
        idCourse: idCourse,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-studentCourse-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("after ajax setup")

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the row in the table with the updated data
            updateRowInTable(xhttp.response);

            
            // Clear the update fields for another transaction
            updateIdStudent.selectedIndex = 0;
            updateIdCourse.selectedIndex = 0;

            console.log("update classroom success")
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the update.")
        }
    }

    // Send the request and wait for the response
    console.log(data)
    xhttp.send(JSON.stringify(data));
})

// Updates the row in the table with the updated data
updateRowInTable = (data) => {
    // let parsedData = JSON.parse(data);
    // let updatedRow = parsedData[0];

    // let rowToUpdate = document.querySelector(`tr[data-value="${updatedRow.idClassroom}"]`);

    // if (rowToUpdate) {
    //     rowToUpdate.cells[0].innerText = updatedRow.idClassroom;
    //     rowToUpdate.cells[1].innerText = updatedRow.idCourse;
    // }
    location.reload()
}
