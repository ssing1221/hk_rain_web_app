/**
 * All cron jobs
 */

import Sconfig = require('./../../config/constants/Sconfig');
import Constants = require('./../../config/constants/Constants');
import RepositoryBase = require("./../repository/BaseRepository");
import IWeatherModel = require("./../model/interfaces/IWeatherModel");

var CronJob = require('cron').CronJob;
var http = require('http');
var Feed = require('rss-to-json');

function getIndicesOf(searchStr, str, caseSensitive) {
	var searchStrLen = searchStr.length;
	if (searchStrLen === 0) {
		return [];
	}
	var startIndex = 0, index, indices = [];
	if (!caseSensitive) {
		str = str.toLowerCase();
		searchStr = searchStr.toLowerCase();
	}
	while ((index = str.indexOf(searchStr, startIndex)) > -1) {
		indices.push(index);
		startIndex = index + searchStrLen;
	}
	return indices;
}

class Cron {

	static loopCreateForecast () {
		var date = new Date();
		new CronJob('00 00 05,09,12,15,18,21 * * * ', function() { 	
		//new CronJob('*/30 * * * * *', function() {

			console.log('Start loopCreateForecast at: ' + new Date());

			let isRemoveAll = true;
			
			Feed.load('http://rss.weather.gov.hk/rss/SeveralDaysWeatherForecast.xml', function(errEN, rssEN){

				var str = rssEN['items'][0]['description'];
				var dateIndex = getIndicesOf("Date/Month:", str, true);
				var weatherIndex = getIndicesOf("Weather:", str, true);
				var tempIndex =getIndicesOf("Temp range:", str, true);
				var rhIndex = getIndicesOf("R.H. range:", str, true);
				
				var forecastList = [];

				for (var i = 0; i < 9; i++) { 
					
					var day = str.substring(dateIndex[i]+12, dateIndex[i]+14);
					
					var month = str.substring(dateIndex[i]+15, dateIndex[i]+17);

					var descEN = str.substring(weatherIndex[i]+9, tempIndex[i]);
					descEN = descEN.replace('<br/>', '');

					var temp = str.substring(tempIndex[i]+12, rhIndex[i]);
					temp = temp.replace('<br/>', '');
					temp = temp.replace('C', '°C');

					var year = (new Date()).getFullYear();
					var currentMonth = (new Date()).getMonth() + 1;
					
					if( month === '01' && currentMonth === 12){
						year = year + 1;
					}
					var forecast = { 
						month: month,
						day: day,
						year: year,
						temp: temp,
						desc_en: descEN       
						};

					forecastList.push(forecast);
				}

				let date = new Date();
       			let currDay = date.getDate();

				console.log('Number(forecastList[0].day): '+Number(forecastList[0].day));
				console.log('currDay: '+currDay);
				if(Number(forecastList[0].day) === currDay){
					isRemoveAll = true;
				}else{
					isRemoveAll = false;
				}
				console.log('isRemoveAll: '+isRemoveAll);

				Feed.load('http://rss.weather.gov.hk/rss/SeveralDaysWeatherForecast_uc.xml', function(errZH, rssZH){
						
					var strZH = rssZH['items'][0]['description'];
					var weatherIndexZH = getIndicesOf("天 氣 ：", strZH, false);
					var tempIndexZH =getIndicesOf("氣 溫 ：", strZH, false);
					
					for (var i = 0; i < 9; i++) { 
						var descZH = strZH.substring(weatherIndexZH[i]+5, tempIndexZH[i]);
						descZH = descZH.replace('<br/>', '');

						forecastList[i].desc_zh = descZH;
					}

					
					let body = '';
					var request;

					if(isRemoveAll){
						console.log('Start Remove All Forecast at: ' + new Date());
						request = new http.ClientRequest({
							hostname: Sconfig.IP,
							port: Sconfig.PORT_NUM,
							path: '/api/removeAllForecast',
							method: Constants.METHOD_POST,
							headers: {
								'Content-Type': Constants.CONTENT_TYPE_JSON,
								'Content-Length': Buffer.byteLength(body)
							}
						});
					}else{
						console.log('Start Remove All Forecast Exp at: ' + new Date());
						request = new http.ClientRequest({
							hostname: Sconfig.IP,
							port: Sconfig.PORT_NUM,
							path: '/api/removeAllForecastExp',
							method: Constants.METHOD_POST,
							headers: {
								'Content-Type': Constants.CONTENT_TYPE_JSON,
								'Content-Length': Buffer.byteLength(body)
							}
						});
					}

					request.end(body);
					request.on('response', function (any) {
						console.log('END Remove All Forecast at: ' + new Date());

						for (var i = 0; i < 9; i++) {
						var body = JSON.stringify(forecastList[i]);

						var request = new http.ClientRequest({
							hostname: Sconfig.IP,
							port: Sconfig.PORT_NUM,
							path: '/api/createForecast',
							method: Constants.METHOD_POST,
							headers: {
								'Content-Type': Constants.CONTENT_TYPE_JSON,
								'Content-Length': Buffer.byteLength(body)
							}
						});

						request.end(body);
						request.on('response', function (response) {
							console.log('END loopCreateForecast at: ' + new Date());
						});

					}
					});

				});
				
			});
		 
		}, null, true, Sconfig.TIME_ZONE);

	}
	
