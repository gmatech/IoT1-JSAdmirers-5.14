var mqtt = require('mqtt');
var Reporter = require('./reporter');

function MqttCloudReporter(host, port) {
    this.client = mqtt.createClient(port, host);

    this.client.on('connect', function() {
        console.log('connected');
    });
}

MqttCloudReporter.prototype =  new Reporter();
MqttCloudReporter.prototype.report = function(temp) {
    var status;
    var self = this;
    this.getDeviceId(function(id) {
        status = {
            type: "temp",
            ip: self.getIpAddress(),
            deviceId: id,
            timestamp: Date.now(),
            data: [{temperature: temp}]
        };
        var currentStatus = JSON.stringify(status);
        console.log('Reporting: ' + currentStatus);
        if (self.client.connected)
        {
            self.client.publish('temperature', currentStatus);
        } else {
            console.log('Not connected!');
        }
    });
}; 
MqttCloudReporter.prototype.dispose = function(callback) {
    var self = this;
    console.log("unsubscribing ...");
    this.client.unsubscribe('temperature', function() {
        console.log("unsubscribed");
        console.log("ending messaging ...");
        self.client.end();
        callback();
    });
}

module.exports = MqttCloudReporter;