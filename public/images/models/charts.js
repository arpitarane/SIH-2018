var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var home = mongoose.Schema({
Institute_Permanent_ID: String,
Institute_Name: String,
University: String,
State: String,
District: String,
City: String,
Scheme: String,
Sub_scheme: String,
Enrollments: Number,
Start_Date: Date,
End_Date: Date,
Duration: Number,
Status: Number,
Funds_Indicator: String,
Funds_Given: Number,
Total_Funds: Number
})

module.exports = mongoose.model('charts',home);