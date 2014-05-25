var macModule = require('getmac');
var utilities = require('./utilities');

function Reporter() {
}

Reporter.prototype = {
    report: function() {
        throw "Not Implemented";
    },

    getDeviceId: function(callback) {
        macModule.getMac(function(err, macAddress) {
            if (err) throw err;
            callback(macAddress);    
        });
    },

    getIpAddress : function() {
        return utilities.getIpAddress();
    },

    dispose : function() {
    }
}

module.exports = Reporter;
