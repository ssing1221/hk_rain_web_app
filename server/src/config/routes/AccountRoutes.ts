/**
 * Routes of Account
 */

import express = require("express");
import AccountController = require("./../../controllers/AccountController");

var router = express.Router();

class AccountRoutes {
    private _accountController: AccountController;

    constructor () {
        this._accountController = new AccountController();
    }

    get routes () {
        var controller = this._accountController;
        router.post("/checkAccount", controller.checkAccount);
        return router;
    }
}

Object.seal(AccountRoutes);
export = AccountRoutes;