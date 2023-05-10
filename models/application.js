const Sequelice = require('sequelize');
const sequelize = require('app.js');
const User = requere ('user.js');

const Application = sequelize.define('application', {
	id: {
		type: Sequelice.INTEGER,
		autoIncrement: true,
		allownull: false,
		primaryKey: true
	},
	start_date: {
		type: Sequelice.DATEONLY,
		allownull: false
	},
	end_date: {
		type: Sequelice.DATEONLY,
		allownull: false
	},
	type: {
		type: Sequelice.STRING,
		allownull: false
	},
	status: {
		type: DataTypes.ENUM('Pending', 'Aprobed', 'Denied'),
		allownull: false,
		defaultValue: 'Pending'
	}
});

Application.belongsTo(User, {foreignKey: 'user_id'});

module.exports = Application;
