/**
 * Created by Josh Chan on 02-12-2016.
 */

import express = require("express");
interface WriteController {
    create: express.RequestHandler;
    update: express.RequestHandler;
    delete: express.RequestHandler;

}

export = WriteController;