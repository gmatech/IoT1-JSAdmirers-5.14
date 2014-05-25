var Reporter = require('./reporter');

function ConsoleReporter() {
}

ConsoleReporter.prototype =  new Reporter();
ConsoleReporter.prototype.report = function(temp) {
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
        console.log('console: ' + JSON.stringify(status));
    });
};

module.exports = ConsoleReporter;