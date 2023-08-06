const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8086;
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');

db.connect();
const db = require('./src/config/conenctDb');

const route = require('./src/routes/index');

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

route(app);

app.listen(port);