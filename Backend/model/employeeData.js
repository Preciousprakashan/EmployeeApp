const mongoose = require('mongoose');

//creating schema
const employeeSchema = new mongoose.Schema({
    empID: String,
    empName: String,
    empDesignation: String,
    empDepartment: String,
    empLocation: String,
    empSalary: Number
  }, { versionKey: false });
  


//mapping collection
const  employeeData=mongoose.model('employee',employeeSchema);

//exporting schema
module.exports=employeeData;