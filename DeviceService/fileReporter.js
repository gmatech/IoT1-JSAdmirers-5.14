var fs = require('fs');
var os = require('os');
var Reporter = require('./reporter');

function FileReporter(configuredFilePath) {
    this.filePath = configuredFilePath;
}

FileReporter.prototype =  new Reporter();
FileReporter.prototype.report = function(temp) {
    var status;
    var self = this;
    this.getDeviceId(function(id) {
        status = {
            type: "temp",
            ip: self.getIpAddress(),
            deviceId: id,
            timestamp: Date.now(),
            data: {temperature: temp}
        };
        console.log(JSON.stringify(status));
        fs.appendFile(self.filePath, JSON.stringify(status) + os.EOL, function(err, data) {
            if (err) {
                return console.log('Error (%s) writing to: %s', err, self.filePath);
            }
        });
    });
}; 

module.exports = FileReporter;