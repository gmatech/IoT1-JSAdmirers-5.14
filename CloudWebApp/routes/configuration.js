var configure = require('../configure');
var mqtt = require('mqtt');

exports.edit = function(req, res) {
  res.render('edit-configuration');
};

exports.change = function(req, res) {
    configure.init();
    var mqttHost = configure.get('mqttHost');
    var mqttPort = configure.get('mqttPort');
    var client = mqtt.createClient(mqttPort, mqttHost);

    client.on('connect', function() {
        console.log('connected');
        var configuration = JSON.stringify({
            interval: req.body.interval
        });
        client.publish('configure', configuration);
        res.render('confirm-configuration');
    });
};

exports.confirm = function(req, res) {
  res.render('confirm-configuration');
};