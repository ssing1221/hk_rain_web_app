/**
 * Created by Josh Chan on 02-12-2016.
 */

import express = require("express");
import Constants = require('./../config/constants/Constants');
import FeedbackRepository = require("./../app/repository/FeedbackRepository");
import IFeedbackModel = require("./../app/model/interfaces/IFeedbackModel");

class FeedbackController {

    submitFeedback(req: express.Request, res: express.Response): void {
        try {
            var feedback: IFeedbackModel = <IFeedbackModel>req.body;
            feedback.submitDate = new Date();
            var feedbackRepository = new FeedbackRepository();
            feedbackRepository.create(feedback, (error, result) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send({ "success": "success" });
                };
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    getAllFeedback(req: express.Request, res: express.Response): void {
        try {
            let error: any = null;
            var feedbackRepository = new FeedbackRepository();
            feedbackRepository.findAll((err, result) => {
                if (err) {
                    error = err;
                }
                else {
                    res.send(result);
                };
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "err1002" });
        }
    }

}
export = FeedbackController;