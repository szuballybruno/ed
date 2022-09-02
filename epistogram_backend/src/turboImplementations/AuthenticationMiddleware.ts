import { AuthenticationService } from '../services/AuthenticationService';
import { CompanyService } from '../services/CompanyService';
import { LoggerService } from '../services/LoggerService';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { ServiceProvider } from '../startup/servicesDI';
import { getAuthCookies } from '../utilities/helpers';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { ITurboMiddlewareInstance, ITurboRequest, ITurboResponse, MiddlewareParams } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class AuthenticationMiddleware implements ITurboMiddlewareInstance<void, ITurboRequest, ITurboResponse, ActionParams> {

    private _authenticationService: AuthenticationService;
    private _loggerService: LoggerService;
    private _companyService: CompanyService;

    constructor(serviceProvider: ServiceProvider) {

        this._authenticationService = serviceProvider.getService(AuthenticationService);
        this._companyService = serviceProvider.getService(CompanyService);
        this._loggerService = serviceProvider.getService(LoggerService);
    }

    runMiddlewareAsync = async (params: MiddlewareParams<void, ITurboRequest, ITurboResponse>): Promise<ActionParams> => {

        const { req, res, options } = params;

        const { accessToken } = getAuthCookies(req);
        const requestPath = req.path;

        this._loggerService
            .logScoped('SERVER', `${requestPath}: Authorizing request...`);

        const company = await this
            ._companyService
            .getCompanyByDomainAsync(req.origin);

        const companyId = company.id;

        // public route 
        if (options.isPublic) {

            this._loggerService
                .logScoped('SERVER', `${requestPath}: Route is open, skipping authentication...`);

            return new ActionParams(req, res, null as any, companyId);
        }

        // private (authenticated) route
        else {

            try {
                if (!accessToken)
                    throw new Error('Access token not found!');

                // get userId from access token
                const { userId } = this._authenticationService
                    .getRequestAccessTokenPayload(accessToken);

                // authorize user by company
                await this
                    ._authenticationService
                    .authorizeUserByCompanyAsync(userId, companyId);

                // permitted. finalization             
                this._loggerService
                    .logScoped('SERVER', `${requestPath}: Request permitted. UserId: ${userId} Proceeding...`);

                return new ActionParams(req, res, userId, companyId);
            }
            catch (e: any) {

                throw new ErrorWithCode(e.message, 'forbidden');
            }
        }
    };
}