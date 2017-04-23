/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Component, OnInit } from '@angular/core';

import { ForecastService } from "../../services/forecast.service";
import { OT_GConstants, IGConstants } from './../../constants/GConstants';
import { Inject } from '@angular/core';
import { Forecast } from "../../models/Forecast";
import globalVar = require('./../../globalVar');

@Component({
    selector: 'my-weatherForecast',
    templateUrl: './app/components/weatherForecast/weatherForecast.component.html',
    styleUrls: ['./app/components/weatherForecast/weatherForecast.component.css',
        './app/assets/css/global.main.css', './app/assets/css/fadeInDiv.css']
})

export class WeatherForecastComponent {

    forecastList: Forecast[] = [];

    langInd: string;

    monthMap: {};
    weekDayEnMap: {};
    weekDayZhMap: {};

    constructor(
        @Inject(OT_GConstants) private GCONSTANTS: IGConstants,
        private forecastService: ForecastService) {
        this.langInd = globalVar.gLangInd;
        this.monthMap = globalVar.monthMap;
        this.weekDayEnMap = globalVar.weekDayEnMap;
        this.weekDayZhMap = globalVar.weekDayZhMap;
    }

    ngOnInit() {
        this.forecastService.getForecast()
            .then(forecastList => {
                this.forecastList = forecastList;
                for (var key in this.forecastList) {
                    if (this.forecastList.hasOwnProperty(key)) {
                        let currDate: Date = new Date();
                        if(currDate.getDate() === this.forecastList[0].day){
                            currDate.setDate(currDate.getDate() + Number(key));
                            this.forecastList[key].weekDay = Number(currDate.getDay());
                        }else{
                            currDate.setDate(currDate.getDate() + Number(key) + 1);
                            this.forecastList[key].weekDay = Number(currDate.getDay());
                        }
                    }
                }
            });
    }

    changeLangInd() {
        this.langInd = globalVar.gLangInd;
    }
}