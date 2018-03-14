const models = require('./index');

module.exports = (sequelize, DataTypes) => {
  let Ride = sequelize.define('Ride', {
    ride_id: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     allowNull: false,
     primaryKey: true 
    },
    customer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      foreignKey: true
    },
    startingplace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    journey: {type: DataTypes.STRING},
    time_of_departure: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    alternate_time_of_departure: {
      type: DataTypes.DATE
    },
    time_of_arrival: {
      type: DataTypes.DATE
    },
    alternate_time_of_arrival: {
      type: DataTypes.DATE
    },
    free_seats: {
      type: DataTypes.TINYINT, 
      allowNull: false
    },
    smoking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pets: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    additional_information: {
      type: DataTypes.STRING
    },

  }, {
    timestamps: false,
    tableName: 'Rides',
    freezeTableName: true,
  });

  return Ride;
};