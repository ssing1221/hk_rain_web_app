/**
 * Feedback Model
 */

import IFeedbackModel = require('./interfaces/IFeedbackModel');

class FeedbackModel {

    private _feedbackModel: IFeedbackModel;

    constructor(feedbackModel: IFeedbackModel) {
        this._feedbackModel = feedbackModel;
    };

    // ***************** getter / setter **********************************

    get name(): String {
        return this._feedbackModel.name;
    };
    set name(name: String) {
        this._feedbackModel.name = name;
    };

    get email(): String {
        return this._feedbackModel.email;
    };
    set email(email: String) {
        this._feedbackModel.email = email;
    };

    get comment(): String {
        return this._feedbackModel.comment;
    };
    set comment(comment: String) {
        this._feedbackModel.comment = comment;
    };

    get submitDate(): Date {
        return this._feedbackModel.submitDate;
    };
    set submitDate(submitDate: Date) {
        this._feedbackModel.submitDate = submitDate;
    };
}
Object.seal(FeedbackModel);
export =  FeedbackModel;

