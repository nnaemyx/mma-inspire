const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");


dotenv.config({ path: './.env' });

const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public', '../..' );
app.use(express.static(publicDirectory));

app.set('view engine', 'ejs');
app.set('views', './view');
db.connect( (error) => {
    if(error) {
        console.log(error)
    }else {
        console.log("my sql connected")
    }
})
app.get("/", (req, res) => {
   // res.send("<h1>homepage</h1>")
   res.render("index.ejs");
});

app.listen(5000, () =>{
    console.log("server");
})