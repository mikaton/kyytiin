const bcrypt = require('bcrypt');
const db = require('./index');

module.exports = (sequelize, DataTypes) => {
	let Review = sequelize.define('Review', {
		review_id: {
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
		stars: {
			type: DataTypes.TINYINT
		},
		review_text: {
			type: DataTypes.STRING
		},
		review_created: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
		{
			timestamps: false,
			tableName: 'Reviews',
			freezeTableName: true,
		});

	return Review;
};
