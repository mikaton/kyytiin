const model = require("../models/index"),
  config = require("../config/main"),
  path = require("path"),
  googleMapsClient = require("@google/maps").createClient(
    {
      key: "",
      Promise: Promise,
    },
    (Ride = model.Ride),
    (async = require("async")),
    (CustomersRides = model.CustomersRides_ride),
    (User = model.Customer),
    (Request = model.Request),
    (Riderequest = model.Riderequest),
    (Notification = model.Notification),
    (Op = model.Sequelize.Op),

    // --- <Sähköpostin asetukset> ---
    (hbs = require("nodemailer-express-handlebars")),
    (email = process.env.MAILER_EMAIL_ID || config.mailer.user),
    (password = process.env.MAILER_PASSWORD || config.mailer.password),
    (nodemailer = require("nodemailer")),

    (smtpTransport = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE_PROVIDER || "Gmail",
      auth: {
        user: email,
        pass: password,
      },
    })),

    (handlebarsOptions = {
      viewEngine: "handlebars",
      viewPath: path.resolve("./server/templates/"),
      extName: ".html",
    }),

    smtpTransport.use("compile", hbs(handlebarsOptions))
  );
// --- </Sähköpostin asetukset> //

exports.getSingleRide = (req, res, next) => {
  Ride.sequelize
    .query(
      "SELECT r.deviate AS deviate, r.ride_id AS ride_id, r.customer_id AS customer_id, r.additional_information AS additional_information, r.startingplace AS startingplace, r.destination AS destination, r.time_of_departure AS time_of_departure, r.time_of_arrival AS time_of_arrival, r.free_seats AS free_seats, r.smoking AS smoking, r.pets AS pets, c.firstName AS firstName, c.lastName as lastName FROM Rides r INNER JOIN Customers c on r.customer_id = c.customer_id WHERE r.ride_id = :ride_id",
      {
        replacements: { ride_id: req.params.id },
        type: Ride.sequelize.QueryTypes.SELECT,
      }
    )
    .then(ride => {
      res.status(200).json({
        message: "Ride found",
        data: ride,
      });
    })
    .catch(err => console.log("getSingleRide failed: " + err.message));
};

exports.getAllRides = (req, res, next) => {
  Ride.findAll({
    where: { time_of_departure: { $gte: Date.now() } },
    order: [["time_of_departure", "ASC"]],
  })
    .then(rides => {
      res.send(rides);
    })
    .catch(err => console.log("getAllRides failed: " + err.message));
};

exports.getUserRides = (req, res, next) => {
  Ride.findAll({
    where: { customer_id: req.params.id },
  })
    .then(ride => {
      res.status(200).json({
        message: "Rides found",
        data: ride,
      });
    })
    .catch(err => console.log("getUserRides failed: " + err.message));
};

