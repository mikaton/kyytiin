const express = require('express'),
      app = express(),
      passport = require('passport'),
      passportService = require('./config/passport'),
      AuthController = require('./controllers/authcontroller'),
      UserController = require('./controllers/usercontroller'),
      RideController = require('./controllers/ridecontroller');
      ReviewController = require('./controllers/reviewcontroller');
module.exports = (app) => {
  const router = express.Router();
  app.use('/api', router);

  const login       = passport.authenticate('local', {session: false});
  const jwtAuth     = passport.authenticate('jwt', {session: false});

  // Autentikaatioreitit
  router.post('/auth/local/register', AuthController.localRegister);
  router.post('/auth/local/login', login, AuthController.localLogin);
  router.post('/auth/social', AuthController.socialRegister);
  router.post('/auth/social', AuthController.socialLogin);
  router.post('/auth/forgot-password', AuthController.forgotPassword);
  router.post('/auth/change-password', AuthController.changePassword);

  // Käyttäjä CRUD reitit
  router.get('/user/:id', jwtAuth, UserController.getUser);
  router.patch('/user/:id', jwtAuth, UserController.updateUser);
  router.delete('/user/:id', jwtAuth, UserController.deleteUser);

  // Matka CRUD reitit
  router.post('/ride', jwtAuth, RideController.createRide);
  router.post('/ride/join', jwtAuth, RideController.joinRide);
  router.get('/ride/:id', jwtAuth, RideController.getSingleRide);
  router.get('/ride', RideController.getAllRides);
  router.get('/ride/user/:id', jwtAuth, RideController.getUserRides);
  router.patch('/ride/:id', jwtAuth, RideController.updateRide);
  router.delete('/ride/:id', jwtAuth, RideController.deleteRide);

  // Arvostelu CRUD reitit
  router.post('/review/:customer_id', jwtAuth, ReviewController.createReview);
  router.delete('/review/:id', jwtAuth, ReviewController.deleteReview);
  router.get('/review/canReview/:creator_customer_id/:joiner_customer_id', ReviewController.canReview);
  router.get('/review/getReview/:id', jwtAuth, ReviewController.getReview);
}