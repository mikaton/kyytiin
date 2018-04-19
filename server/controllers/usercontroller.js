const model = require('../models/index'),
      User = model.Customer;

exports.getUser = (req, res, next) => {
  User.find({
    where: { customer_id: req.params.id }
  })
  .then(user => {
    if(!user) res.status(400).json({
      message: 'User not found'
    });
    else res.status(200).json({
      message: 'User found',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        customer_id: user.customer_id,
        phoneNumber: user.phoneNumber,
        profile_image: user.profile_image
      }
    });
  })
  .catch((err) => console.log('getUser failed: ' + err.message));
};

exports.updateUser = (req, res, next) => {
  const updateData = req.body;
  User.find({
    where: {customer_id: req.params.id}
  }).then(user => {
    return user.updateAttributes(updateData)
  })
  .then(updatedUser => {
    res.status(200).json({
      message: 'User updated',
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profile_image: updatedUser.profile_image
      }
    });
  })
  .catch((err) => console.log('updatedUser failed: ' + err));
};

exports.deleteUser = (req, res, next) => {
  User.find({
    where: {customer_id: req.params.id}
  })
  .then((user) => {
    return user.destroy();
  })
  .then(() => {
    res.status(200).json({
      message: 'User deleted'
    });
  })
  .catch((err) => console.log('deleteUser failed: ' + err.message));
};

exports.updateUserPhoto = (req, res, next) => {
    // Tarkistetaan että filu tuli läpi
    if(!req.file) return res.status(500).send({success: false, message: 'Tiedostoa ei löytynyt'});
    // Otetaan tallennussijainti talteen
    const host = req.hostname;
    const filePath = req.protocol + '://' + host + '/' + req.file.path;
    // Etsitään käyttäjä
    User.findOne({
      where: { customer_id: req.params.id }
    })
    .then(user => {
      // Tallennetaan kuvan URL
      const data = {
        profile_picture: filePath
      };
      user.updateAttributes(data).catch((err) => console.error('Tietojen päivitys epäonnistui: ' + err.stack));
    })
    .catch((err) => console.error('updateUserPhoto epäonnistui: ' + err.stack));

    return res.status(200).send({success: true, message: 'Tiedosto ladattu onnistuneesti'});
}