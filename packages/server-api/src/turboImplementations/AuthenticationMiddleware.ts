import { AuthenticationService, GlobalConfigurationService } from '@episto/server-services';
import { CompanyService } from '@episto/server-services';
import { LoggerService } from '@episto/server-services';
import { ErrorWithCode } from '@episto/commontypes';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { ITurboMiddlewareInstance, ITurboRequest, ITurboResponse, MiddlewareParams } from '../XTurboExpress/XTurboExpressTypes';
import { getAuthCookies } from '../cookieHelpers';
import { ServiceProvider } from '../startup/ServiceProvider';

export class AuthenticationMiddleware implements ITurboMiddlewareInstance<void, ITurboRequest, ITurboResponse, ActionParams> {

    private _authenticationService: AuthenticationService;
    private _loggerService: LoggerService;
    private _companyService: CompanyService;
    private _config: GlobalConfigurationService;

    constructor(serviceProvider: ServiceProvider) {

        this._authenticationService = serviceProvider.getService(AuthenticationService);
        this._companyService = serviceProvider.getService(CompanyService);
        this._loggerService = serviceProvider.getService(LoggerService);
        this._config = serviceProvider.getService(GlobalConfigurationService);
    }

    runMiddlewareAsync = async (params: MiddlewareParams<void, ITurboRequest, ITurboResponse>): Promise<ActionParams> => {

        const { req, res, options } = params;

        const { accessToken } = getAuthCookies(req, this._config);
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