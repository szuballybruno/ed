import { ErrorWithCode } from '@episto/commontypes';
import { AuthenticationService, CompanyService, GlobalConfigurationService, LoggerService } from '@episto/server-services';
import { IXGatewayMiddlewareInstance, IXGatewayServiceProvider, MiddlewareParams } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { getAuthCookies } from '../helpers/cookieHelpers';

export class AuthenticationMiddleware implements IXGatewayMiddlewareInstance<void, ActionParams> {

    private _authenticationService: AuthenticationService;
    private _loggerService: LoggerService;
    private _companyService: CompanyService;
    private _config: GlobalConfigurationService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._authenticationService = serviceProvider.getService(AuthenticationService);
        this._companyService = serviceProvider.getService(CompanyService);
        this._loggerService = serviceProvider.getService(LoggerService);
        this._config = serviceProvider.getService(GlobalConfigurationService);
    }

    runMiddlewareAsync = async (params: MiddlewareParams<void>): Promise<ActionParams> => {

        const { req, res, options } = params;

        const { accessToken } = getAuthCookies(req, this._config);
        const requestPath = req.path;

        this._loggerService
            .logScoped('SERVER', `${requestPath}: Authorizing request...`);

        // not company bound
        if (!options.isCompanyBound) {

            this._loggerService
                .logScoped('SERVER', `${requestPath}: Route no company bound...`);

            return new ActionParams(req, res, null as any, null as any);
        }

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