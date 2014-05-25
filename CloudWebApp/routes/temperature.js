
/*
 * GET temperature listing.
 */

var mongoose = require('mongoose');

var tempSchema = mongoose.Schema({
    temperature: Number
});
var recordSchema = mongoose.Schema({
    type: String,
    ip: String,
    deviceId: String,
    timestamp: Date,
    data: [tempSchema]
});
var Record = mongoose.model('Record', recordSchema);

exports.list = function(req, res){
    var temperatures;
    mongoose.connect('mongodb://localhost:27017/sensors');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected");
        Record.find(function(err, records) {
            console.log(err, records);
            if(err) return res.send(500, {
                error: err
            });
            console.log(records);
            temperatures = records;
            console.log("rendering ...");   
            res.render('temperature', {
                temperatures: temperatures
            });
            console.log("disconnecting ...");
            mongoose.disconnect();
        }); 
    });
};