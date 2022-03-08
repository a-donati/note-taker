const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./Develop/db/db.json');
const api = require('./routes/index');

const PORT = process.env.PORT || 3002;

const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// make public folder static
app.use(express.static('public'));

// html routes
// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})
// GET route for notes page 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
})
// listen at port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});

// API Routes