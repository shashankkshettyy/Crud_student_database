const getStudents = "SELECT * FROM students";
const getStudentsid = "SELECT * FROM students WHERE id =$1";
const checkEmailExists = "SELECT * FROM STUDENTS AS  s WHERE s.email=$1";
const addStudent = "INSERT INTO students (name,email,age,dob) VALUES ($1,$2,$3,$4)";
const removeStudent = "DELETE FROM students WHERE id=$1";
const updateStudent = "UPDATE students SET name = $1 WHERE id= $2";

module.exports = {
    getStudents, getStudentsid, checkEmailExists, addStudent, removeStudent, updateStudent
};
