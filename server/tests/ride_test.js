const should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  server = require('../../server'),
  model = require('../models/index'),
  Ride = model.Ride,
  api = supertest('http://localhost:3000/api');

describe('Ride', () => {
  beforeEach((done) => {
    
  });
});
