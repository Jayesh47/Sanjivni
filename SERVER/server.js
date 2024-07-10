const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('public'));

// connect to database.
mongoose.connect(process.env.DATABASE, {dbName: 'SanjivniDB'}).then(() => {
    console.log("Database Server is connected successfully.");
}).catch((err) => {
    console.log(err);
});

// imports all routes.
const userRegister = require('./Routes/userRoutes.js');
const SellerRegister = require('./Routes/sellerRoutes.js');

// all initial routings.
app.use('/user', userRegister);
app.use('/seller', SellerRegister);


// port server.
const PORT = process.env.PORT;
http.listen(PORT, () => {
    console.log('Server listening at http://localhost:'+PORT);
});