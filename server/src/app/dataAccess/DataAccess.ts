/**
 * 
 */

import Mongoose = require('mongoose');
import Sconfig = require('./../../config/constants/Sconfig');

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor () {
        DataAccess.connect();
    }

    static connect (): Mongoose.Connection {
        if(this.mongooseInstance){
            return this.mongooseInstance;
        };
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once('open', () => {
            console.log('Connected to mongodb.');
        });

        this.mongooseInstance = Mongoose.connect(Sconfig.DB_CONNECTION_STRING);

        return this.mongooseInstance;
    }
}

DataAccess.connect();
export = DataAccess;