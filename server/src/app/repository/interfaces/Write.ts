/**
 * Created by Josh Chan on 02-12-2016.
 */


import mongoose = require("mongoose");
interface Write<T> {
    create: (item:T, callback: (error: any, result: any ) => void) => void;
    update:(_id: mongoose.Types.ObjectId, item:T, callback: (error: any, result: any)=> void) => void ;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;

}

export = Write;