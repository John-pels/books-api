const express = require('express')

function routes() {

    const bookRouter = express.Router();
  //Get or Post books

  bookRouter
    .route("/books")
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};

      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });

  //Get a Book by ID

  bookRouter.route("/books/:bookId").get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });
    
    return bookRouter;
}

module.exports = routes
