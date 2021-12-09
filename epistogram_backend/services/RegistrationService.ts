import generatePassword from "password-generator";
import { TypedError } from "../utilities/helpers";
import { ActivationCodeService } from "./ActivationCodeService";
import { getUserLoginTokens } from "./authenticationService";
import { EmailService } from "./EmailService2";
import { verifyInvitaionToken, verifyPublicRegistrationToken } from "./tokenService";
import { createUserAsync, getUserById, setUserActiveRefreshToken, setUserInivitationDataAsync } from "./userService";


export class RegistrationService {

    private _activationCodeService: ActivationCodeService;
    private _emailService: EmailService;

    constructor(acs: ActivationCodeService, emailService: EmailService) {

        this._activationCodeService = acs;
        this._emailService = emailService;
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
        const { isValidCode, codeId } = await this._activationCodeService
            .isValidCodeAsync(activationCode);

        if (!isValidCode)
            throw new Error("Code is not valid");

        // get new password
        const generatedPassword = this.getDefaultPassword();

        // create user 
        const user = await createUserAsync({
            email,
            firstName,
            lastName,
            password: generatedPassword,
            registrationType: "ActivationCode"
        });

        const userId = user.id;

        // invalidate activation code 
        await this._activationCodeService.invalidateCodeAsync(codeId!);

        // send email 
        await this._emailService
            .sendSuccessfulRegistrationEmailAsync(user, generatedPassword);

        // get auth tokens 
        const tokens = await getUserLoginTokens(userId);

        // set user current refresh token 
        await setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
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
        verifyPublicRegistrationToken(publicRegToken);

        // get new password 
        const generatedPassword = this.getDefaultPassword();

        // create user 
        const user = await createUserAsync({
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
        const tokens = await getUserLoginTokens(userId);

        // set user current refresh token 
        await setUserActiveRefreshToken(userId, tokens.refreshToken);

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
        const { userId } = verifyInvitaionToken(invitationToken);

        // check if user exists  
        const user = await getUserById(userId);
        if (!user)
            throw new TypedError("No such user!", "bad request");

        // check passwords 
        if (password !== passwordControl)
            throw new TypedError("Passwords don't match!", "bad request");

        // update user 
        await setUserInivitationDataAsync(userId, password);

        // get auth tokens 
        const tokens = await getUserLoginTokens(userId);

        // set user current refresh token 
        await setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
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