/**
 * Routes of Forecast
 */

import express = require("express");
import ForecastController = require("./../../controllers/ForecastController");

var router = express.Router();

class ForecastRoutes {
    private _forecastController: ForecastController;

    constructor () {
        this._forecastController = new ForecastController();
    }

    get routes () {
        var controller = this._forecastController;
        router.post("/createForecast", controller.createForecast);
        router.get("/getForecast", controller.getForecast);
        router.get("/getSingleForecast/:inputMonth/:inputDay/", controller.getSingleForecast);
        router.get("/getAllForecast", controller.getAllForecast);
        router.post("/removeAllForecast", controller.removeAllForecast);
        router.post("/removeAllForecastExp", controller.removeAllForecastExp);
        return router;
    }
}

Object.seal(ForecastRoutes);
export = ForecastRoutes;