const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// make public folder static
app.use(express.static("public"));

// html routes
// GET route for homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
// GET route for notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// listen at port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

// API Routes
app.get("/api/notes", (req, res) => {
    // send db.json file to client
    // console.info(`${req.method} request received for notes`);
    // readFromFile("./Develop/db/db.json").then((data) =>
    //     res.json(JSON.parse(data))
    res.sendFile(path.join(__dirname, "./db/db.json"));
});


// post request to store a new note
app.post("/api/notes", (req, res) => {
    // read contents of db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if(err){
            console.log('Error');
        } else{
        // parse the db.json data - create array of objects
        const parsedDb = JSON.parse(data);
        // creates newNote with request body and title, id is uniquely created
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4()
        }
        // push newNote to the parsedDb array of notes
        parsedDb.push(newNote);
        // convert parsedDb into JSON
        const newDB = JSON.stringify(parsedDb);
        // write updated notes back to the file
        fs.writeFile('./db/db.json', newDB, (err)=>{
            if(err){
                console.log('error');
            } console.log(parsedDb)
        })
        // response to resolve post req
        res.send('Note has been saved');
    }});
});

// delete request
app.delete('/api/notes/:id', (req, res) => {
    // get note's ID from request parameters
    const noteID = req.params.id;
    // read existing json file containing all notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err){
            console.log('Error');
        }
        // parse the db.json contents into array of objects
        const parsedDb = JSON.parse(data);
        // creates a new array with deleted note to be filtered out by id
        const newData = parsedDb.filter((note) => note.id !== noteID);
        // convert array back to JSON
        const newDB = JSON.stringify(newData);
        // use fs to write new array back into db.json file
        fs.writeFile('./db/db.json', newDB, (err)=> {
            if(err){
                console.log('error');
            }
            console.log('File updated successfully.');
        });
        // send response for delete request
        res.send('Note has been deleted.');
    })
})
