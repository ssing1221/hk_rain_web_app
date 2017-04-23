/**
 * Basic routes
 */
import express = require('express');
import path = require('path');

import WeatherRoutes = require('../routes/WeatherRoutes');
import ForecastRoutes = require('../routes/ForecastRoutes');
import AccountRoutes = require('../routes/AccountRoutes');
import FeedbackRoutes = require('../routes/FeedbackRoutes');

var app = express();

class Routes {
    get routes() {
        app.use("/", new WeatherRoutes().routes);
        app.use("/", new ForecastRoutes().routes);
        app.use("/", new AccountRoutes().routes);
        app.use("/", new FeedbackRoutes().routes);
        return app;
    }
}
export = Routes;