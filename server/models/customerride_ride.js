const models = require('./index');

module.exports = (sequelize, DataTypes) => {
  let CustomersRides_ride = sequelize.define('CustomersRides_ride', {
    customersrides_ride_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'customer_id'
      }
    },
    ride_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Ride',
        key: 'ride_id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'CustomersRides_ride',
    freezeTableName: true,
  });

  return CustomersRides_ride;
};