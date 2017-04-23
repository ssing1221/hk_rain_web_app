/**
 * Interface of Weather model 
 */

import mongoose = require("mongoose");

interface IWeatherModel extends mongoose.Document {
    year: Number;
    month: Number;
    day: Number;
    temp: Number;
    humidity: Number;        
    cloud: Number;              
    rainfall: Number;              
    sunshine: Number;
}

export = IWeatherModel;