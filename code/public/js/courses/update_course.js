function expandUpdateForm(idCourse, courseCode, startTime, endTime, daysOfWeek, idClassroom, idTeacher) {
    document.getElementById("update-course-id").value = idCourse;
    document.getElementById("update-courseCode").value = courseCode;
    document.getElementById("update-startTime").value = startTime;
    document.getElementById("update-endTime").value = endTime;
    document.getElementById("update-daysOfWeek").value = daysOfWeek;
    document.getElementById("update-idClassroom").value = idClassroom;
    document.getElementById("update-idTeacher").value = idTeacher;

}

let updateStudentForm = document.getElementById('update-course-form-ajax');
//let updateButton = document.getElementById('update-button');

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateCourseId = document.getElementById("update-course-id");
    let updateCourseCode = document.getElementById("update-courseCode");
    let updateStartTime = document.getElementById("update-startTime");
    let updateEndTime = document.getElementById("update-endTime");
    let updateDaysOfWeek = document.getElementById("update-daysOfWeek");
    let updateIdClassroom = document.getElementById("update-idClassroom");
    let updateIdTeacher = document.getElementById("update-idTeacher");

    // Get the values from the form fields
    let courseIdValue = updateCourseId.value
    let courseCodeValue = updateCourseCode.value;
    let startTimeValue = updateStartTime.value;
    let endTimeValue = updateEndTime.value;
    let daysOfWeekValue = updateDaysOfWeek.value;
    let idClassroomValue = updateIdClassroom.value;
    let idTeacherValue = updateIdTeacher.value;

    // Put our data we want to send in a javascript object
    let data = {
        idCourse: courseIdValue,
        courseCode: courseCodeValue,
        startTime: startTimeValue,
        endTime: endTimeValue,
        daysOfWeek: daysOfWeekValue,
        idClassroom: idClassroomValue,
        idTeacher: idTeacherValue,

    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-course-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("after ajax setup")

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the row in the table with the updated data
            updateRowInTable(xhttp.response);

            
            // Clear the input fields for another transaction
            updateCourseCode.value = '';
            updateStartTime.value = '';
            updateEndTime.value = '';
            updateDaysOfWeek.value = '';
            updateIdClassroom.selectedIndex = 0;
            updateIdTeacher.selectedIndex = 0;

            console.log("update course success")
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

    let rowToUpdate = document.querySelector(`tr[data-value="${updatedRow.idCourse}"]`);

    if (rowToUpdate) {
        rowToUpdate.cells[0].innerText = updatedRow.idCourse;
        rowToUpdate.cells[1].innerText = updatedRow.courseCode;
        rowToUpdate.cells[2].innerText = updatedRow.startTime;
        rowToUpdate.cells[3].innerText = updatedRow.endTime;
        rowToUpdate.cells[4].innerText = updatedRow.daysOfWeek;
        rowToUpdate.cells[5].innerText = updatedRow.idClassroom;
        rowToUpdate.cells[6].innerText = updatedRow.idTeacher;

    }
}
