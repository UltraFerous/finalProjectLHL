// load .env data into process.env
require('dotenv').config({ path: '../.env' });

// web server config
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');

const PORT = process.env.SERVER_PORT || 8080;

// express middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1, key2'],
  maxAge: 24 * 60 * 60 * 1000, // Example: 1 day
}));

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

// Fallback route for handling client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

//app.get('/', (req, res) => {
//    res.send('Hello from our server!')
//})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
