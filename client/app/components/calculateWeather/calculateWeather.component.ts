/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Component, OnInit, style, animate, transition, trigger } from '@angular/core';

import { Weather } from "../../models/Weather";
import { ResultWeather } from "../../models/ResultWeather";
import { Forecast } from "../../models/Forecast";
import { WeatherService } from "../../services/weather.service";
import { ForecastService } from "../../services/forecast.service";
import { OT_GConstants, IGConstants } from './../../constants/GConstants';
import { Inject } from '@angular/core';
import globalVar = require('./../../globalVar');
import { Message } from 'primeng/primeng';
declare var $: JQueryStatic;

@Component({
    selector: 'my-calculateWeather',
    templateUrl: './app/components/calculateWeather/calculateWeather.component.html',
    styleUrls: ['./app/components/calculateWeather/calculateWeather.component.css',
        './app/assets/css/global.main.css', './app/assets/css/fadeInDiv.css'],
    animations: [
        trigger('fadeInOut', [
            transition('void => *', [
                style({ opacity: 0 }), //style only for transition transition (after transiton it removes)
                animate(1000, style({ opacity: 1 })) // the new state of the transition(after transiton it removes)
            ])
        ])
    ]
})

export class CalculateWeatherComponent implements OnInit {

    selectedFilterYear: number;
    msgs: Message[] = [];

    // 1111111 calculate weather 1111111111
    error: any;
    selectYearList: Array<Object>;
    selectMonthList: Array<Object>;
    selectDayList: Array<Object>;
    selectedYear: number;
    selectedMonth: number;
    selectedDay: number;
    dayDisable: boolean;
    weatherResult: ResultWeather;
    weatherIconPath: string;
    maxRainValue: number;
    showResult: boolean;
    forecast: Forecast;
    showForecast: boolean;
    blockedCalPanel: boolean = false;
    showDtl: boolean;
    weatherDtlList: Weather[];

    // 22222222 calculate weather 2222222222 
    error2: any;
    selectYearList2: Array<Object>;
    selectMonthList2: Array<Object>;
    selectDayList2: Array<Object>;
    selectedYear2: number;
    selectedMonth2: number;
    selectedDay2: number;
    dayDisable2: boolean;
    weatherResult2: ResultWeather;
    weatherIconPath2: string;
    maxRainValue2: number;
    showResult2: boolean;
    showCal2: boolean;
    forecast2: Forecast;
    showForecast2: boolean;
    blockedCalPanel2: boolean = false;
    showDtl2: boolean;
    weatherDtlList2: Weather[];

    langInd: string;

    monthMap: {};
    weekDayEnMap: {};
    weekDayZhMap: {};

    constructor(
        @Inject(OT_GConstants) private GCONSTANTS: IGConstants,
        private weatherService: WeatherService,
        private forecastService: ForecastService) {
        this.langInd = globalVar.gLangInd;
        this.monthMap = globalVar.monthMap;
        this.weekDayEnMap = globalVar.weekDayEnMap;
        this.weekDayZhMap = globalVar.weekDayZhMap;

        // Set filter year from gloalVar
        this.selectedFilterYear = globalVar.filterYear;

    }

    resetForm1() {
        // 11111111
        this.selectYearList = null;
        this.selectMonthList = null;
        this.selectDayList = null;
        this.selectedYear = null;
        this.selectedMonth = null;
        this.selectedDay = null;
        this.dayDisable = true;
        this.weatherResult = null;
        this.showResult = false;
        this.forecast = null;
        this.showForecast = false;
        this.blockedCalPanel = false;
        this.showDtl = false;
        this.weatherDtlList = null;
    }

    resetForm2() {
        // 22222222
        this.selectYearList2 = null;
        this.selectMonthList2 = null;
        this.selectDayList2 = null;
        this.selectedYear2 = null;
        this.selectedMonth2 = null;
        this.selectedDay2 = null;
        this.dayDisable2 = true;
        this.weatherResult2 = null;
        this.showResult2 = false;
        this.showCal2 = false;
        this.forecast2 = null;
        this.showForecast2 = false;
        this.blockedCalPanel2 = false;
        this.showDtl2 = false;
        this.weatherDtlList2 = null;
    }

