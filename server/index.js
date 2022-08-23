const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to MySQL
const db = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'BeepBoop1234%',
    database: 'bookshelf'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res)=>
{
    const dbSelectAll = "SELECT * FROM books";
    db.query(dbSelectAll, (err, result)=>
    {
        res.send(result);
    });
});

app.post('/api/insert', (req, res)=>
{
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const review = req.body.review;

    const dbInsert = "INSERT INTO books VALUES (?, ?, ?, ?, ?)";
    db.query(dbInsert, [title, author, genre, rating, review], (err, result)=>
    {
        console.log(result);
    });
});

app.delete('/api/delete/:title', (req, res)=>
{
    const title = req.params.title;

    const dbDelete = "DELETE FROM books WHERE title = ?";
    db.query(dbDelete, [title], (err, result)=>
    {
        console.log(result);
    }); 
});

app.put('/api/update', (req, res)=>
{
    const title = req.body.title;
    const review = req.body.review;

    const dbUpdate = "UPDATE books SET review = ? WHERE title = ?";
    db.query(dbUpdate, [review, title], (err, result)=>
    {
        console.log(result);
    });
});

app.listen(3001, ()=>
{
    console.log("Server is running on port 3001");
});