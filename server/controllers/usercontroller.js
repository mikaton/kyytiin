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
        email: user.email
      }
    });
  })
  .catch((err) => console.log('getUser failed: ' + err.message));
};

exports.updateUser = (req, res, next) => {
  console.log(req.body);
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
        email: updatedUser.email
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