const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')

dotenv.config()

const app = express();

console.log("This is a test");
if (process.env.ENV === "Test") {
  const db = mongoose.connect("mongodb://localhost/bookAPI_Test", {
    useUnifiedTopology: true,
  });
} else {
  console.log("This is for real");
  const db = mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
  });
}

const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to My Express API!");
});

app.server = app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});

module.exports = app;
