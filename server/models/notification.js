const db = require('./index');

module.exports = (sequelize, DataTypes) => {
	let Notification = sequelize.define('Notification', {
		notification_id: {
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
            type: DataaTypes.UUID,
            allowNull: false,
        },
        notification_message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unread: { 
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
	},
		{
			timestamps: false,
			tableName: 'Notifications',
			freezeTableName: true,
		});

	return Notification;
};
