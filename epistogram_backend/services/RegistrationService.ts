import generatePassword from "password-generator";
import { JobTitleIdEnum, RoleIdEnum } from "../models/shared_models/types/sharedTypes";
import { getFullName, TypedError } from "../utilities/helpers";
import { ActivationCodeService } from "./ActivationCodeService";
import { AuthenticationService } from "./AuthenticationService";
import { EmailService } from "./EmailService";
import { log } from "./misc/logger";
import { TokenService } from "./TokenService";
import { UserService } from "./UserService";

export class RegistrationService {

    private _activationCodeService: ActivationCodeService;
    private _emailService: EmailService;
    private _userService: UserService;
    private _authenticationService: AuthenticationService;
    private _tokenService: TokenService;

    constructor(
        acs: ActivationCodeService,
        emailService: EmailService,
        userService: UserService,
        authenticationService: AuthenticationService,
        tokenService: TokenService) {

        this._userService = userService;
        this._authenticationService = authenticationService;
        this._activationCodeService = acs;
        this._emailService = emailService;
        this._tokenService = tokenService;
    }

    /**
     * This function registers a user using an activation code. 
     * If said code is valid, it will be marked as used as there can not be another registration made with it.
     * 
     * @param activationCode 
     * @param email 
     * @param firstName 
     * @param lastName 
     * @returns 
     */
    async registerUserViaActivationCodeAsync(
        activationCode: string,
        email: string,
        firstName: string,
        lastName: string) {

        // check code 
        const activationCodeEntity = await this._activationCodeService
            .isValidCodeAsync(activationCode);

        if (!activationCodeEntity)
            throw new Error("Code is not valid");

        // invalidate activation code 
        await this._activationCodeService
            .invalidateCodeAsync(activationCodeEntity.id);

        // create user 
        await this.createInvitedUserAsync({
            email,
            firstName,
            lastName,
            organizationId: activationCodeEntity.organizationId,
            roleId: RoleIdEnum.user,
            jobTitleId: JobTitleIdEnum.genericUser
        });
    }

    /**
     * This function registers a new user using a public access token. 
     * Public access tokens come from public links, such as QR codes.
     * 
     * @param publicRegToken 
     * @param email 
     * @param firstName 
     * @param lastName 
     * @returns 
     */
    registerUserViaPublicTokenAsync = async (
        publicRegToken: string,
        email: string,
        firstName: string,
        lastName: string) => {

        // verify public reg token
        this._tokenService.verifyPublicRegistrationToken(publicRegToken);

        // get new password 
        const generatedPassword = this.getDefaultPassword();

        // create user 
        const user = await this._userService
            .createUserAsync({
                email,
                firstName,
                lastName,
                registrationType: "PublicRegistrationToken",
                password: generatedPassword
            });

        const userId = user.id;

        // send mail
        await this._emailService
            .sendSuccessfulRegistrationEmailAsync(user, generatedPassword);

        // get auth tokens 
        const tokens = await this._authenticationService
            .getUserLoginTokens(user, user.userActivity);

        // set user current refresh token 
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    /**
     * 
     * @param dto 
     * @returns 
     */
    registerInvitedUserAsync = async (
        invitationToken: string,
        password: string,
        passwordControl: string) => {

        // verify token 
        const { userEmail } = this._tokenService.verifyInvitaionToken(invitationToken);

        // check if user exists  
        const user = await this._userService
            .getUserByEmailAsync(userEmail);

        if (!user)
            throw new TypedError("No such user!", "bad request");

        const userId = user.id;

        // check passwords 
        if (password !== passwordControl)
            throw new TypedError("Passwords don't match!", "bad request");

        // update user 
        await this._userService
            .setUserInivitationDataAsync(userId, password);

        // get auth tokens 
        const tokens = await this._authenticationService
            .getUserLoginTokens(user, user.userActivity);

        // set user current refresh token 
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    /**
     * This function creates a new invited user, 
     * generates an invitation token, 
     * and sends it as a mail to the given email address. 
     * 
     * @param userId 
     * @param options 
     * @param sendEmail 
     * @returns 
     */
    async createInvitedUserAsync(
        options: {
            email: string;
            firstName: string;
            lastName: string;
            organizationId: number;
            roleId: number;
            jobTitleId: number;
        },
        noEmailNotification?: boolean) {

        const email = options.email;

        // create invitation token
        const invitationToken = this._tokenService.createInvitationToken(email);

        // create user 
        const createdUser = await this._userService
            .createUserAsync({
                email,
                firstName: options.firstName,
                lastName: options.lastName,
                organizationId: options.organizationId,
                roleId: options.roleId,
                jobTitleId: options.jobTitleId,
                registrationType: "Invitation",
                password: "guest",
                invitationToken
            });

        // send email
        if (!noEmailNotification) {

            log("Sending mail... to: " + email);

            await this._emailService
                .sendInvitaitionMailAsync(invitationToken, email, getFullName(createdUser));
        }

        return { invitationToken, createdUser };
    }

    /**
     * Get a default password that can be sent to users, 
     * and they can change it later to something stronger.
     * 
     * @returns 
     */
    private getDefaultPassword = () => {

        return generatePassword(10);
    }
}