exports.getUserJoinedRides = (req, res, next) => {
  Ride.sequelize
    .query(
      "SELECT r.ride_id as ride_id, r.startingplace AS startingplace, r.destination AS destination, r.time_of_departure AS time_of_departure, r.time_of_arrival AS time_of_arrival, r.free_seats AS free_seats, r.smoking AS smoking, r.pets AS pets FROM CustomersRides_ride CRr INNER JOIN Rides r on CRr.ride_id = r.ride_id WHERE CRr.customer_id = :joiner_customer_id",
      {
        replacements: { joiner_customer_id: req.params.id },
        type: Ride.sequelize.QueryTypes.SELECT,
      }
    )
    .then(ride => {
      res.status(200).json({
        message: "Rides found",
        data: ride,
      });
    })
    .catch(err => console.log("getUserJoinedRides failed: " + err.message));
};
exports.getUserMadeRides = (req, res, next) => {
  //etsitään Rides taulusta ridejoinereita, innerjoinin avulla.
  Ride.sequelize
    .query(
      "SELECT CRr.customer_id AS joiner_id FROM Rides r INNER JOIN CustomersRides_ride CRr on r.ride_id = CRr.ride_id WHERE r.ride_id = :ride_id AND r.customer_id = :customer_id;",
      {
        replacements: {
          ride_id: req.params.ride_id,
          customer_id: req.params.customer_id,
        },
        type: Ride.sequelize.QueryTypes.SELECT,
      }
    )
    .then(rides => {
      console.log(rides);
      Ride.find({
        where: { ride_id: req.params.ride_id },
      })
        //haetaan käyttäjät
        .then(ride => {
          var i;
          var joiners = [];
          console.log(rides.length);
          for (i = 0; i < rides.length; i++) {
            joiners.push(rides[i].joiner_id);
          }
          if (joiners.length > 0) {
            User.findAll({
              attributes: [
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
                "customer_id",
              ],
              where: {
                Customer_id: {
                  [Op.in]: [joiners],
                },
              },
            }).then(joiners => {
              res.status(200).json({
                message: "Ride found",
                ride: ride,
                joiners: joiners,
              });
            });
          } else {
            res.status(200).json({
              message: "Ride found",
              ride: ride,
            });
          }
        });
    })
    .catch(err => console.log("getUserJoinedRides failed: " + err.message));
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
    deviate: req.body.deviate,
    hidden: req.body.hidden,
    additional_information: req.body.additional_information,
  };

  Ride.create(data)
    .then(ride => {
      res.status(200).json({
        message: "Ride created",
        data: ride,
      });
    })
    .catch(err => console.log("createRide failed: " + err.message));
};

exports.updateRide = (req, res, next) => {
  const updateData = req.body;
  Ride.find({
    where: { ride_id: req.body.ride_id },
  })
    .then(ride => {
      return ride.updateAttributes(updateData);
    })
    .then(updatedRide => {
      res.status(200).json({
        message: "Ride updated",
        user: updatedRide,
      });
    })
    .catch(err => console.log("updateRide failed: " + err.message));
};

exports.deleteRide = (req, res, next) => {
  Ride.find({
    where: { ride_id: req.params.id },
  })
    .then(ride => {
      return ride.destroy();
    })
    .then(() => {
      res.status(200).json({
        message: "Ride deleted successfully",
      });
    })
    .catch(err => console.log("deleteRide failed: " + err.message));
};

exports.denyJoinRide = (req, res, next) => {
  const notificationData = {
    customer_id: req.body.joiner_id,
    ride_id: req.params.ride_id,
    canJoin: false,
    notification_message: "Pyyntösi liittyä matkalle hylättiin!",
  };
  Notification.create(notificationData)
    .then(notification => {
      res.status(200).json({
        success: true,
        message: "Notifikaation luominen onnistui",
        notification: notification.dataValues,
      });
    })
    .catch(err =>
      console.error("Notifikaation luonti epäonnistui: " + err.stack)
    );
};

exports.joinRide = (req, res, next) => {
  // Vähennetään vapaa paikka matkalta
  Ride.findOne({
    where: { ride_id: req.params.ride_id },
  })
    .then(ride => {
      const data = { free_seats: ride.free_seats - 1 };
      ride
        .updateAttributes(data)
        .then(() => {
          // Luodaan tietue CustomersRides_ride tauluun
          const crData = {
            customer_id: req.body.joiner_id,
            ride_id: req.params.ride_id,
          };
          CustomersRides.create(crData)
            .then(() => {
              // Luodaan uusi ilmoitus

              const notificationData = {
                customer_id: req.body.joiner_id,
                ride_id: req.params.ride_id,
                canJoin: true,
                notification_message: "Pyyntösi liittyä matkalle hyväksyttiin!",
              };
              Notification.create(notificationData)
                .then(notification => {
                  res.status(200).json({
                    success: true,
                    message: "Matkalle liittyminen onnistui",
                    notification: notification.dataValues,
                  });
                })
                .catch(err =>
                  console.error(
                    "Notifikaation luonti epäonnistui: " + err.stack
                  )
                );
            })
            .catch(err =>
              console.error(
                "Customers_Rides_ride luonti epäonnistui: " + err.stack
              )
            );
        })
        .catch(err =>
          console.error("Matkan tietojen päivitys epäonnistui " + err.stack)
        );
    })
    .catch(err => console.error("Matkan hakeminen epäonnistui: " + err.stack));
};

