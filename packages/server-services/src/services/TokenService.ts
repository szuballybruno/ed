import JsonWebToken from 'jsonwebtoken';
import { AccessTokenPayload } from '../models/DTOs/AccessTokenPayload';
import { User } from '../models/entity/misc/User';
import { InvitationTokenPayload } from '@episto/commontypes';
import { ErrorWithCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { GlobalConfigurationService } from './GlobalConfigurationService';

export class TokenService {

    private _config: GlobalConfigurationService;

    constructor(config: GlobalConfigurationService) {

        this._config = config;
    }

    //
    // VERIFY
    //

    verifyAccessToken = (token: string) => {

        return this.verifyJWTToken<AccessTokenPayload>(token, this._config.security.secrets.accessTokenSecret);
    };

    verifyRefreshToken = (token: string) => {

        return this.verifyJWTToken<AccessTokenPayload>(token, this._config.security.secrets.refreshTokenSecret);
    };

    verifyPublicRegistrationToken = (token: string) => {

        return this.verifyJWTToken(token, this._config.security.secrets.regTokenSecret);
    };

    verifyInvitaionToken = (token: string) => {

        return this.verifyJWTToken<InvitationTokenPayload>(token, this._config.security.secrets.invitationTokenSecret);
    };

    verifySetNewPasswordToken = (token: string) => {

        return this.verifyJWTToken<{ userId: Id<'User'> }>(token, this._config.security.secrets.setNewPasswordTokenSecret);
    };

    //
    // CREATE
    //

    createInvitationToken = (userEmail: string) => {

        return this.getJWTToken<InvitationTokenPayload>(
            { userEmail },
            this._config.security.secrets.invitationTokenSecret,
            `${this._config.security.tokenLifespans.invitationTokenLifespanInS}s`);
    };

    createAccessToken = (user: User) => {

        return this.getJWTToken<AccessTokenPayload>(
            {
                userId: user.id
            },
            this._config.security.secrets.accessTokenSecret,
            `${this._config.security.tokenLifespans.accessTokenLifespanInS}s`);
    };

    createRefreshToken = (user: User) => {

        return this.getJWTToken(
            { userId: user.id },
            this._config.security.secrets.refreshTokenSecret,
            `${this._config.security.tokenLifespans.refreshTokenLifespanInS}s`);
    };

    createSetNewPasswordToken = (userId: Id<'User'>) => {

        return this.getJWTToken(
            { userId },
            this._config.security.secrets.setNewPasswordTokenSecret,
            `${this._config.security.tokenLifespans.setNewPasswordTokenLifespanInS}s`);
    };

    createRegistrationToken = () => {

        return this.getJWTToken(
            { tokenNudli: 'bekacomb' },
            this._config.security.secrets.regTokenSecret,
            `${this._config.security.tokenLifespans.registrationTokenLifespanInS}s`);
    };


    private getJWTToken = <TTokenPayload>(
        tokenData: TTokenPayload,
        secret: string,
        expiresIn: string | number): string => {

        return JsonWebToken.sign(tokenData as any, secret, { expiresIn: expiresIn });
    };

    private verifyJWTToken = <TTokenPayload>(token: string, secret: string) => {

        const payload = JsonWebToken.verify(token, secret) as any as TTokenPayload;

        if (!payload)
            throw new ErrorWithCode('Token verification failed!', 'forbidden');

        return payload;
    };
}