// load .env data into process.env
require('dotenv').config({ path: '../.env' });
const { allProjectData } = require("./db/queries/projects.js");
const { allUserData } = require("./db/queries/users.js");

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
const messagesRoutes = require('./routes/messages.js');

// mount all resource routes
// note: endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', usersApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/projects', projectsApiRoutes);
app.use('/projects', projectsRoutes);
app.use('/developers', developersRoutes);
app.use('/api/org', orgsApiRoutes);
app.use('/org', orgsRoutes);
app.use('/messages', messagesRoutes);

// Home Page
app.get('/api', (req, res) => {

  let responseArray = [];

  // call first query helper func
  allProjectData()
    .then(projectData  => {
      console.log('projectData:', projectData);
      responseArray.push(projectData);
      // call second query helper func
      return allUserData();
    })
    .then(userData => {
      console.log('userData:', userData);
      const developersArray = userData.filter((user) => !user.admin);
      responseArray.push(developersArray);
    })
    .then(() => res.status(200).json(responseArray))
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
})

// Fallback route for handling client-side routing
//app.get('*', (req, res) => {
//  res.sendFile(path.resolve(__dirname, '../index.html'));
//});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
