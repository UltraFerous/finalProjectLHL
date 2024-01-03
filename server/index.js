// load .env data into process.env
require('dotenv').config();

// web server config
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 8080;

// express middleware
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());

// separated routes for each resource
const usersApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const projectsApiRoutes = require('./routes/projects-api');
const projectsRoutes = require('./routes/projects');
const orgsApiRoutes = require('./routes/orgs-api');
const orgsRoutes = require('./routes/orgs');
const developersRoutes = require('./routes/developers');

// mount all resource routes
// note: endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', usersApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/projects', projectsApiRoutes);
app.use('/projects', projectsRoutes);
app.use('/developers', developersRoutes);
app.use('/api/users', usersApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/org', orgsApiRoutes);
app.use('/org', orgsRoutes);

app.get('/', (req, res) => {
  res.send('Hello from our server!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
