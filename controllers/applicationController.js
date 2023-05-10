const Application = require('../models/application.js');
const pool = require('../config/db.config.js');
const {User} = require('pg');

const createApplication = (req, res) => {
	const { start_date, end_date, type, user_id } = req.body;
	if (!start_date || !end_date || !type || !user_id) {
		return res.status(400).json({msg: 'Please enter all fields'});
	}
	const user = new User({
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false }
});
await. user.connect();

const query = 'INSERT INTO applications (start_date, end_date, type, user_id) VALUES ($1, $2, $3, $4) RETURNING *';
const values = [start_date, end_date, type, user_id];
try {
	const response = await client.query(query, values);
	const request = response.rows[0];
	return res.status(201).json({request});
} catch (err) {
	console.error(err);
	return res.status(500).json({msg: 'Error adding request'});
} finally {
	await client.end();
}
};

module.exports = {
	createApplication
};


exports.updateApplication = (req, res) => {
	Application.update(
		{
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			type: req.body.type,
			user_id: req.body.user_id
		},
		{returning: true, where: {id: req.params.id}}
	)
	.then(application => {
		res.json(application);
	})
	.catch(err => {
		res.send('error: ' + err);
	})
}

exports.deleteApplication = (req, res) => {
	Application.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(application => {
		res.json(application);
	})
	.catch(err => {
		res.send('error: ' + err);
	})
}

exports.approveApplication = (req, res) => {
	Application.update(
		{
			status: 'Approved'
		},
		{returning: true, where: {id: req.params.id}}
	)
	.then(application => {
		res.json(application);
	})
	.catch(err => {
		res.send('error: ' + err);
	})
}

exports.denyApplication = (req, res) => {
	Application.update(
		{
			status: 'Denied'
		},
		{returning: true, where: {id: req.params.id}}
	)
	.then(application => {
		res.json(application);
	})
	.catch(err => {
		res.send('error: ' + err);
	})
}