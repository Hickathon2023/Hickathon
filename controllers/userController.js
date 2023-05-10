const pool = require('../config/db.config.js');
const User = require('../models/user.js');

exports.createUser = (req, res) => {
	const { name, email, password } = req.body;
	
	const consultation = `
    INSERT INTO usuarios (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [nombre, email, contraseña];

  pool.query(consultation, values, (error, response) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(response.rows[0]);
    }
  });
};

exports.updateUser = (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	User.findByIdAndUpdate(id, {name, email, password}, {new: true}, (error, user) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.send(user);
		}
	});
};

exports.deleteUser = (req, res) => {
	const { id } = req.params;

	User.findByIdAndRemove(id, (error, user) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.send(user);
		}
	});
};


