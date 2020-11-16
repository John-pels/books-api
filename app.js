var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to My API!")
});


app.listen(port, () => {
    console.log('Running on Port ' + port)
});
