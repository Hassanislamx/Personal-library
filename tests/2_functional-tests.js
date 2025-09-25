/*
*
*       Functional Tests for Personal Library
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  let createdId = null;

  suite('POST /api/books with title => create book object/expect book object', function() {

    test('Test POST /api/books with title', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'Test Book Title' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, '_id');
          assert.property(res.body, 'title');
          assert.equal(res.body.title, 'Test Book Title');
          createdId = res.body._id;
          done();
        });
    });

    test('Test POST /api/books with no title given', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({})
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.text, 'missing required field title');
          done();
        });
    });

  });


  suite('GET /api/books => array of books', function() {

    test('Test GET /api/books', function(done) {
      chai.request(server)
        .get('/api/books')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            assert.property(res.body[0], '_id');
            assert.property(res.body[0], 'title');
            assert.property(res.body[0], 'commentcount');
          }
          done();
        });
    });

  });


  suite('GET /api/books/[id] => book object with [id]', function() {

    test('Test GET /api/books/[id] with id not in db', function(done) {
      chai.request(server)
        .get('/api/books/615c9f9fcf1a2c00123abcd1') // fake ID
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.text, 'no book exists');
          done();
        });
    });

    test('Test GET /api/books/[id] with valid id in db', function(done) {
      assert.isNotNull(createdId);
      chai.request(server)
        .get('/api/books/' + createdId)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, '_id');
          assert.property(res.body, 'title');
          assert.property(res.body, 'comments');
          assert.equal(res.body._id, createdId);
          done();
        });
    });

  });


  suite('POST /api/books/[id] => add comment/expect book object with id', function() {

    test('Test POST /api/books/[id] with comment', function(done) {
      chai.request(server)
        .post('/api/books/' + createdId)
        .send({ comment: 'This is a test comment' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body.comments);
          assert.include(res.body.comments, 'This is a test comment');
          done();
        });
    });

    test('Test POST /api/books/[id] without comment field', function(done) {
      chai.request(server)
        .post('/api/books/' + createdId)
        .send({})
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.text, 'missing required field comment');
          done();
        });
    });

    test('Test POST /api/books/[id] with comment, id not in db', function(done) {
      chai.request(server)
        .post('/api/books/615c9f9fcf1a2c00123abcd1')
        .send({ comment: 'fail comment' })
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.text, 'no book exists');
          done();
        });
    });

  });


  suite('DELETE /api/books/[id] => delete book object id', function() {

    test('Test DELETE /api/books/[id] with valid id in db', function(done) {
      chai.request(server)
        .delete('/api/books/' + createdId)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'delete successful');
          done();
        });
    });

    test('Test DELETE /api/books/[id] with id not in db', function(done) {
      chai.request(server)
        .delete('/api/books/615c9f9fcf1a2c00123abcd1')
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.text, 'no book exists');
          done();
        });
    });

  });

});
