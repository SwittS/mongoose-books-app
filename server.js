// server.js
// SERVER-SIDE JAVASCRIPT

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express    = require('express'),
    bodyParser = require('body-parser'),
            db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books){
    if (err) { return console.log("index error: " + err); }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  var bookId = req.params.id;
  db.Book.findOne({_id: bookId}, function foundBook(err, books) {
    if (err) { return console.log("index error: " + err);
    }
      res.json(books);
  });
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);
  var newBook = req.body;
  books.push(newBook);
  res.json(newBook);
});

// update book
// app.put('/api/books/:id', controllers.books.update);

// delete book
app.get('/api/books/delete/:id', function (req, res) {
  var bookId = req.params.id;
  db.Book.findOneAndRemove({_id: bookId}, function foundBook(err, books) {
    if (err) { return console.log("index error: " + err);
    }
    res.json(books);
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
