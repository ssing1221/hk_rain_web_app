/**
 * Created by Josh Chan on 02-12-2016.
 */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { OT_GConstants, IGConstants } from './../../constants/GConstants';
import {Inject} from '@angular/core';

@Component({
    selector: 'my-about',
    templateUrl: './app/components/about/about.component.html',
    styleUrls: ['./app/components/about/about.component.css',
        './app/assets/css/global.main.css', './app/assets/css/fadeInDiv.css']
})

export class AboutComponent {

    constructor(
        @Inject(OT_GConstants) private GCONSTANTS: IGConstants) {
    }

  

}