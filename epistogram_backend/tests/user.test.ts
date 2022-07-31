import { UserController } from '../src/api/UserController';
import { setupTest as setupIntegrationTest } from './misc/base';
import { permissionTesterWrapper } from './misc/permissionTesterWrapper';

setupIntegrationTest((getInitData) => {


    /**
     * Get brief user data
     */
    describe('Get brief user data', () => {
        it('is getting ', async () => {

            const { api, cookies, serviceProvider } = getInitData();

            await permissionTesterWrapper(
                serviceProvider,
                async (currentCode) => {

                    const result = await api
                        .callEndpoint(UserController, 'getBriefUserDataAction', {
                            query: {
                                userId: 1
                            },
                            cookies
                        });

                    if (currentCode === 'ADD_EPISTO_COIN_TO_USERS') {

                        expect(result.response.code)
                            .toBe(200);

                        expect(result.response.data)
                            .not
                            .toBeNull();

                        expect(result.response.data)
                            .toHaveProperty('firstName');

                    } else {

                        expect(result.response.code)
                            .not
                            .toBe(200);
                    }

                });
        });
    });

    /*    /**
        * Saving user data
        * * Changing firstName
        * * Check the response
        
       describe('Saving user data', () => {
           it('is changing users first name', async () => {
    
               const { api, cookies } = getInitData();
    
               const result = await api
                   .callEndpoint(UserController, 'saveUserAction', {
                       body: {
                           id: 1,
                           firstName: 'Ender',
                           lastName: 'Marosi',
                           companyId: 1,
                           email: 'endre.marosi@gmail.com',
                           isTeacher: false
                       },
                       cookies
                   });
    
               expect(result.response.code)
                   .toBe(200);
           });
       });
    
       /**
        * Getting brief user data
        * * Gets default user
        * * Check if firstName is changed
        
       describe('Get brief user data', () => {
           it('is checking if default user exists', async () => {
    
               const { api, cookies } = getInitData();
    
               const result = await api
                   .callEndpoint(UserController, 'getBriefUserDataAction', {
                       query: {
                           userId: 1
                       },
                       cookies
                   });
    
               expect(result.response.code)
                   .toBe(200);
    
               expect(result.response.data)
                   .not
                   .toBeNull();
    
               expect(result.response.data)
                   .toHaveProperty('firstName');
    
               expect(result.response.data.firstName)
                   .toBe('Ender');
           });
       });
    }); */
});