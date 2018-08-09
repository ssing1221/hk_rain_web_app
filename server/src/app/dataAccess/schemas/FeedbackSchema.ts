/**
 * Feedback Schema.
 */

import DataAccess = require('../DataAccess');
import IFeedbackModel = require("./../../model/interfaces/IFeedbackModel");
import Mongoose = require('mongoose');

var mongooseConnection = DataAccess.mongooseConnection;

class FeedbackSchema {

    static get schema () {
        var schema = new Mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            email : {
                type: String,
                required: false
            },
            comment : {
                type: String,
                required: false
            },
            submitDate : {
                type: Date,
                required: false
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IFeedbackModel>("feedbacks", FeedbackSchema.schema);
export = schema;"";