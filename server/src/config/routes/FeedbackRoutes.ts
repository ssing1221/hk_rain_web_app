/**
 * Routes of Feedback
 */

import express = require("express");
import FeedbackController = require("./../../controllers/FeedbackController");

var router = express.Router();

class FeedbackRoutes {
    private _feedbackController: FeedbackController;

    constructor () {
        this._feedbackController = new FeedbackController();
    }

    get routes () {
        var controller = this._feedbackController;
        router.post("/submitFeedback", controller.submitFeedback);
        router.get("/getAllFeedback", controller.getAllFeedback);
        return router;
    }
}

Object.seal(FeedbackRoutes);
export = FeedbackRoutes;