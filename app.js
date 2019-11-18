var express = require('express');
var app = express();
var mysql = require('mysql');

app.set("view engine", "ejs");

var faker = require('faker');

var mysqlPassword = process.env.MYSQL_PASSWORD;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: mysqlPassword,
    database: 'join_us'
});

var data = [];
for (var i = 0; i < 500; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}

var q = 'INSERT INTO users (email, created_at) VALUES ?';
 
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("home", {data: count});
    });
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
    console.log("Server running on 5050!");
});

