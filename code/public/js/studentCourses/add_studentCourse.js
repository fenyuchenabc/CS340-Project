/*
  Citation for the following JavaScript file:
  Date: 05/30/2023
  Adapted from: add_person.js
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/
// Get the objects we need to modify
let addStudentCourseForm = document.getElementById('add-studentToCourse-form-ajax');

// Modify the objects we need
addStudentCourseForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStudentID = document.getElementById("input-idStudent");
    let inputCourseID = document.getElementById("input-idCourse");

    // Get the values from the form fields
    let studentIdValue = inputStudentID.value;
    let courseIdValue = inputCourseID.value;

    // Put our data we want to send in a javascript object
    let data = {
        idStudent: studentIdValue,
        idCourse: courseIdValue
    }
    console.log(`submit button pressed ${data}`)


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-studentCourse-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            console.log(`xhttp response ${xhttp.response}`)
            //addRowToTable(xhttp.response);
            addRowToTable(JSON.stringify(data));

            // Clear the input fields for another transaction
            inputStudentID.selectedIndex = 0;
            inputCourseID.selectedIndex = 0;
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// 
addRowToTable = (data) => {
    // // Get a reference to the current table on the page and clear it out.
    // let currentTable = document.getElementById("studentCourses-table");

    // // Get the location where we should insert the new row (end of table)
    // let newRowIndex = currentTable.rows.length;
    // console.log(`new Row ${data}`)

    // // Get a reference to the new row from the database query (last object)
    // let parsedData = JSON.parse(data);
    // let newRow = parsedData //parsedData[parsedData.length - 1]
    // console.log(`new Row ${newRow.idStudent}`)
    // // Create a row and 2 cells
    // let row = document.createElement("TR");
    // let idStudenteCell = document.createElement("TD");
    // let idCourseCell = document.createElement("TD");

    // // Fill the cells with correct data
    // idStudenteCell.innerText = newRow.idStudent;
    // idCourseCell.innerText = newRow.idCourse;

    // let deleteButton = document.createElement("button");
    // deleteButton.innerText = "Delete";
    // deleteButton.addEventListener("click", function() {
    //     deleteCourse(newRow.idStudent, newRow.idCourse);
    // });

    // // Add the cells to the row
    // row.appendChild(idStudenteCell);
    // row.appendChild(idCourseCell);
    // row.appendChild(deleteButton);

    // row.setAttribute('data-value', newRow.idCourse);
    // // Add the row to the table
    // currentTable.appendChild(row);
    location.reload();
}