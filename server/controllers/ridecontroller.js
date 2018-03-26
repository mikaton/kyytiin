const model = require('../models/index'),
  config = require('../config/main'),
  path = require('path'),
  Ride = model.Ride,
  async = require('async'),
  CustomersRides = model.CustomersRides_ride,
  User = model.Customer;

// --- <Sähköpostin asetukset> ---
hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID || config.mailer.user,
  password = process.env.MAILER_PASSWORD || config.mailer.password,
  nodemailer = require('nodemailer'),

  smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
      user: email,
      pass: password
    }
  }),

  handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./server/templates/'),
    extName: '.html'
  };

smtpTransport.use('compile', hbs(handlebarsOptions));
// --- </Sähköpostin asetukset> //

exports.getSingleRide = (req, res, next) => {
  Ride.sequelize.query('SELECT r.ride_id AS ride_id, r.customer_id AS customer_id, r.additional_information AS additional_information, r.startingplace AS startingplace, r.destination AS destination, r.time_of_departure AS time_of_departure, r.time_of_arrival AS time_of_arrival, r.free_seats AS free_seats, r.smoking AS smoking, r.pets AS pets, c.firstName AS firstName, c.lastName as lastName FROM Rides r INNER JOIN Customers c on r.customer_id = c.customer_id WHERE r.ride_id = :ride_id',
    {
      replacements: { ride_id: req.params.id },
      type: Ride.sequelize.QueryTypes.SELECT
    })
    .then((ride) => {
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

exports.getUserJoinedRides = (req, res, next) => {
  Ride.sequelize.query('SELECT r.startingplace AS startingplace, r.destination AS destination, r.time_of_departure AS time_of_departure, r.time_of_arrival AS time_of_arrival, r.free_seats AS free_seats, r.smoking AS smoking, r.pets AS pets FROM CustomersRides_ride CRr INNER JOIN Rides r on CRr.ride_id = r.ride_id WHERE CRr.customer_id = :joiner_customer_id',
    {
      replacements: { joiner_customer_id: req.params.id },
      type: Ride.sequelize.QueryTypes.SELECT
    })
    .then(ride => {
      res.status(200).json({
        message: 'Rides found',
        data: ride
      });
    })
    .catch((err) => console.log('getUserJoinedRides failed: ' + err.message));
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

exports.sendConfirmRideJoinEmail = (req, res, next) => {
  // Etsitään matkan luoja
  User.find({
    where: { customer_id: req.body.creator_id }
  })
    .then((creator) => {
      // Luoja löytyi, etsitään liittyjä
      User.find({
        where: { customer_id: req.user.customer_id }
      })
        .then((joiner) => {
          // Liittyjä löytyi, etsitään matka
          Ride.find({
            where: { ride_id: req.body.ride_id }
          })
            .then((ride) => {
              // Matka löytyi. Laitetaan kaikki tieto data-olioon
              const data = {
                creator: {
                  customer_id: creator.dataValues.customer_id,
                  name: creator.dataValues.firstName,
                  email: creator.dataValues.email
                },
                joiner: {
                  customer_id: joiner.dataValues.customer_id,
                  name: joiner.dataValues.firstName,
                  email: joiner.dataValues.email
                },
                ride: {
                  ride_id: ride.dataValues.ride_id,
                  startingplace: ride.dataValues.startingplace,
                  destination: ride.dataValues.destination,
                  time_of_departure: ride.dataValues.time_of_departure
                }
              };

              // Luodaan sähköposti
              const emailData = {
                to: data.creator.email,
                from: email,
                template: 'ride-join-request',
                subject: 'Kyyti.in - Matkallesi halutaan liittyä',
                context: {
                  creatorName: data.creator.name,
                  joinerName: data.joiner.name,
                  url: `https://kyyti.in/rides/confirm/${data.creator.customer_id}/${data.ride.ride_id}/${data.joiner.customer_id}`
                }
              };

              // Lähetetään sähköposti
              smtpTransport.sendMail(emailData, (err) => {
                if (!err) {
                  return res.status(200).json({
                    success: true,
                    message: 'Request to join sent',
                    data: data
                  });
                } else {
                  return res.status(500).json({
                    success: false,
                    message: 'Request to join failed',
                    error: err
                  });
                }
              });
            })
            .catch((err) => console.log(err));
        })
    })
    .catch((err) => console.log('sendConfirmRideJoinEmail failed: ' + err.stack));
};

exports.denyRideJoin = (req, res, next) => {
  // Etsitään liittymistä yrittänyt käyttäjä
  User.find({
    where: { customer_id: req.body.joiner_id }
  })
    .then((joiner) => {
      // Luodaan sähköposti
      const emailData = {
        to: joiner.dataValues.email,
        template: 'ride-join-deny',
        subject: 'Kyyti.in - Pyyntö liittyä matkalle hylättiin',
        context: {
          name: joiner.dataValues.firstName,
        }
      };
      // Lähetetään sähköposti
      smtpTransport.sendMail(emailData, (err) => {
        if (!err) {
          return res.status(200).json({
            success: true,
            message: 'Pyynnön hylkäys onnistui',
          });
        } else {
          return res.status(500).json({
            success: false,
            message: 'Pyynnön hylkäys epäonnistui',
            error: err
          });
        }
      })
    })
    .catch((err) => console.log('denyRideJoin failed: ' + err));
};

exports.confirmRideJoin = (req, res, next) => {
  // ride_id ja joiner_id
  const data = req.body;
  // Luodaan uusi kenttä CustomersRides_ride tauluun näillä tiedoilla
  CustomersRides.create(data)
    .then((data) => {
      // Etsitään liittynyt käyttäjä
      User.find({
        where: { customer_id: req.body.customer_id }
      })
        .then((user) => {
          // Luodaan sähköposti
          const emailData = {
            to: user.dataValues.email,
            template: 'ride-join-confirm',
            subject: 'Kyyti.in - Pyyntösi liittyä matkalle hyväksyttiin',
            context: {
              name: user.firstName,
            }
          };
          // Lähetetään sähköposti
          smtpTransport.sendMail(emailData, (err) => {
            if (!err) {
              return res.status(200).json({
                success: true,
                message: 'Pyynnön hyväksyminen onnistui'
              });
            } else {
              return res.status(500).json({
                success: false,
                message: 'Pyynnön hyväksyminen epäonnistui',
                error: err
              });
            }
          });
        });
    })
    .catch((err) => console.log('confirmRideJoin failed: ' + err.stack));


};

