
import { UserRoleEnum } from "../../models/shared_models/types/sharedTypes";
import { RegistrationService } from "../RegistrationService";
import { SignupService } from "../SignupService2";
import { log } from "./../misc/logger";
import { SQLBootstrapperService } from "./SQLBootstrapper";

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _signupService: SignupService;
    private _regService: RegistrationService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, signupService: SignupService, regService: RegistrationService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._signupService = signupService;
        this._regService = regService;
    }

    seedDBAsync = async () => {

        await this._sqlBootstrapperService.executeSeedScriptAsync("seedOrganizations");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedQuestionTypes");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedActivities");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedRoles");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedSignupExam");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedJobRoles");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedUsers");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedSignupQuestions");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedPersonalityCategoryDescriptions");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedCourseCategories");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedCourses");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedExams");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedVideos");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedQuestions");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedQuestionsExam");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedDailyTips");

        // recalc seqs
        await this._sqlBootstrapperService.recalcSequencesAsync();

        // seed users 
        await this.seedUsersAsync();
    }

    private seedUsersAsync = async () => {

        log("seeding User 1...")
        const { invitationToken, user } = await this._signupService
            .createInvitedUserWithOrgAsync(
                {
                    firstName: "Endre",
                    lastName: "Marosi",
                    jobTitleId: 1,
                    roleId: UserRoleEnum.administratorId,
                    email: "marosi.endre@email.com",
                },
                1,
                false);

        await this._regService
            .registerInvitedUserAsync(
                invitationToken,
                "admin",
                "admin");

        log("seeding User 2...")
        const { invitationToken: it2, user: u2 } = await this._signupService
            .createInvitedUserWithOrgAsync(
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
