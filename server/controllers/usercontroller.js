const model = require('../models/index'),
      multer = require('multer'),
      crypto = require('crypto'),
      path = require('path'),
      fs = require('fs'),
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
        profile_picture: user.profile_picture
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
        profile_picture: updatedUser.profile_picture
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
  // Storage-objekti määrittää kuinka/minne multer tallentaa tiedoston
  const storage =  multer.diskStorage({
    destination: 'dist/public/images',
    filename: (req, file, callback) => {
      // Luodaan tiedostolle sekalainen nimi ja lisätään timestamp sekä tiedostopääte
      crypto.pseudoRandomBytes(16, (err, raw) => {
        callback(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
      });
    }
  });

  let upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
      // Sallitaan vain jpeg/png
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      // Jos mimetyyppi ja tiedostopääte mätsää otetaan tiedosto vastaan
      if(mimetype && extname) return callback(null, true);
      // Muuten ei
      callback(null, false);
    }
  }).single('image');


  upload(req, res, function(err) {
    // Tarkistetaan että filu tuli läpi
    if(!req.file) return res.status(500).send({success: false, message: 'Voit ladata vain .jpg tai .png kuvia!'});
    // Otetaan tallennussijainti talteen
    const filePath = 'public/images/' + req.file.filename;
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
  });
};