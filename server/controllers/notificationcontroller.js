const model = require('../models/index'),
      User = model.Customer,
      Notification = model.Notification;


exports.getNotifications = (req, res, next) => {
    // Hakee käyttäjän kaikki ilmoitukset
};

exports.updateNotification = (req, res, next) => {
    // Päivitetään notifikaatio
}

exports.deleteNotification = (req, res, next) => {
    // Poistetaan ilmoitus
}