/* Magic Mirror Module: MMM-AC-Current
 * Version: 1.0.0
 *
 * By Michael Byers https://github.com/MichaelByers/
 * MIT Licensed.
 */

Module.register('MMM-AC-Current', {

	defaults: {
            apikey:    '',
            loc:		347810, //denver,co
			metric:		false,  //true is imperial
			lang:		'en-us',
            interval:   18000000 // Every 30 mins (50 api calls per day max)
        },

    // Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },

    start:  function() {
        Log.log('Starting module: ' + this.name);
        var self = this;

        // Set up the local values, here we construct the request url to use
        this.units = this.config.units;
        this.loaded = false;
		this.url = 'http://dataservice.accuweather.com/currentconditions/v1/' + this.config.loc + '?apikey=' + this.config.apikey + '&metric=' + this.config.metric + '&lang=' + this.config.lang + '&details=true';
        this.forecast = '';

        // Trigger the first request
        this.getWeatherData(this);
        setInterval(function() {
            self.getWeatherData(self);
          }, self.config.interval);
    },

    getStyles: function() {
        return ['current.css', 'font-awesome.css'];
    },


    getWeatherData: function(_this) {
        // Make the initial request to the helper then set up the timer to perform the updates
        _this.sendSocketNotification('GET-AC-CURRENT', _this.url);
    },


    getDom: function() {
        // Set up the local wrapper
        var wrapper = null;


        // If we have some data to display then build the results
        if (this.loaded) {
            wrapper = document.createElement('div');
	 	    wrapper.className = 'forecast small';
            var hour = moment().hour();
 
            var forecastClass = 'today';
            var title = 'Current';
            
            // Create the details for this day
            forcastDay = document.createElement('div');
            forcastDay.className = 'forecastday ' + forecastClass;

            forcastTitle = document.createElement('div');
            forcastTitle.className = 'forecastTitle';
            forcastTitle.innerHTML = title;

            // Build up the details regarding wind
            windIcon = document.createElement('img');
            windIcon.className = 'detailIcon';
            windIcon.setAttribute('height', '15');
            windIcon.setAttribute('width', '15');
            windIcon.src = './modules/MMM-AC-Current/images/wind.png';
            windText = document.createElement('span');
            windText.className = 'forecastDetail';
            windText.innerHTML = Math.round(this.forecast.Wind.Speed.Imperial.Value) + ' &#10613; ' + Math.round(this.forecast.WindGust.Speed.Imperial.Value) + '<span style="font-size: 15px"> mph</font>';
            
            // Build up the details regarding weather icon
            forecastIcon = document.createElement('img');
            forecastIcon.className = 'forecastIcon';
            forecastIcon.setAttribute('height', '75');
            forecastIcon.setAttribute('width', '100');
            var icon = '';
            icon = this.forecast.WeatherIcon;
            if (icon < 10) {
                icon = "0" + this.forecast.WeatherIcon;
            }
            forecastIcon.src = 'https://developer.accuweather.com/sites/default/files/' + icon + '-s.png';

            tempText = document.createElement('span');
            tempText.className = 'tempText';
            tempText.innerHTML = this.forecast.Temperature.Imperial.Value + '&deg;' 
            tempBr = document.createElement('br');

            forecastBr = document.createElement('br');
            forecastText = document.createElement('div');
            forecastText.className = 'forecastText horizontalView bright';
            forecastText.innerHTML = 'Feels Like ' + this.forecast.RealFeelTemperature.Imperial.Value + '&deg;'; //WeatherText;

            // Now assemble the details
            forcastDay.appendChild(forcastTitle);
            forcastDay.appendChild(forecastIcon);
            forcastDay.appendChild(tempText);
            forcastDay.appendChild(forecastText);
//            forcastDay.appendChild(windIcon);
//            forcastDay.appendChild(windText);

            wrapper.appendChild(forcastDay);
        } else {
            // Otherwise lets just use a simple div
            wrapper = document.createElement('div');
            wrapper.innerHTML = this.translate('LOADING');
        }

        return wrapper;
    },


    socketNotificationReceived: function(notification, payload) {
        // check to see if the response was for us and used the same url
        if (notification === 'GOT-AC-CURRENT' && payload.url === this.url) {
                // we got some data so set the flag, stash the data to display then request the dom update
                if(payload.forecast.length > 0) {
                    this.loaded = true;
                    this.forecast = payload.forecast[0];
                }
                this.updateDom(1000);
            }
        }
    });
