/**
 * Created by Josh Chan on 02-12-2016.
 */

import FeedbackModel = require("./../model/FeedbackModel");
import IFeedbackModel = require("./../model/interfaces/IFeedbackModel");
import FeedbackSchema = require("./../dataAccess/schemas/FeedbackSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class FeedbackRepository  extends RepositoryBase<IFeedbackModel> {
    constructor () {
        super(FeedbackSchema);
    }

    private _feedbackmodel: mongoose.Model<mongoose.Document> = FeedbackSchema;

    createFeedback: (item:IFeedbackModel, callback: (error: any, result: any ) => void) => void;

    findAll(callback: (error: any, result: IFeedbackModel[]) => void) {
		this._feedbackmodel.find({}, {}, { sort: { submitDate: 1 } }, callback);
    }

}

Object.seal(FeedbackRepository);
export = FeedbackRepository;