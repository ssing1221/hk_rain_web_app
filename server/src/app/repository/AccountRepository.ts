/**
 * Created by Josh Chan on 02-12-2016.
 */

import AccountModel = require("./../model/AccountModel");
import IAccountModel = require("./../model/interfaces/IAccountModel");
import AccountSchema = require("./../dataAccess/schemas/AccountSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class AccountRepository extends RepositoryBase<IAccountModel> {
    constructor () {
        super(AccountSchema);
    }

    private _accountmodel: mongoose.Model<mongoose.Document> = AccountSchema;

    checkAccount (inputName: string, inputPwd: string, callback: (error: any, result: any) => void) {
        this._accountmodel.count( { 
                                $and: [ 
                                    { name: inputName }, 
                                    { pwd: inputPwd } ] 
                                }, callback);
    }
}

Object.seal(AccountRepository);
export = AccountRepository;