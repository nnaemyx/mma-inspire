const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");
const morgan = require('morgan');

dotenv.config({ path: './.env' });


// middle wares
app.use(morgan('dev'))

const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'script')));

app.set('view engine', 'ejs');
app.set('views', './views');
db.connect( (error) => {
    if(error) {
        console.log(error)
     }else {
        console.log("my sql connected")
    }
})
app.get('/', (req, res) => {
//    res.send("<h1>homepage</h1>")
   res.render("index");
});

app.get('/style', (req, res) => {
    //    res.send("<h1>homepage</h1>")
       res.render("style.css");
});

app.get('/login', (req, res) => {
    // res.send("<h1>homepage</h1>")
    res.render('login');
});


app.get('/register', (req, res) => {
    // res.send("<h1>homepage</h1>")
    res.render('register');
});

app.get('/script', (req, res) => {
    // res.send("<h1>homepage</h1>")
    res.render("script.js");
});

app.listen(5000, () =>{
    console.log("server");
})