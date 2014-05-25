//var TempSensor = require('./tempSensor');
var TempSensor = require('./fakeTempSensor');
var Reporter = require('./mqttCloudReporter');
var configure = require('./configure');
var mqtt = require('mqtt');

process.on('exit', function() {
    /*
    reporter.dispose(function() {
        console.log('goodbye');
    });
    */
    console.log('exiting');
});

process.on('SIGINT', function() {
    console.log('disconnecting ...');
    reporter.dispose(function() {
        console.log('goodbye');
        process.exit();
    });
});

configure.init();

var interval = configure.get('interval');
//var filePath = configure.get('filePath');
var mqttHost = configure.get('mqttHost');
var mqttPort = configure.get('mqttPort');

var reporter = new Reporter(mqttHost, mqttPort);

var client = mqtt.createClient(mqttPort, mqttHost);
client.subscribe('configure');

client.on('message', function(topic, message) {
    console.log('got message: ' + message);
    var configuration = JSON.parse(message);
    console.log('setting interval to: ' + configuration.interval);
    configure.set('interval', configuration.interval);
    interval = configure.get('interval');
    configure.save();
    setTimer();
});

setTimer();

var timer;

function setTimer() {
    if (timer != undefined) {
        clearInterval(timer);
    }
    timer = setInterval(function() {
        TempSensor.readTemperature(function(err, temp) {
            reporter.report(temp);
        });
    }, interval);
}