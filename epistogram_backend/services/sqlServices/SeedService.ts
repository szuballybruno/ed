
import { RoleIdEnum } from "../../models/shared_models/types/sharedTypes";
import { RegistrationService } from "../RegistrationService";
import { log } from "./../misc/logger";
import { SQLBootstrapperService } from "./SQLBootstrapper";

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _regService: RegistrationService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, regService: RegistrationService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._regService = regService;
    }

    seedDBAsync = async () => {

        await this._sqlBootstrapperService.executeSeedScriptAsync("seedOrganizations");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedQuestionTypes");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedActivities");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedRoles");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedSignupExam");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedJobTitles");
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
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedActivationCodes");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedShopItemCategories");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seedShopItems");

        // recalc seqs
        await this._sqlBootstrapperService.recalcSequencesAsync();

        // seed users 
        await this.seedUsersAsync();
    }

    private seedUsersAsync = async () => {

        log("seeding User 1...")
        const { invitationToken, createdUser } = await this._regService
            .createInvitedUserAsync(
                {
                    firstName: "Endre",
                    lastName: "Marosi",
                    jobTitleId: 1,
                    roleId: RoleIdEnum.administrator,
                    email: "marosi.endre@email.com",
                    organizationId: 1
                },
                true);

        await this._regService
            .registerInvitedUserAsync(
                invitationToken,
                "admin",
                "admin");

        log("seeding User 2...")
        const { invitationToken: it2, createdUser: u2 } = await this._regService
            .createInvitedUserAsync(
                {
                    firstName: "Elon",
                    lastName: "Musk",
                    jobTitleId: 1,
                    roleId: RoleIdEnum.supervisor,
                    email: "elon.musk@email.com",
                    organizationId: 1
                },
                true);

        log("User 2 token: " + it2);
    }
}
