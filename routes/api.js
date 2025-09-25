/*
*
*       Complete the API routing below
*
*/

'use strict';

const mongoose = require('mongoose');

// Define schema and model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: { type: [String], default: [] }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      try {
        const books = await Book.find({});
        const booksWithCount = books.map(b => ({
          _id: b._id,
          title: b.title,
          commentcount: b.comments.length
        }));
        return res.json(booksWithCount);
      } catch (err) {
        return res.status(500).send('server error');
      }
    })

    .post(async function (req, res) {
      const title = req.body.title;
      if (!title) {
        return res.status(400).send('missing required field title');
      }
      try {
        const newBook = new Book({ title });
        await newBook.save();
        return res.json({ _id: newBook._id, title: newBook.title });
      } catch (err) {
        return res.status(500).send('server error');
      }
    })

    .delete(async function (req, res) {
      try {
        await Book.deleteMany({});
        return res.send('complete delete successful');
      } catch (err) {
        return res.status(500).send('server error');
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      const bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.status(404).send('no book exists');
        }
        return res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments
        });
      } catch (err) {
        return res.status(404).send('no book exists');
      }
    })

    .post(async function (req, res) {
      const bookid = req.params.id;
      const comment = req.body.comment;
      if (!comment) {
        return res.status(400).send('missing required field comment');
      }
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.status(404).send('no book exists');
        }
        book.comments.push(comment);
        await book.save();
        return res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments
        });
      } catch (err) {
        return res.status(404).send('no book exists');
      }
    })

    .delete(async function (req, res) {
      const bookid = req.params.id;
      try {
        const deleted = await Book.findByIdAndDelete(bookid);
        if (!deleted) {
          return res.status(404).send('no book exists');
        }
        return res.send('delete successful');
      } catch (err) {
        return res.status(404).send('no book exists');
      }
    });

};