	static loopCreateMonthlyWeather () {
 
		// every 5th day of month at 03:00
		new CronJob('00 00 03 05 * *', function() { 
		//new CronJob('*/50 * * * * *', function() {

			console.log('Start loopCreateMonthlyWeather at: ' + new Date());
			let data:string = '';
			let url:string = '';

			var currDate = new Date();
			currDate.setDate(currDate.getMonth() - 1);
			let inputYear:number = currDate.getFullYear();
			let inputMonth:number = currDate.getMonth();
			let inputDay:number;
			let inputTemp:number;
			let inputHumidity:number;
			let inputCloud:number;
			let inputRainfall:number;
			let inputSunshine:number;
			var inputWeather = {};
			let lastYearFlag:boolean;

			lastYearFlag = false;

			inputMonth = inputMonth + 1;
			if(inputMonth === 1){
				lastYearFlag = true;
				inputYear = inputYear - 1;
			}

			url = Constants.HKO_URL_DAILY_PREFIX + inputYear + Constants.HKO_URL_DAILY_SUFFIX;
			
			http.get(url, function(res) {
			
				if (res.statusCode >= Constants.HTTP_RES_200_OK
							&& res.statusCode < Constants.HTTP_RES_400_BAD_REQ) {
				res.on(Constants.DATA, (inputData) => { 
						data += inputData.toString(); 
						});
				res.on(Constants.END, () => {
					
					data = data.replace(/(?:\\[rn]|[\r\n]+)+/g, "");
					let data_json:JSON = JSON.parse(data);
					data_json = data_json[Constants.STN][Constants.DATA];

					inputMonth = inputMonth - 2;

					// Fix month. If want Apr, enter 3
					//inputMonth = 3;

					let jsonObjDtl = null;

					if(!lastYearFlag){
						jsonObjDtl = data_json[inputMonth];
						inputMonth = inputMonth + 1;
					}else{
						jsonObjDtl = data_json[11];
						inputMonth = 12;
					}
					
					if( jsonObjDtl[Constants.MONTH] === inputMonth || lastYearFlag){
						var jsonObjDtlDay = jsonObjDtl[Constants.DAYDATA];
						for (var key in jsonObjDtlDay) {              
							if (jsonObjDtlDay.hasOwnProperty(key)) {

								if (Constants.MEAN_TOTAL !== jsonObjDtlDay[key][Constants.DAY_INDEX]
									&& Constants.NORMAL !== jsonObjDtlDay[key][Constants.DAY_INDEX]){

									inputDay = jsonObjDtlDay[key][Constants.DAY_INDEX];
									
									inputTemp = jsonObjDtlDay[key][Constants.TEMP_INDEX];

									if(Constants.NULL_CODE !== jsonObjDtlDay[key][Constants.HUMIDITY_INDEX]){
										inputHumidity = jsonObjDtlDay[key][Constants.HUMIDITY_INDEX];
									}else{
										inputHumidity = null;
									}

									if(Constants.NULL_CODE !== jsonObjDtlDay[key][Constants.CLOUD_INDEX]){
										inputCloud = jsonObjDtlDay[key][Constants.CLOUD_INDEX];
									}else{
										inputCloud = null;
									}

									if( Constants.TRACE === jsonObjDtlDay[key][Constants.RAINFALL_INDEX] ){
										inputRainfall = Constants.TRACE_CODE;
									}else{
										inputRainfall = jsonObjDtlDay[key][Constants.RAINFALL_INDEX];
									}

									if(Constants.NULL_CODE !== jsonObjDtlDay[key][Constants.SUNSHINE_INDEX]){
										inputSunshine = jsonObjDtlDay[key][Constants.SUNSHINE_INDEX];
									}else{
										inputSunshine = null;
									}

									var inputWeather = { 
										year: inputYear,
										month: inputMonth,
										day: inputDay,
										temp: inputTemp,
										humidity: inputHumidity,
										cloud: inputCloud,
										rainfall: inputRainfall,
										sunshine: inputSunshine
									};
									
									// console.log('inputWeather: '+JSON.stringify(inputWeather));

									var body = JSON.stringify(inputWeather);

									var request = new http.ClientRequest({
										hostname: Sconfig.IP,
										port: Sconfig.PORT_NUM,
										path: '/api/createWeather',
										method: Constants.METHOD_POST,
										headers: {
											'Content-Type': Constants.CONTENT_TYPE_JSON,
											'Content-Length': Buffer.byteLength(body)
										}
									});

									request.end(body);
									request.on('response', function (response) {
										console.log('STATUS: ' + response.statusCode);
										// console.log('END loopCreateMonthlyWeather at: ' + new Date());
									});
								}
							}
						}
					}
					
				});
				}
			}); 
		}, null, true, Sconfig.TIME_ZONE);

	}

