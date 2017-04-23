/**
 * Forecast Schema.
 */

import DataAccess = require('../DataAccess');
import IForecastModel = require("./../../model/interfaces/IForecastModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class ForecastSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            month : {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            },
            temp : {
                type: String,
                required: false
            },
            desc_en : {
                type: String,
                required: false
            },
            desc_zh : {
                type: String,
                required: false
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IForecastModel>("forecasts", ForecastSchema.schema);
export = schema;"";