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
      user: user
    });
  })
  .catch((err) => console.log('getUser failed: ' + err.message));
};

exports.updateUser = (req, res, next) => {
  const updateData = req.body.updateData;
  User.find({
    where: {customer_id: req.params.id}
  }).then(user => {
    return user.updateAttributes(updateData)
  })
  .then(updatedUser => {
    res.status(200).json({
      message: 'User updated',
      user: updatedUser
    });
  })
  .catch((err) => console.log('updatedUser failed: ' + err.message));
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