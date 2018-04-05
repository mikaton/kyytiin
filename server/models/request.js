const db = require('./index');

module.exports = (sequelize, DataTypes) => {
	let Request = sequelize.define('Request', {
		request_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
        },
        creator_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'Customer',
                key: 'customer_id'
            }
        },
        joiner_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'Customer',
                key: 'customer_id'
            }
        },
        joiner_name: { type: DataTypes.STRING },
        ride_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'Ride',
                key: 'ride_id'
            }
        },
        startingplace: { type: DataTypes.STRING },
        destination: { type: DataTypes.STRING },
        additional_information: { type: DataTypes.STRING } 
	},
		{
			timestamps: false,
			tableName: 'Requests',
			freezeTableName: true,
		});

	return Request;
};
