const mongoose = require("mongoose");

const mongoDB_URL = 'mongodb+srv://preciousprakashan:pre04072002@cluster0.ro5wi.mongodb.net/employeeAPP?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoDB_URL).then(() => {
    console.log('Connection established');
}).catch((error) => {
    console.log('Error in establishing connection', error);
});
