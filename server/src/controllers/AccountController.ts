/**
 * Created by Josh Chan on 02-12-2016.
 */

import express = require("express");
import Constants = require('./../config/constants/Constants');
import AccountRepository = require("./../app/repository/AccountRepository");
import IAccountModel = require("./../app/model/interfaces/IAccountModel");

class AccountController {

    checkAccount(req: express.Request, res: express.Response): void {
        try {
            var account: IAccountModel = <IAccountModel>req.body;
            var accountRepository = new AccountRepository();
            accountRepository.checkAccount(String(account.name), String(account.pwd), (error, result) => {
                if (error) {
                    res.status(400).send({ 'error': error });
                }
                else {
                    if (result === 0) {
                        res.status(200).send({ 'isAccept': false });
                    } else {
                        res.status(200).send({"isAccept": true});
                    }
                };
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "err1001" });

        }
    }

}
export = AccountController;