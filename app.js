const http = require('http');
const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const config = require('./config.json');
const hostname = '127.0.0.1';
const port = 3000;
const User = require('./models/user.js');
const Application = require('./models/application.js');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController.js');
const applicationController = require('./controllers/applicationController.js');

(async () => {
	await sequelize.sync({force: true});
})();

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end()
});

const sequelize = new Sequelice (config.development);

sequelize.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.post('/applications', applicationController.createApplication);
app.put('/applications/:id', applicationController.updateApplication);
app.delete('/applications/:id', applicationController.deleteApplication);
app.put('/applications/:id/approve', applicationController.approveApplication);
app.put('/applications/:id/deny', applicationController.denyApplication);
