const express = require('express'),
  app = express(),
  passport = require('passport'),
  passportService = require('./config/passport'),
  AuthController = require('./controllers/authcontroller'),
  UserController = require('./controllers/usercontroller'),
  RideController = require('./controllers/ridecontroller'),
  ReviewController = require('./controllers/reviewcontroller'),
  RequestController = require('./controllers/requestcontroller'),
  NotificationController = require('./controllers/notificationcontroller'),
  ua = require('universal-analytics');

module.exports = (app) => {
  
  const router = express.Router();
  app.use('/api', router);

  const jwtAuth = passport.authenticate('jwt', { session: false });

  // Autentikaatioreitit
  router.post('/auth/local/register', AuthController.localRegister);
  router.post('/auth/local/login', AuthController.localLogin);
  router.post('/auth/social', AuthController.socialRegister);
  router.post('/auth/social', AuthController.socialLogin);
  router.post('/auth/forgot-password', AuthController.forgotPassword);
  router.post('/auth/change-password', AuthController.changePassword);
  router.get('/auth/verify-account/:token', AuthController.verifyEmail);

  // Käyttäjä CRUD reitit
  router.get('/user/:id', jwtAuth, UserController.getUser);
  router.patch('/user/:id', jwtAuth, UserController.updateUser);
  router.delete('/user/:id', jwtAuth, UserController.deleteUser);
  router.put('/user/:id/profile/image', jwtAuth, UserController.updateUserPhoto);

  // Matka CRUD reitit
  router.post('/ride', jwtAuth, RideController.createRide);
  router.get('/ride/:id', jwtAuth, RideController.getSingleRide);
  router.get('/ride', RideController.getAllRides);
  router.get('/ride/user/:id', jwtAuth, RideController.getUserRides);
  router.get('/ride/user/joined/:id', jwtAuth, RideController.getUserJoinedRides);
  router.get('/ride/:ride_id/:customer_id', jwtAuth, RideController.getUserMadeRides); //palauttaa myös kyytiin liittyneet käyttäjät ja niiden tiedot
  router.patch('/ride/:id', jwtAuth, RideController.updateRide);
  router.delete('/ride/:id', jwtAuth, RideController.deleteRide);

  // Matkapyynnöt 
  router.post('/riderequests/request', jwtAuth, RideController.createRequest);
  router.get('/riderequests/request/:id', jwtAuth, RideController.getRideRequest);
  router.post('/riderequests/takerequest', RideController.rideRequestAccepted);
  // Matkalle liittyminen
  router.post('/ride/join/:ride_id', jwtAuth, RideController.joinRide);
  router.post('/ride/deny/:ride_id', jwtAuth, RideController.denyJoinRide);

  // Matkan ohjeiden hakeminen Googlelta
  router.get('/ride/directions/:startingplace/:destination', jwtAuth, RideController.getDirections);

  // Liittymispyyntö CRUD
  router.post('/request', jwtAuth, RequestController.createJoinRequest);
  router.get('/request/all/:customer_id', jwtAuth, RequestController.getAllRequests);
  router.get('/request/:request_id', jwtAuth, RequestController.getRequestById);
  router.patch('/request/:request_id', jwtAuth, RequestController.updateRequest);
  router.delete('/request/:request_id', jwtAuth, RequestController.deleteRequest);
  // Notifikaatio CRUD
  router.get('/notifications/:customer_id', jwtAuth, NotificationController.getNotifications);
  router.patch('/notifications/:notification_id', jwtAuth, NotificationController.updateNotification);
  router.delete('/notifications/:customer_id', jwtAuth, NotificationController.deleteNotifications);

  // Arvostelu CRUD reitit
  router.post('/review/:customer_id', jwtAuth, ReviewController.createReview);
  router.delete('/review/:id', jwtAuth, ReviewController.deleteReview);
  router.get('/review/canReview/:creator_customer_id/:joiner_customer_id', jwtAuth, ReviewController.canReview);
  router.get('/review/getReview/:id', jwtAuth, ReviewController.getReview);
}