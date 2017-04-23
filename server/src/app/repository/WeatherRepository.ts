/**
 * Created by Josh Chan on 02-12-2016.
 */

import WeatherModel = require("./../model/WeatherModel");
import IWeatherModel = require("./../model/interfaces/IWeatherModel");
import WeatherSchema = require("./../dataAccess/schemas/WeatherSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class WeatherRepository  extends RepositoryBase<IWeatherModel> {
    constructor () {
        super(WeatherSchema);
    }

    private _weathermodel: mongoose.Model<mongoose.Document> = WeatherSchema;

    findByMonthDayFilterYear (inputMonth: string, inputDay: string, filterYear: string, callback: (error: any, result: any) => void) {
        this._weathermodel.find( { 
                                $and: [ 
                                    { month: inputMonth }, 
                                    { day: inputDay },
                                    { year: { $gte: filterYear }} ] 
                                }, callback);
    }

    getWeatherDtlList (inputMonth: string, inputDay: string, filterYear: string, callback: (error: any, result: any) => void) {
        this._weathermodel.find( { 
                                $and: [ 
                                    { month: inputMonth }, 
                                    { day: inputDay },
                                    { year: { $gte: filterYear }}] 
                                }, {}, {sort: {year: -1, month: -1, day: -1}}, callback);
    }

    findByYearMonthDay (inputYear: string, inputMonth: string, inputDay: string, callback: (error: any, result: any) => void) {
        this._weathermodel.find( { 
                                $and: [ 
                                    { year: inputYear },
                                    { month: inputMonth }, 
                                    { day: inputDay } ] 
                                }, callback);
    }

    findAll(callback: (error: any, result: IWeatherModel[]) => void) {
        this._weathermodel.find({}, {}, {sort: {year: -1, month: -1, day: -1}}, callback);
    }

}

Object.seal(WeatherRepository);
export = WeatherRepository;