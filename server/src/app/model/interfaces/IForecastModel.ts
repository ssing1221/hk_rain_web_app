/**
 * Interface of Forecast model 
 */

import mongoose = require("mongoose");

interface IForecastModel extends mongoose.Document {
    month: Number;
    day: Number;
    temp: String;
    desc_en: String;        
    desc_zh: String;        
}

export = IForecastModel;