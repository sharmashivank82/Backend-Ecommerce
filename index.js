const express = require('express');
const app = express();

require('dotenv').config();
require('./Models')

const port = process.env.PORT;
const cors = require('cors');


const RouteGateway = require('./routes');
const established_database_connection = require('./utils/connection');

app.use(express.json())
app.use(express.static('uploads'))
app.use(cors({ 'origin': '*' }))

// define all routes
RouteGateway(app);

// DataBase Connectivity
established_database_connection(app, port);