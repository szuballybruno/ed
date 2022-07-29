// import { SQLConnectionService } from '../src/services/sqlServices/SQLConnectionService';
// import { UserService } from '../src/services/UserService';
// import { initServiceProvider } from '../src/startup/initApp';
// import { ServiceProvider } from '../src/startup/servicesDI';

import { UserService } from '../src/services/UserService';
import { setupTest } from './base';

setupTest((getServiceProvider) => {

    /**
     * User service
     */
     describe(UserService.name, () => {
        it('is getting user 1', async () => {

            const user = await getServiceProvider()
                .getService(UserService)
                .getUserById(1 as any);

            console.log(user);
        });
    });
});

// const { getServiceProviderAsync } = initServiceProvider('');
// let serviceProvider: ServiceProvider = null as any;

// /**
//  * --------------------- Init tests
//  */
// describe('init tests', () => {
//     it('should init tests', async () => {
//         serviceProvider = await getServiceProviderAsync();
//     });
// });

// /**
//  * User service
//  */
// describe(UserService.name, () => {
//     it('is getting user 1', async () => {

//         const user = await serviceProvider
//             .getService(UserService)
//             .getUserById(1 as any);

//         console.log(user);
//     });
// });

// /**
//  * ----------------------- Destruct tests
//  */
// describe('Destruct tests', () => {
//     it('should descruct tests', async () => {

//         serviceProvider
//             .getService(SQLConnectionService)
//             .releaseConnectionClient();

//         await serviceProvider
//             .getService(SQLConnectionService)
//             .endPoolAsync();
//     });
// });