/*
  Citation for the following JavaScript file:
  Date: 05/30/2023
  Adapted from: app.js
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 8282;                 // Set a port number at the top so it's easy to change in the future

// app.js handlebar

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// app.js - SETUP section

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
// app.js
app.get('/', function(req, res)
    {
            res.render('index');                  // Render the index.hbs file, and also send the renderer
    });                                                         // received back from the query

app.get('/students', function(req, res)
    {
        let query1 = "SELECT * FROM Students;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('students', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });     
                                                        // received back from the query
 //for dropdowns
 app.get('/api/students', function(req, res) {
    let query = "SELECT * FROM Students";

    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(rows);
        }
    });
});   

app.get('/teachers', function(req, res)
    {
        let query1 = "SELECT * FROM Teachers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            res.render('teachers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

    //for dropdowns
app.get('/api/teachers', function(req, res) {
        let query = "SELECT * FROM Teachers";
    
        db.pool.query(query, function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.json(rows);
            }
        });
    });   

app.get('/courses', function(req, res)
    {
        let query1 = "SELECT * FROM Courses;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            
            res.render('courses', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });          
                                                   // received back from the query
//For dropdowns
    app.get('/api/courses', function(req, res) {
        let query = "SELECT * FROM Courses";
    
        db.pool.query(query, function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.json(rows);
            }
        });
    }); 

app.get('/classrooms', function(req, res)
    {
        let query1 = "SELECT * FROM Classrooms;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('classrooms', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

    //for dropdowns
app.get('/api/classrooms', function(req, res) {
    let query = "SELECT * FROM Classrooms";

    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(rows);
        }
    });
});   

app.get('/studentCourses', function(req, res)
    {
        let query1 = "SELECT * FROM StudentCourses;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('studentCourses', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// app.js - ROUTES section

app.post('/add-student-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Students (firstName, lastName, email, dateOfBirth, year) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.dateOfBirth}', '${data.year}')`;
    db.pool.query(query1, function(error, rows, fields){
        console.log(query1)

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Students;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/update-student-ajax', function(req, res, next) {
    let data = req.body;

    let idStudent = data.idStudent;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let dateOfBirth = data.dateOfBirth;
    let year = data.year;

    let queryUpdateStudent = 'UPDATE Students SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, year = ? WHERE idStudent = ?';
    let querySelectStudent = 'SELECT * FROM Students WHERE idStudent = ?';

    // Run the update query
    db.pool.query(queryUpdateStudent, [firstName, lastName, email, dateOfBirth, year, idStudent], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If the update was successful, retrieve the updated student record
            db.pool.query(querySelectStudent, [idStudent], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});
  

app.delete('/delete-student-ajax/', function(req,res,next){
  let data = req.body;
  let idStudent = parseInt(data.idStudent);
  let deleteStudent= `DELETE FROM Students WHERE idStudent = '${idStudent}'`;
  let deleteStudentCourses = `DELETE FROM StudentCourses WHERE idStudent = '${idStudent}'`;
  console.log("StudentID = ",idStudent)
  console.log("data is ", data)

        // Run the 1st query
        db.pool.query(deleteStudentCourses, [idStudent], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteStudent, [idStudent], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {

                        res.sendStatus(204);
                    }
                })
            }
      }
      );
  });

app.post('/add-teacher-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Teachers (firstName, lastName, phoneNumber, email) VALUES ('${data.firstName}', '${data.lastName}', '${data.phoneNumber}', '${data.email}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Teachers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/update-teacher-ajax', function(req, res, next) {
    let data = req.body;

    let idTeacher = data.idTeacher;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let phoneNumber = data.phoneNumber;
    let email = data.email;

    let queryUpdateTeacher = 'UPDATE Teachers SET firstName = ?, lastName = ?, phoneNumber = ?, email = ? WHERE idTeacher = ?';
    let querySelectTeacher = 'SELECT * FROM Teachers WHERE idTeacher = ?';

    // Run the update query
    db.pool.query(queryUpdateTeacher, [firstName, lastName, phoneNumber, email, idTeacher], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If the update was successful, retrieve the updated student record
            db.pool.query(querySelectTeacher, [idTeacher], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete-teacher-ajax/', function(req,res,next){
  let data = req.body;
  let idTeacher = parseInt(data.idTeacher);
  let deleteTeacher= `DELETE FROM Teachers WHERE idTeacher = '${idTeacher}'`;
  let updateCoursesTeacher = `UPDATE Courses SET idTeacher = NULL WHERE idTeacher = '${idTeacher}'`;
  console.log("TeacherID = ",idTeacher)
  console.log("data is ", data)

        // Run the 1st query
        db.pool.query(updateCoursesTeacher, [idTeacher], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteTeacher, [idTeacher], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {

                        res.sendStatus(204);
                    }
                })
            }
      }
      );
  });

app.post('/add-course-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Courses (courseCode, startTime, endTime, daysOfWeek, idClassroom, idTeacher) VALUES ('${data.courseCode}', '${data.startTime}', '${data.endTime}', '${data.daysOfWeek}', '${data.idClassroom}', '${data.idTeacher}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Courses;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



app.put('/update-course-ajax', function(req, res, next) {
    let data = req.body;

    let idCourse = data.idCourse;
    let courseCode = data.courseCode;
    let startTime = data.startTime;
    let endTime = data.endTime;
    let daysOfWeek = data.daysOfWeek;
    let idClassroom = data.idClassroom;
    let idTeacher = data.idTeacher;

    let queryUpdateTeacher = 'UPDATE Courses SET courseCode = ?, startTime = ?, endTime = ?, daysOfWeek = ?, idClassroom = ?, idTeacher = ? WHERE idCourse = ?';
    let querySelectTeacher = 'SELECT * FROM Courses WHERE idCourse = ?';

    // Run the update query
    db.pool.query(queryUpdateTeacher, [courseCode, startTime, endTime, daysOfWeek, idClassroom, idTeacher, idCourse], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If the update was successful, retrieve the updated student record
            db.pool.query(querySelectTeacher, [idCourse], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete-course-ajax/', function(req,res,next){
  let data = req.body;
  let idCourse = parseInt(data.idCourse);
  let deleteCourse= `DELETE FROM Courses WHERE idCourse = '${idCourse}'`;
  let deleteStudentCourses = `DELETE FROM StudentCourses WHERE idCourse = '${idCourse}'`;
  console.log("CourseID = ",idCourse)
  console.log("data is ", data)

        // Run the 1st query
        db.pool.query(deleteStudentCourses, [idCourse], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteCourse, [idCourse], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {

                        res.sendStatus(204);
                    }
                })
            }
      }
      );
  });

app.post('/add-classroom-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Classrooms (location, capacity, isLab) VALUES ('${data.location}', '${data.capacity}', '${data.isLab}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Classrooms;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/update-classroom-ajax', function(req, res, next) {
    let data = req.body;

    let idClassroom = data.idClassroom;
    let location = data.location;
    let capacity = data.capacity;
    let isLab = data.isLab;

    let queryUpdateClassroom = 'UPDATE Classrooms SET location = ?, capacity = ?, isLab = ? WHERE idClassroom = ?';
    let querySelectClassroom = 'SELECT * FROM Classrooms WHERE idClassroom = ?';

    // Run the update query
    db.pool.query(queryUpdateClassroom, [location, capacity, isLab, idClassroom], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If the update was successful, retrieve the updated student record
            db.pool.query(querySelectClassroom, [idClassroom], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete-classroom-ajax/', function(req,res,next){
  let data = req.body;
  let idClassroom = parseInt(data.idClassroom);
  let deleteClassroom= `DELETE FROM Classrooms WHERE idClassroom = '${idClassroom}'`;
  let updateCoursesClassroom = `UPDATE Courses SET idClassroom = NULL WHERE idClassroom = '${idClassroom}'`;
  console.log("ClassroomID = ",idClassroom)
  console.log("data is ", data)

        // Run the 1st query
        db.pool.query(updateCoursesClassroom, [idClassroom], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteClassroom, [idClassroom], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {

                        res.sendStatus(204);
                    }
                })
            }
      }
      );
  });


  //add-studentCourse-ajax
app.post('/add-studentCourse-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO StudentCourses (idStudent, idCourse) VALUES ('${data.idStudent}', '${data.idCourse}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM StudentCourses;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

///update-studentCourse-ajax
app.put('/update-studentCourse-ajax', function(req, res, next) {
    let data = req.body;

    let idStudent = data.idStudent;
    let idCourse = data.idCourse;

    let queryUpdateStudentCourse = 'UPDATE StudentCourses SET idCourse = ? WHERE idStudent = ?';

    // Run the update query
    db.pool.query(queryUpdateStudentCourse, [idCourse, idStudent], function(error, result) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});



//delete-studentCourse-ajax
app.delete('/delete-studentCourse-ajax/', function(req,res,next){
    let data = req.body;
    let idStudent = parseInt(data.idStudent);
    let idCourse = parseInt(data.idCourse);
    let deleteStudentCourses= `DELETE FROM StudentCourses WHERE idStudent = ${idStudent} AND  idCourse = '${idCourse}'`;
    console.log(deleteStudentCourses) 
          db.pool.query(deleteStudentCourses, [idStudent, idCourse], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                 res.sendStatus(204);
              }
        }
        );
    });
  


    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});