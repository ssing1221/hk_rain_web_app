/**
 * Interface of Feedback model 
 */

import mongoose = require("mongoose");

interface IFeedbackModel extends mongoose.Document {
    name: String;        
    email: String;
    comment: String;
    submitDate: Date;        
}

export = IFeedbackModel;