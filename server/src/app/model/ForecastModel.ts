/**
 * Forecast Model
 */

import IForecastModel = require('./interfaces/IForecastModel');

class ForecastModel {

    private _forecastModel: IForecastModel;

    constructor(forecastModel: IForecastModel) {
        this._forecastModel = forecastModel;
    };

    // ***************** getter / setter **********************************

    get month (): Number {
        return this._forecastModel.month;
    };
    set month (month:Number) {
            this._forecastModel.month = month;
    };

    get day (): Number {
        return this._forecastModel.day;
    };
    set day (day:Number) {
            this._forecastModel.day = day;
    };

    get temp (): String {
        return this._forecastModel.temp;
    };
    set temp (temp:String) {
            this._forecastModel.temp = temp;
    };

    get desc_en (): String {
        return this._forecastModel.desc_en;
    };
    set desc_en (desc_en:String) {
            this._forecastModel.desc_en = desc_en;
    };

    get desc_zh (): String {
        return this._forecastModel.desc_zh;
    };
    set desc_zh (desc_zh:String) {
            this._forecastModel.desc_zh = desc_zh;
    };

}
Object.seal(ForecastModel);
export =  ForecastModel;

