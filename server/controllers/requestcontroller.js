const model = require('../models/index'),
  config = require('../config/main'),
  Request = model.Request;

exports.createJoinRequest = (req, res, next) => {
  // Otetaan data talteen
  const data = {
    creator_id: req.body.creator_id,
    joiner_id: req.body.joiner_id,
    joiner_name: req.body.joiner_name,
    ride_id: req.body.ride_id,
    startingplace: req.body.startingplace,
    destination: req.body.destination,
    additional_information: req.body.additional_information
  };


  Request.find({
    where: { ride_id: data.ride_id, joiner_id: data.joiner_id }
  })
  .then((response) => {
    if(response === null) {
      // Luodaan uusi pyyntö
      Request.create(data)
      .then(() => res.status(200).json({
        success: true,
        message: 'Pyyntö luotu'
      })).catch((err) => console.error('Pyynnön luonti epäonnistui: ' + err.stack));
    } else {
      res.status(400).json({
        success: false,
        message: 'Olet jo pyytänyt liittyä tälle matkalle'
      });
    }
  }).catch((err) => console.error('Request.find epäonnistui: ' + err.stack));



};

exports.getRequestById = (req, res, next) => {
  // Otetaan id talteen parametreista
  const id = req.params.request_id;
  // Etsitään pyyntö
  Request.find({
    where: { request_id: id }
  })
  .then((request) => res.status(200).json({
    success: true,
    message: 'Pyyntö löytyi',
    data: request
  }))
  .catch((err) => console.error('Pyynnön hakeminen epäonnistui: ' + err.stack));
};

exports.getAllRequests = (req, res, next) => {
  // Otetaan id talteen parametreista
  const id = req.params.customer_id;
  // Haetaan kaikki pyynnöt, jossa CREATOR_ID mätsää
  Request.findAll({
    where: { creator_id: id }
  })
  .then((requests) => {
    console.log(requests);
      res.status(200).json({
        success: true,
        message: 'Pyynnöt löytyi',
        data: requests
      });
  })
  .catch((err) => console.error('Pyyntöjen hakeminen epäonnistui: ' + err.stack));
};

exports.updateRequest = (req, res, next) => {
  // Otetaan id talteen parametreista
  const id = req.params.request_id;
  // Etsitään pyyntö
  Request.find({
    where: { request_id: id }
  })
  .then((request) => {
    // Otetaan päivitettävät tiedot req.bodysta
    const data = req.body;
    // Päivitetään tiedot
    request.updateAttributes(data).then((updated) => {
      res.status(200).json({
        success: true,
        message: 'Pyynnön päivittäminen onnistui',
        request: updated.dataValues
      });
    }).catch((err) => console.error('Pyynnön päivittäminen epäonnistui: ' + err.stack));
  }).catch((err) => console.error('Pyynnön hakeminen epäonnistui: ' + err.stack));
};

exports.deleteRequest = (req, res, next) => {
  // Otetaan id talteen parametreista
  const id = req.params.request_id;
  // Etsitään pyyntö
  Request.find({
    where: { request_id: id }
  })
  .then((request) => {
    // Poistetaan pyyntö
    return request.destroy();
  })
  .then(() => res.status(200).json({
    success: true,
    message: 'Pyynnön poistaminen onnistui'
  }))
  .catch((err) => console.error('Pyynnön poistaminen epäonnistui: ' + err.stack));
}