    init1() {
        let currDate = new Date();
        this.selectYearList = [
            { value: currDate.getFullYear(), label: currDate.getFullYear() },
            { value: Number(currDate.getFullYear()) + 1, label: Number(currDate.getFullYear()) + 1 },
            { value: Number(currDate.getFullYear()) + 2, label: Number(currDate.getFullYear()) + 2 }
        ];
        this.selectedYear = this.selectYearList[0]['label'];

        this.selectMonthList = this.getSelectMonthList(this.selectedYear);
        this.selectedMonth = Number(currDate.getMonth()) + 1;

        this.monthChange();
    }

    init2() {
        let currDate = new Date();
        this.selectYearList2 = [
            { value: currDate.getFullYear(), label: currDate.getFullYear() },
            { value: Number(currDate.getFullYear()) + 1, label: Number(currDate.getFullYear()) + 1 },
            { value: Number(currDate.getFullYear()) + 2, label: Number(currDate.getFullYear()) + 2 }
        ];
        this.selectedYear2 = this.selectYearList2[0]['label'];

        this.selectMonthList2 = this.getSelectMonthList(this.selectedYear2);
        this.selectedMonth2 = Number(currDate.getMonth()) + 1;

        this.monthChange2();
    }

    ngOnInit() {

        this.resetForm1();
        this.resetForm2();

        this.init1();
        this.init2();

    }

    // ------------- Component Change -------------//
    yearChange() {
        this.selectedYear = +this.selectedYear;
        this.selectedMonth = null;
        this.selectedDay = null;
        this.selectDayList = null;
        this.selectMonthList = this.getSelectMonthList(this.selectedYear);

        this.dayDisable = true;
    }
    yearChange2() {
        this.selectedYear2 = +this.selectedYear2;
        this.selectedMonth2 = null;
        this.selectedDay2 = null;
        this.selectDayList2 = null;
        this.selectMonthList2 = this.getSelectMonthList(this.selectedYear2);

        this.dayDisable = true;
    }

    monthChange() {
        this.selectedMonth = +this.selectedMonth;
        if (this.selectedMonth !== null) {
            this.selectDayList = this.getSelectDayList(this.selectedYear, this.selectedMonth);
            this.selectedDay = null;
            this.dayDisable = false;
        } else {
            this.selectDayList = null;
            this.selectedDay = null;
            this.dayDisable = true;
        }
    }
    monthChange2() {
        this.selectedMonth2 = +this.selectedMonth2;
        if (this.selectedMonth2 !== null) {
            this.selectDayList2 = this.getSelectDayList(this.selectedYear2, this.selectedMonth2);
            this.selectedDay2 = null;
            this.dayDisable2 = false;
        } else {
            this.selectDayList2 = null;
            this.selectedDay2 = null;
            this.dayDisable2 = true;
        }
    }

    dayChange() {
        this.selectedYear = +this.selectedYear;
    }
    dayChange2() {
        this.selectedYear2 = +this.selectedYear2;
    }

    getSelectMonthList(selectYear: number) {
        let monthList = [];
        var nullMonth = { value: null, label: null };
        monthList.push(nullMonth);
        let currDate = new Date();
        if (Number(currDate.getFullYear()) !== selectYear) {
            for (var i = 1; i <= 12; i++) {
                var month = { value: i, label: i };
                monthList.push(month);
            }
        } else {
            let currMonth: number = Number(currDate.getMonth()) + 1;
            for (var i = currMonth; i <= 12; i++) {
                var month = { value: i, label: i };
                monthList.push(month);
            }
        }
        return monthList;
    }

    getSelectDayList(selectYear: number, selectMonth: number) {
        let dayList = [];
        var nullDay = { value: null, label: null };
        dayList.push(nullDay);
        let currDate = new Date();
        let currYear = Number(currDate.getFullYear());
        let currMonth: number = Number(currDate.getMonth()) + 1;

        if (currYear === selectYear && currMonth === selectMonth) {
            let currDay: number = Number(currDate.getDate());
            for (var i = currDay; i <= this.daysInMonth(selectMonth, selectYear); i++) {
                var day = { value: i, label: i };
                dayList.push(day);
            }
        } else {
            for (var i = 1; i <= this.daysInMonth(selectMonth, selectYear); i++) {
                var day = { value: i, label: i };
                dayList.push(day);
            }
        }
        return dayList;
    }

