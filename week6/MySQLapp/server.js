const express = require('express');
const mysql = require('mysql');


const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "secret",
    database: "myData"
  }
);

db.connect((err)=> {
  if(err){
    throw err;
  }
  console.log("MySql Database is connected")

});

const app = express();
// create DB
app.get('/createdb', (req,res) => {
    let sql = "CREATE DATABASE myData";
    db.query(sql, (err, result) => {
    if(err)
    {
        throw err;
    }
    console.log(result);
    res.send("Database Created Successfully!");
})
})

// create table

app.get('/createtable', (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS postings(ID INT AUTO_INCREMENT, title varchar(450), message varchar(450), PRIMARY KEY(ID))";
    db.query(sql, (err, result) => {
        if (err)
        {
            throw err;
        }
        console.log(result);
        res.send("Table Created!!!");
    })
});

// // insert data
app.get('/addposting1', (req, res) =>{
    let post = {title: 'First Song First verse, Queen of California', message: `[Verse 1]
    Goodbye cold, goodbye rain
    Goodbye sorrow, and goodbye shame
    I'm headed out west with my headphones on
    Boarded a flight with a song in the back of my soul
    And no one knows
    `};
    let sql = "INSERT INTO postings SET ?";
    let query = db.query(sql, post, (err, result) => {
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.send("Song added!" + post.title + post.message)
    })
}); 

app.get('/addposting2', (req, res) =>{
    let post = {title: 'First Song, second verse Queen of California', message: `
    [Verse 2]
    Hello beauty, hello strange
    Hello wonder, what's your name?
    Looking for the Sun that Neil Young hung
    After the Gold Rush of 1971
    
    [Chorus]
    I just found out her ghost left town
    The queen of California is stepping down, down
    
    `};
    let sql = "INSERT INTO postings SET ?";
    let query = db.query(sql, post, (err, result) => {
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.send("First song second verse  added!" + post.title + post.message)
    })
}); 



// myrouter.route("/getdata")
// .get((req, res) => {
//   let sql = `SELECT * FROM Songlist`
// db.query(sql, (err, res) => {
//   if (err){
//     throw err;
//   }
//   console.log("Song List")
//   res.send(res)
// })
// })

// app.use("/songlist/", require("./jmsongrouter.js"));


// app.use((err, req, res, next) => {
//   console.log(err)
//   return res.send({errMsg: err.message })
// })

app.listen(3000,function(){
  console.log("Live at Port 3000");
})