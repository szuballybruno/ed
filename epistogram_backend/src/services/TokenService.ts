import { sign, verify } from 'jsonwebtoken';
import { AccessTokenPayload } from '../models/DTOs/AccessTokenPayload';
import { User } from '../models/entity/User';
import { InvitationTokenPayload, RoleIdEnum } from '../shared/types/sharedTypes';
import { UserActivityFlatView } from '../models/views/UserActivityFlatView';
import { ErrorCode } from '../utilities/helpers';
import { GlobalConfiguration } from './misc/GlobalConfiguration';

export class TokenService {

    private _config: GlobalConfiguration;

    constructor(config: GlobalConfiguration) {

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

        return this.verifyJWTToken<{ userId: number }>(token, this._config.security.secrets.setNewPasswordTokenSecret);
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

    createAccessToken = (user: User, userActivity: UserActivityFlatView) => {

        return this.getJWTToken<AccessTokenPayload>(
            {
                userId: user.id,
                userRole: RoleIdEnum.toRoleType(user.roleId),
                userActivity
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

    createSetNewPasswordToken = (userId: number) => {

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

        return sign(tokenData as any, secret, { expiresIn: expiresIn });
    };

    private verifyJWTToken = <TTokenPayload>(token: string, secret: string) => {

        const payload = verify(token, secret) as any as TTokenPayload;

        if (!payload)
            throw new ErrorCode('Token verification failed!', 'forbidden');

        return payload;
    };
}