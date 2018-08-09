/**
 * Created by Josh Chan on 02-12-2016.
 */

import ForecastModel = require("./../model/ForecastModel");
import IForecastModel = require("./../model/interfaces/IForecastModel");
import ForecastSchema = require("./../dataAccess/schemas/ForecastSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class ForecastRepository extends RepositoryBase<IForecastModel> {
    constructor() {
        super(ForecastSchema);
    }

    private _forecastmodel: mongoose.Model<mongoose.Document> = ForecastSchema;

    countByMonthDay(inputMonth: string, inputDay: string, callback: (error: any, result: any) => void) {
        this._forecastmodel.count({
            $and: [
                { month: inputMonth },
                { day: inputDay }]
        }, callback);
    }

    findByMonthDay(inputMonth: string, inputDay: string, callback: (error: any, result: IForecastModel[]) => void) {
        this._forecastmodel.find({
            $and: [
                { month: inputMonth },
                { day: inputDay }]
        }, callback);
    }

    findByMonthDayArray(inputMonth: number[], inputDay: number[], callback: (error: any, result: IForecastModel[]) => void) {
        this._forecastmodel.find({
            $and: [
                { month: { $in: inputMonth } },
                { day: { $in: inputDay } }]
        }, {}, { sort: { year: 1, month: 1, day: 1 } }, callback);
    }

    findAll(callback: (error: any, result: IForecastModel[]) => void) {
        this._forecastmodel.find({}, {}, { sort: { month: 1, day: 1 } }, callback);
    }

    removeAllForecastExp(callback: (error: any) => void) {
        let date = new Date();
        let currDay = date.getDate();
        this._forecastmodel.remove( { day: { $ne: currDay } }, callback);
    }

    removeAllForecast(callback: (error: any) => void) {
        this._forecastmodel.remove( {}, callback);
    }

}

Object.seal(ForecastRepository);
export = ForecastRepository;