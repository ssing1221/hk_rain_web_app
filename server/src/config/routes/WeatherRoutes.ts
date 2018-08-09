/**
 * Routes of Weather
 */

import express = require("express");
import WeatherController = require("./../../controllers/WeatherController");

var router = express.Router();

class WeatherRoutes {
    private _weatherController: WeatherController;

    constructor () {
        this._weatherController = new WeatherController();
    }

    get routes () {
        var controller = this._weatherController;
        router.post("/createWeather", controller.createWeather);
        router.get("/findByYearMonthDay/:inputYear/:inputMonth/:inputDay", controller.findByYearMonthDay);
        router.get("/calWeather/:inputYear/:inputMonth/:inputDay/:filterYear"
                    , controller.calWeather);
        router.get("/getAllWeather", controller.getAllWeather);
        router.get("/getWeatherDtlList/:inputMonth/:inputDay/:filterYear"
                    , controller.getWeatherDtlList);
        router.get("/getWeeklySelectList", controller.getWeeklySelectList);
        router.get("/getWeeklyPredictResult/:weeklySelect/:filterYear", controller.getWeeklyPredictResult);
        return router;
    }
}

Object.seal(WeatherRoutes);
export = WeatherRoutes;