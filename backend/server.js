const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to allow the server to read JSON data from requests
app.use(express.json());

// In-Memory Database (A simple list to store students)
let students = [
    { id: 1, name: "Alice", grade: "A" },
    { id: 2, name: "Bob", grade: "B" }
];

// --- 1. GET API (Read all students) ---
app.get('/students', (req, res) => {
    res.json(students);
});

// --- 2. POST API (Create a new student) ---
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1, // Simple auto-increment ID
        name: req.body.name,
        grade: req.body.grade
    };
    students.push(newStudent);
    res.status(201).json({ message: "Student added!", student: newStudent });
});

// --- 3. PATCH API (Update a student's grade) ---
app.patch('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student) {
        if (req.body.name) student.name = req.body.name;
        if (req.body.grade) student.grade = req.body.grade;
        res.json({ message: "Student updated!", student: student });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// --- 4. DELETE API (Remove a student) ---
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = students.length;
    
    // Filter out the student with the matching ID
    students = students.filter(s => s.id !== id);

    if (students.length < initialLength) {
        res.json({ message: "Student deleted successfully" });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// Export the app for testing
module.exports = app;

// Only start the server if this file is run directly (not by a test)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}