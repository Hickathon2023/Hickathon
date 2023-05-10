const Sequelice = require('sequelize');
const sequelize = require('app.js');

const User = sequelize.define('user', {
	id: {
		type: Sequelice.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelice.STRING,
		allowNull: false
	},
	email: {
		type: Sequelice.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelice.STRING,
		allowNull: false
	}
});

module.exports = User;
