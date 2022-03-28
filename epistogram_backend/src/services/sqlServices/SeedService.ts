
import { RoleIdEnum } from "../../shared/types/sharedTypes";
import { RegistrationService } from "../RegistrationService";
import { log } from "../misc/logger";
import { SQLBootstrapperService } from "./SQLBootstrapper";

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _regService: RegistrationService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, regService: RegistrationService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._regService = regService;
    }

    seedDBAsync = async () => {

        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_organizations");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_question_types");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_activities");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_roles");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_signup_exam");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_job_titles");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_users");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_signup_questions");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_course_categories");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_courses");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_exams");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_videos");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_questions_video");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_questions_exam");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_daily_tips");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_activation_codes");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_shop_item_categories");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_shop_items");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_discount_codes");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_prequiz_questions");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_course_rating");
        await this._sqlBootstrapperService.executeSeedScriptAsync("seed_tempomat_adjustment_values");

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
                "admin123",
                "admin123");

        log("seeding User 2...")
        const { invitationToken: it2, createdUser: u2 } = await this._regService
            .createInvitedUserAsync(
                {
                    firstName: "Péter",
                    lastName: "Rezsuta",
                    jobTitleId: 1,
                    roleId: RoleIdEnum.user,
                    email: "r.peter@gmail.com",
                    organizationId: 1
                },
                true);

        await this._regService
            .registerInvitedUserAsync(
                it2,
                "admin123",
                "admin123");

        log("User 2 token: " + it2);
    }
}
