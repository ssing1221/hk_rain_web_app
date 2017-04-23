/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Component, OnInit, NgModule } from '@angular/core';

import { AccountService } from "../../services/account.service";
import { ForecastService } from "../../services/forecast.service";
import { WeatherService } from "../../services/weather.service";
import { FeedbackService } from "../../services/feedback.service";
import { OT_GConstants, IGConstants } from './../../constants/GConstants';
import { Inject } from '@angular/core';
import { Account } from "../../models/Account";
import { Forecast } from "../../models/Forecast";
import { Weather } from "../../models/Weather";
import { Feedback } from "../../models/Feedback";
import { ResultWeather } from "../../models/ResultWeather";
import { Message } from 'primeng/primeng';

@Component({
    selector: 'my-admin',
    templateUrl: './app/components/admin/admin.component.html',
    styleUrls: ['./app/components/admin/admin.component.css',
        './app/assets/css/global.main.css', './app/assets/css/fadeInDiv.css']
})

export class AdminComponent {

    error: any;
    admin: Account;
    showDtl: boolean;
    forecastrList: Array<Forecast>;
    msgs: Message[] = [];
    forecastList: Forecast[] = [];
    weatherList: Weather[] = [];
	feedbackList: Feedback[] = [];


    constructor(
        @Inject(OT_GConstants) private GCONSTANTS: IGConstants,
        private accountService: AccountService, private forecastService: ForecastService
        , private weatherService: WeatherService, private feedbackService: FeedbackService) {
    }

    ngOnInit() {
        this.admin = new Account();
        this.admin.name = null;
        this.admin.pwd = null;
        this.showDtl = false;
    }

    login() {
        this.msgs = [];

        this.accountService
            .checkAccount(this.admin)
            .then(response => {
                if (response.isAccept) {
                    this.forecastService.getAllForecast()
                        .then(forecastList => {
                            this.forecastList = forecastList;
                            this.showDtl = true;
                        });
                } else {
                    this.msgs.push({ severity: 'error', summary: 'Error: ', detail: 'Validation failed!' });
                    this.showDtl = false;
                }
            })
            .catch(error => {
                this.error = error;
                this.msgs.push({ severity: 'error', summary: 'Error: ', detail: this.error });
            }); // TODO: Display error message
    }

    createForecast() {
        this.msgs.push({ severity: 'error', summary: 'Error: ', detail: 'Not Yet Ready!' });
    }

    createWeather() {
        this.msgs.push({ severity: 'error', summary: 'Error: ', detail: 'Not Yet Ready!' });
    }

    checkWeather() {
        let testYear: number;
        let year: number;
        let month: number;
        let day: number;

        testYear = 2014;

        year = 2014;
        month = 1;
        day = 1;

        this.mainCheck(year, month, day, 20, testYear);

    }

    checkRight: number = 0;
    checkRain: number = 0;

    mainCheck(year: number, month: number, day: number, filterYear: number, testYear: number) {
        console.log('running...');
        let weatherResult: ResultWeather;
        let weather: Weather;

        this.weatherService
            .getCalWeather(year, month, day, filterYear)
            .then(result => {
                weatherResult = result;
                this.weatherService.findByYearMonthDay(testYear, month, day).then(result => {
                    weather = result;
                    // Main checking
                    if (weather.rainfall > 0) {
                        if (weatherResult.rainYear > 50) {
                            this.checkRight++;
                        }        
                    } else {
                        if( weatherResult.rainYear < 50) {
                            this.checkRight++;
                        }
                    }
					this.checkRain++;
                    let newDate = new Date(year, month - 1, day);
                    var nextDay = new Date(newDate);
                    nextDay.setDate(newDate.getDate() + 1);
                    if (nextDay.getMonth() === 1 && nextDay.getDate() === 29) {
                        nextDay.setDate(nextDay.getDate() + 1);
                    }
                    if (nextDay.getFullYear() === testYear && nextDay.getMonth() === 11 && nextDay.getDate() === 31) {
                        var resultRain = (this.checkRight / this.checkRain) * 100;
                        console.log('testYear: ' + testYear + ', filterYear: ' + filterYear + ', Total resultRain: ' + resultRain);
                        console.log('------------------------------------');
                    } else {
                        this.mainCheck(nextDay.getFullYear(), nextDay.getMonth() + 1, nextDay.getDate(), filterYear, testYear);
                    }
                });
            });
    }

    handleChange(e) {
        let index: number = e.index;
        if (index === 1) {
            this.weatherService.getAllWeather()
                .then(weatherList => {
                    this.weatherList = weatherList;
                });
        }else if (index === 2) {
            this.feedbackService.getAllFeedback()
                .then(feedbackList => {
                    this.feedbackList = feedbackList;
                });
        }
		
    }

}