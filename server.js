const express = require('express');
const path = require('path');
const notes = require('./Develop/db/db.json');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', api);
// make public folder static
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})
// GET route for notes page 
app.get('/notes.html', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
})

// get notes
// app.get('/api/notes', (req, res) => {
//     res.json(notes);
// })


// post
// delete

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});