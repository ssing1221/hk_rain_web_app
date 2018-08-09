/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Component, OnInit } from '@angular/core';

import { OT_GConstants, IGConstants } from './../../constants/GConstants';
import { Inject } from '@angular/core';
import { WeatherService } from "../../services/weather.service";
import globalVar = require('./../../globalVar');

@Component({
    selector: 'my-WeeklyPredict',
    templateUrl: './app/components/weeklyPredict/weeklyPredict.component.html',
    styleUrls: ['./app/components/weeklyPredict/weeklyPredict.component.css',
        './app/assets/css/global.main.css', './app/assets/css/fadeInDiv.css']
})

export class WeeklyPredictComponent {

    langInd: string;

    monthMap: {};
    weekDayEnMap: {};
    weekDayZhMap: {};

    chartData: any;
    chartOptions: any;
    weeklySelectList: Array<Object> = [];
    selectedWeek: string;
    selectedFilterYear: number;

    constructor(
        @Inject(OT_GConstants) private GCONSTANTS: IGConstants,
        private weatherService: WeatherService) {
        this.langInd = globalVar.gLangInd;
        this.monthMap = globalVar.monthMap;
        this.weekDayEnMap = globalVar.weekDayEnMap;
        this.weekDayZhMap = globalVar.weekDayZhMap;
        // Set filter year from gloalVar
        this.selectedFilterYear = globalVar.filterYear;
        this.chartOptions = {
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        // beginAtZero: true,
                        // min: 0,
                        // max: 100,
                        // stepSize: 10
                    }
                }]
            }
        };
    }

    ngOnInit() {
        
        this.weeklySelectList = [];

        this.weatherService.getWeeklySelectList()
        .then(weeklySelectList => {

            this.weeklySelectList = weeklySelectList;
            let weeklySelect:any = this.weeklySelectList[0];
            this.selectedWeek = weeklySelect.value;
            let weeklySelectStr:string = weeklySelect.value;
            weeklySelectStr = weeklySelectStr.replace(new RegExp('/', 'g'), '.');

            this.weatherService.getWeeklyPredictResult(weeklySelectStr, globalVar.filterYear)
            .then(result => {
                this.chartData = {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            fill: true,
                            borderColor: '#007ACC'
                        }
                    ]
                };

                this.chartData.labels = [];
                result.weekLabelList.forEach(weekLabel => {
                    this.chartData.labels.push(weekLabel);    
                });

                this.chartData.datasets.data = [];
                result.weekPredictList.forEach(weekPredict => {
                    this.chartData.datasets[0].data.push(weekPredict);    
                });
                
            });
        });

    }

    weekChange(){
        let weeklySelectStr:string = this.selectedWeek;
        weeklySelectStr = weeklySelectStr.replace(new RegExp('/', 'g'), '.');
        this.weatherService.getWeeklyPredictResult(weeklySelectStr, globalVar.filterYear)
        .then(result => {
            this.chartData = {
                labels: [],
                datasets: [
                    {
                        label: 'Raining %',
                        data: [],
                        fill: true,
                        borderColor: '#007ACC'
                    }
                ]
            };

            this.chartData.labels = [];
            result.weekLabelList.forEach(weekLabel => {
                this.chartData.labels.push(weekLabel);    
            });

            this.chartData.datasets.data = [];
            result.weekPredictList.forEach(weekPredict => {
                this.chartData.datasets[0].data.push(weekPredict);    
            });
            
        });
    }

    changeLangInd() {
        this.langInd = globalVar.gLangInd;
    }
}