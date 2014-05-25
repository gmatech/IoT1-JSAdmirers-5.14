exports.readTemperature = function(callback) {
  var temperature = (21 + (Math.random() * 5)).toFixed(2);
  callback(null, temperature);
}