exports.createRequest = (req, res, next) => {
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
    deviate: req.body.deviate,
    additional_information: req.body.additional_information,
  };
  Riderequest.create(data)
    .then(ride => {
      console.log(ride);
      res.status(200).json({
        message: "Riderequest created",
        data: ride,
      });
    })
    .catch(err => console.log("createRiderequest failed: " + err.message));
};

exports.getRideRequest = (req, res, next) => {
  Riderequest.sequelize
    .query(
      "SELECT r.deviate AS deviate, r.request_id as request_id, r.customer_id AS customer_id, r.additional_information AS additional_information, r.startingplace AS startingplace, r.destination AS destination, r.time_of_departure AS time_of_departure, r.time_of_arrival AS time_of_arrival, r.free_seats AS free_seats, r.smoking AS smoking, r.pets AS pets, c.firstName AS firstName, c.lastName as lastName FROM Riderequests r INNER JOIN Customers c on r.customer_id = c.customer_id WHERE r.request_id = :request_id",
      {
        replacements: { request_id: req.params.id },
        type: Riderequest.sequelize.QueryTypes.SELECT,
      }
    )
    .then(request => {
      res.status(200).json({
        message: "Requests found",
        data: request,
      });
    })
    .catch(err => console.log("getUserRides failed: " + err.message));
};

exports.rideRequestAccepted = (req, res, next) => {
  Riderequest.find({
    where: { request_id: req.body.request_id },
  })
    .then(request1 => {
      const request = request1.dataValues;
      const joiner_id = request.customer_id; //otetaan requestin customer_id talteen että voidaan luoda uusi CRr tietue
      request.customer_id = req.body.accepter_id; //vaihdetaan customer_id kyytipyynnön hyväksyjän id:ksi että tiedot ovat oikein ride tietueessa
      request.free_seats = 0; //Asetetaan vapaiden paikkojen määräksi nolla, ettei kyyti näy kyytilistauksessa
      Ride.create(request)
        .then(newRide => {
          const newCRr = {
            customer_id: joiner_id,
            ride_id: newRide.ride_id,
          };
          CustomersRides.create(newCRr)
            .then(() => {
              res.status(200).json({
                message: "New ride and customersrides created",
              });
              //päivitetään riderequest taulu ettei sitä näytetä kyytipyyntölistauksessa
              Riderequest.update(
                { is_fulfilled: true },
                {
                  where: {
                    request_id: req.body.request_id,
                  },
                }
              )
                .then(() => {
                  const notificationData = {
                    customer_id: joiner_id,
                    ride_id: newRide.ride_id,
                    canJoin: true,
                    notification_message: "Joku on hyväksynyt kyyntipyyntösi!",
                  };
                  Notification.create(notificationData);
                })
                .catch(err =>
                  console.error(
                    "Notifikaation luonti epäonnistui: " + err.stack
                  )
                );
            })
            .catch(err => console.log("sending response failed" + err));
        })
        .catch(err => console.log("crr create failed" + err));
    })
    .catch(err => console.log("ridecreate failed" + err));
};

exports.getAllRideRequests = (req, res, next) => {
  Riderequest.findAll({
    where: {
      time_of_departure: { $gte: Date.now() },
      is_fulfilled: false,
    },
    order: [["time_of_departure", "ASC"]],
  })
    .then(rides => {
      res.send(rides);
    })
    .catch(err => console.log("getAllRiderequests failed: " + err.message));
};

exports.getDirections = (req, res, next) => {
  // Hakee Googlen Directions APIsta matkaohjeet aloitus- ja päätepisteen perusteella
  const startingplace = req.params.startingplace;
  const destination = req.params.destination;

  googleMapsClient
    .directions({
      origin: `${startingplace}, Finland`,
      destination: `${destination}, Finland`,
      mode: "driving",
    })
    .asPromise()
    .then(response => {
      res.status(200).json({
        success: true,
        message: "Matkaohjeet haettiin onnistuneesti",
        data: response.json,
      });
    })
    .catch(err =>
      console.log("google.maps.directions epäonnistui: " + err.stack)
    );
};
