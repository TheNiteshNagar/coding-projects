const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// Middleware to parse JSON data sent from the frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD', // Replace with your actual password
    database: 'todo_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to the MySQL database!');
});

// 1. GET all tasks (Read)
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 2. POST a new task (Create)
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, title, completed: false });
    });
});

// 3. DELETE a task (Delete)
app.delete('/api/tasks/:id', (req, res) => {
    db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

