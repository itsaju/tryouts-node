const request = require('supertest');
const chai = require('chai');
const app = require("../"); 
const expect = chai.expect;

describe('Server Tests', () => {
  describe('GET /', () => {
    it('should return "Server is up"', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Server is up');
          done();
        });
    });
  });

  describe('GET /searchMyData', () => {
    it('should return filtered data for valid search', (done) => {
      request(app)
        .get('/searchMyData')
        .query({ search: 'String 1' }) // Test with a valid search string
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.data).to.deep.equal(['String 1']);
          done();
        });
    });

    it('should handle missing input field', (done) => {
      request(app)
        .get('/searchMyData')
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Missing input field');
          done();
        });
    });

    it('should handle empty search', (done) => {
      request(app)
        .get('/searchMyData')
        .query({ search: '' }) // Test with an empty search string
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Missing input field');
          done();
        });
    });
  });
});