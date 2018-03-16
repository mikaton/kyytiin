const model = require('../models/index'),
  config = require('../config/main'),
  Ride = model.Ride,
  CustomersRides = model.CustomersRides_ride;

exports.getSingleRide = (req, res, next) => {
  Ride.findOne({
    where: { ride_id: req.params.id }
  })
  then((ride) => {
    res.status(200).json({
      message: 'Ride found',
      data: ride
    });
  })
  .catch((err) => console.log('getSingleRide failed: ' + err.message));
};

exports.getAllRides = (req, res, next) => {
  Ride.findAll({
    where: {},
    order: [
      ['time_of_departure', 'ASC']
    ] 
  })
  .then((rides) => {
    res.send(rides);
  })
  .catch((err) => console.log('getAllRides failed: ' + err.message));
};

exports.getUserRides = (req, res, next) => {
  Ride.findAll({
    where: { customer_id: req.params.id },
  })
  .then((ride) => {
    res.status(200).json({
      message: 'Rides found',
      data: ride
    });
  })
  .catch((err) => console.log('getUserRides failed: ' + err.message));
};
exports.createRide = (req, res, next) => {
  const data = {
    customer_id: req.body.customer_id,
    startingplace: req.body.startingplace,
    destination: req.body.destination,
    journey: req.body.journey,
    time_of_departure: req.body.time_of_departure,
    alternate_time_of_departure: req.body.alternate_time_of_departure,
    time_of_arrival: req.body.time_of_arrival,
    alternate_time_of_arrival: req.body.alternate_time_of_arrival,
    free_seats: req.body.free_seats,
    smoking: req.body.smoking,
    pets: req.body.pets,
    hidden: req.body.hidden,
    additional_information: req.body.additional_information
  };

  Ride.create(data)
  .then((ride) => {
    res.status(200).json({
      message: 'Ride created',
      data: ride
    });
  })
  .catch((err) => console.log('createRide failed: ' + err.message));
};

exports.updateRide = (req, res, next) => {
  console.log(req.body);
  const updateData = req.body;
  Ride.find({
    where: { ride_id: req.body.ride_id }
  })
  .then((ride) => {
    return ride.updateAttributes(updateData)
  })
  .then((updatedRide) => {
    res.status(200).json({
      message: 'Ride updated',
       user: updatedRide
    });
  })
  .catch((err) => console.log('updateRide failed: ' + err.message));
};

exports.deleteRide = (req, res, next) => {
  Ride.find({
    where: { ride_id: req.params.id }
  })
  .then((ride) => {
    return ride.destroy();
  })
  .then(() => {
    res.status(200).json({
      message: 'Ride deleted successfully'
    });
  })
  .catch((err) => console.log('deleteRide failed: ' + err.message));
};

exports.joinRide = (req, res, next) => {
  const data = req.body;
  CustomersRides.create(data)
    .then((done) => {
      res.status(200).json({
        success: true,
        message: 'Joined ride successfully'
      });
    })
    .catch((err) => console.log('joinRide failed: ' + err.message));
};
