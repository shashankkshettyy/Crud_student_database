const pool = require("../db");
const queries = require('./queries');




const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });

};

const getStudentsid = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsid, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });

};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // Check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            // Handle database error
            res.status(500).send("Internal Server Error");
            return;
        }

        if (results.rows.length) {
            res.status(400).send("Email already exists");
            return;
        }

        // Add student
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) {
                // Handle database error
                res.status(500).send("Internal Server Error");
                return;
            }
            res.status(201).send("Student Created successfully");
        });
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    // Check if student exists
    pool.query(queries.getStudentsid, [id], (error, results) => {
        if (error) {
            // Handle database error
            res.status(500).send("Internal Server Error");
            return;
        }

        if (!results.rows.length) {
            res.status(404).send("Student does not exist in the Database");
            return;
        }

        // Remove student
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) {
                // Handle database error
                res.status(500).send("Internal Server Error");
                return;
            }
            res.status(200).send("Student Removed successfully");
        });
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    // Check if student exists
    pool.query(queries.getStudentsid, [id], (error, results) => {
        if (!results.rows.length) {
            res.status(404).send("Student does not exist in the Database");
            return;
        }

        // Update student
        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Updated Successfully");
        });
    });
};

module.exports = {
    getStudents, getStudentsid, addStudent, removeStudent, updateStudent
};

