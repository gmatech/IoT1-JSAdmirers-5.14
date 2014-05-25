var nconf = require('nconf');

module.exports.init = function init() {
    nconf.file({ file: 'config.json' });
};

module.exports.get = function get(key) {
    return nconf.get(key);
};

module.exports.set = function set(key, value) {
    return nconf.set(key, value);
};

module.exports.save = function save() {
    nconf.save();
};