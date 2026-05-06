const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "simple_login"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (err, results) => {
            if (results.length > 0) {
                req.session.user = username;
                res.send("Login successful");
            } else {
                res.send("Invalid credentials");
            }
        }
    );
});

// Protected route
app.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.send(`Welcome ${req.session.user}`);
    } else {
        res.send("Not logged in");
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));