const bcrypt = require('bcrypt');
const db = require('./index');

module.exports = (sequelize, DataTypes) => {
  let Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    social_id: {
      type: DataTypes.STRING
    },
    social_provider: {
      type: DataTypes.STRING
    },
    profile_picture: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail : {
          msg: 'Supplied email is not a valid email address'
        }
      }
    },
    password: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    confirmed: { type: DataTypes.BOOLEAN },
    confirm_token: { type: DataTypes.STRING },
    confirm_token_expiry: { type: DataTypes.DATE }, 
    reset_token: { type: DataTypes.STRING },
    reset_token_expiry: { type: DataTypes.DATE }, 
    additional_information: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    tableName: 'Customers',
    freezeTableName: true,
  });

  return Customer;
};
