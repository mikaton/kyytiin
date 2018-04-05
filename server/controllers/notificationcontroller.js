const model = require('../models/index'),
    User = model.Customer,
    Notification = model.Notification;


exports.getNotifications = (req, res, next) => {
    // Hakee käyttäjän kaikki ilmoitukset
    // Otetaan id talteen parametreista
    console.log(req.params);
    const id = req.params.customer_id;
    console.log(id);
    // Etsitään notifikaatiot
    Notification.findAll({
        where: { customer_id: id }
    })
        .then((notification) => res.status(200).json({
            success: true,
            message: 'Notifikaatio löytyi',
            data: notification   
        }))
        .catch((err) => console.error('Notifikaation hakeminen epäonnistui: ' + err.stack));
};

exports.updateNotification = (req, res, next) => {
    // Päivitetään notifikaatio
}

exports.deleteNotification = (req, res, next) => {
    // Poistetaan ilmoitus
}