/* Magic Mirror Module: MMM-AC-Current helper
 * Version: 1.0.0
 *
*/

var NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');

module.exports = NodeHelper.create({

    start: function () {
        console.log('MMM-AC-Current helper, started...');
    },


    getWeatherData: function(payload) {

        var _this = this;
        this.url = payload;

        request({url: this.url, method: 'GET'}, function(error, response, body) {
            // Lets convert the body into JSON
            var result;
            var forecast = ''; 

            // Check to see if we are error free and got an OK response
            if (!error && response.statusCode == 200) { 
                result = JSON.parse(body);
                forecast=result;
                console.log('[MMM-AC-Current]  Updating Current Weather');
            } else {
                // In all other cases it's some other error
                console.log('[MMM-AC-Current]  ** ERROR ** : ' + error);
//		_this.sendNotification("SHOW_ALERT", {title:'HTTP Error', message:error});
            }

            // We have the response figured out so lets fire off the notifiction
            _this.sendSocketNotification('GOT-AC-CURRENT', {'url': _this.url, 'forecast': forecast});
        });
    },

    socketNotificationReceived: function(notification, payload) {
        // Check this is for us and if it is let's get the weather data
        if (notification === 'GET-AC-CURRENT') {
            this.getWeatherData(payload);
        }
    }

});
