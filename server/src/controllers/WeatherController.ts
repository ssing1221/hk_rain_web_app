/**
 * Created by Josh Chan on 02-12-2016.
 */

import express = require("express");
import Constants = require('./../config/constants/Constants');
import WeatherRepository = require("./../app/repository/WeatherRepository");
import IWeatherModel = require("./../app/model/interfaces/IWeatherModel");

class WeatherController {

    createWeather(req: express.Request, res: express.Response): void {
        try {

            var weather: IWeatherModel = <IWeatherModel>req.body;
            var weatherRepository = new WeatherRepository();

            weatherRepository.findByYearMonthDay(String(weather.year), String(weather.month), String(weather.day), (error, result) => {
                if (error) {
                    res.status(400).send({ 'error': error });
                }
                else {
                    let weatherResult = result[0];
                    if (weatherResult === null || weatherResult === {}
                        || weatherResult === undefined) {
                        weatherRepository.create(weather, (error, result) => {
                            if (error) {
                                res.status(400).send({ 'error': error });
                            }
                            else {
                                res.send({ "success": "success" });
                            }
                        });
                    } else {
                        weatherResult.temp = weather.temp;
                        weatherResult.humidity = weather.humidity;
                        weatherResult.cloud = weather.cloud;
                        weatherResult.rainfall = weather.rainfall;
                        weatherResult.sunshine = weather.sunshine;
                        weatherRepository.update(weatherResult._id, weatherResult, (error, result) => {
                            if (error) {
                                res.status(400).send({ 'error': error });
                            }
                            else {
                                res.status(200).send({ "success": "success" });
                            }
                        });

                    }
                }
            });

        }
        catch (e) {
            console.log(e);
            res.send({ "error": "err1001" });

        }
    }

    calWeather(req: express.Request, res: express.Response): void {
        try {

            let inputYear: string = req.params.inputYear;
            let inputMonth: string = req.params.inputMonth;
            let inputDay: string = req.params.inputDay;
            let filterYear: string = req.params.filterYear;
            let totNoYear: number = req.params.filterYear;

            var currDate = new Date();
            filterYear = String(currDate.getFullYear() - Number(filterYear));

            var weatherRepository = new WeatherRepository();
            weatherRepository.findByMonthDayFilterYear(inputMonth, inputDay, filterYear, (error, result) => {

                let rainYear: number = 0;
                let drizzle: number = 0;
                let light: number = 0;
                let moderate: number = 0;
                let heavy: number = 0;
                let violent: number = 0;
                let torrential: number = 0;

                let resultTemp: number = 0;
                let totTempYear: number = 0;

                let resultHumidity: number = 0;
                let totHumidityYear: number = 0;

                let resultCloud: number = 0;
                let resultSunshine: number = 0;

                for (var key in result) {
                    if (result.hasOwnProperty(key)) {
                        // Rainfall
                        if (result[key].rainfall === Constants.TRACE_CODE) {
                            rainYear += Constants.HALF;
                            drizzle += Constants.ONE;
                        } else if (result[key].rainfall > Constants.ZERO) {
                            if (result[key].rainfall < Constants.LIGHT_THRESHOLD) {
                                light += Constants.ONE;
                            } else if (result[key].rainfall < Constants.MODERATE_THRESHOLD) {
                                moderate += Constants.ONE;
                            } else if (result[key].rainfall < Constants.HEAVY_THRESHOLD) {
                                heavy += Constants.ONE;
                            } else if (result[key].rainfall < Constants.VIOLENT_THRESHOLD) {
                                violent += Constants.ONE;
                            } else if (result[key].rainfall > Constants.TORRENTIAL_THRESHOLD) {
                                torrential += Constants.ONE;
                            }
                            rainYear += Constants.ONE;
                        }

                        // Temp
                        if (result[key].temp !== null) {
                            resultTemp += result[key].temp;
                            totTempYear += Constants.ONE;
                        }

                        // Humidity
                        if (result[key].humidity !== null) {
                            resultHumidity += result[key].humidity;
                            totHumidityYear += Constants.ONE;
                        }
                    }
                }

                rainYear = (rainYear / totNoYear) * Constants.HUNDRED;
                drizzle = (drizzle / totNoYear) * Constants.HUNDRED;
                light = (light / totNoYear) * Constants.HUNDRED;
                moderate = (moderate / totNoYear) * Constants.HUNDRED;
                heavy = (heavy / totNoYear) * Constants.HUNDRED;
                violent = (violent / totNoYear) * Constants.HUNDRED;
                torrential = (torrential / totNoYear) * Constants.HUNDRED;

                resultTemp = (resultTemp / totTempYear);

                resultHumidity = (resultHumidity / totHumidityYear);

                var resultWeather = {
                    year: Number(inputYear),
                    month: Number(inputMonth),
                    day: Number(inputDay),
                    rainYear: rainYear,
                    drizzle: drizzle,
                    light: light,
                    moderate: moderate,
                    heavy: heavy,
                    violent: violent,
                    torrential: torrential,
                    temp: resultTemp,
                    humidity: resultHumidity,
                    cloud: resultCloud,
                    sunshine: resultSunshine
                };
                res.send(resultWeather);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });

        }
    }