    static loopCreateAllWeather () {
		let count: number = Constants.GET_ALL_WEATHER_START_YEAR;
		
        new CronJob('*/20 * * * * *', function() {

			// Start year = 1885;
			// Current year = 2016;
			// Gap year = 1946 - 1940 = 6 + 1 = 7
			// Count year = 2016 - 1885 - 7 = 124    
            let inputYear:number = count;
			
			// *********** Main create Start **************
     
			let data:string = '';
			let url:string = '';

			var currDate = new Date();
			let inputMonth:number;
			let inputDay:number;
			let inputTemp:number;
			let inputHumidity:number;
			let inputCloud:number;
			let inputRainfall:number;
			let inputSunshine:number;
			var inputWeather = {};

			if( inputYear !== Constants.SKIP_YEAR_1940
				&&  inputYear !== Constants.SKIP_YEAR_1942
				&&  inputYear !== Constants.SKIP_YEAR_1943
				&&  inputYear !== Constants.SKIP_YEAR_1941
				&&  inputYear !== Constants.SKIP_YEAR_1944
				&&  inputYear !== Constants.SKIP_YEAR_1945
				&&  inputYear !== Constants.SKIP_YEAR_1946){

					url = Constants.HKO_URL_DAILY_PREFIX + inputYear + Constants.HKO_URL_DAILY_SUFFIX;
					
					console.log('url: ' + url);
					
					http.get(url, function(res) {
					if (res.statusCode >= Constants.HTTP_RES_200_OK
								&& res.statusCode < Constants.HTTP_RES_400_BAD_REQ) {
					res.on(Constants.DATA, (inputData) => { 
							data += inputData.toString(); 
							});
					res.on(Constants.END, () => {
						
						data = data.replace(/(?:\\[rn]|[\r\n]+)+/g, "");
						let data_json:JSON = JSON.parse(data);
						data_json = data_json[Constants.STN][Constants.DATA];
												
						for (var i = 0; i < 12; i++) {
							var jsonObjDtl = data_json[i];
							if(jsonObjDtl[Constants.MONTH] === (i + 1)){
								inputMonth = i + 1;
								var jsonObjDtlDay = jsonObjDtl[Constants.DAYDATA];
								for (var key in jsonObjDtlDay) {              
									if (jsonObjDtlDay.hasOwnProperty(key)) {

										if (Constants.MEAN_TOTAL !== jsonObjDtlDay[key][Constants.DAY_INDEX]
											&& Constants.NORMAL !== jsonObjDtlDay[key][Constants.DAY_INDEX]){

											inputDay = jsonObjDtlDay[key][Constants.DAY_INDEX];
											
											inputTemp = jsonObjDtlDay[key][Constants.TEMP_INDEX];

											if(Constants.NULL_CODE !== jsonObjDtlDay[key][Constants.HUMIDITY_INDEX]){
												inputHumidity = jsonObjDtlDay[key][Constants.HUMIDITY_INDEX];
											}else{
												inputHumidity = null;
											}

											if(Constants.NULL_CODE !== jsonObjDtlDay[key][Constants.CLOUD_INDEX]){
												inputCloud = jsonObjDtlDay[key][Constants.CLOUD_INDEX];
											}else{
												inputCloud = null;
											}

											if( Constants.TRACE === jsonObjDtlDay[key][Constants.RAINFALL_INDEX] ){
												inputRainfall = Constants.TRACE_CODE;
											}else{
												inputRainfall = jsonObjDtlDay[key][Constants.RAINFALL_INDEX];
											}

											if(Constants.NULL_CODE !== jsonObjDtlDay[key][Constants.SUNSHINE_INDEX]){
												inputSunshine = jsonObjDtlDay[key][Constants.SUNSHINE_INDEX];
											}else{
												inputSunshine = null;
											}

											var inputWeather = { 
												year: inputYear,
												month: inputMonth,
												day: inputDay,
												temp: inputTemp,
												humidity: inputHumidity,
												cloud: inputCloud,
												rainfall: inputRainfall,
												sunshine: inputSunshine
												};

											var body = JSON.stringify(inputWeather);

											var request = new http.ClientRequest({
												hostname: Sconfig.IP,
												port: Sconfig.PORT_NUM,
												path: '/api/createWeather',
												method: Constants.METHOD_POST,
												headers: {
													'Content-Type': Constants.CONTENT_TYPE_JSON,
													'Content-Length': Buffer.byteLength(body)
												}
											});

											request.end(body);
											request.on('response', function (response) {
												//console.log('STATUS: ' + response.statusCode);
											});

										}
		
									}
								}
							}
						}
					});
					}
				});
				// End of Year if
			}
			
			//*********** Main create End **************
			count++;
			
			if(count>2016){
				count = 99999;
			}
			
			console.log('count: '+count);

        }, null, true, Sconfig.TIME_ZONE);

    }

}

//Cron.loopCreateAllWeather();
Cron.loopCreateMonthlyWeather();
Cron.loopCreateForecast();

export = Cron;