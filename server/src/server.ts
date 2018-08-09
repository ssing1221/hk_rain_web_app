import express = require('express');
import BaseRoutes = require("./config/routes/Routes");
import bodyParser = require("body-parser");
import sconfig = require("./config/constants/Sconfig");
import path = require('path');
import cronJob = require('./app/cron/Cron');
import favicon = require('serve-favicon');

var ip: string = sconfig.IP;
var port: number = sconfig.PORT_NUM;

var app = express();

app.set('ip', ip);
app.set('port', port);

app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

app.use(favicon(__dirname + '/bin/favicon.ico'));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));

app.use(bodyParser.json());
app.use('/api', new BaseRoutes().routes);

var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
};

app.get('/*', renderIndex);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

// Get the daily weather from HKO
//cronJob.loopCreateAllWeather;
cronJob.loopCreateMonthlyWeather;
cronJob.loopCreateForecast;

export { app };