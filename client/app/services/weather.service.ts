/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Weather } from "../models/Weather";
import { ResultWeather } from "../models/ResultWeather";

@Injectable()
export class WeatherService {

    private baserUrl = 'api/';  // URL to web api

    constructor(private http: Http) { }

    getCalWeather(year: number, month: number, day: number, filterYear: number): Promise<ResultWeather> {
        return this.http.get(this.baserUrl + '/' + 'calWeather' + '/' + year + '/' + month + '/ ' + day + '/' + filterYear)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    findByYearMonthDay(year: number, month: number, day: number): Promise<Weather> {
        return this.http.get(this.baserUrl + '/' + 'findByYearMonthDay' + '/' + year + '/' + month + '/ ' + day)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getAllWeather(): Promise<Weather[]> {
        return this.http.get(this.baserUrl + '/' + 'getAllWeather')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getWeatherDtlList(month: number, day: number, filterYear: number): Promise<Weather[]> {
        return this.http.get(this.baserUrl + '/' + 'getWeatherDtlList'  + '/' + month + '/ ' + day + '/' + filterYear)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Something went wrong...', error);
        return Promise.reject(error.message || error);
    }

}