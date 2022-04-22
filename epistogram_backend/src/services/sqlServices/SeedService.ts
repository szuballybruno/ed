
import { RoleIdEnum } from '../../shared/types/sharedTypes';
import { RegistrationService } from '../RegistrationService';
import { log } from '../misc/logger';
import { SQLBootstrapperService } from './SQLBootstrapper';
import { dbSchema } from '../misc/dbSchema';

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _regService: RegistrationService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, regService: RegistrationService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._regService = regService;
    }

    seedDBAsync = async () => {

        for (let index = 0; index < dbSchema.seedScripts.length; index++) {

            const seedScript = dbSchema.seedScripts[index];

            await this._sqlBootstrapperService
                .executeSeedScriptAsync(seedScript);
        }

        // recalc seqs
        await this._sqlBootstrapperService.recalcSequencesAsync();

        // seed users 
        // await this.seedUsersAsync();
    };

    // private seedUsersAsync = async () => {

    //     log('seeding User 1...');
    //     const { invitationToken, createdUser } = await this._regService
    //         .createInvitedUserAsync(
    //             {
    //                 firstName: 'Endre',
    //                 lastName: 'Marosi',
    //                 jobTitleId: 1,
    //                 roleId: RoleIdEnum.administrator,
    //                 email: 'marosi.endre@email.com',
    //                 companyId: 1,
    //                 isGod: true
    //             },
    //             true);

    //     await this._regService
    //         .registerInvitedUserAsync(
    //             invitationToken,
    //             'admin123',
    //             'admin123');

    //     log('seeding User 2...');
    //     const { invitationToken: it2, createdUser: u2 } = await this._regService
    //         .createInvitedUserAsync(
    //             {
    //                 firstName: 'Péter',
    //                 lastName: 'Rezsuta',
    //                 jobTitleId: 1,
    //                 roleId: RoleIdEnum.user,
    //                 email: 'r.peter@gmail.com',
    //                 companyId: 1
    //             },
    //             true);

    //     await this._regService
    //         .registerInvitedUserAsync(
    //             it2,
    //             'admin123',
    //             'admin123');

    //     log('User 2 token: ' + it2);
    // };
}
