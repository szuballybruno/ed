import { AccessTokenPayload } from "../models/DTOs/AccessTokenPayload";
import { InvitationTokenPayload } from "../models/shared_models/types/sharedTypes";
import { GlobalConfiguration } from "./misc/GlobalConfiguration";
import { getJWTToken, verifyJWTToken } from "./misc/jwtGen";

export class TokenService {

    private _config: GlobalConfiguration;

    constructor(config: GlobalConfiguration) {

        this._config = config;
    }

    //
    // VERIFY
    //

    verifyAccessToken = (token: string) => {

        return verifyJWTToken<AccessTokenPayload>(token, this._config.security.jwtSignSecret);
    }

    verifyRefreshToken = (token: string) => {

        return verifyJWTToken<AccessTokenPayload>(token, this._config.security.jwtSignSecret);
    }

    verifyPublicRegistrationToken = (token: string) => {

        return verifyJWTToken(token, this._config.security.createPasswordTokenSecret);
    }

    verifyInvitaionToken = (token: string) => {

        return verifyJWTToken<InvitationTokenPayload>(token, this._config.mail.tokenMailSecret);
    }

    verifySetNewPasswordToken = (token: string) => {

        return verifyJWTToken<{ userId: number }>(token, this._config.mail.tokenMailSecret);
    }

    //
    // CREATE
    //

    createInvitationToken = (userEmail: string) => {

        return getJWTToken<InvitationTokenPayload>(
            { userEmail },
            this._config.mail.tokenMailSecret,
            "127h")
    }

    createAccessToken = (userId: number) => {

        return getJWTToken(
            { userId },
            this._config.security.jwtSignSecret,
            `${this._config.security.accessTokenLifespanInS}s`);
    }

    createRefreshToken = (userId: number) => {

        return getJWTToken(
            { userId },
            this._config.security.jwtSignSecret,
            `${this._config.security.refreshTokenLifespanInS}s`);
    }

    createSetNewPasswordToken = (userId: number) => {

        return getJWTToken(
            { userId },
            this._config.mail.tokenMailSecret,
            "8h");
    }

    createRegistrationToken = () => {

        return getJWTToken(
            { tokenNudli: "bekacomb" },
            this._config.security.createPasswordTokenSecret,
            "99999h");
    }
}