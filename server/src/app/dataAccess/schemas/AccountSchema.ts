/**
 * Account Schema.
 */

import DataAccess = require('../DataAccess');
import IAccountModel = require("./../../model/interfaces/IAccountModel");
import Mongoose = require('mongoose');

var mongooseConnection = DataAccess.mongooseConnection;

class AccountSchema {

    static get schema () {
        var schema = new Mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            pwd : {
                type: String,
                required: true
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IAccountModel>("accounts", AccountSchema.schema);
export = schema;"";