    // ------------- Component Logic -------------//

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    calWeather() {
        this.blockedCalPanel = true;

        //check forecast Date
        let isForecast: boolean = false;
        let inputDate: Date = new Date(Number(this.selectedYear),
            Number(this.selectedMonth) - 1, Number(this.selectedDay));

        for (var i = 0; i < 9; i++) {
            let currDate: Date = new Date();
            currDate.setDate(currDate.getDate() + i);
            currDate.setHours(0, 0, 0, 0);
            if (inputDate.getTime() === currDate.getTime()) {
                isForecast = true;
                break;
            }
        }

        // calculate week day
        let weekDay = Number(new Date(Number(this.selectedYear),
            Number(this.selectedMonth) - 1, Number(this.selectedDay)).getDay());

        if (isForecast) {
            this.showResult = false;
            this.forecastService.getSingleForecast(Number(this.selectedMonth), Number(this.selectedDay))
                .then(forecast => {
                    this.forecast = forecast;
                    this.forecast.weekDay = weekDay;
                    this.showForecast = true;
                    this.blockedCalPanel = false;
                }).catch(error => {this.msgs.push({ severity: 'error', summary: 'Error: ', detail: 'Something went wrong...' });});
        } else {
            this.showForecast = false;
            // calculate weather
            this.weatherService
                .getCalWeather(this.selectedYear, this.selectedMonth, this.selectedDay, this.selectedFilterYear)
                .then(result => {
                    this.weatherResult = result;
                    this.blockedCalPanel = false;
                    this.weatherIconPath = this.getCalWeatherIconPath(this.weatherResult);
                    this.maxRainValue = Math.max(Number(this.weatherResult.drizzle), Number(this.weatherResult.light)),
                        Number(this.weatherResult.moderate), Number(this.weatherResult.heavy),
                        Number(this.weatherResult.violent), Number(this.weatherResult.torrential);

                    this.weatherResult.weekDay = weekDay;
                    this.showResult = true;
                })
                .catch(error => {
                    this.blockedCalPanel = false;
                    this.error = error;
                    console.log('error: ' + this.error);
                }); // TODO: Display error message
        }
    }
    calWeather2() {
        this.blockedCalPanel2 = true;

        //check forecast Date
        let isForecast2: boolean = false;
        let inputDate2: Date = new Date(Number(this.selectedYear2),
            Number(this.selectedMonth2) - 1, Number(this.selectedDay2));

        for (var i = 0; i < 9; i++) {
            let currDate2: Date = new Date();
            currDate2.setDate(currDate2.getDate() + i);
            currDate2.setHours(0, 0, 0, 0);
            if (inputDate2.getTime() === currDate2.getTime()) {
                isForecast2 = true;
                break;
            }
        }

        // calculate week day
        let weekDay2 = Number(new Date(Number(this.selectedYear2),
            Number(this.selectedMonth2) - 1, Number(this.selectedDay2)).getDay());

        if (isForecast2) {
            this.showResult2 = false;
            this.forecastService.getSingleForecast(Number(this.selectedMonth2), Number(this.selectedDay2))
                .then(forecast2 => {
                    this.forecast2 = forecast2;
                    this.forecast2.weekDay = weekDay2;
                    this.showForecast2 = true;
                    this.blockedCalPanel2 = false;
                }).catch(error => {this.msgs.push({ severity: 'error', summary: 'Error: ', detail: 'Something went wrong...' });});
        } else {
            this.showForecast2 = false;
            this.weatherService
                .getCalWeather(this.selectedYear2, this.selectedMonth2, this.selectedDay2, this.selectedFilterYear)
                .then(result => {
                    this.weatherResult2 = result;
                    this.blockedCalPanel2 = false;
                    this.weatherIconPath2 = this.getCalWeatherIconPath(this.weatherResult2);
                    this.maxRainValue2 = Math.max(Number(this.weatherResult2.drizzle), Number(this.weatherResult2.light)),
                        Number(this.weatherResult2.moderate), Number(this.weatherResult2.heavy),
                        Number(this.weatherResult2.violent), Number(this.weatherResult2.torrential);
                    this.weatherResult2.weekDay = weekDay2;
                    this.showResult2 = true;
                })
                .catch(error => {
                    this.blockedCalPanel2 = false;
                    this.error2 = error;
                    console.log('error2: ' + this.error2);
                }); // TODO: Display error message
        }
    }

