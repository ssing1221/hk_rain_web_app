/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Component, OnInit, NgModule, Inject } from '@angular/core';

import { FeedbackService } from "../../services/feedback.service";
import { OT_GConstants, IGConstants } from './../../constants/GConstants';
import { Feedback } from "../../models/Feedback";
import { Message, InputTextareaModule } from 'primeng/primeng';
import globalVar = require('./../../globalVar');

@Component({
    selector: 'my-feedback',
    templateUrl: './app/components/feedback/feedback.component.html',
    styleUrls: ['./app/components/feedback/feedback.component.css',
        './app/assets/css/global.main.css', './app/assets/css/fadeInDiv.css']
})

export class FeedbackComponent {

    error: any;
    feedback: Feedback;
    msgs: Message[] = [];
    blockedCalPanel: boolean = false;



    constructor(
        @Inject(OT_GConstants) private GCONSTANTS: IGConstants,
        private feedbackService: FeedbackService) {
    }

    ngOnInit() {
        this.feedback = new Feedback();
        this.feedback.name = null;
        this.feedback.email = null;
        this.feedback.comment = null;
        this.feedback.submitDate = null;
    }

    submitFeedback() {
        this.msgs = [];

        this.feedbackService
            .checkFeedback(this.feedback)
            .then(response => {
                this.feedback = new Feedback();
                if (globalVar.gLangInd === 'en') {
                    this.msgs.push({
                        severity: 'warn', summary: this.GCONSTANTS.S0002,
                        detail: this.GCONSTANTS.SUBMITTED_SUCCESSFULLY_EN
                    });
                } else {
                    this.msgs.push({
                        severity: 'warn', summary: this.GCONSTANTS.S0002,
                        detail: this.GCONSTANTS.SUBMITTED_SUCCESSFULLY_ZH
                    });
                }
            })
            .catch(error => {
                this.error = error;
                this.msgs.push({ severity: 'error', summary: 'Error: ', detail: this.error });
            }); // TODO: Display error message
    }

}