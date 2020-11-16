function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
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
      return res.json(books);
    });
  }
    
    function put(req, res){
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

    function patch (req, res)  {
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

    function deleteBook (req, res) {
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
