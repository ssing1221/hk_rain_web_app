/**
 * Interface of Account model 
 */

import mongoose = require("mongoose");

interface IAccountModel extends mongoose.Document {
    name: String;        
    pwd: String;        
}

export = IAccountModel;