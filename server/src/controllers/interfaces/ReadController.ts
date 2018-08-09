/**
 * Created by Josh Chan on 02-12-2016.
 */

import express = require("express");
interface ReadController {
    retrieve: express.RequestHandler;
    findById: express.RequestHandler;


}
export = ReadController;