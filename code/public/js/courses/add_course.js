/*
  Citation for the following JavaScript file:
  Date: 05/30/2023
  Adapted from: add_person.js
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/
// Get the objects we need to modify
let addCourseForm = document.getElementById('add-course-form-ajax');

// Modify the objects we need
addCourseForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCourseCode = document.getElementById("input-courseCode");
    let inputStartTime = document.getElementById("input-startTime");
    let inputEndTime = document.getElementById("input-endTime");
    let inputDaysOfWeek = document.getElementById("input-daysOfWeek");
    let inputIdClassroom = document.getElementById("input-idClassroom");
    let inputIdTeacher = document.getElementById("input-idTeacher");

    // Get the values from the form fields
    let courseCodeValue = inputCourseCode.value;
    let startTimeValue = inputStartTime.value;
    let endTimeValue = inputEndTime.value;
    let daysOfWeekValue = inputDaysOfWeek.value;
    let idClassroomValue = inputIdClassroom.value;
    let idTeacherValue = inputIdTeacher.value;

    // Put our data we want to send in a javascript object
    let data = {
        courseCode: courseCodeValue,
        startTime: startTimeValue,
        endTime: endTimeValue,
        daysOfWeek: daysOfWeekValue,
        idClassroom: idClassroomValue,
        idTeacher: idTeacherValue,

    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-course-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCourseCode.value = '';
            inputStartTime.value = '';
            inputEndTime.value = '';
            inputDaysOfWeek.value = '';
            inputIdClassroom.selectIndex = 0;
            inputIdTeacher.selectIndex = 0;
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
    let currentTable = document.getElementById("courses-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCourseCell = document.createElement("TD");
    let courseCodeCell = document.createElement("TD");
    let startTimeCell = document.createElement("TD");
    let endTimeCell = document.createElement("TD");
    let daysOfWeekCell = document.createElement("TD");
    let idClassroomCell = document.createElement("TD");
    let idTeacherCell = document.createElement("TD");

    // Fill the cells with correct data
    idCourseCell.innerText = newRow.idCourse;
    courseCodeCell.innerText = newRow.courseCode;
    startTimeCell.innerText = newRow.startTime;
    endTimeCell.innerText = newRow.endTime;
    daysOfWeekCell.innerText = newRow.daysOfWeek;
    idClassroomCell.innerText = newRow.idClassroom;
    idTeacherCell.innerText = newRow.idTeacher;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCourse(newRow.idCourse);
    };

    // Add the cells to the row
    row.appendChild(idCourseCell);
    row.appendChild(courseCodeCell);
    row.appendChild(startTimeCell);
    row.appendChild(endTimeCell);
    row.appendChild(daysOfWeekCell);
    row.appendChild(idClassroomCell);
    row.appendChild(idTeacherCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.idCourse);
    // Add the row to the table
    currentTable.appendChild(row);
}