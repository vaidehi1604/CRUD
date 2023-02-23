const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');
const { connect } = require('http2');

const app = express();

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

//parser request to body-parser
app.use(bodyParser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

// load routers
app.use('/', require('./server/routers/router'));

app.listen(3000, () => {console.log('server i running on http://localhost:3000');});