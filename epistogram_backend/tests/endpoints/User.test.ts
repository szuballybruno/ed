import {UserController} from '../../src/api/UserController';
import {setupIntegrationTest, TestParams} from '../misc/base';
import {AssignablePermissionType, permissionTesterWrapper} from '../misc/permissionTesterWrapper';
import {getCompaniesSeedData} from '../../src/sql/seed/seed_companies';
import {getUserSeedData} from '../../src/sql/seed/seed_users';
import {TestTurboResponse} from '../misc/TestListener';

export const expectNoPermissions = (
    result: TestTurboResponse,
    assignedPermissions?: AssignablePermissionType[]
) => {

    if (!assignedPermissions) {
        expect(result.response.code)
            .not
            .toBe(200);

        expect(result.response.data)
            .toHaveProperty('code');
    }
};

export const expect200If = (result: TestTurboResponse, cond?: boolean) => {
    if (cond) {
        expect(result.response.code)
            .toBe(200);
    }
};

export const expectToHavePropertyIf = (
    result: TestTurboResponse,
    property: string,
    cond?: boolean
) => {
    if (cond) {
        expect(result.response.data)
            .toHaveProperty(property);
    }
};

export const expectArrayLengthIf = (
    result: TestTurboResponse,
    length: number,
    cond?: boolean
) => {
    if (cond) {
        expect(result.response.data.length)
            .toEqual(length);
    }
};

const testGetBriefUserDataAction = async (testParams: TestParams) => {

    const { api, cookies, serviceProvider, getSeedData } = testParams;

    const companiesSeedData = getSeedData(getCompaniesSeedData);
    const usersSeedData = getSeedData(getUserSeedData);

    const assignablePermissions: AssignablePermissionType[] = [{
        permissionCode: 'ACCESS_ADMIN',
        contextCompanyId: null,
        contextCommentId: null,
        contextCourseId: null
    }, {
        permissionCode: 'VIEW_COMPANY_USERS',
        contextCompanyId: companiesSeedData.PCWorld.id,
        contextCommentId: null,
        contextCourseId: null
    }];

    await permissionTesterWrapper(
        assignablePermissions ,
        serviceProvider,
        async (assignedPermissions) => {

            const result = await api
                .callEndpoint(UserController, 'getBriefUserDataAction', {
                    query: {
                        userId: usersSeedData.lizBlue.id
                    },
                    cookies
                });

            expectNoPermissions(result, assignedPermissions);
            expect200If(result, assignedPermissions && assignedPermissions === assignablePermissions);
            expectToHavePropertyIf(result, 'firstName', assignedPermissions && assignedPermissions === assignablePermissions);
        });
};

const testGetEditUserDataAction = async (testParams: TestParams) => {

    const { api, cookies, serviceProvider, getSeedData } = testParams;

    const companiesSeedData = getSeedData(getCompaniesSeedData);
    const usersSeedData = getSeedData(getUserSeedData);

    const assignablePermissions: AssignablePermissionType[] = [{
        permissionCode: 'ACCESS_ADMIN',
        contextCompanyId: null,
        contextCommentId: null,
        contextCourseId: null
    }, {
        permissionCode: 'EDIT_COMPANY_USER',
        contextCompanyId: companiesSeedData.PCWorld.id,
        contextCommentId: null,
        contextCourseId: null
    }];

    await permissionTesterWrapper(
        assignablePermissions ,
        serviceProvider,
        async (assignedPermissions) => {

            const result = await api
                .callEndpoint(UserController, 'getEditUserDataAction', {
                    query: {
                        editedUserId: usersSeedData.lizBlue.id
                    },
                    cookies
                });

            expectNoPermissions(result, assignedPermissions);
            expect200If(result, assignedPermissions && assignedPermissions === assignablePermissions);
            expectToHavePropertyIf(result, 'firstName', assignedPermissions && assignedPermissions === assignablePermissions);

        });
};

const testGetUserAdministrationUserListAction = async (testParams: TestParams) => {


    const { api, cookies, serviceProvider, getSeedData } = testParams;

    const companiesSeedData = getSeedData(getCompaniesSeedData);
    const usersSeedData = getSeedData(getUserSeedData);

    const assignablePermissions: AssignablePermissionType[] = [{
        permissionCode: 'ACCESS_ADMIN',
        contextCompanyId: null,
        contextCommentId: null,
        contextCourseId: null
    }, {
        permissionCode: 'VIEW_COMPANY_USERS',
        contextCompanyId: companiesSeedData.PCWorld.id,
        contextCommentId: null,
        contextCourseId: null
    }];

    await permissionTesterWrapper(
        assignablePermissions ,
        serviceProvider,
        async (assignedPermissions) => {

            const result = await api
                .callEndpoint(UserController, 'getUserAdministrationUserListAction', {
                    query: {
                        userId: usersSeedData.lizBlue.id
                    },
                    cookies
                });

            expectNoPermissions(result, assignedPermissions);
            expect200If(result, assignedPermissions && assignedPermissions === assignablePermissions);
            expectArrayLengthIf(result, 4, assignedPermissions && assignedPermissions === assignablePermissions);
        });
};

const testDeleteUserAction = async (testParams: TestParams) => {

    const { api, cookies, serviceProvider, getSeedData } = testParams;

    const companiesSeedData = getSeedData(getCompaniesSeedData);
    const usersSeedData = getSeedData(getUserSeedData);

    const assignablePermissions: AssignablePermissionType[] = [{
        permissionCode: 'ACCESS_ADMIN',
        contextCompanyId: null,
        contextCommentId: null,
        contextCourseId: null
    }, {
        permissionCode: 'DELETE_COMPANY_USER',
        contextCompanyId: companiesSeedData.PCWorld.id,
        contextCommentId: null,
        contextCourseId: null
    }];

    await permissionTesterWrapper(
        assignablePermissions,
        serviceProvider,
        async (assignedPermissions) => {

            const result = await api
                .callEndpoint(UserController, 'deleteUserAction', {
                    body: {
                        userId: usersSeedData.lizBlue.id
                    },
                    cookies
                });

            expectNoPermissions(result, assignedPermissions);
            expect200If(result, assignedPermissions && assignedPermissions === assignablePermissions);
        });
};

setupIntegrationTest('Testing permissions')
    .addTests(async (getTestParams) => {

        const testParams = getTestParams();

        //await testDeleteUserAction(testParams);
        await testGetEditUserDataAction(testParams);
        await testGetBriefUserDataAction(testParams);
        await testGetUserAdministrationUserListAction(testParams);
    })
    .noThrowError()
    .noLogResError()
    .build();
