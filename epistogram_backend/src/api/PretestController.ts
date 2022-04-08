import { PretestService } from '../services/PretestService';
import { ActionParams } from '../utilities/helpers';

export class PretestController {

    private _pretestService: PretestService;

    constructor(pretestService: PretestService) {

        this._pretestService = pretestService;
    }

    getPretestDataAction = async (params: ActionParams) => {

        const query = params
            .getQuery<{ courseId: number }>();

        const courseId = query
            .getValue(x => x.courseId, 'int');

        return await this._pretestService
            .getPretestDataAsync(params.currentUserId, courseId);
    }

    getPretestResultsAction = async (params: ActionParams) => {

        return this._pretestService
            .getPretestResultsAsync(params.currentUserId, params
                .getQuery<any>()
                .getValue(x => x.courseId));
    }

    getPretestExamIdAction = async (params: ActionParams) => {

        return this._pretestService
            .getPretestExamIdAsync(params
                .getQuery<any>()
                .getValue(x => x.courseId));
    }
}