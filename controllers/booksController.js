function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required.");
    }
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      const returnBooks = books.map((book) => {
          const newBook = book.toJSON();
          newBook.links = {}
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }

  function put(req, res) {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }

  function patch(req, res) {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }

  function deleteBook(req, res) {
    req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }

      return res.sendStatus(204);
    });
  }

  return { post, get, put, patch, deleteBook };
}

module.exports = booksController;
