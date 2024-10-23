const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
require('./db/connection');

const userRoutes = require('./basicroutes/userRoutes');
const employeeRoutes = require('./basicroutes/employeeRoutes');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for user-related requests
app.use('/user', userRoutes);

// Route for employee-related requests
app.use('/', employeeRoutes);

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
