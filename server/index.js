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

// routes
app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
})
