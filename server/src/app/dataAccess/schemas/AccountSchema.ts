/**
 * Account Schema.
 */

import DataAccess = require('../DataAccess');
import IAccountModel = require("./../../model/interfaces/IAccountModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class AccountSchema {

    static get schema () {
        var schema =  mongoose.Schema({
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