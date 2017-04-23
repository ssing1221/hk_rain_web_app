/**
 * Created by Josh Chan on 02-12-2016.
 */

import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Account } from "../models/Account";

@Injectable()
export class AccountService {

    private baserUrl = 'api/';  // URL to web api

    constructor(private http: Http) { }

    checkAccount(account: Account): any {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.baserUrl + 'checkAccount', JSON.stringify(account), { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Something went wrong...', error);
        return Promise.reject(error.message || error);
    }

}