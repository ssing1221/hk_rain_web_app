/**
 * Created by Josh Chan on 02-12-2016.
 */

import express = require("express");
import Constants = require('./../config/constants/Constants');
import ForecastRepository = require("./../app/repository/ForecastRepository");
import IForecastModel = require("./../app/model/interfaces/IForecastModel");

class ForecastController {

    createForecast(req: express.Request, res: express.Response): void {
        try {
            var forecast: IForecastModel = <IForecastModel>req.body;
            var forecastRepository = new ForecastRepository();
            forecastRepository.create(forecast, (error, result) => {
                if (error) {
                    res.status(400).send({ 'error': error });
                }
                else {
                    res.status(200).send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "err1001" });

        }
    }


    update(req: express.Request, res: express.Response): void {
        try {
            var forecast: IForecastModel = <IForecastModel>req.body;
            var _id: string = req.params._id;
            var forecastRepository = new ForecastRepository();

            forecastRepository.findById(_id, (error, found:any) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    forecastRepository.update(found._id, forecast, (error, result) => {
                        if (error) {
                            res.send({ "error": "error" });
                        }
                        else {
                            res.send({ "success": "success" });
                        }
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    getForecast(req: express.Request, res: express.Response): void {
        try {

            let error: any = null;
            let currMonth: number;
            let currDay: number;
            var forecastRepository = new ForecastRepository();

            let monthList: number[] = [];
            let dayList: number[] = [];

            for (var i = 0; i < 9; i++) {
                let date = new Date();
                date.setDate(date.getDate() + i);
                currMonth = Number(date.getMonth()) + 1;
                currDay = Number(date.getDate());
                monthList.push(currMonth);
                dayList.push(currDay);
            }

            // forecastRepository.findAll((err, result) => {
            //     if (err) {
            //         error = err;
            //     }
            //     else {
            //         res.send(result);
            //     };
            // });

            forecastRepository.findByMonthDayArray(monthList, dayList, (err, result) => {
                if (err) {
                    res.status(400).send({ 'error': err });
                }
                else {
                    res.send(result);
                }
            });

        } catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });

        }
    }

    removeAllForecastExp(req: express.Request, res: express.Response): void {
        try {
            let forecastRepository = new ForecastRepository();
            forecastRepository.removeAllForecastExp((err) => {
                if (err) {
                    res.status(400).send({ 'error': err });
                }else {
                    res.status(200).send({ "success": "success" });
                }
            });
         } catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });
        }
    }

    removeAllForecast(req: express.Request, res: express.Response): void {
        try {
            let forecastRepository = new ForecastRepository();
            forecastRepository.removeAllForecast((err) => {
                if (err) {
                    res.status(400).send({ 'error': err });
                }else {
                    res.status(200).send({ "success": "success" });
                }
            });
         } catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });
        }
    }

    getSingleForecast(req: express.Request, res: express.Response): void {
        try {
            let error: any = null;
            let inputMonth: string = req.params.inputMonth;
            let inputDay: string = req.params.inputDay;

            let monthList: number[] = [];
            let dayList: number[] = [];

            monthList.push(Number(inputMonth));
            dayList.push(Number(inputDay));
            let forecastRepository = new ForecastRepository();
            forecastRepository.findByMonthDayArray(monthList, dayList, (err, result) => {
                if (err) {
                    res.status(400).send({ 'error': err });
                }
                else {
                    res.send(result[0]);
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });
        }
    }

    getAllForecast(req: express.Request, res: express.Response): void {
        try {
            let error: any = null;

            var forecastRepository = new ForecastRepository();
            forecastRepository.findAll((err, result) => {
                if (err) {
                    error = err;
                }
                else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });
        }
    }
}

export = ForecastController;