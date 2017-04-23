/**
 * Weather Model
 */

import IWeatherModel = require('./interfaces/IWeatherModel');

class WeatherModel {

    private _weatherModel: IWeatherModel;

    constructor(weatherModel: IWeatherModel) {
        this._weatherModel = weatherModel;
    };

    // ***************** getter / setter **********************************

    get year (): Number {
        return this._weatherModel.year;
    };
    set year (year:Number) {
            this._weatherModel.year = year;
    };

    get month (): Number {
        return this._weatherModel.month;
    };
    set month (month:Number) {
            this._weatherModel.month = month;
    };

    get day (): Number {
        return this._weatherModel.day;
    };
    set day (day:Number) {
            this._weatherModel.day = day;
    };

    get temp (): Number {
        return this._weatherModel.temp;
    };
    set temp (temp:Number) {
            this._weatherModel.temp = temp;
    };

    get humidity (): Number {
        return this._weatherModel.humidity;
    };
    set humidity (humidity:Number) {
            this._weatherModel.humidity = humidity;
    };

    get cloud (): Number {
        return this._weatherModel.cloud;
    };
    set cloud (cloud:Number) {
            this._weatherModel.cloud = cloud;
    };

    get rainfall (): Number {
        return this._weatherModel.rainfall;
    };
    set rainfall (rainfall:Number) {
            this._weatherModel.rainfall = rainfall;
    };

    get sunshine (): Number {
        return this._weatherModel.sunshine;
    };
    set sunshine (sunshine:Number) {
            this._weatherModel.sunshine = sunshine;
    };
}
Object.seal(WeatherModel);
export =  WeatherModel;