    findByYearMonthDay(req: express.Request, res: express.Response): void {
        try {
            var inputYear: string = req.params.inputYear;
            var inputMonth: string = req.params.inputMonth;
            var inputDay: string = req.params.inputDay;

            var weatherRepository = new WeatherRepository();
            weatherRepository.findByYearMonthDay(inputYear, inputMonth, inputDay, (error, result) => {
                if (error) {
                    res.status(400).send({ 'error': error });
                }
                else {
                    res.send(result[0]);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });

        }
    }

    create(req: express.Request, res: express.Response): void {
        try {

            var weather: IWeatherModel = <IWeatherModel>req.body;
            var weatherRepository = new WeatherRepository();
            weatherRepository.create(weather, (error, result) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    getAllWeather(req: express.Request, res: express.Response): void {
        try {
            let error: any = null;

            var weatherRepository = new WeatherRepository();
            weatherRepository.findAll((err, result) => {
                if (err) {
                    error = err;
                }
                else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });
        }
    }

    getWeatherDtlList(req: express.Request, res: express.Response): void {
        try {
            var inputMonth: string = req.params.inputMonth;
            var inputDay: string = req.params.inputDay;
            var filterYear: string = req.params.filterYear;

            var currDate = new Date();
            filterYear = String(currDate.getFullYear() - Number(filterYear));

            var weatherRepository = new WeatherRepository();
            weatherRepository.getWeatherDtlList(inputMonth, inputDay, filterYear, (error, result) => {
                if (error) {
                    res.status(400).send({ 'error': error });
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var weather: IWeatherModel = <IWeatherModel>req.body;
            var _id: string = req.params._id;
            var weatherRepository = new WeatherRepository();

            weatherRepository.findById(_id, (error, found:any) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    weatherRepository.update(found._id, weather, (error, result) => {
                        if (error) {
                            res.send({ "error": "error" });
                        }
                        else {
                            res.send({ "success": "success" });
                        }
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var weatherRepository = new WeatherRepository();
            weatherRepository.delete(_id, (error, result) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {

            var weatherRepository = new WeatherRepository();
            weatherRepository.retrieve((error, result) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var weatherRepository = new WeatherRepository();
            weatherRepository.findById(_id, (error, result) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    getWeeklySelectList(req: express.Request, res: express.Response): void {
        try {
            let weeklySelectList = [];

            let predictFromDate = new Date();
            let tempDay = new Date();
            let predictToDate = new Date();
            
            predictFromDate.setDate(predictFromDate.getDate() + 9); 
            tempDay = new Date(predictFromDate.toDateString());
            tempDay.setDate((tempDay.getDate() + 6) - predictFromDate.getDay());
            predictToDate = new Date(tempDay.toDateString());
            let fromDate = predictFromDate.getDate() + '/' + (predictFromDate.getMonth() + 1) + '/' +predictFromDate.getFullYear() ;
            let toDate = predictToDate.getDate() + '/' + (predictToDate.getMonth() + 1) + '/' +predictToDate.getFullYear() ;
            let weeklySelect = { value: fromDate, label: fromDate + ' - ' + toDate };
            weeklySelectList.push(weeklySelect);

            let incumDate = 6;
            for (var i = 0; i < Constants.WEEKLY_PREDICT_NUM; i++) {
                let tempDay2 = new Date(predictToDate.toDateString()); 
                tempDay2.setDate(tempDay2.getDate() + 1);
                predictFromDate = new Date(tempDay2.toDateString());
                tempDay2 = new Date(predictFromDate.toDateString()); 
                tempDay2.setDate(tempDay2.getDate() + incumDate);
                predictToDate = new Date(tempDay2.toDateString());
                let fromDate = predictFromDate.getDate() + '/' + (predictFromDate.getMonth() + 1) + '/' +predictFromDate.getFullYear() ;
                let toDate = predictToDate.getDate() + '/' + (predictToDate.getMonth() + 1) + '/' +predictToDate.getFullYear() ;
                let weeklySelect = { value: fromDate, label: fromDate + ' - ' + toDate };
                weeklySelectList.push(weeklySelect);
            }

            res.send(weeklySelectList);
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });

        }
    }

    getWeeklyPredictResult(req: express.Request, res: express.Response): void {
        try {

            let weeklySelect: string = req.params.weeklySelect;
            let filterYear: string = req.params.filterYear;
            let totNoYear: number = req.params.filterYear;

            let datepartList = weeklySelect.split('.');
            let month: number = parseInt(datepartList[1], 10);
            
            let dateStr: string = datepartList[2] + '-' + month  + '-' + datepartList[0];
            let predictDate: Date = new Date(dateStr);
            
            let currDate: Date = new Date();

            filterYear = String(currDate.getFullYear() - Number(filterYear));

            let weekLabelList: Array<Object> = [];
            let weekPredictList: Array<Object> = [];

            let loopCounter: number = 0;
            let totalDayCount: number = 7 - predictDate.getDay();
            for (var i = 0; i < totalDayCount; i++) {
                weekLabelList.push(predictDate.getDate() + '/' + (predictDate.getMonth() +1));
                let inputYear:string = (predictDate.getFullYear()).toString();
                let inputMonth:string = (predictDate.getMonth() + 1).toString();
                let inputDay:string = predictDate.getDate().toString();
                let weatherRepository = new WeatherRepository();
                weatherRepository.findByMonthDayFilterYear(inputMonth, inputDay, filterYear, (error, result) => {
                    
                    let rainYear: number = 0;
                    let drizzle: number = 0;
                    let light: number = 0;
                    let moderate: number = 0;
                    let heavy: number = 0;
                    let violent: number = 0;
                    let torrential: number = 0;
    
                    let resultTemp: number = 0;
                    let totTempYear: number = 0;
    
                    let resultHumidity: number = 0;
                    let totHumidityYear: number = 0;
    
                    let resultCloud: number = 0;
                    let resultSunshine: number = 0;
    
                    for (var key in result) {
                        if (result.hasOwnProperty(key)) {
                            // Rainfall
                            if (result[key].rainfall === Constants.TRACE_CODE) {
                                rainYear += Constants.HALF;
                                drizzle += Constants.ONE;
                            } else if (result[key].rainfall > Constants.ZERO) {
                                if (result[key].rainfall < Constants.LIGHT_THRESHOLD) {
                                    light += Constants.ONE;
                                } else if (result[key].rainfall < Constants.MODERATE_THRESHOLD) {
                                    moderate += Constants.ONE;
                                } else if (result[key].rainfall < Constants.HEAVY_THRESHOLD) {
                                    heavy += Constants.ONE;
                                } else if (result[key].rainfall < Constants.VIOLENT_THRESHOLD) {
                                    violent += Constants.ONE;
                                } else if (result[key].rainfall > Constants.TORRENTIAL_THRESHOLD) {
                                    torrential += Constants.ONE;
                                }
                                rainYear += Constants.ONE;
                            }
                        }
                    }
                    
                    rainYear = (rainYear / totNoYear) * Constants.HUNDRED;
                    // round up to 2 decimal places (only if necessary)
                    rainYear = Math.round(rainYear * 100) / 100;
                    let index = weekLabelList.indexOf(result[0].day+'/'+result[0].month);
                    weekPredictList[index] = rainYear;
                    
                    if(loopCounter === (totalDayCount - 1)){
                        res.send({ "weekLabelList": weekLabelList,
                        "weekPredictList": weekPredictList  });
                    }

                    loopCounter++;
                });
                
                predictDate.setDate(predictDate.getDate() + 1);
            }
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

}
export = WeatherController;