    toggleMore() {
        this.getWeatherDtlList1();
        this.showDtl = !this.showDtl;
    }
    toggleMore2() {
        this.getWeatherDtlList2();
        this.showDtl2 = !this.showDtl2;
    }

    getWeatherDtlList1() {
        this.weatherService
                .getWeatherDtlList(this.selectedMonth, this.selectedDay, this.selectedFilterYear)
                .then( result => {
                    for (var key in result) {
                        if (result.hasOwnProperty(key)) {
                            // Change rainfall 999 to 0.05
                            if (result[key].rainfall === 999) {
                                result[key].rainfall = 0.05;
                            }

                            result[key].rainfallDescEN = this.getRainfallDescEN(result[key].rainfall);
                            result[key].rainfallDescZH = this.getRainfallDescZH(result[key].rainfall);
                        }
                    }
                    this.weatherDtlList = result;
                })
                .catch(error => {
                    console.log('error: ' + this.error);
                }); // TODO: Display error message
                
    }    
    getWeatherDtlList2() {
        this.weatherService
                .getWeatherDtlList(this.selectedMonth2, this.selectedDay2, this.selectedFilterYear)
                .then(result => {
                    for (var key in result) {
                        if (result.hasOwnProperty(key)) {
                            // Change rainfall 999 to 0.05
                            if (result[key].rainfall === 999) {
                                result[key].rainfall = 0.05;
                            }
							
							result[key].rainfallDescEN = this.getRainfallDescEN(result[key].rainfall);
                            result[key].rainfallDescZH = this.getRainfallDescZH(result[key].rainfall);
                        }
                    }
                    this.weatherDtlList2 = result;
                })
                .catch(error => {
                    console.log('error2: ' + this.error2);
                }); // TODO: Display error message
                
    }

    addCalInputForm() {
        $('#calDiv1').removeClass('ui-md-9 ui-lg-9').addClass('ui-md-6 ui-lg-6');
        $('#calDiv2').removeClass('ui-md-3 ui-lg-3').addClass('ui-md-6 ui-lg-6');
        this.showCal2 = true;
    }

    getCalWeatherIconPath(weatherResult: ResultWeather) {
        let iconPath: string = null;

        if (weatherResult.rainYear < this.GCONSTANTS.RAIN_SUN_THRESHOLD) {
            iconPath = './app/assets/img/icon/' + this.GCONSTANTS.SUNSHINE + '.png';
        } else {
            if (this.isTorrential(weatherResult) || this.isViolent(weatherResult)) {
                iconPath = './app/assets/img/icon/' + this.GCONSTANTS.VIOLENT_TORRENTIAL + '.png';
            } else if (this.isHeavy(weatherResult)) {
                iconPath = './app/assets/img/icon/' + this.GCONSTANTS.HEAVY + '.png';
            } else if (this.isModerate(weatherResult)) {
                iconPath = './app/assets/img/icon/' + this.GCONSTANTS.MODERATE + '.png';
            } else if (this.isLigth(weatherResult)) {
                iconPath = './app/assets/img/icon/' + this.GCONSTANTS.LIGHT + '.png';
            } else if (this.isDrizzle(weatherResult)) {
                iconPath = './app/assets/img/icon/' + this.GCONSTANTS.DRIZZLE + '.png';
            }
        }
        return iconPath;
    }

