/**
 * Weather Schema.
 */

import DataAccess = require('../DataAccess');
import IWeatherModel = require("./../../model/interfaces/IWeatherModel");
import Mongoose = require('mongoose');

var mongooseConnection = DataAccess.mongooseConnection;

class WeatherSchema {

    static get schema () {
        var schema = new Mongoose.Schema({
            year : {
                type: Number,
                required: true
            },
            month : {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            },
            temp : {
                type: Number,
                required: false
            },
            humidity : {
                type: Number,
                required: false
            },
            cloud : {
                type: Number,
                required: false
            },
            rainfall : {
                type: Number,
                required: true
            },
            sunshine : {
                type: Number,
                required: false
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IWeatherModel>("weathers", WeatherSchema.schema);
export = schema;"";