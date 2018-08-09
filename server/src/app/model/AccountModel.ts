/**
 * Account Model
 */

import IAccountModel = require('./interfaces/IAccountModel');

class AccountModel {

    private _accountModel: IAccountModel;

    constructor(accountModel: IAccountModel) {
        this._accountModel = accountModel;
    }

    // ***************** getter / setter **********************************

    get name (): String {
        return this._accountModel.name;
    }
    set name (name:String) {
            this._accountModel.name = name;
    }

    get pwd (): String {
        return this._accountModel.pwd;
    }
    set pwd (pwd:String) {
            this._accountModel.pwd = pwd;
    }
}
Object.seal(AccountModel);
export =  AccountModel;

