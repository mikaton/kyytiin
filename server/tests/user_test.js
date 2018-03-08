const should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  server = require('../../server'),
  model = require('../models/index'),
  User = model.Customer,
  api = supertest('http://localhost:3000/api');

describe('User', () => {
  before((done) => {
    User.destroy({
      where: {},
    }).then(() => {
        api.post('auth/local/register')
        .send({
          firstName: 'Testi12345',
          lastName: 'Testinen12345',
          email: 'testi12345@testi.com',
          password: 'testipassu',
          phoneNumber: '040123123'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });

  });
  it('should return the user', (done) => {
    api.get('/user/:id')
      .send({
        
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
  it('should update the user', (done) => {
    api.patch('/user/:id')
      .send({
        updateData: {firstName: 'Päivitetty'}
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
  it('should delete the user', (done) => {
    api.delete('/user/:id')
      .send({
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});

