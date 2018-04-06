const model = require('../models/index'),
    User = model.Customer,
    Notification = model.Notification;


exports.getNotifications = (req, res, next) => {
    // Hakee käyttäjän kaikki ilmoitukset
    // Otetaan id talteen parametreista
    const id = req.params.customer_id;
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

exports.deleteNotifications = (req, res, next) => {
    const id = req.params.customer_id;
    // Etsitään notifikaatiot
    Notification.destroy({
        where: { customer_id: id }
    })
        .then((notification) => res.status(200).json({
            success: true,
            message: 'Notifikaatiot tuhottu',   
        }))
        .catch((err) => console.error('notifikaatioiden epäonnistui: ' + err.stack));
};
