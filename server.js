const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");

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
    const { title, text } = req.body;
    console.log(req.body);

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid.v4(),
        };

        readAndAppend(newNote, "./db/db.json");
        const response = {
            status: "success",
            body: newNote,
        };

        res.json(response);
    } else {
        res.error(`Error`);
    }
    // // obtain existing notes
    // fs.readFile('./db/db.json', 'utf8', (err, data) =>{
    //     if(err){
    //         console.log('Error');
    //     } else{
    //     const parsedDb = JSON.parse(data);

    //     parsedDb.push(newNote)

    //         // write updated note back to the file
    //     fs.writeFile('./Develop/db/db.json', JSON.stringify(parsedDb), (err)=>{
    //         if(err){
    //             console.log('error');
    //         } console.log(parsedDb)
    //     })
    //     res.send('Note has been saved')
    // }});
});


// app.delete('/api/notes/:id', (req, res) => {
//     const noteID = req.params.id;
//     fs.readFromFile('./db/db.json', (req, res) => {

//     })
// })
