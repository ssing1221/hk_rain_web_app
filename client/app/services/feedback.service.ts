/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Feedback } from "../models/Feedback";

@Injectable()
export class FeedbackService {

    private baserUrl = 'api/';  // URL to web api

    constructor(private http: Http) { }

    checkFeedback(feedback: Feedback): any {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.baserUrl + 'submitFeedback', JSON.stringify(feedback), { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getAllFeedback(): Promise<Feedback[]> {
        return this.http.get(this.baserUrl + '/' + 'getAllFeedback')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Something went wrong...', error);
        return Promise.reject(error.message || error);
    }

}