var express = require('express');
var app = express();

var faker = require('faker');
var mysql = require('mysql');

var mysqlPassword = process.env.MYSQL_PASSWORD;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: mysqlPassword,
    database: 'join_us'
});

var q = 'SELECT CURDATE()';
connection.query(q, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
})

app.get("/", function(req, res) {
    res.send("You've reached the home page!");
});

app.get("/joke", function(req, res) {
    var joke = "Here's a joke...";
    res.send(joke);
});

app.get("/random_num", function(req, res) {
    var num = Math.floor((Math.random() * 10) + 1);
    res.send("Your lucky number is " + num);
});

app.listen(5050, function() {
    console.log("Server running on 8080!");
});

