import { AnswerSignupQuestionDTO } from "../models/shared_models/AnswerSignupQuestionDTO";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { UserRoleEnum } from "../models/shared_models/types/sharedTypes";
import { SignupCompletedView } from "../models/views/SignupCompletedView";
import { SignupQuestionView } from "../models/views/SignupQuestionView";
import { staticProvider } from "../staticProvider";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";
import { EmailService } from "./EmailService";
import { toSignupDataDTO } from "./mappings";
import { log } from "./misc/logger";
import { createInvitationToken } from "./tokenService";
import { createUserAsync, getUserById, setUserInvitationTokenasync } from "./userService";

export class SignupService {

    private _emailService: EmailService;

    constructor(emailService: EmailService) {

        this._emailService = emailService;
    }

    async createInvitedUserAsync(dto: CreateInvitedUserDTO, currentUserId: number) {

        const currentUser = await getUserById(currentUserId);

        // if user is admin require organizationId to be provided
        // otherwise use the current user's organization
        const organizationId = currentUser.roleId === UserRoleEnum.administratorId
            ? withValueOrBadRequest<number>(dto.organizationId, "number")
            : currentUser.organizationId;

        if (!organizationId)
            throw new TypedError("Current user is not an administrator, but has rights to add users, but has no organization, in which he/she could add users.", "bad request")

        return this.createInvitedUserWithOrgAsync(dto, organizationId, true);
    }

    async createInvitedUserWithOrgAsync(dto: CreateInvitedUserDTO, organizationId: number, sendEmail: boolean) {

        // get and check sent data 
        const email = withValueOrBadRequest<string>(dto.email);
        const roleId = withValueOrBadRequest<number>(dto.roleId, "number");
        const firstName = withValueOrBadRequest<string>(dto.firstName);
        const lastName = withValueOrBadRequest<string>(dto.lastName);
        const jobTitleId = withValueOrBadRequest<number>(dto.jobTitleId, "number");
        const userFullName = `${lastName} ${firstName}`;

        const user = await createUserAsync({
            email,
            firstName,
            lastName,
            organizationId,
            roleId,
            jobTitleId,
            isInvited: true,
            password: "guest"
        });

        const userId = user.id;
        const invitationToken = createInvitationToken(userId);

        // set user invitation token
        await setUserInvitationTokenasync(userId, invitationToken);

        if (sendEmail) {

            log("Sending mail... to: " + email);
            await this._emailService.sendInvitaitionMailAsync(invitationToken, email, userFullName);
        }

        return { invitationToken, user };
    }

    async answerSignupQuestionAsync = (userId: number, questionAnswer: AnswerSignupQuestionDTO)  {

        await staticProvider
            .services
            .sqlFunctionService
            .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
    }

    async getSignupDataAsync = (userId: number)  {

        const userSignupCompltedView = await staticProvider
            .ormConnection
            .getRepository(SignupCompletedView)
            .findOneOrFail({
                where: {
                    userId
                }
            });

        const questions = await staticProvider
            .ormConnection
            .getRepository(SignupQuestionView)
            .createQueryBuilder("sqv")
            .where("sqv.userId = :userId", { userId })
            .getMany();

        return toSignupDataDTO(questions, userSignupCompltedView.isSignupComplete);
    }
}
