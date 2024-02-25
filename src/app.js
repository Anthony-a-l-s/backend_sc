const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const userRoute = require('./routes/user');


const index = require('./routes/index');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors({ origin: true, credentials: true }));

app.use(index);
app.use('/', userRoute);

module.exports = app;






