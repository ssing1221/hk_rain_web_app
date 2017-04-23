/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Component, OnInit, NgModule, Inject } from '@angular/core';

import { OT_GConstants, IGConstants } from './../../constants/GConstants';
import { Message } from 'primeng/primeng';
import globalVar = require('./../../globalVar');

@Component({
    selector: 'my-setting',
    templateUrl: './app/components/setting/setting.component.html',
    styleUrls: ['./app/components/setting/setting.component.css',
        './app/assets/css/global.main.css', './app/assets/css/fadeInDiv.css']
})

export class SettingComponent {

    error: any;
    selectedFilterYear;
    selectFilterYearList: Array<Object>;

    msgs: Message[] = [];


    constructor(

        @Inject(OT_GConstants) private GCONSTANTS: IGConstants) {
        // Set filter year from gloalVar
        this.selectedFilterYear = globalVar.filterYear;

        this.selectFilterYearList = [];
        for (let i = 5; i <= 120; i+=5) {
            let year = { value: i, label: i };
            this.selectFilterYearList.push(year);
        }

        this.msgs = [];
    }

    ngOnInit() {
        this.msgs = [];
    }

    changeFilterYear() {
        globalVar.filterYear = this.selectedFilterYear;
        if(globalVar.gLangInd === 'en'){
            this.msgs.push({ severity: 'warn', summary: this.GCONSTANTS.S0001, 
                detail: this.GCONSTANTS.NO_OF_YEARS_CHANGED_TO_EN + ' ' + this.selectedFilterYear});
        }else{
            this.msgs.push({ severity: 'warn', summary: this.GCONSTANTS.S0001, 
                detail: this.GCONSTANTS.NO_OF_YEARS_CHANGED_TO_ZH + ' ' + this.selectedFilterYear});
        }
    }
}