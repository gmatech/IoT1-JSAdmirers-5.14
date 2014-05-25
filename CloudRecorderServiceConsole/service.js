var mqtt = require('mqtt');
var configure = require('./configure');

configure.init();
var mqttHost = configure.get('mqttHost');
var mqttPort = configure.get('mqttPort');

client = mqtt.createClient(mqttPort, mqttHost);

client.subscribe('temperature');

client.on('message', function(topic, message) {
    console.log('received: ' + topic + ' = ' + message);
});