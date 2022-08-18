import {UserController} from '../../src/api/UserController';
import {setupIntegrationTest, TestParams} from '../misc/base';
import {permissionTesterWrapper} from '../misc/permissionTesterWrapper';
import {PermissionCodeType} from '../../src/shared/types/sharedTypes';
import restoreAllMocks = jest.restoreAllMocks;

const testGetBriefUserDataAction = async (testParams: TestParams) => {


    const { api, cookies, serviceProvider } = testParams;

    const assignablePermissions: PermissionCodeType[] = ['ACCESS_ADMIN', 'VIEW_COMPANY_USERS'];

    await permissionTesterWrapper(
        assignablePermissions ,
        serviceProvider,
        async (currentPermissions) => {

            const result = await api
                .callEndpoint(UserController, 'getBriefUserDataAction', {
                    query: {
                        userId: 1
                    },
                    cookies
                });


            if (!currentPermissions) {

                expect(result.response.code)
                    .not
                    .toBe(200);

                expect(result.response.data)
                    .toHaveProperty('code');

            }

            if (currentPermissions && currentPermissions === assignablePermissions){

                expect(result.response.code)
                    .toBe(200);


                expect(result.response.data)
                    .toHaveProperty('firstName');
            }

        });
};

const testGetUserAdministrationUserListAction = async (testParams: TestParams) => {


    const { api, cookies, serviceProvider } = testParams;

    const assignablePermissions: PermissionCodeType[] = ['ACCESS_ADMIN', 'VIEW_COMPANY_USERS'];

    await permissionTesterWrapper(
        assignablePermissions ,
        serviceProvider,
        async (currentPermissions) => {

            const result = await api
                .callEndpoint(UserController, 'getUserAdministrationUserListAction', {
                    query: {
                        userId: 1
                    },
                    cookies
                });


            if (!currentPermissions) {

                expect(result.response.code)
                    .not
                    .toBe(200);

                expect(result.response.data)
                    .toHaveProperty('code');

            }

            if (currentPermissions && currentPermissions === assignablePermissions){

                expect(result.response.code)
                    .toBe(200);


                expect(result.response.data.length)
                    .toEqual(4);
            }

        });
};

const testDeleteUserAction = async (testParams: TestParams) => {


    const { api, cookies, serviceProvider } = testParams;

    const assignablePermissions: PermissionCodeType[] = ['ACCESS_ADMIN', 'DELETE_USER'];

    await permissionTesterWrapper(
        assignablePermissions ,
        serviceProvider,
        async (currentPermissions) => {

            const result = await api
                .callEndpoint(UserController, 'deleteUserAction', {
                    body: {
                        userId: 4
                    },
                    cookies
                });


            if (!currentPermissions) {

                expect(result.response.code)
                    .not
                    .toBe(200);

                expect(result.response.data)
                    .toHaveProperty('code');

            }

            if (currentPermissions && currentPermissions === assignablePermissions){

                expect(result.response.code)
                    .toBe(200);

            }

        });
};

setupIntegrationTest('Testing permissions')
    .addTests(async (getTestParams) => {

        const testParams = getTestParams();

        await testGetBriefUserDataAction(testParams);
        await testGetUserAdministrationUserListAction(testParams);
        await testDeleteUserAction(testParams);
    })
    .noThrowError()
    .noLogResError()
    .build();