    isDrizzle(weatherResult: ResultWeather) {
        if (weatherResult.drizzle >= weatherResult.light
            && weatherResult.drizzle >= weatherResult.moderate
            && weatherResult.drizzle >= weatherResult.heavy
            && weatherResult.drizzle >= weatherResult.violent
            && weatherResult.drizzle >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isLigth(weatherResult: ResultWeather) {
        if (weatherResult.light >= weatherResult.drizzle
            && weatherResult.light >= weatherResult.moderate
            && weatherResult.light >= weatherResult.heavy
            && weatherResult.light >= weatherResult.violent
            && weatherResult.light >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isModerate(weatherResult: ResultWeather) {
        if (weatherResult.moderate >= weatherResult.drizzle
            && weatherResult.moderate >= weatherResult.light
            && weatherResult.moderate >= weatherResult.heavy
            && weatherResult.moderate >= weatherResult.violent
            && weatherResult.moderate >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isHeavy(weatherResult: ResultWeather) {
        if (weatherResult.heavy >= weatherResult.drizzle
            && weatherResult.heavy >= weatherResult.light
            && weatherResult.heavy >= weatherResult.moderate
            && weatherResult.heavy >= weatherResult.violent
            && weatherResult.heavy >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isViolent(weatherResult: ResultWeather) {
        if (weatherResult.violent >= weatherResult.drizzle
            && weatherResult.violent >= weatherResult.light
            && weatherResult.violent >= weatherResult.moderate
            && weatherResult.violent >= weatherResult.heavy
            && weatherResult.violent >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isTorrential(weatherResult: ResultWeather) {
        if (weatherResult.torrential >= weatherResult.drizzle
            && weatherResult.torrential >= weatherResult.light
            && weatherResult.torrential >= weatherResult.moderate
            && weatherResult.torrential >= weatherResult.heavy
            && weatherResult.torrential >= weatherResult.violent) {
            return true;
        } else {
            return false;
        }
    }

    fromResultToCal() {
        this.showResult = false;
    }
    fromResultToCal2() {
        this.showResult2 = false;
    }

    fromForecastToCal() {
        this.showForecast = false;
    }
    fromForecastToCal2() {
        this.showForecast2 = false;
    }

    getRainfallDescEN(rainfall: any){
        if(rainfall === 0){
            return this.GCONSTANTS.SUNSHINE_EN;
        }else if(rainfall === this.GCONSTANTS.DRIZZLE_THRESHOLD){
            return this.GCONSTANTS.DRIZZLE_EN;
        }else if(rainfall <= this.GCONSTANTS.LIGHT_THRESHOLD){
            return this.GCONSTANTS.LIGHT_EN;
        }else if(rainfall <= this.GCONSTANTS.MODERATE_THRESHOLD){
            return this.GCONSTANTS.MODERATE_EN;
        }else if(rainfall <= this.GCONSTANTS.HEAVY_THRESHOLD){
            return this.GCONSTANTS.HEAVY_EN;
        }else if(rainfall <= this.GCONSTANTS.VIOLENT_THRESHOLD){
            return this.GCONSTANTS.VIOLENT_EN;
        }else if(rainfall >= this.GCONSTANTS.TORRENTIAL_THRESHOLD){
            return this.GCONSTANTS.TORRENTIAL_EN;
        }
    }

     getRainfallDescZH(rainfall: any){
        if(rainfall === 0){
            return this.GCONSTANTS.SUNSHINE_ZH;
        }else if(rainfall === this.GCONSTANTS.DRIZZLE_THRESHOLD){
            return this.GCONSTANTS.DRIZZLE_ZH;
        }else if(rainfall <= this.GCONSTANTS.LIGHT_THRESHOLD){
            return this.GCONSTANTS.LIGHT_ZH;
        }else if(rainfall <= this.GCONSTANTS.MODERATE_THRESHOLD){
            return this.GCONSTANTS.MODERATE_ZH;
        }else if(rainfall <= this.GCONSTANTS.HEAVY_THRESHOLD){
            return this.GCONSTANTS.HEAVY_ZH;
        }else if(rainfall <= this.GCONSTANTS.VIOLENT_THRESHOLD){
            return this.GCONSTANTS.VIOLENT_ZH;
        }else if(rainfall >= this.GCONSTANTS.TORRENTIAL_THRESHOLD){
            return this.GCONSTANTS.TORRENTIAL_ZH;
        }
    }

    changeLangInd() {
        this.langInd = globalVar.gLangInd;
    }
}