# MMM-AC-Current
This a module for the [MagicMirror](https://github.com/MichMich/MagicMirror/tree/develop).  This module shows the current weather conditions using the AccuWeather API. It displays the overall weather condition, highest temperature, windspeed and gusts.  This is designed to compliment the default Current Weather module.<br>  
**Note:** This is now based on the API offered by [Accuweather](https://developer.accuweather.com/apis). You will need your own API key!

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/MichaelByers/MMM-AC-Current`.  A new folder `MMM-AC-Current` will appear, navigate into it.

## Config
The entry in `config.js` can include the following options:

|Option|Description|
|---|---|
|`apikey`|**Required** This is the API key you need to use to request weather data from the AccuWeather site.  Details on how to request an API key can be found [here](https://developer.accuweather.com/)<br><br>**Type:** `string`<br>**Default value:** `null`|
|`loc`|This is the loaction code for the city you want to get the weather for, from Accuweather location API call.<br><br>**Type:** `number`<br>**Default value:** `347810 //Denver`|
|`units`|Option to show units in metric.<br>**Type** `string` Use `true` for metric OR `false` for imperial.<br>**Default value:** `M`|
|`lang`|This is the two character country code for the language you want the weather in.\*<br><br>**Type** `string`<br>**Default value** `en-us`|
|`interval`|How often the weather is updated.<br><br>**Type:** `integer`<br>**Default value:** `1800000 // 30 minutes`|

Here is an example of an entry in `config.js`
```
{
    module:     'MMM-AC-Current',
    position:   'top_left',
	config: {
		apikey:    'xxxxxxxxxxxxxxxxxxxxxx',
		loc:        '347810',
		metric:     'false',
		lang:       'en-us',
		interval:   1800000
	}
},
```

## Dependencies
- [request](https://www.npmjs.com/package/request) (installed via `npm install`)

## Notes
I hope you like this module, I know it duplicates many other weather modules, however I preferred the data from Accuweather.  Feel free to submit pull requests or post issues and I'll do my best to respond.

## Thanks To...
- [Michael Teeuw](https://github.com/MichMich) for the [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) framework that made this module possible.
- [MMM-3Day-Forecast](https://github.com/nigel-daniels/MMM-3Day-Forecast) module I used and whose code I learnt a great deal from.
