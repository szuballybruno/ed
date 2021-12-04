
import { Question } from "../../models/entity/Question";
import { Video } from "../../models/entity/Video";
import { QuestionTypeEnum, UserRoleEnum } from "../../models/shared_models/types/sharedTypes";
import { registerInvitedUserAsync } from "../dataService";
import { log } from "./../misc/logger";
import { createInvitedUserWithOrgAsync } from "./../signupService";
import { insertVideoAsync } from "./../videoService";
import { ORMConnectionService } from "./ORMConnectionService";
import { SQLBootstrapperService } from "./SQLBootstrapper";

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _ormConnectionService: ORMConnectionService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, ormConnectionService: ORMConnectionService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._ormConnectionService = ormConnectionService;
    }

    seedDBAsync = async () => {

        const executeSeedScriptAsync = this._sqlBootstrapperService.executeSeedScriptAsync;

        await executeSeedScriptAsync("seedOrganizations");
        await executeSeedScriptAsync("seedQuestionTypes");
        await executeSeedScriptAsync("seedActivities");
        await executeSeedScriptAsync("seedRoles");
        await executeSeedScriptAsync("seedSignupExam");
        await executeSeedScriptAsync("seedJobRoles");

        log("seedUsers")
        await this.seedUsersAsync();

        await executeSeedScriptAsync("seedSignupQuestions");
        await executeSeedScriptAsync("seedPersonalityCategoryDescriptions");
        await executeSeedScriptAsync("seedDailyTips");
        await executeSeedScriptAsync("seedCourseCategories");
        await executeSeedScriptAsync("seedCourses");
        await executeSeedScriptAsync("seedExams");
        await executeSeedScriptAsync("seedVideos");
        await executeSeedScriptAsync("seedQuestions");
        await executeSeedScriptAsync("seedQuestionsExam");

        await this._sqlBootstrapperService.recalcSequencesAsync();
    }

    private seedUsersAsync = async () => {

        log("seeding User 1...")
        const { invitationToken, user } = await createInvitedUserWithOrgAsync(
            {
                firstName: "Endre",
                lastName: "Marosi",
                jobTitleId: 1,
                roleId: UserRoleEnum.administratorId,
                email: "marosi.endre@email.com",
            },
            1,
            false);

        await registerInvitedUserAsync({
            invitationToken: invitationToken,
            password: "admin",
            passwordCompare: "admin"
        });

        log("seeding User 2...")
        const { invitationToken: it2, user: u2 } = await createInvitedUserWithOrgAsync(
            {
                firstName: "Elon",
                lastName: "Musk",
                jobTitleId: 1,
                roleId: UserRoleEnum.supervisorId,
                email: "elon.musk@email.com",
            },
            2,
            false);

        log("User 2 token: " + it2);
    }
}
